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
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-900/20 rounded-full blur-[120px] pointer-events-none" />

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
                    className="relative w-full max-w-6xl mx-auto aspect-auto md:aspect-[16/9] bg-[#0F0F12] rounded-2xl border border-white/10 shadow-2xl overflow-hidden"
                >
                    {/* --- Mock Dashboard UI --- */}

                    {/* Window Header */}
                    <div className="h-12 border-b border-white/5 flex items-center justify-between px-6 bg-[#0F0F12]">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-[#FF5F57]" /> {/* Red */}
                            <div className="w-3 h-3 rounded-full bg-[#FEBC2E]" /> {/* Yellow */}
                            <div className="w-3 h-3 rounded-full bg-[#28C840]" /> {/* Green */}
                        </div>
                        <div className="h-2 w-32 bg-white/5 rounded-full" />
                    </div>

                    <div className="flex h-full">
                        {/* Sidebar */}
                        <div className="w-16 md:w-64 border-r border-white/5 p-6 flex flex-col gap-2 bg-[#0F0F12] hidden md:flex">
                            {/* Logo Stub / Profile Stub */}
                            <div className="h-10 w-full mb-6 bg-white/5 rounded-lg animate-pulse opacity-20" />

                            {[
                                { i: BarChart3, l: "Overview", active: true },
                                { i: Zap, l: "Viral Forecast" },
                                { i: Activity, l: "Analytics" },
                                { i: Users, l: "Audience" },
                                { i: Settings, l: "Settings" },
                            ].map((item, idx) => (
                                <div key={idx} className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-default transition-all ${item.active
                                        ? 'bg-[#5D3EA8] text-white shadow-lg shadow-purple-900/20 font-medium'
                                        : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'
                                    }`}>
                                    <item.i size={18} strokeWidth={item.active ? 2.5 : 2} />
                                    <span className="text-sm">{item.l}</span>
                                </div>
                            ))}
                        </div>

                        {/* Main Content */}
                        <div className="flex-1 p-6 md:p-8 overflow-hidden bg-[#0a0a0b]">

                            {/* Top Stats Row */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                                <div className="bg-[#13131A] p-5 rounded-2xl border border-white/5 shadow-sm">
                                    <div className="text-gray-500 text-xs uppercase font-bold mb-3 tracking-wider">Total Views</div>
                                    <div className="flex items-end gap-3">
                                        <div className="text-3xl font-bold text-white">2.4M</div>
                                        <div className="text-green-400 text-sm font-medium mb-1">↑ 12%</div>
                                    </div>
                                </div>
                                <div className="bg-[#13131A] p-5 rounded-2xl border border-white/5 shadow-sm">
                                    <div className="text-gray-500 text-xs uppercase font-bold mb-3 tracking-wider">Avg. Retention</div>
                                    <div className="flex items-end gap-3">
                                        <div className="text-3xl font-bold text-white">68%</div>
                                        <div className="text-green-400 text-sm font-medium mb-1">↑ 5%</div>
                                    </div>
                                </div>
                                <div className="bg-[#13131A] p-5 rounded-2xl border border-white/5 shadow-sm">
                                    <div className="text-gray-500 text-xs uppercase font-bold mb-3 tracking-wider">Viral Score</div>
                                    <div className="flex items-end gap-1">
                                        <div className="text-3xl font-bold text-purple-400">92</div>
                                        <div className="text-gray-600 text-sm mb-1 font-medium">/100</div>
                                    </div>
                                </div>
                            </div>

                            {/* Main Chart Area */}
                            <div className="bg-[#13131A] p-6 rounded-3xl border border-white/5 h-72 mb-6 relative overflow-hidden flex flex-col justify-between">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="font-bold text-white text-lg">Performance Forecast</h3>
                                    <div className="flex gap-2">
                                        <div className="px-3 py-1.5 rounded-lg bg-white/5 text-xs text-gray-500 hover:bg-white/10 cursor-pointer transition-colors">7 Days</div>
                                        <div className="px-3 py-1.5 rounded-lg bg-[#5D3EA8] text-xs text-white cursor-pointer shadow-lg shadow-purple-900/20">30 Days</div>
                                    </div>
                                </div>

                                {/* Chart Bars */}
                                <div className="flex items-end justify-between h-full gap-2 px-2 pb-2">
                                    {[40, 55, 45, 60, 50, 75, 65, 85, 80, 95, 100, 90, 80, 70, 60].map((h, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ height: 0 }}
                                            whileInView={{ height: `${h}%` }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.8, delay: i * 0.05, ease: "easeOut" }}
                                            className="w-full bg-gradient-to-t from-purple-900/50 to-[#7C3AED] rounded-t-md opacity-90 hover:opacity-100 transition-opacity"
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Recent Analysis Row */}
                            <div className="bg-[#13131A] p-4 rounded-2xl border border-white/5 flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                                        <PieChart size={20} className="text-gray-400" />
                                    </div>
                                    <div>
                                        <div className="text-sm font-bold text-white">My_Viral_Video.mp4</div>
                                        <div className="text-xs text-gray-500">Processed 2 mins ago</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 text-green-400 text-xs font-bold border border-green-500/10 px-3 py-1.5 rounded-full bg-green-500/5">
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
