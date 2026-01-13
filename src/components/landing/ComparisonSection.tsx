"use client";

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeftRight, Check, X as XIcon, Zap, Smartphone } from 'lucide-react';

export default function ComparisonSection() {
    const [sliderValue, setSliderValue] = useState(50);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
        const percentage = (x / rect.width) * 100;
        setSliderValue(percentage);
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = Math.max(0, Math.min(e.touches[0].clientX - rect.left, rect.width));
        const percentage = (x / rect.width) * 100;
        setSliderValue(percentage);
    };

    return (
        <section className="py-24 relative overflow-hidden bg-[#050507]">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold mb-4 font-heading text-white">
                        From Average to <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">Viral</span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        See exactly how our AI optimization transforms your content's performance.
                    </p>
                </div>

                {/* 3D Glass Split Card Container */}
                <div className="relative max-w-5xl mx-auto p-2 rounded-[2rem] bg-gradient-to-b from-white/10 to-transparent shadow-2xl">
                    <div
                        ref={containerRef}
                        className="relative aspect-[9/16] md:aspect-[21/9] rounded-[1.5rem] overflow-hidden cursor-ew-resize select-none bg-black border border-white/5 shadow-inner"
                        onMouseMove={handleMouseMove}
                        onTouchMove={handleTouchMove}
                    >
                        {/* "AFTER" (Viral) Side - Right/Base Layer */}
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 to-black flex items-center justify-center">
                            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center opacity-60 mix-blend-overlay" />

                            <div className="relative z-10 text-center p-6 w-full max-w-md backdrop-blur-sm bg-black/40 rounded-3xl border border-white/10 shadow-2xl transform md:translate-x-32 transition-transform">
                                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-500/20 border border-green-500/30 text-green-300 mb-4 backdrop-blur-md">
                                    <Zap size={14} className="fill-current" /> Viral Score: 98
                                </div>
                                <h3 className="text-5xl md:text-7xl font-bold text-white mb-2 drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]">1.2M</h3>
                                <div className="text-purple-200 font-medium mb-4">Total Views</div>
                                <div className="grid grid-cols-2 gap-2 text-xs md:text-sm text-left">
                                    <div className="flex items-center gap-2 text-green-300"><Check size={14} /> High Retention</div>
                                    <div className="flex items-center gap-2 text-green-300"><Check size={14} /> Viral Hook</div>
                                    <div className="flex items-center gap-2 text-green-300"><Check size={14} /> Trending Audio</div>
                                    <div className="flex items-center gap-2 text-green-300"><Check size={14} /> SEO Optimized</div>
                                </div>
                            </div>
                            <div className="absolute top-6 right-6 px-4 py-1 bg-purple-600 rounded-full font-bold text-sm z-20 shadow-lg glow border border-white/20">AFTER</div>
                        </div>

                        {/* "BEFORE" (Average) Side - Left/Clipped Layer */}
                        <div
                            className="absolute inset-0 bg-zinc-900 border-r-2 border-white/50 overflow-hidden shadow-[10px_0_50px_rgba(0,0,0,0.5)]"
                            style={{ width: `${sliderValue}%` }}
                        >
                            <div className="absolute inset-0 w-full h-full bg-zinc-800 flex items-center justify-center">
                                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center grayscale opacity-20" />

                                <div className="relative z-10 text-center p-6 w-full max-w-md opacity-80 backdrop-blur-none transform md:-translate-x-32 transition-transform">
                                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 mb-4">
                                        <XIcon size={14} /> Viral Score: 12
                                    </div>
                                    <h3 className="text-5xl md:text-7xl font-bold text-zinc-500 mb-2">240</h3>
                                    <div className="text-zinc-600 font-medium mb-4">Total Views</div>
                                    <div className="grid grid-cols-2 gap-2 text-xs md:text-sm text-left opacity-70">
                                        <div className="flex items-center gap-2 text-zinc-500"><XIcon size={14} /> Low Retention</div>
                                        <div className="flex items-center gap-2 text-zinc-500"><XIcon size={14} /> Boring Hook</div>
                                        <div className="flex items-center gap-2 text-zinc-500"><XIcon size={14} /> No Keywords</div>
                                        <div className="flex items-center gap-2 text-zinc-500"><XIcon size={14} /> Bad Pacing</div>
                                    </div>
                                </div>
                            </div>
                            <div className="absolute top-6 left-6 px-4 py-1 bg-zinc-700/80 rounded-full font-bold text-sm text-zinc-400 z-20 backdrop-blur-md border border-white/5">BEFORE</div>
                        </div>

                        {/* Slider Handle */}
                        <div
                            className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize z-30 shadow-[0_0_30px_rgba(255,255,255,0.8)]"
                            style={{ left: `${sliderValue}%` }}
                        >
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-2xl transform active:scale-90 transition-transform cursor-ew-resize">
                                <ArrowLeftRight size={20} className="text-black" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mobile Hint */}
                <div className="md:hidden text-center mt-6 text-sm text-gray-500 flex items-center justify-center gap-2 animate-pulse">
                    <Smartphone size={16} /> Swipe to compare
                </div>
            </div>
        </section>
    );
}
