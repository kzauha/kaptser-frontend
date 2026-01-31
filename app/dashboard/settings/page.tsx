'use client';

import React from 'react';
import { useUser, useClerk } from '@clerk/nextjs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
    User,
    Mail,
    Shield,
    CreditCard,
    Bell,
    Smartphone,
    LogOut,
    ChevronRight,
    Key
} from 'lucide-react';

export default function SettingsPage() {
    const { user, isLoaded } = useUser();
    const { signOut } = useClerk();

    if (!isLoaded || !user) return <div className="text-[#888888] p-8">Loading settings...</div>;

    const avatarUrl = `https://api.dicebear.com/9.x/dylan/svg?seed=${user.id}`;

    return (
        <div className="flex-1 h-full overflow-y-auto bg-[#060010] p-6 md:p-12">
            <div className="max-w-2xl mx-auto space-y-8">

                {/* Header */}
                <div className="flex items-center gap-4 mb-8">
                    <Avatar className="w-20 h-20 border-2 border-[#262626]">
                        <AvatarImage src={avatarUrl} />
                        <AvatarFallback className="bg-[#262626] text-xl text-[#ECECEC]">{user.firstName?.[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                        <h1 className="text-2xl font-medium text-[#ECECEC] font-tasa">{user.fullName}</h1>
                        <p className="text-[#888888] text-sm">{user.primaryEmailAddress?.emailAddress}</p>
                        <div className="mt-2 flex gap-2">
                            <span className="bg-[#1A1A1A] border border-[#262626] text-[#A0A0A0] px-2 py-0.5 rounded text-[10px] uppercase tracking-wide">
                                Pro Plan
                            </span>
                        </div>
                    </div>
                </div>

                {/* Account Section */}
                <section>
                    <h2 className="text-xs font-medium text-[#606060] uppercase tracking-wider mb-3 px-1">General</h2>
                    <div className="bg-[#0D0D0D] border border-[#1F1F1F] rounded-xl overflow-hidden divide-y divide-[#1F1F1F]">
                        <div className="p-4 flex items-center justify-between hover:bg-[#141414] transition-colors cursor-pointer group">
                            <div className="flex items-center gap-3">
                                <User size={18} className="text-[#606060] group-hover:text-[#ECECEC] transition-colors" />
                                <div>
                                    <div className="text-sm text-[#ECECEC] font-medium">Profile Details</div>
                                    <div className="text-xs text-[#606060]">Update your name and photo</div>
                                </div>
                            </div>
                            <ChevronRight size={16} className="text-[#333333] group-hover:text-[#606060]" />
                        </div>
                        <div className="p-4 flex items-center justify-between hover:bg-[#141414] transition-colors cursor-pointer group">
                            <div className="flex items-center gap-3">
                                <Mail size={18} className="text-[#606060] group-hover:text-[#ECECEC] transition-colors" />
                                <div>
                                    <div className="text-sm text-[#ECECEC] font-medium">Email Address</div>
                                    <div className="text-xs text-[#606060]">{user.primaryEmailAddress?.emailAddress}</div>
                                </div>
                            </div>
                            <ChevronRight size={16} className="text-[#333333] group-hover:text-[#606060]" />
                        </div>
                    </div>
                </section>

                {/* Security Section */}
                <section>
                    <h2 className="text-xs font-medium text-[#606060] uppercase tracking-wider mb-3 px-1">Security & Access</h2>
                    <div className="bg-[#0D0D0D] border border-[#1F1F1F] rounded-xl overflow-hidden divide-y divide-[#1F1F1F]">
                        <div className="p-4 flex items-center justify-between hover:bg-[#141414] transition-colors cursor-pointer group">
                            <div className="flex items-center gap-3">
                                <Key size={18} className="text-[#606060] group-hover:text-[#ECECEC] transition-colors" />
                                <div>
                                    <div className="text-sm text-[#ECECEC] font-medium">API Keys</div>
                                    <div className="text-xs text-[#606060]">Manage your programmatic access</div>
                                </div>
                            </div>
                            <ChevronRight size={16} className="text-[#333333] group-hover:text-[#606060]" />
                        </div>
                        <div className="p-4 flex items-center justify-between hover:bg-[#141414] transition-colors cursor-pointer group">
                            <div className="flex items-center gap-3">
                                <Shield size={18} className="text-[#606060] group-hover:text-[#ECECEC] transition-colors" />
                                <div>
                                    <div className="text-sm text-[#ECECEC] font-medium">Two-Factor Auth</div>
                                    <div className="text-xs text-[#606060]">Add an extra layer of security</div>
                                </div>
                            </div>
                            <ChevronRight size={16} className="text-[#333333] group-hover:text-[#606060]" />
                        </div>
                    </div>
                </section>

                {/* Billing Section */}
                <section>
                    <h2 className="text-xs font-medium text-[#606060] uppercase tracking-wider mb-3 px-1">Billing</h2>
                    <div className="bg-[#0D0D0D] border border-[#1F1F1F] rounded-xl overflow-hidden divide-y divide-[#1F1F1F]">
                        <div className="p-4 flex items-center justify-between hover:bg-[#141414] transition-colors cursor-pointer group">
                            <div className="flex items-center gap-3">
                                <CreditCard size={18} className="text-[#606060] group-hover:text-[#ECECEC] transition-colors" />
                                <div>
                                    <div className="text-sm text-[#ECECEC] font-medium">Subscription</div>
                                    <div className="text-xs text-[#606060]">Manage your Pro Plan</div>
                                </div>
                            </div>
                            <ChevronRight size={16} className="text-[#333333] group-hover:text-[#606060]" />
                        </div>
                    </div>
                </section>

                <div className="pt-8 flex justify-center">
                    <button
                        onClick={() => signOut({ redirectUrl: '/' })}
                        className="flex items-center gap-2 text-[#606060] hover:text-red-400 transition-colors text-sm font-medium px-4 py-2 hover:bg-[#1A1A1A] rounded-lg"
                    >
                        <LogOut size={16} />
                        Sign Out
                    </button>
                </div>
            </div>
        </div>
    );
}
