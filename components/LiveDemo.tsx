'use client';

import React, { useState, useEffect } from 'react';

const messages = [
  {
    type: 'user',
    content: 'Create a strategy that buys when BTC crosses above a 20-day moving average'
  },
  {
    type: 'ai',
    content: 'Strategy created: MA Crossover. Analyzing backtest results...'
  },
  {
    type: 'ai',
    content: 'Performance: +47.3% annual return | Sharpe Ratio: 1.82 | Max Drawdown: -12.5%'
  },
  {
    type: 'user',
    content: 'What if I add a stop loss at 5% below entry?'
  },
  {
    type: 'ai',
    content: 'Updated strategy with risk management. New results: +38.9% annual return | Sharpe: 2.14 | Drawdown: -8.3%'
  }
];

export default function LiveDemo() {
  const [displayedMessages, setDisplayedMessages] = useState<number>(0);

  useEffect(() => {
    if (displayedMessages < messages.length) {
      const timer = setTimeout(() => {
        setDisplayedMessages(prev => prev + 1);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [displayedMessages]);

  return (
    <section className="px-6 py-40 max-w-7xl mx-auto relative">
      <div className="mb-20 text-center">
        <div className="inline-block mb-4 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20">
          <span className="text-emerald-400 text-sm font-semibold">Real-Time Showcase</span>
        </div>
        <h2 className="text-5xl md:text-6xl font-tasa text-white mb-6 text-balance">
          Natural language meets institutional-grade backtesting
        </h2>
        <p className="text-lg text-white/50 max-w-2xl mx-auto font-light">
          Describe your trading strategy in plain English. OpenFlux handles the complex logic and delivers results instantly.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Chat Interface */}
        <div className="border border-white/10 rounded-lg bg-[#0a0015]/50 backdrop-blur-sm overflow-hidden">
          <div className="h-96 overflow-y-auto flex flex-col gap-4 p-6 scrollbar-none">
            {displayedMessages > 0 && (
              <div className="flex justify-end">
                <div className="bg-emerald-500/20 border border-emerald-500/30 rounded-lg px-4 py-3 max-w-xs">
                  <p className="text-white text-sm">{messages[0].content}</p>
                </div>
              </div>
            )}
            
            {displayedMessages > 1 && (
              <div className="flex justify-start">
                <div className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 max-w-xs">
                  <p className="text-white/70 text-sm">{messages[1].content}</p>
                </div>
              </div>
            )}

            {displayedMessages > 2 && (
              <div className="flex justify-start">
                <div className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 max-w-xs">
                  <div className="space-y-2">
                    <p className="text-emerald-400 text-sm font-semibold">Performance Metrics</p>
                    <div className="grid grid-cols-3 gap-2 text-xs text-white/70">
                      <div>
                        <p className="text-emerald-400 font-bold">+47.3%</p>
                        <p>Annual Return</p>
                      </div>
                      <div>
                        <p className="text-emerald-400 font-bold">1.82</p>
                        <p>Sharpe Ratio</p>
                      </div>
                      <div>
                        <p className="text-red-400 font-bold">-12.5%</p>
                        <p>Max Drawdown</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {displayedMessages > 3 && (
              <div className="flex justify-end">
                <div className="bg-emerald-500/20 border border-emerald-500/30 rounded-lg px-4 py-3 max-w-xs">
                  <p className="text-white text-sm">{messages[3].content}</p>
                </div>
              </div>
            )}

            {displayedMessages > 4 && (
              <div className="flex justify-start">
                <div className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 max-w-xs">
                  <div className="space-y-2">
                    <p className="text-emerald-400 text-sm font-semibold">Updated Strategy</p>
                    <div className="grid grid-cols-3 gap-2 text-xs text-white/70">
                      <div>
                        <p className="text-emerald-400 font-bold">+38.9%</p>
                        <p>Annual Return</p>
                      </div>
                      <div>
                        <p className="text-emerald-400 font-bold">2.14</p>
                        <p>Sharpe Ratio</p>
                      </div>
                      <div>
                        <p className="text-red-400 font-bold">-8.3%</p>
                        <p>Max Drawdown</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="flex-1" />
            
            {displayedMessages >= messages.length && (
              <div className="flex items-center gap-2 text-emerald-400 text-sm">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                Ready for new strategy
              </div>
            )}
          </div>

          <div className="border-t border-white/10 p-4 bg-[#060010]">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Describe your strategy..."
                className="flex-1 bg-white/5 border border-white/10 rounded px-4 py-2 text-white placeholder-white/30 focus:outline-none focus:border-emerald-500/50"
              />
              <button className="bg-emerald-500/20 border border-emerald-500/30 hover:bg-emerald-500/30 text-white px-4 py-2 rounded transition-colors">
                →
              </button>
            </div>
          </div>
        </div>

        {/* Performance Chart Visualization */}
        <div className="flex flex-col gap-4">
          <div className="border border-white/10 rounded-lg bg-[#0a0015]/50 backdrop-blur-sm p-8 flex-1">
            <h3 className="text-white font-semibold mb-6">Strategy Performance</h3>
            
            <div className="space-y-4 mb-8">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-white/60 text-sm">Win Rate</span>
                  <span className="text-emerald-400 font-semibold">64.2%</span>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full" style={{ width: '64.2%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-white/60 text-sm">Profit Factor</span>
                  <span className="text-emerald-400 font-semibold">2.31</span>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full" style={{ width: '75%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-white/60 text-sm">Recovery Factor</span>
                  <span className="text-emerald-400 font-semibold">3.78</span>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full" style={{ width: '90%' }} />
                </div>
              </div>
            </div>

            <div className="border-t border-white/10 pt-6">
              <p className="text-white/40 text-xs uppercase tracking-widest font-semibold mb-4">Equity Curve (Last 12M)</p>
              <div className="h-32 flex items-end gap-1 bg-white/[0.02] rounded p-4">
                {[35, 40, 38, 52, 48, 65, 72, 78, 81, 85, 88, 92].map((height, i) => (
                  <div
                    key={i}
                    className="flex-1 bg-gradient-to-t from-emerald-500/60 to-emerald-400/40 rounded-t transition-all hover:from-emerald-500/80 hover:to-emerald-400/60"
                    style={{ height: `${height}%` }}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="border border-white/10 rounded-lg bg-[#0a0015]/50 backdrop-blur-sm p-8">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-emerald-500" />
                <span className="text-white/70">AI detects overfitting: No</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-emerald-500" />
                <span className="text-white/70">Risk level: Moderate</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-emerald-500" />
                <span className="text-white/70">Live trading ready</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
