"use client";

import { motion } from "framer-motion";
import { Check, Zap, Star } from "lucide-react";
import Link from "next/link";

export default function PricingPage() {
    return (
        <div className="min-h-screen bg-black text-white pt-24 pb-12">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent bg-clip-text"
                    >
                        Unlock Viral Potential
                    </motion.h1>
                    <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
                        Get unlimited AI analysis, deep insights, and viral script rewrites.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {/* Free Plan */}
                    <div className="p-8 rounded-3xl bg-zinc-900/50 border border-zinc-800 flex flex-col">
                        <h3 className="text-2xl font-bold mb-2">Free</h3>
                        <div className="text-4xl font-bold mb-6">$0<span className="text-lg text-zinc-500 font-normal">/mo</span></div>
                        <ul className="space-y-4 mb-8 flex-1">
                            <li className="flex items-center gap-3 text-zinc-300">
                                <Check className="text-zinc-500" size={20} /> 3 Analyses per month
                            </li>
                            <li className="flex items-center gap-3 text-zinc-300">
                                <Check className="text-zinc-500" size={20} /> Basic Scoring
                            </li>
                            <li className="flex items-center gap-3 text-zinc-300">
                                <Check className="text-zinc-500" size={20} /> Standard Support
                            </li>
                        </ul>
                        <Link href="/dashboard" className="w-full py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-center font-semibold transition-colors">
                            Current Plan
                        </Link>
                    </div>

                    {/* Pro Plan (Popular) */}
                    <motion.div
                        initial={{ scale: 0.95 }}
                        animate={{ scale: 1 }}
                        className="p-8 rounded-3xl bg-gradient-to-b from-purple-900/20 to-zinc-900/50 border border-purple-500/30 flex flex-col relative"
                    >
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-500 to-purple-500 px-4 py-1 rounded-full text-sm font-bold shadow-lg shadow-purple-500/20">
                            MOST POPULAR
                        </div>
                        <h3 className="text-2xl font-bold mb-2 text-white">Pro Creator</h3>
                        <div className="text-4xl font-bold mb-6">$29<span className="text-lg text-zinc-500 font-normal">/mo</span></div>
                        <ul className="space-y-4 mb-8 flex-1">
                            <li className="flex items-center gap-3 text-white">
                                <div className="p-1 rounded-full bg-green-500/20 text-green-400"><Check size={14} /></div>
                                Unlimited Analysis
                            </li>
                            <li className="flex items-center gap-3 text-white">
                                <div className="p-1 rounded-full bg-green-500/20 text-green-400"><Check size={14} /></div>
                                Deep AI Insights
                            </li>
                            <li className="flex items-center gap-3 text-white">
                                <div className="p-1 rounded-full bg-green-500/20 text-green-400"><Check size={14} /></div>
                                Viral Script Rewrites
                            </li>
                            <li className="flex items-center gap-3 text-white">
                                <div className="p-1 rounded-full bg-green-500/20 text-green-400"><Check size={14} /></div>
                                Priority Support
                            </li>
                        </ul>
                        {/* REPLACE THIS URL WITH YOUR ACTUAL LEMON SQUEEZY CHECKOUT URL */}
                        <a
                            href="https://store.lemonsqueezy.com/checkout/buy/..."
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full py-3 rounded-xl bg-white text-black hover:bg-zinc-200 text-center font-bold transition-colors flex items-center justify-center gap-2"
                        >
                            <Zap size={20} className="fill-current" /> Upgrade Now
                        </a>
                    </motion.div>

                    {/* Agency Plan */}
                    <div className="p-8 rounded-3xl bg-zinc-900/50 border border-zinc-800 flex flex-col">
                        <h3 className="text-2xl font-bold mb-2">Agency</h3>
                        <div className="text-4xl font-bold mb-6">$99<span className="text-lg text-zinc-500 font-normal">/mo</span></div>
                        <ul className="space-y-4 mb-8 flex-1">
                            <li className="flex items-center gap-3 text-zinc-300">
                                <Check className="text-zinc-500" size={20} /> Everything in Pro
                            </li>
                            <li className="flex items-center gap-3 text-zinc-300">
                                <Check className="text-zinc-500" size={20} /> 5 Team Members
                            </li>
                            <li className="flex items-center gap-3 text-zinc-300">
                                <Check className="text-zinc-500" size={20} /> White-label Reports
                            </li>
                            <li className="flex items-center gap-3 text-zinc-300">
                                <Check className="text-zinc-500" size={20} /> API Access
                            </li>
                        </ul>
                        <button className="w-full py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-center font-semibold transition-colors">
                            Contact Sales
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
