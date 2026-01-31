'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useUser } from '@clerk/nextjs';
import { usePathname, useRouter } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
    Plus,
    PanelLeftClose,
    PanelLeftOpen,
    MoreHorizontal,
    Settings,
    LogOut,
    MessageSquare,
    Search
} from 'lucide-react';
import { SignOutButton } from "@clerk/nextjs";

type ChatSession = {
    id: string;
    title: string;
    date: string; // 'Today', 'Yesterday', etc.
};

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { user, isLoaded } = useUser();
    const pathname = usePathname();
    const router = useRouter();
    const [sidebarOpen, setSidebarOpen] = useState(true);

    // Filter "Settings" from sidebar if needed, but here we just show standard interactions

    // Mock History Data
    const history: Record<string, ChatSession[]> = {
        'Today': [
            { id: '1', title: 'Bitcoin Trend Analysis', date: 'Today' },
            { id: '2', title: 'Mean Reversion Strategy', date: 'Today' },
        ],
        'Yesterday': [
            { id: '3', title: 'Portfolio Rebalancing', date: 'Yesterday' },
            { id: '4', title: 'Risk Management Setup', date: 'Yesterday' },
        ],
        'Previous 7 Days': [
            { id: '5', title: 'ETH vs SOL performance', date: 'Previous 7 Days' },
            { id: '6', title: 'Moving Average Crossover', date: 'Previous 7 Days' },
            { id: '7', title: 'API Integration Help', date: 'Previous 7 Days' },
        ]
    };

    if (!isLoaded) {
        return (
            <div className="min-h-screen bg-[#060010] flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-8 h-8 rounded-full border-2 border-white/20 border-t-white animate-spin"></div>
                    <div className="text-white/40 text-sm font-light tracking-wide">Initializing OpenFlux...</div>
                </div>
            </div>
        );
    }

    if (!user) return null; // Middleware handles redirect

    const avatarUrl = `https://api.dicebear.com/9.x/dylan/svg?seed=${user.id}`;
    const initials = `${user.firstName?.[0] || ''}${user.lastName?.[0] || ''}`.toUpperCase();

    // Check if we are in settings page (for highlighting)
    const isSettings = pathname?.includes('/settings');

    return (
        <div className="flex h-screen bg-[#060010] text-[#ECECEC] overflow-hidden font-sans selection:bg-[#3E3E3F] selection:text-white">
            {/* Sidebar */}
            <aside
                className={`${sidebarOpen ? 'w-[280px] translate-x-0' : 'w-0 -translate-x-full opacity-0'
                    } bg-[#0D0D0D] flex flex-col transition-all duration-300 ease-in-out absolute md:relative z-20 h-full flex-shrink-0 border-r border-[#1F1F1F]`}
            >
                {/* Sidebar Header */}
                <div className="px-4 h-14 flex items-center justify-between flex-shrink-0">
                    <button
                        onClick={() => setSidebarOpen(false)}
                        className="md:hidden text-[#909090] hover:text-[#ECECEC] transition-colors"
                    >
                        <PanelLeftClose size={20} />
                    </button>
                    {!sidebarOpen && <div className="w-6"></div>} {/* Spacer */}
                </div>

                {/* New Chat Button */}
                <div className="px-4 mb-4">
                    <Link
                        href="/dashboard"
                        className="flex items-center gap-2 bg-[#1A1A1A] hover:bg-[#252525] text-[#ECECEC] py-2.5 px-3 rounded-lg border border-[#333333] transition-all text-sm font-normal group shadow-sm"
                    >
                        <Plus size={16} className="text-[#909090] group-hover:text-[#ECECEC] transition-colors" />
                        <span className="flex-1 text-left">New Chat</span>
                    </Link>
                </div>

                {/* History List */}
                <div className="flex-1 overflow-y-auto px-2 py-2 scrollbar-thin scrollbar-thumb-[#333333] scrollbar-track-transparent">
                    <div className="px-2 pb-2 text-xs font-medium text-[#909090]/60">Recents</div>
                    {Object.entries(history).map(([period, sessions]) => (
                        <div key={period} className="mb-4">
                            {/* <h3 className="text-[10px] font-medium text-[#505050] px-3 mb-1 uppercase tracking-wider">{period}</h3> */}
                            <div className="space-y-0.5">
                                {sessions.map((session) => (
                                    <Link
                                        key={session.id}
                                        href="/dashboard"
                                        className="block w-full text-left px-3 py-2 rounded-md hover:bg-[#1A1A1A] text-sm text-[#B0B0B0] hover:text-[#ECECEC] transition-colors group truncate relative"
                                    >
                                        <span className="truncate block pr-6">{session.title}</span>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* User Profile / Bottom */}
                <div className="p-2 border-t border-[#1F1F1F] bg-[#0D0D0D]">

                    <Link
                        href="/dashboard/settings"
                        className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-colors group ${isSettings ? 'bg-[#1F1F1F]' : 'hover:bg-[#1F1F1F]'
                            }`}
                    >
                        <Avatar className="w-8 h-8 border border-[#333333]">
                            <AvatarImage src={avatarUrl} />
                            <AvatarFallback className="bg-[#2A2A2A] text-xs text-white">{initials}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0 flex flex-col items-start">
                            <p className="text-sm font-medium text-[#ECECEC] truncate w-full flex items-center gap-2">
                                {user.firstName}
                                <span className="bg-[#2A2A2A] text-[#909090] text-[9px] px-1.5 py-0.5 rounded border border-[#333333]">PRO</span>
                            </p>
                        </div>
                        <Settings size={16} className={`text-[#606060] ${isSettings ? 'text-[#ECECEC]' : 'group-hover:text-[#ECECEC]'} transition-colors`} />
                    </Link>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 relative flex flex-col h-full overflow-hidden bg-[#060010]">
                {/* Top Mobile Toggle */}
                <div className="absolute top-3 left-3 z-30 md:hidden">
                    {!sidebarOpen && (
                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="p-2 bg-[#1A1A1A] hover:bg-[#252525] rounded-md text-[#909090] hover:text-white transition-colors border border-[#333333]"
                        >
                            <PanelLeftOpen size={18} />
                        </button>
                    )}
                </div>

                {/* Sidebar Toggle for Desktop (Absolute) */}
                <div className="absolute top-1/2 left-0 -translate-y-1/2 z-30 hidden md:block">
                    {!sidebarOpen && (
                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="p-1 pr-2 bg-[#0D0D0D] border-y border-r border-[#1F1F1F] rounded-r-lg text-[#505050] hover:text-[#ECECEC] transition-colors"
                        >
                            <span className="text-xs">›</span>
                        </button>
                    )}
                    {sidebarOpen && (
                        <button
                            onClick={() => setSidebarOpen(false)}
                            className="absolute -left-3 top-1/2 -translate-y-1/2 p-1 bg-[#0D0D0D] border border-[#1F1F1F] rounded-full text-[#505050] hover:text-[#ECECEC] transition-colors z-50 opacity-0 hover:opacity-100 group-hover:opacity-100"
                            style={{ left: '-12px' }} // Positioning hack handled by parent
                        >
                        </button>
                    )}
                </div>

                {children}

            </main>
        </div>
    );
}
