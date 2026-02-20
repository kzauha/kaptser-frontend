"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  SiBinance, SiCoinbase, SiOkx, SiBitcoin, SiEthereum,
  SiSolana, SiTether, SiCardano, SiDogecoin
} from 'react-icons/si';
import { SignedIn, SignedOut } from "@clerk/nextjs";

import ColorBends from "@/components/ColorBends";
import LogoLoop from "@/components/LogoLoop";
import MagicBento from "@/components/MagicBento";
import ScrambledText from "@/components/ScrambledText";
import AuthDialog from "@/components/AuthDialog";
import UserMenu from "@/components/UserMenu";
import LiveDemo from "@/components/LiveDemo";
import WhyOpenFlux from "@/components/WhyOpenFlux";
import Testimonials from "@/components/Testimonials";

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

import { useSearchParams } from "next/navigation";

export default function OpenFluxLanding() {
  const [mounted, setMounted] = useState(false);
  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  const searchParams = useSearchParams();

  useEffect(() => {
    setMounted(true);
    if (searchParams.get('openAuth') === 'true') {
      setAuthDialogOpen(true);
    }
  }, [searchParams]);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#060010] font-sans overflow-x-hidden selection:bg-white/10 text-white">
      {/* Auth Dialog */}
      <AuthDialog open={authDialogOpen} onOpenChange={setAuthDialogOpen} />

      {/* 1. Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-[100] border-b border-white/5 bg-gradient-to-b from-[#060010] via-[#060010]/80 to-transparent backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Image src="/flux.svg" alt="OpenFlux" width={100} height={35} className="h-7 w-auto brightness-200" />
          </div>

          <div className="flex items-center gap-6">
            <SignedOut>
              <button
                onClick={() => setAuthDialogOpen(true)}
                className="text-sm font-normal text-white/50 hover:text-white transition-colors duration-200"
              >
                Login
              </button>
              <button
                onClick={() => setAuthDialogOpen(true)}
                className="px-6 py-2.5 bg-white text-[#060010] text-sm font-semibold rounded-full hover:bg-emerald-300 transition-all duration-200 hover:scale-105 hover:shadow-lg"
              >
                Start Free
              </button>
            </SignedOut>
            <SignedIn>
              <UserMenu />
            </SignedIn>
          </div>
        </div>
      </nav>

      <main className="relative pt-48">
        <section className="px-6 max-w-7xl mx-auto flex flex-col items-center text-center relative h-screen flex-justify-center">
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 0, overflow: 'hidden' }}>
            <ColorBends
              rotation={0}
              speed={0.15}
              colors={["#ff0a0a", "#00ff04", "#2b00ff"]}
              transparent
              autoRotate={0}
              scale={2.8}
              frequency={1}
              warpStrength={1.2}
              mouseInfluence={0.8}
              parallax={0.5}
              noise={0.08}
            />
          </div>
          <div className="relative z-10 flex flex-col justify-center h-full w-full">
            <h1 className="font-tasa font-normal text-5xl md:text-6xl lg:text-8xl mb-6 tracking-tight leading-[1.0] text-white max-w-5xl mx-auto text-balance">
              Quantitative trading, <br />
              <span className="bg-gradient-to-r from-emerald-400 via-white to-emerald-300 bg-clip-text text-transparent">simplified for humans</span>.
            </h1>

            <p className="text-base md:text-lg text-white/50 max-w-2xl mx-auto mb-12 font-light leading-relaxed text-balance">
              The world's first natural language backtesting engine for crypto. No math, no code—just the flow of logic.
            </p>

            <div className="flex items-center justify-center gap-4">
              <button className="px-8 py-4 bg-white text-[#060010] rounded-full font-semibold text-base hover:bg-emerald-300 transition-all hover:scale-105 shadow-lg hover:shadow-xl">
                Get Started
              </button>
              <Link href="/dashboard" className="px-8 py-4 border border-white/20 rounded-full font-semibold text-base text-white hover:bg-white/10 transition-all hover:border-white/40">
                Dashboard
              </Link>
            </div>

            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
              <svg className="w-6 h-6 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </div>
        </section>

        {/* 3. Logo Loop (Crypto Exchanges) */}
        <section className="py-20 relative border-y border-white/5 bg-gradient-to-r from-transparent via-white/[0.02] to-transparent">
          <div className="max-w-7xl mx-auto">
            <p className="text-center text-white/40 text-xs uppercase tracking-widest font-semibold mb-8">Integrated with major exchanges</p>
            <LogoLoop
              logos={exchangeLogos}
              speed={30}
              direction="left"
              logoHeight={28}
              gap={100}
              pauseOnHover={true}
              fadeOut={true}
              fadeOutColor="#060010"
              className="opacity-30 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-500"
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
            spotlightRadius={600}
            particleCount={35}
            glowColor="16, 185, 129"
          />
        </section>

        {/* Live Demo Section */}
        <LiveDemo />

        {/* Why OpenFlux */}
        <WhyOpenFlux />

        {/* Testimonials */}
        <Testimonials />

        {/* Pricing Section */}
        <section className="px-6 py-40 max-w-7xl mx-auto relative">
          <div className="text-center mb-20">
            <div className="inline-block mb-4 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20">
              <span className="text-emerald-400 text-sm font-semibold">Simple & Transparent</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-tasa text-white mb-6 text-balance">Fair pricing for all traders.</h2>
            <p className="text-lg text-white/50 font-light">No hidden fees. Cancel anytime.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Free Plan */}
            <div className="border border-white/10 rounded-lg bg-white/[0.02] backdrop-blur-sm p-8">
              <h3 className="text-xl font-semibold text-white mb-2">Starter</h3>
              <p className="text-white/50 text-sm mb-6">Perfect for learning</p>
              <div className="mb-8">
                <span className="text-4xl font-bold text-white">$0</span>
                <span className="text-white/40">/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3 text-white/70">
                  <span className="text-emerald-400">✓</span> 3 backtests/month
                </li>
                <li className="flex items-center gap-3 text-white/70">
                  <span className="text-emerald-400">✓</span> 1 year historical data
                </li>
                <li className="flex items-center gap-3 text-white/70">
                  <span className="text-emerald-400">✓</span> Basic risk analysis
                </li>
              </ul>
              <button className="w-full px-6 py-3 border border-white/10 text-white rounded-full hover:bg-white/5 transition-colors">
                Get Started
              </button>
            </div>

            {/* Pro Plan - Featured */}
            <div className="border border-emerald-500/30 rounded-lg bg-gradient-to-br from-emerald-500/10 to-white/[0.02] backdrop-blur-sm p-8 relative ring-1 ring-emerald-500/20">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-3 py-1 rounded-full bg-emerald-500 text-white text-xs font-semibold">
                Most Popular
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Professional</h3>
              <p className="text-white/50 text-sm mb-6">For active traders</p>
              <div className="mb-8">
                <span className="text-4xl font-bold text-white">$49</span>
                <span className="text-white/40">/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3 text-white/70">
                  <span className="text-emerald-400">✓</span> Unlimited backtests
                </li>
                <li className="flex items-center gap-3 text-white/70">
                  <span className="text-emerald-400">✓</span> 5 years historical data
                </li>
                <li className="flex items-center gap-3 text-white/70">
                  <span className="text-emerald-400">✓</span> AI risk detection
                </li>
                <li className="flex items-center gap-3 text-white/70">
                  <span className="text-emerald-400">✓</span> Email alerts
                </li>
              </ul>
              <button className="w-full px-6 py-3 bg-emerald-500 text-white rounded-full hover:bg-emerald-600 transition-colors font-semibold">
                Start Free Trial
              </button>
            </div>

            {/* Pro+ Plan */}
            <div className="border border-white/10 rounded-lg bg-white/[0.02] backdrop-blur-sm p-8">
              <h3 className="text-xl font-semibold text-white mb-2">Enterprise</h3>
              <p className="text-white/50 text-sm mb-6">For firms & funds</p>
              <div className="mb-8">
                <span className="text-4xl font-bold text-white">Custom</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3 text-white/70">
                  <span className="text-emerald-400">✓</span> Full historical data
                </li>
                <li className="flex items-center gap-3 text-white/70">
                  <span className="text-emerald-400">✓</span> White-label options
                </li>
                <li className="flex items-center gap-3 text-white/70">
                  <span className="text-emerald-400">✓</span> Dedicated support
                </li>
                <li className="flex items-center gap-3 text-white/70">
                  <span className="text-emerald-400">✓</span> API access
                </li>
              </ul>
              <button className="w-full px-6 py-3 border border-white/10 text-white rounded-full hover:bg-white/5 transition-colors">
                Contact Sales
              </button>
            </div>
          </div>
        </section>

      </main>

      <footer className="px-6 py-20 border-t border-white/5 bg-gradient-to-b from-white/[0.02] to-transparent">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-12 mb-12">
            <div className="opacity-40 flex items-center gap-4">
              <Image src="/flux.svg" alt="OpenFlux" width={80} height={20} className="h-4 w-auto brightness-200" />
              <span className="text-[10px] text-white/40 tracking-widest uppercase font-light">Institutional Alpha</span>
            </div>
            <div className="flex gap-8 text-[10px] font-normal text-white/40 uppercase tracking-[0.2em]">
              <Link href="/dashboard" className="hover:text-emerald-400 transition-colors">Dashboard</Link>
              <a href="#" className="hover:text-white transition-colors">Sitemap</a>
              <a href="#" className="hover:text-white transition-colors">Security</a>
              <a href="#" className="hover:text-white transition-colors">API Docs</a>
              <a href="#" className="hover:text-white transition-colors">Twitter (X)</a>
            </div>
          </div>
          <div className="border-t border-white/5 pt-8">
            <p className="text-[10px] font-normal text-white/10 uppercase tracking-widest text-center">
              © 2026 OPENFLUX • ALL RIGHTS RESERVED
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
