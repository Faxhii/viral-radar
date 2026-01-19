"use client";

import Link from "next/link";
import { Check } from "lucide-react";
import { motion } from "framer-motion";

export default function PricingSection() {
    return (
        <section className="py-24 bg-black relative" id="pricing">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-purple-900/5 blur-[120px] pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl font-bold text-white mb-2 font-heading">Unbeatable Launch Offers</h2>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto perspective-1000">

                    {/* Starter ($9) */}
                    <motion.div
                        initial={{ opacity: 0, x: -20, rotateY: 10 }}
                        whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        whileHover={{ y: -10, rotateX: 5, scale: 1.02 }}
                        className="glass-card p-8 rounded-3xl flex flex-col h-full hover:bg-white/5 transition-colors border border-white/5 preserve-3d"
                    >
                        <h3 className="text-lg font-bold text-gray-300 mb-4">Starter</h3>
                        <div className="flex items-baseline gap-1 mb-6">
                            <span className="text-4xl font-bold text-white">$9</span>
                            <span className="text-sm text-gray-500">/month</span>
                        </div>

                        <div className="text-sm font-bold text-purple-400 mb-4">15 Credits / Month</div>
                        <p className="text-gray-400 text-sm mb-6">Perfect for creators just starting their viral journey.</p>

                        <ul className="space-y-4 mb-8 flex-1">
                            {[
                                "15 Credits / Month",
                                "Analyze ~15 Shorts or 30 mins Video",
                                "Script & Video Analysis Included",
                                "Actionable Improvement Plan",
                                "Viral Potential Score"
                            ].map((item, i) => (
                                <li key={i} className="flex items-center gap-3 text-sm text-gray-400">
                                    <Check className="text-gray-600 shrink-0" size={16} />
                                    {item}
                                </li>
                            ))}
                        </ul>

                        <Link href="/register" className="w-full py-4 rounded-xl border border-white/10 text-white text-center font-bold text-sm hover:bg-white/10 transition-all">
                            Get Started
                        </Link>
                    </motion.div>

                    {/* Pro Creator ($12) - Highlighted */}
                    <motion.div
                        initial={{ opacity: 0, y: -20, scale: 0.95 }}
                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        whileHover={{ y: -15, scale: 1.05, rotateX: 5, boxShadow: "0 20px 50px rgba(139,92,246,0.3)" }}
                        className="glass-3d p-8 rounded-3xl flex flex-col h-full relative group border-purple-500/30 bg-purple-500/5 shadow-[0_0_30px_rgba(139,92,246,0.15)] transform md:-translate-y-4 z-10 preserve-3d"
                    >
                        {/* 3D Floating Tag */}
                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 preserve-3d">
                            <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white text-[10px] font-bold px-6 py-2 rounded-full uppercase tracking-wide shadow-xl transform translate-z-20">
                                Most Popular
                            </div>
                        </div>

                        <h3 className="text-lg font-bold text-white mb-4">Pro Creator</h3>
                        <div className="flex items-baseline gap-1 mb-6">
                            <span className="text-5xl font-bold text-white">$12</span>
                            <span className="text-sm text-gray-400">/month</span>
                        </div>

                        <div className="text-sm font-bold text-green-400 mb-4">25 Credits / Month</div>
                        <p className="text-gray-300 text-sm mb-6">For serious creators ready to dominate the algorithm.</p>

                        <ul className="space-y-4 mb-8 flex-1">
                            {[
                                "25 Credits (Analyze ~25 Shorts)",
                                "Analyze ~50 mins Long Form Video",
                                "Advanced Full-Video Analysis",
                                "Audience Retention Strategy",
                                "Viral Script Rewrites"
                            ].map((item, i) => (
                                <li key={i} className="flex items-center gap-3 text-sm text-gray-200">
                                    <div className="p-1 rounded-full bg-green-500/20 shadow-[0_0_10px_rgba(34,197,94,0.3)]">
                                        <Check className="text-green-400 shrink-0" size={12} />
                                    </div>
                                    {item}
                                </li>
                            ))}
                        </ul>

                        <Link href="/register" className="w-full py-4 rounded-xl bg-white text-black text-center font-bold text-sm hover:bg-gray-200 transition-colors shadow-lg shadow-white/10 hover:shadow-white/20">
                            Upgrade to Pro
                        </Link>
                    </motion.div>

                    {/* Agency ($20) */}
                    <motion.div
                        initial={{ opacity: 0, x: 20, rotateY: -10 }}
                        whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        whileHover={{ y: -10, rotateX: 5, scale: 1.02 }}
                        className="glass-card p-8 rounded-3xl flex flex-col h-full hover:bg-white/5 transition-colors border border-white/5 preserve-3d"
                    >
                        <h3 className="text-lg font-bold text-gray-300 mb-4">Agency</h3>
                        <div className="flex items-baseline gap-1 mb-6">
                            <span className="text-4xl font-bold text-white">$20</span>
                            <span className="text-sm text-gray-500">/month</span>
                        </div>

                        <div className="text-sm font-bold text-purple-400 mb-4">50 Credits / Month</div>
                        <p className="text-gray-400 text-sm mb-6">Maximum power for high-volume content production & full video analysis.</p>

                        <ul className="space-y-4 mb-8 flex-1">
                            {[
                                "50 Credits (Analyze ~50 Shorts)",
                                "Analyze ~100 mins Long Form Video",
                                "Priority Analysis Queue (Skip Line)",
                                "Advanced Script & Content Strategy",
                                "Comprehensive Growth Roadmap"
                            ].map((item, i) => (
                                <li key={i} className="flex items-center gap-3 text-sm text-gray-400">
                                    <Check className="text-gray-600 shrink-0" size={16} />
                                    {item}
                                </li>
                            ))}
                        </ul>

                        <Link href="/register" className="w-full py-4 rounded-xl border border-white/10 text-white text-center font-bold text-sm hover:bg-white/10 transition-all">
                            Get Agency Access
                        </Link>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
