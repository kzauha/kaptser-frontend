import React from 'react';

const testimonials = [
  {
    quote: 'We went from 6-month backtesting cycles to 6-minute iterations. OpenFlux turned our bottleneck into our competitive advantage.',
    author: 'Alex Chen',
    title: 'CTO, Quantum Trading Partners',
    metric: '+340% annual returns'
  },
  {
    quote: 'Finally, a tool that speaks our language. We described our thesis in plain English and OpenFlux handled all the complexity.',
    author: 'Sarah Mitchell',
    title: 'Head of Research, Nexus Capital',
    metric: 'Sharpe 2.4'
  },
  {
    quote: 'The Risk Guard AI flagged overfitting patterns we would have missed. It literally saved us from deploying a broken strategy.',
    author: 'James Rodriguez',
    title: 'Head of Quant, Flux Advisors',
    metric: '-8.3% max drawdown'
  }
];

export default function Testimonials() {
  return (
    <section className="px-6 py-40 max-w-7xl mx-auto relative overflow-hidden">
      <div className="mb-20 text-center">
        <div className="inline-block mb-4 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20">
          <span className="text-emerald-400 text-sm font-semibold">Trusted by Leading Traders</span>
        </div>
        <h2 className="text-5xl md:text-6xl font-tasa text-white mb-6 text-balance">
          What traders are saying
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="group border border-white/10 rounded-lg bg-gradient-to-br from-white/5 via-white/[0.02] to-transparent backdrop-blur-sm p-8 hover:border-emerald-500/30 transition-all hover:bg-gradient-to-br hover:from-emerald-500/5 hover:via-white/[0.02]"
          >
            {/* Decorative quotes */}
            <div className="text-4xl text-emerald-500/20 font-serif mb-4">"</div>
            
            <p className="text-white/80 mb-8 leading-relaxed text-lg">
              {testimonial.quote}
            </p>

            {/* Author info */}
            <div className="border-t border-white/10 pt-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-white font-bold">
                  {testimonial.author.charAt(0)}
                </div>
                <div>
                  <p className="text-white font-semibold">{testimonial.author}</p>
                  <p className="text-white/50 text-sm">{testimonial.title}</p>
                </div>
              </div>

              <div className="inline-block px-3 py-1 rounded bg-emerald-500/10 border border-emerald-500/20">
                <p className="text-emerald-400 text-sm font-semibold">{testimonial.metric}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CTA Section */}
      <div className="mt-20 text-center">
        <p className="text-white/60 mb-6">Join 500+ quantitative firms already using OpenFlux</p>
        <button className="px-8 py-4 bg-emerald-500 text-white rounded-full font-semibold hover:bg-emerald-600 transition-all hover:scale-105 shadow-lg hover:shadow-xl">
          Start Your Free Trial
        </button>
      </div>
    </section>
  );
}
