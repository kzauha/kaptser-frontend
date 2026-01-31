'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useUser, useClerk } from '@clerk/nextjs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ArrowLeft, Mail, Calendar, Shield, CheckCircle, LogOut } from 'lucide-react';
import { redirect } from 'next/navigation';

export default function AccountPage() {
    const { user, isLoaded } = useUser();
    const { signOut } = useClerk();

    if (!isLoaded) {
        return (
            <div className="min-h-screen bg-[#060010] flex items-center justify-center">
                <div className="text-white/40">Loading...</div>
            </div>
        );
    }

    if (!user) {
        redirect('/');
    }

    const avatarUrl = `https://api.dicebear.com/9.x/dylan/svg?seed=${user.id}`;
    const initials = `${user.firstName?.[0] || ''}${user.lastName?.[0] || ''}`.toUpperCase();

    const handleSignOut = async () => {
        await signOut();
    };

    return (
        <div className="min-h-screen bg-[#060010]">
            {/* Header */}
            <header className="border-b border-white/5 bg-[#060010]/50 backdrop-blur-md">
                <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2">
                        <Image
                            src="/flux.svg"
                            alt="OpenFlux"
                            width={100}
                            height={35}
                            className="h-7 w-auto brightness-200"
                        />
                    </Link>

                    <Link
                        href="/"
                        className="flex items-center gap-2 text-white/40 hover:text-white text-sm transition-colors"
                    >
                        <ArrowLeft size={16} />
                        Back to home
                    </Link>
                </div>
            </header>

            {/* Main Content */}
            <div className="max-w-4xl mx-auto px-6 py-12">
                {/* Profile Header */}
                <div className="bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl p-8 mb-8">
                    <div className="flex items-start gap-6">
                        <Avatar className="w-24 h-24 border-4 border-white/10">
                            <AvatarImage src={avatarUrl} alt={user.fullName || 'User'} />
                            <AvatarFallback className="bg-white/10 text-white text-2xl font-tasa">
                                {initials || 'U'}
                            </AvatarFallback>
                        </Avatar>

                        <div className="flex-1">
                            <h1 className="text-3xl font-tasa text-white mb-2">
                                {user.fullName || 'User'}
                            </h1>
                            <p className="text-white/60 font-light mb-4">
                                {user.primaryEmailAddress?.emailAddress}
                            </p>

                            <div className="flex items-center gap-2">
                                {user.primaryEmailAddress?.verification?.status === 'verified' ? (
                                    <div className="flex items-center gap-2 px-3 py-1.5 bg-green-500/10 border border-green-500/20 rounded-full">
                                        <CheckCircle className="text-green-400" size={14} />
                                        <span className="text-green-400 text-xs font-light">Verified Account</span>
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-2 px-3 py-1.5 bg-yellow-500/10 border border-yellow-500/20 rounded-full">
                                        <Shield className="text-yellow-400" size={14} />
                                        <span className="text-yellow-400 text-xs font-light">Pending Verification</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Account Information */}
                <div className="bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl p-8 mb-8">
                    <h2 className="text-2xl font-tasa text-white mb-6">Account Information</h2>

                    <div className="space-y-6">
                        <div className="flex items-start gap-4 pb-6 border-b border-white/10">
                            <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
                                <Mail className="text-white/60" size={20} />
                            </div>
                            <div className="flex-1">
                                <p className="text-white/40 text-sm font-light mb-1">Email Address</p>
                                <p className="text-white font-light">
                                    {user.primaryEmailAddress?.emailAddress}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4 pb-6 border-b border-white/10">
                            <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
                                <Calendar className="text-white/60" size={20} />
                            </div>
                            <div className="flex-1">
                                <p className="text-white/40 text-sm font-light mb-1">Member Since</p>
                                <p className="text-white font-light">
                                    {user.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    }) : 'N/A'}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
                                <Shield className="text-white/60" size={20} />
                            </div>
                            <div className="flex-1">
                                <p className="text-white/40 text-sm font-light mb-1">Account ID</p>
                                <p className="text-white/60 font-mono text-sm break-all">
                                    {user.id}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Authentication Method */}
                <div className="bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl p-8 mb-8">
                    <h2 className="text-2xl font-tasa text-white mb-6">Authentication</h2>

                    <div className="flex items-center gap-4 p-4 bg-white/5 rounded-lg">
                        <svg className="w-8 h-8 flex-shrink-0" viewBox="0 0 24 24">
                            <path
                                fill="currentColor"
                                className="text-white"
                                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                            />
                            <path
                                fill="currentColor"
                                className="text-white"
                                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                            />
                            <path
                                fill="currentColor"
                                className="text-white"
                                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                            />
                            <path
                                fill="currentColor"
                                className="text-white"
                                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                            />
                        </svg>
                        <div>
                            <p className="text-white font-normal mb-1">Google Account</p>
                            <p className="text-white/40 text-sm font-light">
                                You're signed in with your Google account
                            </p>
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl p-8">
                    <h2 className="text-2xl font-tasa text-white mb-6">Account Actions</h2>

                    <button
                        onClick={handleSignOut}
                        className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg hover:bg-red-500/20 transition-all font-light"
                    >
                        <LogOut size={18} />
                        Sign Out
                    </button>
                </div>
            </div>
        </div>
    );
}
