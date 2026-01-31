'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useUser } from '@clerk/nextjs';
import {
    Paperclip,
    ArrowUp,
    CheckCircle2,
    Loader2,
    BarChart2,
    ArrowRight
} from 'lucide-react';
import ChartComponent from '@/components/ChartComponent';
import { mockApi } from '@/lib/mock-api';
import { ChatResponse, Candle, MiningResults } from '@/lib/api-types';
import StrategyDetailsPanel from '@/components/StrategyDetailsPanel';

// Extend our internal Message type to store rich API data
type ChartData = {
    type: 'Area' | 'Bar' | 'Candlestick' | 'Baseline' | 'Line';
    data: any[];
    title?: string;
};

type PipelineProgress = {
    step: string;
    status: 'RUNNING' | 'COMPLETED' | 'FAILED';
    progress: number;
};


type Message = {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
    chart?: ChartData;
    progress?: PipelineProgress;
    results?: MiningResults;
    strategyId?: number;
};

export default function DashboardPage() {
    const { user } = useUser();
    const [inputValue, setInputValue] = useState('');
    const [messages, setMessages] = useState<Message[]>([]);
    const [isTyping, setIsTyping] = useState(false);
    const [greeting, setGreeting] = useState('');

    // Panel State
    const [selectedStrategy, setSelectedStrategy] = useState<{ results: MiningResults, chart: ChartData } | null>(null);
    const [isPanelOpen, setIsPanelOpen] = useState(false);

    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Auto-focus on mount
    useEffect(() => {
        textareaRef.current?.focus();
    }, []);

    // Greeting Logic
    useEffect(() => {
        const hour = new Date().getHours();
        if (hour < 12) setGreeting('Good morning');
        else if (hour < 18) setGreeting('Good afternoon');
        else setGreeting('Good evening');
    }, []);

    // Auto-resize textarea
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto'; // Reset height
            const nextHeight = Math.min(textareaRef.current.scrollHeight, 200);
            textareaRef.current.style.height = `${nextHeight}px`;
        }
    }, [inputValue]);

    // Scroll to bottom
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isTyping]);

    const handleSendMessage = async (text: string = inputValue) => {
        if (!text.trim()) return;

        const newUserMsg: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: text,
            timestamp: new Date()
        };

        setMessages(prev => [...prev, newUserMsg]);
        setInputValue('');
        setIsTyping(true);

        // Reset height and focus
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.focus();
        }

        try {
            // Call Mock API
            const response = await mockApi.chat('123', text);

            // Initial Ack Message
            const newAiMsg: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: response.message,
                timestamp: new Date()
            };

            setMessages(prev => [...prev, newAiMsg]);
            setIsTyping(false);

            // Handle Strategy Execution
            if (response.action === 'RUN_STRATEGY' && response.strategy_id) {
                await simulatePipelineExection(response.strategy_id);
            }

        } catch (error) {
            console.error("API Error", error);
            setIsTyping(false);
        }
    };

    const simulatePipelineExection = async (strategyId: number) => {
        setIsTyping(true);

        // 1. Simulate Progress Updates
        const steps = [
            "Fetching OHLCV Data...",
            "Calculating Features...",
            "Running ZigZag...",
            "Training Model...",
            "Backtesting..."
        ];

        for (let i = 0; i < steps.length; i++) {
            await new Promise(r => setTimeout(r, 800)); // Simulate work
        }

        // 2. Fetch Final Results
        const results = await mockApi.getResults(strategyId);
        const candles = await mockApi.getCandles(strategyId);

        // 3. Construct Result Message
        const resultMsg: Message = {
            id: Date.now().toString(),
            role: 'assistant',
            content: "**Mining Completed Successfully**",
            timestamp: new Date(),
            strategyId: strategyId,
            chart: {
                type: 'Area', // Use Area for the mini card chart
                data: candles.candles,
                title: 'Equity Simulation'
            },
            results: results // Pass full results
        };

        setMessages(prev => [...prev, resultMsg]);
        setIsTyping(false);
    };

    const handleOpenDetails = (msg: Message) => {
        if (msg.results && msg.chart) {
            setSelectedStrategy({
                results: msg.results,
                chart: msg.chart
            });
            setIsPanelOpen(true);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    if (!user) return null;

    /* Suggestion Cards */
    const Suggestions = () => (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full max-w-2xl px-4 mt-12">
            {[
                { title: 'Mine Strategy', desc: 'Mine BTC/USDT strategy' },
                { title: 'Status Check', desc: 'Check pipeline status' },
                { title: 'Risk Analysis', desc: 'Evaluate portfolio volatility' },
                { title: 'Explain Concept', desc: 'How does gamma scalping work?' },
            ].map((item, idx) => (
                <button
                    key={idx}
                    onClick={() => handleSendMessage(item.desc)}
                    className="group p-4 bg-[#141414] hover:bg-[#1A1A1A] border border-[#262626] hover:border-[#333333] rounded-xl text-left transition-all duration-200 active:scale-[0.98]"
                >
                    <div className="font-medium text-[#ECECEC] text-sm mb-1 group-hover:text-white">{item.title}</div>
                    <div className="text-xs text-[#888888] group-hover:text-[#A0A0A0]">{item.desc}</div>
                </button>
            ))}
        </div>
    );

    return (
        <div className="flex flex-col h-full w-full max-w-4xl mx-auto relative">
            {/* Header (Minimal) */}
            <div className="absolute top-0 right-0 p-4 z-10">
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto w-full px-4 scrollbar-thin scrollbar-thumb-[#262626] scrollbar-track-transparent">
                <div className="min-h-full flex flex-col pb-6">
                    {messages.length === 0 ? (
                        <div className="flex-1 flex flex-col items-center justify-center -mt-20">
                            <h2 className="text-2xl font-medium text-[#ECECEC] mb-2 font-tasa animate-in fade-in slide-in-from-bottom-4 duration-700">
                                {greeting || 'Hello'}, {user.firstName}
                            </h2>
                            <p className="text-[#888888] text-center max-w-md mb-8 animate-in fade-in slide-in-from-bottom-5 duration-700 delay-100">
                                Ready to mine new strategies?
                            </p>
                            <div className="animate-in fade-in slide-in-from-bottom-6 duration-700 delay-200 w-full flex justify-center">
                                <Suggestions />
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-6 py-6 pt-12">
                            {messages.map((msg) => (
                                <div key={msg.id} className={`flex gap-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start max-w-3xl w-full'} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
                                    {msg.role === 'assistant' && (
                                        <div className="w-8 h-8 rounded-lg flex-shrink-0 mt-0.5 border border-[#333333]/0 flex items-center justify-center overflow-hidden">
                                            <Image src="/fav.png" alt="AI" width={32} height={32} className="w-6 h-6 object-contain brightness-150 opacity-90" />
                                        </div>
                                    )}

                                    <div className={`flex flex-col gap-3 relative max-w-[95%] md:max-w-[85%] ${msg.role === 'user' ? 'items-end' : 'items-start w-full'}`}>

                                        {/* Standard Text Message */}
                                        {!msg.results && (
                                            <div className={`px-4 py-2.5 rounded-2xl text-[15px] leading-7 whitespace-pre-wrap ${msg.role === 'user'
                                                    ? 'bg-[#2A2A2A] text-[#ECECEC]'
                                                    : 'text-[#D1D1D1] w-full'
                                                }`}>
                                                {/* Render Markdown-like content (basic) */}
                                                {msg.content.split('\n').map((line, i) => (
                                                    <div key={i} className={line.startsWith('-') ? 'ml-4' : ''}>
                                                        {line.replace(/\*\*(.*?)\*\*/g, (_, p1) => p1)}
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                        {/* Result Card (Rich UI) */}
                                        {msg.results && (
                                            <div className="w-full bg-[#141414] border border-[#262626] rounded-2xl overflow-hidden shadow-lg animate-in fade-in zoom-in-95 duration-500 hover:border-[#333333] transition-colors">
                                                {/* Card Header */}
                                                <div className="px-5 py-4 border-b border-[#262626] flex justify-between items-center bg-[#1A1A1A]/50">
                                                    <div>
                                                        <div className="flex items-center gap-2">
                                                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                                                            <h3 className="text-[#ECECEC] font-medium text-sm">Strategy #mock-{msg.strategyId}</h3>
                                                        </div>
                                                        <p className="text-xs text-[#888888]">BTC/USDT • 4h Timeframe</p>
                                                    </div>
                                                    <div className="px-2 py-1 bg-green-500/10 text-green-400 text-[10px] font-medium rounded uppercase tracking-wide border border-green-500/20">
                                                        Deployable
                                                    </div>
                                                </div>

                                                {/* Card Metrics */}
                                                <div className="p-5 grid grid-cols-2 gap-4">
                                                    <div>
                                                        <p className="text-[11px] text-[#606060] uppercase tracking-wide font-medium mb-1">Net Profit</p>
                                                        <p className={`text-xl font-medium ${msg.results.summary.net_profit >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                                                            ${msg.results.summary.net_profit.toFixed(2)}
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <p className="text-[11px] text-[#606060] uppercase tracking-wide font-medium mb-1">Win Rate</p>
                                                        <p className="text-xl font-medium text-blue-400">
                                                            {(msg.results.summary.win_rate * 100).toFixed(1)}%
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <p className="text-[11px] text-[#606060] uppercase tracking-wide font-medium mb-1">Trades</p>
                                                        <p className="text-lg text-[#ECECEC]">
                                                            {msg.results.summary.total_trades}
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <p className="text-[11px] text-[#606060] uppercase tracking-wide font-medium mb-1">Profit Factor</p>
                                                        <p className="text-lg text-[#ECECEC]">
                                                            {msg.results.summary.profit_factor.toFixed(2)}
                                                        </p>
                                                    </div>
                                                </div>

                                                {/* Card Action */}
                                                <div className="px-5 pb-5">
                                                    <button
                                                        onClick={() => handleOpenDetails(msg)}
                                                        className="w-full py-2.5 bg-[#262626] hover:bg-[#333333] text-[#ECECEC] text-sm font-medium rounded-lg transition-colors flex items-center justify-center gap-2 group"
                                                    >
                                                        <BarChart2 size={16} className="text-[#888888] group-hover:text-[#ECECEC]" />
                                                        View Full Analysis
                                                        <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                            {isTyping && (
                                <div className="flex gap-4 max-w-3xl animate-in fade-in">
                                    <div className="w-8 h-8 rounded-lg flex-shrink-0 mt-0.5 flex items-center justify-center">
                                        <Image src="/fav.png" alt="AI" width={32} height={32} className="w-6 h-6 object-contain brightness-150 opacity-80" />
                                    </div>
                                    <div className="flex items-center gap-1.5 h-7">
                                        <div className="w-1.5 h-1.5 bg-[#888888] rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                                        <div className="w-1.5 h-1.5 bg-[#888888] rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                                        <div className="w-1.5 h-1.5 bg-[#888888] rounded-full animate-bounce"></div>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} className="h-4" />
                        </div>
                    )}
                </div>
            </div>

            {/* Input Area */}
            <div className="w-full p-4 md:px-0 md:pb-6 relative z-10 flex-shrink-0">
                <div className="max-w-3xl mx-auto bg-[#141414] border border-[#262626] rounded-2xl shadow-lg relative focus-within:ring-1 focus-within:ring-[#404040] transition-all duration-200">
                    <textarea
                        ref={textareaRef}
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Talk to OpenFlux..."
                        className="w-full bg-transparent text-[#ECECEC] placeholder:text-[#606060] rounded-2xl px-4 py-3.5 pr-24 focus:outline-none resize-none overflow-hidden min-h-[52px] max-h-[200px] leading-relaxed"
                        style={{ height: '52px' }}
                        autoFocus
                    />

                    <div className="absolute right-2 bottom-2 flex items-center gap-1">
                        <button
                            onClick={() => handleSendMessage()}
                            disabled={!inputValue.trim()}
                            className={`p-2 rounded-lg transition-all duration-200 ${inputValue.trim()
                                    ? 'bg-[#ECECEC] text-[#060010] hover:bg-white'
                                    : 'bg-[#262626] text-[#606060] cursor-not-allowed'
                                }`}
                        >
                            <ArrowUp size={18} />
                        </button>
                    </div>
                </div>
                <div className="text-center mt-3">
                    <p className="text-[10px] text-[#404040]">OpenFlux can make mistakes. Please verify execution logic.</p>
                </div>
            </div>

            {/* Slide-over Details Panel */}
            <StrategyDetailsPanel
                isOpen={isPanelOpen}
                onClose={() => setIsPanelOpen(false)}
                results={selectedStrategy?.results || null}
                chartData={selectedStrategy?.chart}
                title="Deep Dive Analysis"
            />
        </div>
    );
}
