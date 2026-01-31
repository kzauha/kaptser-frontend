'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useUser } from '@clerk/nextjs';
import {
    Send,
    LogOut,
    PanelLeftOpen,
    Paperclip,
    Mic,
    Sparkles,
    ArrowUp
} from 'lucide-react';
import { SignInButton } from '@clerk/nextjs';
import ChartComponent from '@/components/ChartComponent';

// Types for our chat interface
type ChartData = {
    type: 'Area' | 'Bar' | 'Candlestick' | 'Baseline' | 'Line';
    data: any[];
    title?: string;
};

type Message = {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
    isThinking?: boolean;
    chart?: ChartData;
};

// Helper to generate mock chart data
const generateMockData = (type: string, count = 100) => {
    let data = [];
    let time = new Date('2023-01-01').getTime() / 1000;
    let value = 50;

    for (let i = 0; i < count; i++) {
        time += 86400; // 1 day
        const change = (Math.random() - 0.5) * 2;
        value += change;

        if (type === 'Candlestick' || type === 'Bar') {
            const open = value + Math.random() * 0.5;
            const close = value - Math.random() * 0.5;
            const high = Math.max(open, close) + Math.random();
            const low = Math.min(open, close) - Math.random();
            data.push({ time: time as any, open, high, low, close });
        } else {
            data.push({ time: time as any, value });
        }
    }
    return data;
};

export default function DashboardPage() {
    const { user } = useUser();
    const [inputValue, setInputValue] = useState('');
    const [messages, setMessages] = useState<Message[]>([]);
    const [isTyping, setIsTyping] = useState(false);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Auto-focus on mount
    useEffect(() => {
        textareaRef.current?.focus();
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

    const handleSendMessage = (text: string = inputValue) => {
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

        // Determine if we should show a chart based on keywords
        const lowerText = text.toLowerCase();
        const showChart = lowerText.includes('chart') || lowerText.includes('price') || lowerText.includes('btc') || lowerText.includes('eth') || lowerText.includes('analysis');

        let chartType: ChartData['type'] = 'Area';
        if (lowerText.includes('candle')) chartType = 'Candlestick';
        else if (lowerText.includes('bar')) chartType = 'Bar';
        else if (lowerText.includes('line')) chartType = 'Line';

        // Simulate AI response
        setTimeout(() => {
            let content = "I've analyzed the market data for you.";
            let chart: ChartData | undefined;

            if (showChart) {
                chart = {
                    type: chartType,
                    data: generateMockData(chartType),
                    title: 'BTC/USD Market Analysis' // Mock title
                };
                content = `Here is the ${chartType.toLowerCase()} chart based on the recent price action.`;
            } else {
                content = "I'm analyzing the market parameters based on your request. This is a simulated response designed to demonstrate the UI capabilities.";
            }

            const newAiMsg: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content,
                timestamp: new Date(),
                chart
            };
            setMessages(prev => [...prev, newAiMsg]);
            setIsTyping(false);
        }, 1500);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    if (!user) return null; // Logic handled in layout/middleware

    /* Suggestion Cards */
    const Suggestions = () => (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full max-w-2xl px-4 mt-12">
            {[
                { title: 'Market Sentiment', desc: 'Scan recent news for BTC' },
                { title: 'Backtest Strategy', desc: 'RSI divergence on ETH 4h' },
                { title: 'Risk Analysis', desc: 'Evaluate portfolio volatility' },
                { title: 'Explain Concept (Candle)', desc: 'Show me a candlestick chart' },
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
        <div className="flex flex-col h-full w-full max-w-4xl mx-auto">
            {/* Header (Minimal) */}
            <div className="absolute top-0 right-0 p-4 z-10">
                {/* Could put model selector here like Claude */}
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto w-full px-4 scrollbar-thin scrollbar-thumb-[#262626] scrollbar-track-transparent">
                <div className="min-h-full flex flex-col pb-6">
                    {messages.length === 0 ? (
                        <div className="flex-1 flex flex-col items-center justify-center -mt-20">
                            {/* Logo removed as requested to reduce "slop" */}
                            <h2 className="text-2xl font-medium text-[#ECECEC] mb-2 font-tasa animate-in fade-in slide-in-from-bottom-4 duration-700">
                                Good evening, {user.firstName}
                            </h2>
                            <p className="text-[#888888] text-center max-w-md mb-8 animate-in fade-in slide-in-from-bottom-5 duration-700 delay-100">
                                Where should we start?
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
                                        <div className="w-7 h-7 rounded-sm flex-shrink-0 mt-0.5 border border-[#333333]/0 flex items-center justify-center">
                                            <Image src="/flux.svg" alt="AI" width={16} height={16} className="w-4 h-4 brightness-150 opacity-80" />
                                        </div>
                                    )}

                                    <div className={`flex flex-col gap-3 relative max-w-[90%] md:max-w-[85%] ${msg.role === 'user' ? 'items-end' : 'items-start w-full'}`}>
                                        <div className={`px-4 py-2.5 rounded-2xl text-[15px] leading-7 whitespace-pre-wrap ${msg.role === 'user'
                                                ? 'bg-[#2A2A2A] text-[#ECECEC]'
                                                : 'text-[#D1D1D1] w-full'
                                            }`}>
                                            {msg.content}
                                        </div>
                                        {msg.chart && (
                                            <div className="w-full mt-2 animate-in fade-in zoom-in-95 duration-500">
                                                <div className="mb-2 text-xs text-[#888888] uppercase tracking-wider font-medium ml-1">
                                                    {msg.chart.title || 'Chart Analysis'}
                                                </div>
                                                <ChartComponent
                                                    data={msg.chart.data}
                                                    type={msg.chart.type}
                                                    height={320}
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                            {isTyping && (
                                <div className="flex gap-4 max-w-3xl animate-in fade-in">
                                    <div className="w-7 h-7 rounded-sm flex-shrink-0 mt-0.5 flex items-center justify-center">
                                        <Image src="/flux.svg" alt="AI" width={16} height={16} className="w-4 h-4 brightness-150 opacity-80" />
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

            {/* Input Area (Claude Style) */}
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
                        <button className="p-2 text-[#888888] hover:text-[#ECECEC] hover:bg-[#262626] rounded-lg transition-colors" title="Attach file">
                            <Paperclip size={18} />
                        </button>
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
        </div>
    );
}
