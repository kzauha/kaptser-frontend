import React from 'react';

const reasons = [
  {
    title: 'The Problem',
    icon: '⚙️',
    items: [
      'Traditional backtesting requires coding expertise',
      'Weeks of setup and parameter tuning',
      'Expensive licensing for data and tools',
      'Manual strategy adjustments eat up research time'
    ]
  },
  {
    title: 'The OpenFlux Solution',
    icon: '✨',
    items: [
      'Describe strategies in plain English',
      'Instant backtest results with institutional data',
      'AI-powered risk detection & validation',
      'One-click bridge to live trading'
    ]
  },
  {
    title: 'The Proof',
    icon: '📊',
    items: [
      '10+ years of historical market data',
      'Average Sharpe Ratio improvement: 1.8x',
      'Traders save 15+ hours per strategy',
      'Already trusted by 500+ quant firms'
    ]
  }
];

export default function WhyOpenFlux() {
  return (
    <section className="px-6 py-40 max-w-7xl mx-auto">
      <div className="mb-20 text-center">
        <h2 className="text-5xl md:text-6xl font-tasa text-white mb-6 text-balance">
          Why OpenFlux changes the game
        </h2>
        <p className="text-lg text-white/50 max-w-2xl mx-auto font-light">
          We eliminated the complexity so you can focus on strategy, not infrastructure.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {reasons.map((reason, index) => (
          <div
            key={index}
            className="border border-white/10 rounded-lg bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm p-8 hover:border-white/20 transition-all group"
          >
            <div className="text-5xl mb-6 group-hover:scale-110 transition-transform">{reason.icon}</div>
            <h3 className="text-2xl font-semibold text-white mb-6">{reason.title}</h3>
            <ul className="space-y-3">
              {reason.items.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-emerald-400 font-bold mt-1">→</span>
                  <span className="text-white/70">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
