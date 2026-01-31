'use client';

import React from 'react';
import Link from 'next/link';
import { useClerk, useUser } from '@clerk/nextjs';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User, LayoutDashboard, LogOut } from 'lucide-react';

export default function UserMenu() {
    const { user } = useUser();
    const { signOut } = useClerk();

    if (!user) return null;

    const avatarUrl = `https://api.dicebear.com/9.x/dylan/svg?seed=${user.id}`;
    const initials = `${user.firstName?.[0] || ''}${user.lastName?.[0] || ''}`.toUpperCase();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-3 focus:outline-none group">
                    <Avatar className="w-9 h-9 border-2 border-white/10 group-hover:border-white/30 transition-colors">
                        <AvatarImage src={avatarUrl} alt={user.fullName || 'User'} />
                        <AvatarFallback className="bg-white/10 text-white text-sm">
                            {initials || 'U'}
                        </AvatarFallback>
                    </Avatar>
                </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
                align="end"
                className="w-56 bg-[#060010] border-white/10 mt-2"
            >
                <div className="px-3 py-3 border-b border-white/10">
                    <p className="text-sm font-normal text-white">
                        {user.fullName || 'User'}
                    </p>
                    <p className="text-xs text-white/40 font-light">
                        {user.primaryEmailAddress?.emailAddress}
                    </p>
                </div>

                <DropdownMenuItem asChild className="cursor-pointer">
                    <Link
                        href="/account"
                        className="flex items-center gap-3 px-3 py-2 text-white/80 hover:text-white hover:bg-white/5 focus:bg-white/5 focus:text-white"
                    >
                        <User size={16} />
                        <span className="font-light">Manage Account</span>
                    </Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild className="cursor-pointer">
                    <Link
                        href="/dashboard"
                        className="flex items-center gap-3 px-3 py-2 text-white/80 hover:text-white hover:bg-white/5 focus:bg-white/5 focus:text-white"
                    >
                        <LayoutDashboard size={16} />
                        <span className="font-light">Dashboard</span>
                    </Link>
                </DropdownMenuItem>

                <DropdownMenuSeparator className="bg-white/10" />

                <DropdownMenuItem
                    onClick={() => signOut()}
                    className="cursor-pointer flex items-center gap-3 px-3 py-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 focus:bg-red-500/10 focus:text-red-300"
                >
                    <LogOut size={16} />
                    <span className="font-light">Sign Out</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
