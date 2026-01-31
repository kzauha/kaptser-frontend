"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { SiReact, SiNextdotjs, SiTypescript, SiTailwindcss } from 'react-icons/si';
import PixelBlast from "@/components/PixelBlast";
import LogoLoop from "@/components/LogoLoop";

const techLogos = [
  { node: <SiReact size={24} />, title: "React", href: "https://react.dev" },
  { node: <SiNextdotjs size={24} />, title: "Next.js", href: "https://nextjs.org" },
  { node: <SiTypescript size={24} />, title: "TypeScript", href: "https://www.typescriptlang.org" },
  { node: <SiTailwindcss size={24} />, title: "Tailwind CSS", href: "https://tailwindcss.com" },
];

export default function OpenFluxMinimal() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen font-sans overflow-x-hidden selection:bg-white/10">
      {/* 1. Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-[100] border-b border-white/5 bg-[#060010]/50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Image src="/flux.svg" alt="OpenFlux" width={100} height={25} className="h-5 w-auto brightness-200" />
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

      <main className="relative pt-48 pb-20">
        {/* 2. Hero Section */}
        <section className="px-6 max-w-5xl mx-auto flex flex-col items-center text-center relative mb-40">
          <div className="absolute inset-x-0 -top-20 -z-10 h-[600px] opacity-20 pointer-events-none">
            <PixelBlast
              variant="square"
              pixelSize={2}
              color="#ffffff"
              patternScale={1.5}
              patternDensity={1}
              pixelSizeJitter={0}
              enableRipples
              rippleSpeed={0.3}
              rippleThickness={0.1}
              rippleIntensityScale={1}
              transparent
            />
          </div>

          {/* <p className="text-[11px] font-normal tracking-[0.3em] text-white/20 uppercase mb-8">
            The Intelligent Strategy Layer
          </p> */}

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
              Watch Demo
            </button>
          </div>
        </section>

        {/* 3. Logo Loop */}
        <section className="py-20 relative border-y border-white/5">
          <div className="max-w-7xl mx-auto">
            <LogoLoop
              logos={techLogos}
              speed={30}
              direction="left"
              logoHeight={24}
              gap={100}
              pauseOnHover={true}
              fadeOut={true}
              fadeOutColor="#060010"
              className="opacity-20 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-700"
            />
          </div>
        </section>

        {/* 4. Minimal Detail */}
        <section className="px-6 py-40 max-w-3xl mx-auto text-center">
          <div className="space-y-24">
            <div className="space-y-6">
              <h2 className="text-3xl font-tasa font-normal text-white">Pure Logic.</h2>
              <p className="text-white/30 text-base leading-relaxed font-light">
                Our engine parses complex multi-stage conditions and executes them against terabytes of historical data. No code required.
              </p>
            </div>

            <div className="h-px w-20 bg-white/5 mx-auto"></div>

            <div className="space-y-6">
              <h2 className="text-3xl font-tasa font-normal text-white">Transparent Alpha.</h2>
              <p className="text-white/30 text-base leading-relaxed font-light">
                Every simulation provides deep-tier metrics on drawdown, sharpe, and volatility regimes. Built for professional retail traders.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="px-6 py-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="opacity-20">
            <Image src="/flux.svg" alt="OpenFlux" width={80} height={20} className="h-4 w-auto brightness-200" />
          </div>
          <div className="flex gap-12 text-[10px] font-normal text-white/20 uppercase tracking-[0.2em]">
            <a href="#" className="hover:text-white transition-colors">Infrastructure</a>
            <a href="#" className="hover:text-white transition-colors">Security</a>
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
