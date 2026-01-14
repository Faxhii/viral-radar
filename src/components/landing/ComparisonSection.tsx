"use client";

import { motion } from 'framer-motion';
import { Play, Heart, MessageCircle, Share2, TrendingUp, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function ComparisonSection() {
    return (
        <section className="py-24 relative overflow-hidden bg-[#050507]">
            {/* Background Gradients */}
            <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold mb-4 font-heading text-white">
                        See the <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">Viral Difference</span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Don't just take our word for it. See how our AI optimization transforms content into viral sensations.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                    {/* BEFORE CARD */}
                    <div className="relative group perspective-1000">
                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-zinc-800/90 backdrop-blur-md px-6 py-2 rounded-full border border-white/10 text-zinc-400 font-bold text-sm tracking-wider uppercase z-20">
                            Before AI
                        </div>

                        <div className="relative aspect-[9/16] bg-zinc-900 rounded-[2.5rem] overflow-hidden border-8 border-zinc-800 shadow-2xl group-hover:transform group-hover:scale-[1.02] transition-transform duration-500">
                            {/* Video Placeholder Image (Bored/Struggle) */}
                            <img
                                src="https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?q=80&w=800&auto=format&fit=crop"
                                alt="Before AI"
                                className="absolute inset-0 w-full h-full object-cover opacity-60 grayscale-[50%]"
                            />

                            {/* Overlay UI */}
                            <div className="absolute inset-0 flex flex-col justify-between p-6 bg-gradient-to-b from-black/40 via-transparent to-black/80">
                                <div className="flex justify-between items-start opacity-70">
                                    <div className="bg-black/50 p-2 rounded-full backdrop-blur-md">
                                        <AlertCircle className="text-red-400 w-5 h-5" />
                                    </div>
                                    <div className="bg-black/50 px-3 py-1 rounded-full text-xs font-mono text-zinc-400 backdrop-blur-md">
                                        Viral Score: 12
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    {/* Stats (Low) */}
                                    <div className="flex items-end gap-2 text-zinc-500">
                                        <div className="text-4xl font-bold text-white">242</div>
                                        <div className="text-sm pb-1 font-medium">views</div>
                                    </div>

                                    {/* Mock Player Controls */}
                                    <div className="h-1 bg-white/20 rounded-full overflow-hidden">
                                        <div className="w-[30%] h-full bg-zinc-500" />
                                    </div>

                                    <div className="flex items-center justify-between text-white/50">
                                        <Play className="w-6 h-6 fill-white/50" />
                                        <div className="flex gap-4">
                                            <Heart className="w-5 h-5" />
                                            <MessageCircle className="w-5 h-5" />
                                            <Share2 className="w-5 h-5" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Floating Feedback Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="absolute -right-4 top-1/4 bg-zinc-900/90 backdrop-blur-md p-4 rounded-xl border border-white/5 shadow-xl max-w-[200px] hidden md:block z-30"
                        >
                            <div className="flex gap-2 items-start mb-2">
                                <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                                <span className="text-xs font-bold text-zinc-400">Analysis Failed</span>
                            </div>
                            <p className="text-xs text-zinc-500 leading-relaxed">
                                &quot;Hook is too slow. Audience dropped off at 0:03. Lighting is inconsistent.&quot;
                            </p>
                        </motion.div>
                    </div>

                    {/* AFTER CARD */}
                    <div className="relative group mt-12 md:mt-0 perspective-1000">
                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-2 rounded-full shadow-[0_0_20px_rgba(168,85,247,0.5)] text-white font-bold text-sm tracking-wider uppercase z-20">
                            After ViralRadar
                        </div>

                        <div className="relative aspect-[9/16] bg-[#0a0a0b] rounded-[2.5rem] overflow-hidden border-8 border-purple-500/20 shadow-[0_0_50px_rgba(168,85,247,0.2)] group-hover:transform group-hover:scale-[1.02] transition-transform duration-500">
                            {/* Video Placeholder Image (Viral/Happy) */}
                            <img
                                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop"
                                alt="After AI"
                                className="absolute inset-0 w-full h-full object-cover"
                            />

                            {/* Overlay UI */}
                            <div className="absolute inset-0 flex flex-col justify-between p-6 bg-gradient-to-b from-black/20 via-transparent to-black/90">
                                <div className="flex justify-between items-start">
                                    <div className="bg-green-500 px-3 py-1 rounded-full text-xs font-bold text-black flex items-center gap-1 shadow-lg shadow-green-500/20">
                                        <TrendingUp size={12} /> TRENDING
                                    </div>
                                    <div className="bg-black/40 px-3 py-1 rounded-full text-xs font-mono text-green-400 border border-green-500/30 backdrop-blur-md shadow-[0_0_15px_rgba(74,222,128,0.2)]">
                                        Viral Score: 98
                                    </div>
                                </div>

                                {/* Comments / Engagement Popups */}
                                <div className="absolute top-1/3 right-4 space-y-3">
                                    <motion.div
                                        initial={{ opacity: 0, x: 20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.5 }}
                                        className="bg-black/60 backdrop-blur-md p-2 rounded-lg rounded-tr-none border border-white/10 text-[10px] text-white w-32 shadow-lg"
                                    >
                                        🔥 This actually works!
                                    </motion.div>
                                    <motion.div
                                        initial={{ opacity: 0, x: 20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.8 }}
                                        className="bg-black/60 backdrop-blur-md p-2 rounded-lg rounded-tr-none border border-white/10 text-[10px] text-white w-32 shadow-lg"
                                    >
                                        Sending this to my team 🚀
                                    </motion.div>
                                </div>

                                <div className="space-y-4">
                                    {/* Stats (High) */}
                                    <div className="flex items-end gap-2 text-white">
                                        <div className="text-5xl font-bold drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]">1.2M</div>
                                        <div className="text-sm pb-1 font-medium text-purple-200">views</div>
                                    </div>

                                    {/* Mock Player Controls */}
                                    <div className="h-1 bg-white/20 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: "30%" }}
                                            whileInView={{ width: "100%" }}
                                            transition={{ duration: 3, ease: "linear" }}
                                            className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                                        />
                                    </div>

                                    <div className="flex items-center justify-between text-white">
                                        <Play className="w-6 h-6 fill-white" />
                                        <div className="flex gap-4">
                                            <div className="flex items-center gap-1 text-sm"><Heart className="w-5 h-5 fill-purple-500 text-purple-500" /> 124K</div>
                                            <div className="flex items-center gap-1 text-sm"><MessageCircle className="w-5 h-5" /> 8.2K</div>
                                            <Share2 className="w-5 h-5" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Floating Success Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="absolute -left-4 top-1/4 glass-card p-4 rounded-xl border border-green-500/20 shadow-[0_0_30px_rgba(74,222,128,0.1)] max-w-[200px] hidden md:block z-30"
                        >
                            <div className="flex gap-2 items-start mb-2">
                                <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                                <span className="text-xs font-bold text-white">Perfectly Optimized</span>
                            </div>
                            <div className="space-y-1">
                                <div className="text-[10px] text-zinc-400 flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-green-500" /> Hook retention &gt; 80%</div>
                                <div className="text-[10px] text-zinc-400 flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-green-500" /> Trending Audio Matched</div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
