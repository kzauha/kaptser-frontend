'use client';

import React from 'react';
import { MiningResults } from '@/lib/api-types';
import {
    X,
    TrendingUp,
    Target,
    Activity,
    BarChart3,
    Scale,
    AlertTriangle,
    CheckCircle
} from 'lucide-react';
import ChartComponent from './ChartComponent';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    results: MiningResults | null;
    chartData?: any;
    title?: string;
}

export default function StrategyDetailsPanel({ isOpen, onClose, results, chartData, title }: Props) {
    if (!results) return null;

    return (
        <>
            {/* Backdrop */}
            <div
                className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={onClose}
            />

            {/* Panel */}
            <div className={`fixed inset-y-0 right-0 w-full md:w-[600px] bg-[#0C0C0C] border-l border-[#1F1F1F] z-50 transform transition-transform duration-300 ease-out flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                {/* Header */}
                <div className="h-16 px-6 border-b border-[#1F1F1F] flex items-center justify-between flex-shrink-0 bg-[#0C0C0C]">
                    <div>
                        <h2 className="text-[#ECECEC] font-medium text-lg">{title || 'Strategy Analysis'}</h2>
                        <div className="text-xs text-[#606060] flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-green-500"></span>
                            Completed Successfully
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-[#1A1A1A] rounded-lg text-[#888888] hover:text-[#ECECEC] transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6 space-y-8 scrollbar-thin scrollbar-thumb-[#262626] scrollbar-track-transparent">

                    {/* Primary Chart */}
                    <section>
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-sm font-medium text-[#888888] uppercase tracking-wider">Equity Simulation</h3>
                            <span className="text-xs bg-[#1A1A1A] px-2 py-1 rounded text-[#A0A0A0]">4h Timeframe</span>
                        </div>
                        {chartData && (
                            <div className="h-[300px]">
                                <ChartComponent
                                    data={chartData.data}
                                    type={chartData.type}
                                    height={300}
                                    colors={{
                                        backgroundColor: '#0D0D0D',
                                        lineColor: '#10B981',
                                        areaTopColor: 'rgba(16, 185, 129, 0.2)',
                                        areaBottomColor: 'rgba(16, 185, 129, 0)'
                                    }}
                                />
                            </div>
                        )}
                    </section>

                    {/* Key Metrics Grid */}
                    <section>
                        <h3 className="text-sm font-medium text-[#888888] uppercase tracking-wider mb-4">Performance Metrics</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <MetricCard
                                label="Net Profit"
                                value={`$${results.summary.net_profit.toFixed(2)}`}
                                subValue={`${((results.summary.net_profit / 10000) * 100).toFixed(2)}%`}
                                icon={TrendingUp}
                                color={results.summary.net_profit >= 0 ? 'text-green-400' : 'text-red-400'}
                            />
                            <MetricCard
                                label="Win Rate"
                                value={`${(results.summary.win_rate * 100).toFixed(1)}%`}
                                subValue={`${results.summary.total_trades} trades`}
                                icon={Target}
                                color="text-blue-400"
                            />
                            <MetricCard
                                label="Profit Factor"
                                value={results.summary.profit_factor.toFixed(2)}
                                subValue="Gross W/L"
                                icon={Scale}
                                color="text-orange-400"
                            />
                            <MetricCard
                                label="Max Drawdown"
                                value={`${(results.summary.max_drawdown * 100).toFixed(1)}%`}
                                subValue="Risk"
                                icon={AlertTriangle}
                                color="text-red-400"
                            />
                        </div>
                    </section>

                    {/* Baselines Comparison */}
                    <section className="bg-[#141414] rounded-xl p-5 border border-[#1F1F1F]">
                        <h3 className="text-sm font-medium text-[#ECECEC] mb-4 flex items-center gap-2">
                            <Activity size={16} className="text-[#888888]" />
                            Baseline Comparison
                        </h3>
                        <div className="space-y-4">
                            <ProgressBar
                                label="This Strategy"
                                value={results.baselines.strategy.avg_return}
                                max={Math.max(results.baselines.strategy.avg_return, results.baselines.market_baseline.avg_return) * 1.2}
                                color="bg-green-500"
                            />
                            <ProgressBar
                                label="Market (Buy & Hold)"
                                value={results.baselines.market_baseline.avg_return}
                                max={Math.max(results.baselines.strategy.avg_return, results.baselines.market_baseline.avg_return) * 1.2}
                                color="bg-blue-500"
                            />
                            <ProgressBar
                                label="Random Baseline"
                                value={results.baselines.random_baseline.avg_return}
                                max={Math.max(results.baselines.strategy.avg_return, results.baselines.market_baseline.avg_return) * 1.2}
                                color="bg-[#333333]"
                            />
                        </div>
                        <div className="mt-4 pt-4 border-t border-[#262626] text-xs text-[#888888] flex justify-between">
                            <span>Edge vs Random:</span>
                            <span className="text-green-400">+{(results.baselines.edge.vs_random * 100).toFixed(2)}%</span>
                        </div>
                    </section>

                    {/* Feature Importance */}
                    <section>
                        <h3 className="text-sm font-medium text-[#888888] uppercase tracking-wider mb-4">Signal Importance</h3>
                        <div className="flex flex-wrap gap-2">
                            {Object.entries(results.feature_importances)
                                .sort(([, a], [, b]) => b - a)
                                .slice(0, 6)
                                .map(([feature, importance], idx) => (
                                    <div key={idx} className="flex items-center gap-2 bg-[#1A1A1A] border border-[#262626] px-3 py-2 rounded-lg">
                                        <span className="text-xs text-[#ECECEC]">{feature}</span>
                                        <div className="h-1 w-12 bg-[#333333] rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-[#ECECEC]"
                                                style={{ width: `${Math.min(importance * 100, 100)}%` }}
                                            />
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </section>

                    {/* Rules List */}
                    <section>
                        <h3 className="text-sm font-medium text-[#888888] uppercase tracking-wider mb-4">Discovery Logic</h3>
                        <div className="space-y-3">
                            {results.rules.map((rule, idx) => (
                                <div key={idx} className="bg-[#141414] border border-[#1F1F1F] p-4 rounded-xl">
                                    <div className="flex gap-3 mb-2">
                                        <div className="mt-0.5"><CheckCircle size={14} className="text-green-500" /></div>
                                        <code className="text-xs text-green-400 font-mono bg-green-500/10 px-1 py-0.5 rounded break-all">
                                            {rule.condition_human}
                                        </code>
                                    </div>
                                    <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-[#262626]">
                                        <div className="text-center">
                                            <div className="text-[10px] text-[#606060] uppercase">Precision</div>
                                            <div className="text-sm text-[#ECECEC] font-mono">{(rule.metrics.test_precision * 100).toFixed(1)}%</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-[10px] text-[#606060] uppercase">Recall</div>
                                            <div className="text-sm text-[#ECECEC] font-mono">{(rule.metrics.train_recall * 100).toFixed(1)}%</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-[10px] text-[#606060] uppercase">Support</div>
                                            <div className="text-sm text-[#ECECEC] font-mono">{rule.metrics.test_support}</div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                </div>
            </div>
        </>
    );
}

const MetricCard = ({ label, value, subValue, icon: Icon, color }: any) => (
    <div className="bg-[#141414] border border-[#1F1F1F] p-4 rounded-xl flex flex-col justify-between h-28 hover:border-[#333333] transition-colors group">
        <div className="flex justify-between items-start">
            <span className="text-[11px] text-[#606060] font-medium uppercase tracking-wide group-hover:text-[#888888] transition-colors">{label}</span>
            <Icon size={14} className="text-[#333333] group-hover:text-[#ECECEC] transition-colors" />
        </div>
        <div>
            <div className={`text-xl font-medium ${color} tracking-tight`}>{value}</div>
            <div className="text-[10px] text-[#505050] mt-1">{subValue}</div>
        </div>
    </div>
);

const ProgressBar = ({ label, value, max, color }: any) => (
    <div>
        <div className="flex justify-between text-xs mb-1.5">
            <span className="text-[#A0A0A0]">{label}</span>
            <span className="text-[#ECECEC] font-mono">{value.toFixed(2)}%</span>
        </div>
        <div className="h-1.5 w-full bg-[#0D0D0D] rounded-full overflow-hidden">
            <div
                className={`h-full ${color} transition-all duration-500`}
                style={{ width: `${Math.max((value / max) * 100, 5)}%` }} // Min width for visibility
            />
        </div>
    </div>
);
