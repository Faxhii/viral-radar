"use client";

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { BarChart3, PieChart, Activity, Users, Settings, Zap, CheckCircle2 } from 'lucide-react';

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
        <section ref={containerRef} className="py-20 min-h-[80vh] perspective-1000 bg-black overflow-hidden relative">
            {/* Ambient Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[120px] pointer-events-none" />

            <div className="container mx-auto px-4 perspective-[1200px]">
                <div className="text-center mb-12">
                    <motion.h2
                        style={{ opacity: opacity }}
                        className="text-2xl md:text-3xl font-bold text-gray-400 mb-2"
                    >
                        Powerful Insights at your Fingertips
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
                    className="relative w-full max-w-6xl mx-auto aspect-auto md:aspect-[16/9] bg-[#0a0a0b] rounded-2xl border border-white/10 shadow-2xl overflow-hidden glass-card"
                >
                    {/* --- Mock Dashboard UI --- */}

                    {/* Header */}
                    <div className="h-14 border-b border-white/5 flex items-center justify-between px-6 bg-white/5 backdrop-blur-md">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-500/50" />
                            <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                            <div className="w-3 h-3 rounded-full bg-green-500/50" />
                        </div>
                        <div className="h-2 w-32 bg-white/10 rounded-full" />
                    </div>

                    <div className="flex h-full">
                        {/* Sidebar */}
                        <div className="w-16 md:w-64 border-r border-white/5 p-4 flex flex-col gap-2 bg-white/5 hidden md:flex">
                            {/* Logo Stub */}
                            <div className="h-8 w-32 bg-purple-500/20 rounded-md mb-8 animate-pulse" />

                            {[
                                { i: BarChart3, l: "Overview", active: true },
                                { i: Zap, l: "Viral Forecast" },
                                { i: Activity, l: "Analytics" },
                                { i: Users, l: "Audience" },
                                { i: Settings, l: "Settings" },
                            ].map((item, idx) => (
                                <div key={idx} className={`flex items-center gap-3 p-3 rounded-xl cursor-default transition-colors ${item.active ? 'bg-purple-600/20 text-purple-300 border border-purple-500/20' : 'text-gray-500 hover:bg-white/5'}`}>
                                    <item.i size={20} />
                                    <span className="font-medium text-sm">{item.l}</span>
                                </div>
                            ))}
                        </div>

                        {/* Main Content */}
                        <div className="flex-1 p-6 md:p-8 overflow-hidden bg-gradient-to-br from-transparent to-purple-900/5">

                            {/* Top Stats Row */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                                <div className="glass-card p-4 rounded-xl border border-white/5">
                                    <div className="text-gray-400 text-xs uppercase font-bold mb-2">Total Views</div>
                                    <div className="text-3xl font-bold text-white">2.4M <span className="text-green-400 text-sm">↑ 12%</span></div>
                                </div>
                                <div className="glass-card p-4 rounded-xl border border-white/5">
                                    <div className="text-gray-400 text-xs uppercase font-bold mb-2">Avg. Retention</div>
                                    <div className="text-3xl font-bold text-white">68% <span className="text-green-400 text-sm">↑ 5%</span></div>
                                </div>
                                <div className="glass-card p-4 rounded-xl border border-white/5">
                                    <div className="text-gray-400 text-xs uppercase font-bold mb-2">Viral Score</div>
                                    <div className="text-3xl font-bold text-purple-400">92<span className="text-gray-500 text-sm">/100</span></div>
                                </div>
                            </div>

                            {/* Main Chart Area */}
                            <div className="glass-card p-6 rounded-2xl border border-white/5 h-64 mb-6 relative overflow-hidden group">
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="font-bold text-white">Performance Forecast</h3>
                                    <div className="flex gap-2">
                                        <div className="px-3 py-1 rounded-full bg-white/5 text-xs text-gray-400">7 Days</div>
                                        <div className="px-3 py-1 rounded-full bg-purple-500/20 text-xs text-purple-300">30 Days</div>
                                    </div>
                                </div>

                                {/* Fake Chart Line */}
                                <div className="absolute inset-x-6 bottom-6 top-20 flex items-end gap-1 opacity-50">
                                    {[40, 60, 45, 70, 65, 80, 75, 90, 85, 95, 100, 90, 80, 70, 60].map((h, i) => (
                                        <div
                                            key={i}
                                            className="flex-1 bg-gradient-to-t from-purple-600/20 to-purple-500 rounded-t-sm hover:from-purple-600/40 hover:to-cyan-400 transition-all duration-300"
                                            style={{ height: `${h}%` }}
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Recent Analysis Row */}
                            <div className="glass-card p-4 rounded-xl border border-white/5 flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded bg-zinc-800 flex items-center justify-center">
                                        <PieChart size={20} className="text-gray-500" />
                                    </div>
                                    <div>
                                        <div className="text-sm font-bold text-white">My_Viral_Video.mp4</div>
                                        <div className="text-xs text-gray-500">Processed 2 mins ago</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 text-green-400 text-xs font-bold border border-green-500/20 px-3 py-1 rounded-full bg-green-500/10">
                                    <CheckCircle2 size={12} /> Optimization Ready
                                </div>
                            </div>

                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
