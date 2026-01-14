"use client";

import { motion } from 'framer-motion';
import { Zap, AlertTriangle, CheckCircle2, Ban, TrendingUp, Sparkles } from 'lucide-react';

export default function ComparisonSection() {
    return (
        <section className="py-24 relative overflow-hidden bg-[#050507]">
            {/* Background Effects */}
            <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid.svg')] opacity-[0.03] pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-purple-900/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold mb-4 font-heading text-white">
                        From <span className="text-zinc-500 line-through decoration-red-500/50">Generic</span> to <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400">Viral</span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        See how our AI rewrites your scripts to capture attention instantly.
                    </p>
                </div>

                <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 max-w-6xl mx-auto relative">

                    {/* CENTER ICON (Absolute on desktop, relative on mobile) */}
                    <div className="z-20 md:absolute md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 flex items-center justify-center w-16 h-16 rounded-full bg-black border border-zinc-800 shadow-[0_0_30px_rgba(168,85,247,0.3)]">
                        <Zap className="w-8 h-8 text-yellow-400 fill-yellow-400 animate-pulse" />
                    </div>

                    {/* BEFORE CARD (Original Draft) */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="w-full md:w-1/2"
                    >
                        <div className="relative group rounded-3xl bg-[#0a0a0b] border border-red-900/20 overflow-hidden shadow-2xl">
                            <div className="absolute inset-0 bg-red-900/5 opacity-50 pointer-events-none" />

                            {/* Header */}
                            <div className="p-6 border-b border-white/5 flex items-center justify-between">
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-1">Original Draft</h3>
                                    <div className="flex items-center gap-2 text-xs font-mono text-red-400 uppercase tracking-wider">
                                        <AlertTriangle size={12} /> Status: Needs Work
                                    </div>
                                </div>
                                <div className="relative w-16 h-16 flex items-center justify-center">
                                    <svg className="absolute inset-0 w-full h-full -rotate-90">
                                        <circle cx="32" cy="32" r="28" stroke="#3f3f46" strokeWidth="4" fill="transparent" />
                                        <circle cx="32" cy="32" r="28" stroke="#ef4444" strokeWidth="4" fill="transparent" strokeDasharray="175.9" strokeDashoffset={175.9 - (175.9 * 34) / 100} />
                                    </svg>
                                    <span className="text-lg font-bold text-red-500">34</span>
                                </div>
                            </div>

                            {/* Content Body */}
                            <div className="p-8 font-mono text-sm leading-relaxed text-zinc-400 bg-black/20 min-h-[300px]">
                                <div className="space-y-4">
                                    <p className="opacity-50">01  Hi guys, welcome back to my channel.</p>
                                    <p className="opacity-50">02  Today I want to talk about how to make</p>
                                    <p className="opacity-50">03  coffee at home. It&apos;s really easy and...</p>
                                    <p className="opacity-50">04  you can save some money I guess.</p>
                                    <p className="opacity-50">05  First, get your beans...</p>
                                </div>

                                <div className="mt-8 pt-6 border-t border-white/5 space-y-3">
                                    <div className="flex items-center gap-3 text-red-400/80">
                                        <Ban size={16} />
                                        <span>Hook is too generic and soft.</span>
                                    </div>
                                    <div className="flex gap-2 mt-4">
                                        <span className="px-3 py-1 rounded bg-red-950/30 border border-red-900/30 text-red-500 text-xs">Low Retention</span>
                                        <span className="px-3 py-1 rounded bg-red-950/30 border border-red-900/30 text-red-500 text-xs">Slow Pacing</span>
                                        <span className="px-3 py-1 rounded bg-red-950/30 border border-red-900/30 text-red-500 text-xs">Weak Intro</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* AFTER CARD (ViralRadar Optimized) */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="w-full md:w-1/2"
                    >
                        <div className="relative group rounded-3xl bg-[#0a0a0b] border border-green-500/20 overflow-hidden shadow-[0_0_50px_rgba(34,197,94,0.1)]">
                            <div className="absolute inset-0 bg-green-500/5 opacity-30 pointer-events-none" />

                            {/* Header */}
                            <div className="p-6 border-b border-white/5 flex items-center justify-between bg-white/5">
                                <div>
                                    <div className="flex items-center gap-2">
                                        <h3 className="text-xl font-bold text-white mb-1">ViralRadar Optimized</h3>
                                        <CheckCircle2 size={18} className="text-green-500 fill-green-500/20" />
                                    </div>
                                    <div className="flex items-center gap-2 text-xs font-mono text-green-400 uppercase tracking-wider">
                                        <Sparkles size={12} /> Status: Viral Potential
                                    </div>
                                </div>
                                <div className="relative w-16 h-16 flex items-center justify-center">
                                    <div className="absolute inset-0 bg-green-500/20 blur-xl rounded-full" />
                                    <svg className="absolute inset-0 w-full h-full -rotate-90">
                                        <circle cx="32" cy="32" r="28" stroke="#3f3f46" strokeWidth="4" fill="transparent" />
                                        <circle cx="32" cy="32" r="28" stroke="#22c55e" strokeWidth="4" fill="transparent" strokeDasharray="175.9" strokeDashoffset={175.9 - (175.9 * 92) / 100} />
                                    </svg>
                                    <span className="text-lg font-bold text-green-400 relative z-10">92</span>
                                </div>
                            </div>

                            {/* Content Body */}
                            <div className="p-8 font-mono text-sm leading-relaxed text-zinc-300 bg-black/40 min-h-[300px]">
                                <div className="space-y-4">
                                    <p>01  Stop overpaying for Starbucks.</p>
                                    <p>02  Here is how to brew <span className="bg-green-500/20 text-green-300 px-1 rounded">barista-level</span></p>
                                    <p>03  coffee for <span className="bg-green-500/20 text-green-300 px-1 rounded">$0.50</span> at home.</p>
                                    <p>04  All you need is this one trick...</p>
                                </div>

                                <div className="mt-8 pt-6 border-t border-white/5 space-y-3">
                                    <div className="flex items-center gap-3 text-green-400">
                                        <TrendingUp size={16} />
                                        <span>Strong hook triggers curiosity immediately.</span>
                                    </div>
                                    <div className="flex gap-2 mt-4">
                                        <span className="px-3 py-1 rounded bg-green-500/10 border border-green-500/20 text-green-400 text-xs">High Retention</span>
                                        <span className="px-3 py-1 rounded bg-green-500/10 border border-green-500/20 text-green-400 text-xs">Power Words</span>
                                        <span className="px-3 py-1 rounded bg-green-500/10 border border-green-500/20 text-green-400 text-xs">Clear Value</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
