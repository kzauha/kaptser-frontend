"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  SiBinance, SiCoinbase, SiOkx, SiBitcoin, SiEthereum,
  SiSolana, SiTether, SiCardano, SiDogecoin
} from 'react-icons/si';

import ColorBends from "@/components/ColorBends";
import LogoLoop from "@/components/LogoLoop";
import MagicBento from "@/components/MagicBento";
import ScrambledText from "@/components/ScrambledText";

const exchangeLogos = [
  { node: <SiBinance size={60} />, title: "Binance" },
  { node: <SiCoinbase size={60} />, title: "Coinbase" },
  { node: <SiOkx size={60} />, title: "OKX" },
  { node: <SiBitcoin size={60} />, title: "Bitcoin" },
  { node: <SiEthereum size={60} />, title: "Ethereum" },
  { node: <SiSolana size={60} />, title: "Solana" },
  { node: <SiTether size={60} />, title: "Tether" },
  { node: <SiCardano size={60} />, title: "Cardano" },
  { node: <SiDogecoin size={60} />, title: "Dogecoin" },
];

const bentoFeatures = [
  {
    color: '#060010',
    title: 'Zero-Syntax Strategy Builder',
    description: 'If you can describe it in a chat, you can backtest it. Openflux handles the complex logic under the hood.',
    label: 'Natural Language'
  },
  {
    color: '#060010',
    title: 'Institutional-Grade Data',
    description: 'Access 10+ years of L2 order book data and historical candles for every major pair.',
    label: 'Data'
  },
  {
    color: '#060010',
    title: 'Risk Guard AI',
    description: 'Automatically identifies "Strategy Overfitting" and warns you if your results are too good to be true.',
    label: 'AI Safety'
  },
  {
    color: '#060010',
    title: 'Liquid Execution',
    description: 'Seamlessly bridge from backtest to live trading via secure API integrations with Binance, Bybit, and Kraken.',
    label: 'Live'
  }
];

export default function OpenFluxLanding() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#060010] font-sans overflow-x-hidden selection:bg-white/10 text-white">
      {/* 1. Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-[100] border-b border-white/5 bg-[#060010]/50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Image src="/flux.svg" alt="OpenFlux" width={100} height={35} className="h-7 w-auto brightness-200" />
          </div>

          <div className="flex items-center gap-8">
            <button className="text-xs font-normal text-white/40 hover:text-white transition-colors">
              Login
            </button>
            <button className="px-6 py-2 bg-white text-[#060010] text-xs font-normal rounded-full hover:bg-white/90 transition-all">
              Start Free
            </button>
          </div>
        </div>
      </nav>

      <main className="relative pt-48">
        <section className="px-6 max-w-5xl mx-auto flex flex-col items-center text-center relative mb-40">
          <div style={{  position: 'absolute', zIndex: 0 }}>
            <ColorBends
              rotation={0}
              speed={0.2}
              colors={["#ff0a0a","#00ff04","#2b00ff"]}
              transparent
              autoRotate={0}
              scale={1}
              frequency={1}
              warpStrength={1}
              mouseInfluence={1}
              parallax={0.5}
              noise={0.1}
            />
        </div>
          <h1 className="font-tasa font-normal text-4xl md:text-6xl lg:text-7xl mb-8 tracking-tight leading-[1.1] text-white max-w-4xl">
            Quantitative trading, <br />
            <span className="text-white/40">Simplified for humans.</span>
          </h1>

          <p className="text-sm md:text-base text-white/30 max-w-xl mb-12 font-light leading-relaxed">
            The world’s first natural language backtesting engine for crypto. <br />
            No math, no code—just the flow of logic
          </p>

          <div className="flex items-center gap-4">
            <button className="px-10 py-4 bg-white text-[#060010] rounded-full font-normal text-sm hover:scale-[1.02] transition-transform">
              Get Started
            </button>
            <button className="px-10 py-4 border border-white/5 rounded-full font-normal text-sm hover:bg-white/5 transition-colors">
              Documentation
            </button>
          </div>
        </section>

        {/* 3. Logo Loop (Crypto Exchanges) */}
        <section className="py-20 relative border-y border-white/5">
          <div className="max-w-7xl mx-auto">
            <LogoLoop
              logos={exchangeLogos}
              speed={30}
              direction="left"
              logoHeight={28}
              gap={100}
              pauseOnHover={true}
              fadeOut={true}
              fadeOutColor="#060010"
              className="opacity-20 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-700"
            />
          </div>
        </section>

        {/* Headline Section: Instinct to Infrastructure */}
        <section className="px-6 py-1 max-w-7xl mx-auto">
          <div className="flex flex-col items-center text-center">
            <ScrambledText
              className="font-tasa text-4xl md:text-6xl text-white"
              duration={1.2}
              speed={0.5}
              scrambleChars=".:/\"
            >
              From Instinct to Infrastructure.
            </ScrambledText>
          </div>
        </section>


        {/* 3. Key Features (MagicBento) */}
        <section className="px-6 py-40 max-w-7xl mx-auto">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-tasa text-white/50 uppercase tracking-[0.2em] mb-4">Core Engine</h2>
            <h3 className="text-5xl font-tasa text-white">Institutional capabilities.</h3>
          </div>
          <MagicBento
            cardData={bentoFeatures}
            textAutoHide={false}
            enableStars
            enableSpotlight
            enableBorderGlow={true}
            enableTilt={true}
            enableMagnetism={true}
            clickEffect
            spotlightRadius={400}
            particleCount={20}
            glowColor="255, 255, 255"
          />
        </section>

        {/* Pricing Section */}
        <section className="px-6 py-40 max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-tasa text-white mb-4">Transparent Pricing.</h2>
            <p className="text-white/40 font-light">Built for traders, by traders.</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="py-6 px-4 text-white/40 font-normal uppercase text-xs tracking-widest">Feature</th>
                  <th className="py-6 px-4 text-white font-normal uppercase text-xs tracking-widest">Free</th>
                  <th className="py-6 px-4 text-white font-normal uppercase text-xs tracking-widest">Pro</th>
                  <th className="py-6 px-4 text-white font-normal uppercase text-xs tracking-widest">Pro+</th>
                </tr>
              </thead>
              <tbody className="text-sm font-light text-white/60">
                <tr className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                  <td className="py-6 px-4 text-white">Backtests</td>
                  <td className="py-6 px-4">3 per month</td>
                  <td className="py-6 px-4">Unlimited</td>
                  <td className="py-6 px-4">Unlimited</td>
                </tr>
                <tr className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                  <td className="py-6 px-4 text-white">Historical Depth</td>
                  <td className="py-6 px-4">1 Year</td>
                  <td className="py-6 px-4">5 Years</td>
                  <td className="py-6 px-4">Full History</td>
                </tr>
                <tr className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                  <td className="py-6 px-4 text-white">Strategy Doctor</td>
                  <td className="py-6 px-4">Basic</td>
                  <td className="py-6 px-4">Advanced</td>
                  <td className="py-6 px-4">Real-time suggestions</td>
                </tr>
                <tr className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                  <td className="py-6 px-4 text-white">Alerts</td>
                  <td className="py-6 px-4">Browser</td>
                  <td className="py-6 px-4">Email / SMS</td>
                  <td className="py-6 px-4">Webhooks & Telegram</td>
                </tr>
                <tr className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                  <td className="py-6 px-4 text-white">Monthly Price</td>
                  <td className="py-6 px-4">$0</td>
                  <td className="py-6 px-4">$49</td>
                  <td className="py-6 px-4">$99</td>
                </tr>
                <tr>
                  <td className="py-6 px-4 text-white">Yearly Price</td>
                  <td className="py-6 px-4">$0</td>
                  <td className="py-6 px-4">$39</td>
                  <td className="py-6 px-4">$79</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

      </main>

      <footer className="px-6 py-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="opacity-20 flex items-center gap-4">
            <Image src="/flux.svg" alt="OpenFlux" width={80} height={20} className="h-4 w-auto brightness-200" />
            <span className="text-[10px] text-white/40 tracking-widest uppercase font-light">Institutional Alpha</span>
          </div>
          <div className="flex gap-12 text-[10px] font-normal text-white/20 uppercase tracking-[0.2em]">
            <a href="#" className="hover:text-white transition-colors">Sitemap</a>
            <a href="#" className="hover:text-white transition-colors">Security</a>
            <a href="#" className="hover:text-white transition-colors">API Docs</a>
            <a href="#" className="hover:text-white transition-colors">Twitter (X)</a>
          </div>
          <p className="text-[10px] font-normal text-white/10 uppercase tracking-widest">
            © 2026 OPENFLUX • ALL RIGHTS RESERVED
          </p>
        </div>
      </footer>
    </div>
  );
}
