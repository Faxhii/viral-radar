
import Link from "next/link";
import { Check, Zap, Crown, Shield, Star } from "lucide-react";
import { motion } from "framer-motion";

export default function PricingSection() {
    return (
        <section className="py-24 bg-black relative overflow-hidden" id="pricing">
            {/* Background Gradients */}
            <div className="absolute top-[20%] right-[-10%] w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-[20%] left-[-10%] w-[600px] h-[600px] bg-pink-600/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
                        Unbeatable Launch Offers
                    </h2>
                    <p className="text-zinc-400 max-w-2xl mx-auto text-lg">
                        Premium viral tools at a fraction of the cost. Limited time deals.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">

                    {/* Starter (Quick Start) */}
                    <div className="p-8 rounded-3xl bg-zinc-900/40 border border-blue-500/30 backdrop-blur-xl flex flex-col hover:border-blue-500/50 transition-all hover:-translate-y-1 duration-300 relative group">
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 px-4 py-1 rounded-full text-xs font-bold shadow-lg shadow-blue-500/20 uppercase tracking-wide">
                            Beginner Choice
                        </div>
                        <div className="w-12 h-12 rounded-2xl bg-blue-900/30 flex items-center justify-center mb-6 text-blue-400 group-hover:scale-110 transition-transform">
                            <Zap size={24} />
                        </div>
                        <h3 className="text-xl font-bold mb-2">Starter</h3>
                        <div className="flex items-baseline gap-2 mb-6">
                            <span className="text-zinc-500 line-through text-lg">₹199</span>
                            <span className="text-4xl font-bold text-white">₹49</span>
                            <span className="text-sm text-zinc-500 font-normal">/once</span>
                        </div>
                        <p className="text-zinc-400 mb-8 text-sm h-10">Perfect for testing the waters and seeing the magic happen.</p>

                        <ul className="space-y-4 mb-8 flex-1 text-sm text-zinc-300">
                            <li className="flex items-center gap-3">
                                <Check className="text-blue-500 shrink-0" size={18} />
                                <span className="font-semibold text-white">15 Credits</span> (Analyze ~15 Shorts)
                            </li>
                            <li className="flex items-center gap-3">
                                <Check className="text-blue-500 shrink-0" size={18} />
                                Complete Video & Script Analysis
                            </li>
                            <li className="flex items-center gap-3">
                                <Check className="text-blue-500 shrink-0" size={18} />
                                Actionable Improvement Plan
                            </li>
                            <li className="flex items-center gap-3">
                                <Check className="text-blue-500 shrink-0" size={18} />
                                Viral Potential Score
                            </li>
                            <li className="flex items-center gap-3 opacity-80 italic">
                                <Check className="text-blue-500 shrink-0" size={18} />
                                + Many more insights inside
                            </li>
                        </ul>

                        <Link href="/register" className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-center font-bold transition-all hover:shadow-lg hover:shadow-blue-600/20">
                            Get Started Now
                        </Link>
                    </div>

                    {/* Pro Creator (Popular) */}
                    <div className="p-8 rounded-3xl bg-gradient-to-b from-purple-900/20 to-zinc-900/40 border-2 border-purple-500/50 backdrop-blur-xl flex flex-col relative group scale-105 shadow-2xl shadow-purple-900/20 z-10">
                        <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-2 rounded-full text-sm font-bold shadow-lg shadow-purple-500/30 flex items-center gap-2 uppercase tracking-wide">
                            <Crown size={16} className="fill-white" /> Most Popular
                        </div>

                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-purple-600 to-pink-600 flex items-center justify-center mb-6 shadow-lg shadow-purple-500/20 group-hover:scale-110 transition-transform duration-300">
                            <Star className="text-white fill-white" size={28} />
                        </div>

                        <h3 className="text-2xl font-bold mb-2 text-white">Pro Creator</h3>
                        <div className="flex items-baseline gap-2 mb-6">
                            <span className="text-zinc-500 line-through text-lg">₹999</span>
                            <span className="text-5xl font-bold text-white">₹699</span>
                            <span className="text-sm text-zinc-500 font-normal">/mo</span>
                        </div>
                        <p className="text-purple-200/80 mb-8 text-sm h-10">For serious creators ready to dominate the algorithm.</p>

                        <ul className="space-y-4 mb-8 flex-1 text-sm text-white">
                            <li className="flex items-center gap-3">
                                <div className="p-1 rounded-full bg-purple-500/20 text-purple-400"><Check size={14} /></div>
                                <span className="font-bold">50 Credits</span> (Analyze ~50 Shorts)
                            </li>
                            <li className="flex items-center gap-3">
                                <div className="p-1 rounded-full bg-purple-500/20 text-purple-400"><Check size={14} /></div>
                                Advanced Full-Video Analysis
                            </li>
                            <li className="flex items-center gap-3">
                                <div className="p-1 rounded-full bg-purple-500/20 text-purple-400"><Check size={14} /></div>
                                Actionable Improvement Plan
                            </li>
                            <li className="flex items-center gap-3">
                                <div className="p-1 rounded-full bg-purple-500/20 text-purple-400"><Check size={14} /></div>
                                Audience Retention Strategy
                            </li>
                            <li className="flex items-center gap-3">
                                <div className="p-1 rounded-full bg-purple-500/20 text-purple-400"><Check size={14} /></div>
                                Viral Script Rewrites
                            </li>
                            <li className="flex items-center gap-3 opacity-80 italic">
                                <div className="p-1 rounded-full bg-purple-500/20 text-purple-400"><Check size={14} /></div>
                                + All Deep-Dive Metrics
                            </li>
                        </ul>

                        <Link href="/register" className="w-full py-4 rounded-xl bg-white text-black hover:bg-zinc-100 text-center font-bold transition-all hover:scale-[1.02] shadow-xl shadow-white/10">
                            Start Growing Today
                        </Link>
                    </div>

                    {/* Agency (Big Value) */}
                    <div className="p-8 rounded-3xl bg-gradient-to-b from-purple-900/20 to-zinc-900/40 border-2 border-purple-500/50 backdrop-blur-xl flex flex-col relative group shadow-2xl shadow-purple-900/20 hover:scale-105 transition-transform duration-300">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-purple-600 to-pink-600 flex items-center justify-center mb-6 shadow-lg shadow-purple-500/20 group-hover:scale-110 transition-transform duration-300">
                            <Shield className="text-white fill-white" size={28} />
                        </div>
                        <h3 className="text-xl font-bold mb-2">Agency</h3>
                        <div className="flex items-baseline gap-2 mb-6">
                            <span className="text-zinc-500 line-through text-lg">₹1999</span>
                            <span className="text-4xl font-bold text-white">₹899</span>
                            <span className="text-sm text-zinc-500 font-normal">/mo</span>
                        </div>
                        <p className="text-zinc-400 mb-8 text-sm h-10">Maximum power for high-volume content production & full video analysis.</p>

                        <ul className="space-y-4 mb-8 flex-1 text-sm text-zinc-300">
                            <li className="flex items-center gap-3">
                                <Check className="text-white" size={18} />
                                <span className="font-semibold text-white">110 Credits</span> (Analyze ~110 Shorts)
                            </li>
                            <li className="flex items-center gap-3">
                                <Check className="text-white" size={18} />
                                Priority Analysis Queue (Skip Line)
                            </li>
                            <li className="flex items-center gap-3">
                                <Check className="text-white" size={18} />
                                Advanced Script & Content Strategy
                            </li>
                            <li className="flex items-center gap-3">
                                <Check className="text-white" size={18} />
                                Comprehensive Growth Roadmap
                            </li>
                            <li className="flex items-center gap-3">
                                <Check className="text-white" size={18} />
                                Best Value per Analysis
                            </li>
                            <li className="flex items-center gap-3 opacity-80 italic">
                                <Check className="text-white" size={18} />
                                + Every Viral Tool Unlocked
                            </li>
                        </ul>

                        <Link href="/register" className="w-full py-4 rounded-xl bg-white text-black hover:bg-zinc-100 text-center font-bold transition-all hover:scale-[1.02] shadow-xl shadow-white/10">
                            Get Agency Access
                        </Link>
                    </div>

                </div>
            </div>
        </section>
    );
}
