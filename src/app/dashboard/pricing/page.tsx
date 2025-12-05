"use client";

import { motion } from "framer-motion";
import { Check, Zap, Star, Crown, Shield } from "lucide-react";
import Link from "next/link";

export default function PricingPage() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <div className="min-h-screen bg-[#050505] text-white pt-24 pb-12 relative overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[-20%] left-[-10%] w-[800px] h-[800px] bg-pink-600/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-pink-200 text-transparent bg-clip-text"
                    >
                        Unlock Your Viral Potential
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-zinc-400 max-w-2xl mx-auto"
                    >
                        Choose the perfect plan to skyrocket your content reach.
                    </motion.p>
                </div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto"
                >
                    {/* Free Plan */}
                    <motion.div variants={itemVariants} className="p-8 rounded-3xl bg-zinc-900/40 border border-white/5 backdrop-blur-xl flex flex-col hover:border-white/10 transition-colors">
                        <div className="w-12 h-12 rounded-2xl bg-zinc-800 flex items-center justify-center mb-6">
                            <Star className="text-zinc-400" />
                        </div>
                        <h3 className="text-2xl font-bold mb-2">Starter</h3>
                        <div className="text-4xl font-bold mb-6">$0<span className="text-lg text-zinc-500 font-normal">/mo</span></div>
                        <p className="text-zinc-400 mb-6 text-sm">Perfect for trying out the power of AI analysis.</p>

                        <ul className="space-y-4 mb-8 flex-1">
                            <li className="flex items-center gap-3 text-zinc-300">
                                <Check className="text-zinc-500" size={18} />
                                <span className="font-semibold text-white">3 Analyses</span> / month
                            </li>
                            <li className="flex items-center gap-3 text-zinc-300">
                                <Check className="text-zinc-500" size={18} /> Basic Viral Scoring
                            </li>
                            <li className="flex items-center gap-3 text-zinc-300">
                                <Check className="text-zinc-500" size={18} /> Script Analysis
                            </li>
                        </ul>
                        <Link href="/dashboard" className="w-full py-4 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-center font-semibold transition-all hover:scale-[1.02]">
                            Current Plan
                        </Link>
                    </motion.div>

                    {/* Pro Plan (Popular) */}
                    <motion.div
                        variants={itemVariants}
                        className="p-8 rounded-3xl bg-gradient-to-b from-purple-900/20 to-zinc-900/40 border border-purple-500/30 backdrop-blur-xl flex flex-col relative group"
                    >
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-600 to-pink-600 px-4 py-1 rounded-full text-sm font-bold shadow-lg shadow-purple-500/20 flex items-center gap-2">
                            <Zap size={14} className="fill-white" /> MOST POPULAR
                        </div>

                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-600 to-pink-600 flex items-center justify-center mb-6 shadow-lg shadow-purple-500/20 group-hover:scale-110 transition-transform duration-300">
                            <Crown className="text-white fill-white" />
                        </div>

                        <h3 className="text-2xl font-bold mb-2 text-white">Pro Creator</h3>
                        <div className="text-4xl font-bold mb-6">$14.99<span className="text-lg text-zinc-500 font-normal">/mo</span></div>
                        <p className="text-purple-200/60 mb-6 text-sm">For serious creators ready to dominate the algorithm.</p>

                        <ul className="space-y-4 mb-8 flex-1">
                            <li className="flex items-center gap-3 text-white">
                                <div className="p-1 rounded-full bg-purple-500/20 text-purple-400"><Check size={14} /></div>
                                <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">30 Analyses</span> / month
                            </li>
                            <li className="flex items-center gap-3 text-white">
                                <div className="p-1 rounded-full bg-purple-500/20 text-purple-400"><Check size={14} /></div>
                                Deep AI Insights & Hooks
                            </li>
                            <li className="flex items-center gap-3 text-white">
                                <div className="p-1 rounded-full bg-purple-500/20 text-purple-400"><Check size={14} /></div>
                                Viral Script Rewrites
                            </li>
                            <li className="flex items-center gap-3 text-white">
                                <div className="p-1 rounded-full bg-purple-500/20 text-purple-400"><Check size={14} /></div>
                                Priority Processing
                            </li>
                        </ul>

                        {/* REPLACE THIS URL WITH YOUR ACTUAL LEMON SQUEEZY CHECKOUT URL FOR PRO PLAN */}
                        <a
                            href="https://store.lemonsqueezy.com/checkout/buy/..."
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full py-4 rounded-xl bg-white text-black hover:bg-zinc-200 text-center font-bold transition-all hover:scale-[1.02] flex items-center justify-center gap-2 shadow-lg shadow-white/10"
                        >
                            <Zap size={20} className="fill-current" /> Upgrade to Pro
                        </a>
                    </motion.div>

                    {/* Agency Plan */}
                    <motion.div variants={itemVariants} className="p-8 rounded-3xl bg-zinc-900/40 border border-white/5 backdrop-blur-xl flex flex-col hover:border-white/10 transition-colors">
                        <div className="w-12 h-12 rounded-2xl bg-zinc-800 flex items-center justify-center mb-6">
                            <Shield className="text-zinc-400" />
                        </div>
                        <h3 className="text-2xl font-bold mb-2">Agency</h3>
                        <div className="text-4xl font-bold mb-6">$29.99<span className="text-lg text-zinc-500 font-normal">/mo</span></div>
                        <p className="text-zinc-400 mb-6 text-sm">Maximum power for high-volume content production.</p>

                        <ul className="space-y-4 mb-8 flex-1">
                            <li className="flex items-center gap-3 text-zinc-300">
                                <Check className="text-zinc-500" size={18} />
                                <span className="font-semibold text-white">60 Analyses</span> / month
                            </li>
                            <li className="flex items-center gap-3 text-zinc-300">
                                <Check className="text-zinc-500" size={18} /> Everything in Pro
                            </li>
                            <li className="flex items-center gap-3 text-zinc-300">
                                <Check className="text-zinc-500" size={18} /> White-label PDF Reports
                            </li>
                            <li className="flex items-center gap-3 text-zinc-300">
                                <Check className="text-zinc-500" size={18} /> API Access (Beta)
                            </li>
                        </ul>

                        {/* REPLACE THIS URL WITH YOUR ACTUAL LEMON SQUEEZY CHECKOUT URL FOR AGENCY PLAN */}
                        <a
                            href="https://store.lemonsqueezy.com/checkout/buy/..."
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full py-4 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-center font-semibold transition-all hover:scale-[1.02]"
                        >
                            Get Agency Plan
                        </a>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
}
