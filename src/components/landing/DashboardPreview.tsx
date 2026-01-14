"use client";

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Upload, Sparkles, TrendingUp, Zap, FileText, Link as LinkIcon, ChevronRight } from 'lucide-react';

export default function DashboardPreview() {
    const containerRef = useRef<HTMLDivElement>(null);

    // Track scroll progress within this section
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    // 3D Transforms based on scroll
    // Rotates from 40deg (tilted back) to 0deg (flat)
    const rotateX = useTransform(scrollYProgress, [0, 0.4], [30, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.4], [0.8, 1]);
    const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
    const y = useTransform(scrollYProgress, [0, 0.4], [100, 0]);

    return (
        <section ref={containerRef} className="py-24 min-h-[80vh] perspective-1000 bg-black overflow-hidden relative border-t border-white/5">
            {/* Ambient Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-900/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="container mx-auto px-4 perspective-[1200px]">
                <div className="text-center mb-16">
                    <motion.div
                        style={{ opacity: opacity }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1E1E26] border border-[#2D2D39] text-purple-400 text-xs font-medium uppercase tracking-wider mb-6 shadow-xl"
                    >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>AI-Powered Viral Analysis</span>
                    </motion.div>
                    <motion.h2
                        style={{ opacity: opacity }}
                        className="text-4xl md:text-5xl font-bold mb-4 font-heading text-white"
                    >
                        Create Your Next <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Viral Hit</span>
                    </motion.h2>
                </div>

                <motion.div
                    style={{
                        rotateX: rotateX,
                        scale: scale,
                        opacity: opacity,
                        y: y,
                        transformStyle: "preserve-3d",
                    }}
                    className="relative w-full max-w-5xl mx-auto bg-[#050507] rounded-3xl border border-white/10 shadow-2xl overflow-hidden p-6 md:p-8"
                >
                    {/* --- Mock Dashboard UI --- */}

                    {/* Stats Row */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        {[
                            { label: 'Total Analyzed', value: '30', icon: TrendingUp, color: 'text-blue-400', bg: 'bg-blue-500/10', trend: true },
                            { label: 'Avg. Viral Score', value: '57', icon: Zap, color: 'text-purple-400', bg: 'bg-purple-500/10', trend: false },
                            { label: 'Growth Potential', value: 'High', icon: Sparkles, color: 'text-orange-400', bg: 'bg-orange-500/10', trend: false },
                        ].map((stat, i) => (
                            <div
                                key={stat.label}
                                className="bg-[#13131A] border border-white/5 p-5 rounded-2xl relative overflow-hidden flex items-start justify-between"
                            >
                                <div>
                                    <p className="text-zinc-500 text-xs font-medium mb-1 uppercase tracking-wide">{stat.label}</p>
                                    <h3 className="text-2xl font-bold text-white">{stat.value}</h3>
                                </div>
                                <div className={`p-2.5 rounded-xl ${stat.bg} ${stat.color}`}>
                                    <stat.icon className="w-5 h-5" />
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Main Action Area */}
                    <div className="bg-[#13131A] border border-white/5 rounded-3xl overflow-hidden shadow-xl mb-6 relative">
                        {/* Header Tabs */}
                        <div className="flex justify-center border-b border-white/5 p-2 bg-[#0F0F12]/50">
                            <div className="flex p-1 bg-[#0a0a0b] rounded-xl border border-white/5 items-center gap-1">
                                <div className="px-5 py-2 rounded-lg text-xs font-medium bg-[#1E1E26] text-white shadow-lg border border-white/5 flex items-center gap-2">
                                    <Upload className="w-3.5 h-3.5" /> Upload Video
                                </div>
                                <div className="px-5 py-2 rounded-lg text-xs font-medium text-zinc-500 flex items-center gap-2">
                                    <LinkIcon className="w-3.5 h-3.5" /> Paste Link
                                </div>
                                <div className="px-5 py-2 rounded-lg text-xs font-medium text-zinc-500 flex items-center gap-2">
                                    <FileText className="w-3.5 h-3.5" /> Analyze Script
                                </div>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-12 text-center">
                            <div className="w-20 h-20 bg-[#1E1E26] border border-white/5 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl relative">
                                <div className="absolute inset-0 bg-purple-500/20 blur-xl rounded-full" />
                                <Upload className="w-8 h-8 text-purple-400 relative z-10" />
                            </div>
                            <h3 className="text-xl font-bold mb-2 text-white">Upload your video</h3>
                            <p className="text-zinc-500 mb-8 text-sm max-w-xs mx-auto">Drag and drop matches the real dashboard experience.</p>

                            <div className="inline-flex cursor-default bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-xl font-bold opacity-90 shadow-lg shadow-purple-500/20 items-center gap-2 text-sm">
                                Start Analysis <ChevronRight className="w-4 h-4" />
                            </div>
                        </div>
                    </div>

                </motion.div>
            </div>
        </section>
    );
}
