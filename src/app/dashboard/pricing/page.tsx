"use client";

import { useState } from 'react';
import { motion } from "framer-motion";
import { Check, Zap, Star, Crown, Shield } from "lucide-react";
import Link from "next/link";
import { createRazorpayOrder, verifyRazorpayPayment } from "@/lib/api";

export default function PricingPage() {
    const [loading, setLoading] = useState(false);

    const loadRazorpay = () => {
        return new Promise((resolve) => {
            const script = document.createElement('script');
            script.src = 'https://checkout.razorpay.com/v1/checkout.js';
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    const handlePayment = async (planId: string, amount: number, currency: string = "INR") => {
        setLoading(true);
        try {
            const res = await loadRazorpay();
            if (!res) {
                alert('Razorpay SDK failed to load. Are you online?');
                return;
            }

            // 1. Create Order
            // Razorpay checks: 
            // INR: amount in paise (1000 = ₹10)
            // USD: amount in cents (1000 = $10)
            const order = await createRazorpayOrder(planId, amount * 100, currency);

            // 2. Open Razorpay
            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // Enter the Key ID generated from the Dashboard
                amount: order.amount.toString(),
                currency: order.currency,
                name: "ViralRadar.in",
                description: `Upgrade to ${planId === 'pro' ? 'Pro' : 'Agency'} Plan`,
                image: "/logo.png", // Ensure you have a logo or remove this
                order_id: order.id,
                handler: async function (response: any) {
                    // 3. Verify Payment
                    try {
                        await verifyRazorpayPayment({
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_signature: response.razorpay_signature,
                            plan: planId
                        });
                        alert('Payment Successful! Subscription upgraded.');
                        // Reload to reflect changes
                        window.location.reload();
                    } catch (error) {
                        console.error(error);
                        alert('Payment verification failed.');
                    }
                },
                prefill: {
                    // We can prefill if we have user info, but for now optional
                    // name: "User Name",
                    // email: "user@example.com",
                    // contact: "9999999999"
                },
                theme: {
                    color: "#a855f7"
                }
            };

            const paymentObject = new (window as any).Razorpay(options);
            paymentObject.open();

        } catch (error) {
            console.error('Payment Error:', error);
            alert('Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

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
                                <span className="font-semibold text-white">3 Credits</span> / one-time
                            </li>
                            <li className="flex items-center gap-3 text-zinc-300">
                                <Check className="text-zinc-500" size={18} /> 1 Credit = Short Video
                            </li>
                            <li className="flex items-center gap-3 text-zinc-300">
                                <Check className="text-zinc-500" size={18} /> 2 Credits = Long Video
                            </li>
                            <li className="flex items-center gap-3 text-zinc-300">
                                <Check className="text-zinc-500" size={18} /> 0.5 Credits = Script Analysis
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
                        <div className="text-4xl font-bold mb-6">$19<span className="text-lg text-zinc-500 font-normal">/mo</span></div>
                        <p className="text-purple-200/60 mb-6 text-sm">For serious creators ready to dominate the algorithm.</p>

                        <ul className="space-y-4 mb-8 flex-1">
                            <li className="flex items-center gap-3 text-white">
                                <div className="p-1 rounded-full bg-purple-500/20 text-purple-400"><Check size={14} /></div>
                                <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">40 Credits</span> / month
                            </li>
                            <li className="flex items-center gap-3 text-white">
                                <div className="p-1 rounded-full bg-purple-500/20 text-purple-400"><Check size={14} /></div>
                                Enough for 40 Shorts or 20 Long Videos!
                            </li>
                            <li className="flex items-center gap-3 text-white">
                                <div className="p-1 rounded-full bg-purple-500/20 text-purple-400"><Check size={14} /></div>
                                Deep AI Insights & Hooks
                            </li>
                            <li className="flex items-center gap-3 text-white">
                                <div className="p-1 rounded-full bg-purple-500/20 text-purple-400"><Check size={14} /></div>
                                Viral Script Rewrites
                            </li>
                        </ul>

                        <button
                            onClick={() => handlePayment('pro', 19, 'USD')}
                            disabled={loading}
                            className="w-full py-4 rounded-xl bg-white text-black hover:bg-zinc-200 text-center font-bold transition-all hover:scale-[1.02] flex items-center justify-center gap-2 shadow-lg shadow-white/10 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" /> : <Zap size={20} className="fill-current" />}
                            Upgrade to Pro
                        </button>
                    </motion.div>

                    {/* Agency Plan */}
                    <motion.div variants={itemVariants} className="p-8 rounded-3xl bg-zinc-900/40 border border-white/5 backdrop-blur-xl flex flex-col hover:border-white/10 transition-colors">
                        <div className="w-12 h-12 rounded-2xl bg-zinc-800 flex items-center justify-center mb-6">
                            <Shield className="text-zinc-400" />
                        </div>
                        <h3 className="text-2xl font-bold mb-2">Agency</h3>
                        <div className="text-4xl font-bold mb-6">$39<span className="text-lg text-zinc-500 font-normal">/mo</span></div>
                        <p className="text-zinc-400 mb-6 text-sm">Maximum power for high-volume content production.</p>

                        <ul className="space-y-4 mb-8 flex-1">
                            <li className="flex items-center gap-3 text-zinc-300">
                                <Check className="text-zinc-500" size={18} />
                                <span className="font-semibold text-white">100 Credits</span> / month
                            </li>
                            <li className="flex items-center gap-3 text-zinc-300">
                                <Check className="text-zinc-500" size={18} /> Best Value per Credit
                            </li>
                            <li className="flex items-center gap-3 text-zinc-300">
                                <Check className="text-zinc-500" size={18} /> White-label PDF Reports
                            </li>
                            <li className="flex items-center gap-3 text-zinc-300">
                                <Check className="text-zinc-500" size={18} /> API Access (Beta)
                            </li>
                        </ul>

                        <button
                            onClick={() => handlePayment('agency', 39, 'USD')}
                            disabled={loading}
                            className="w-full py-4 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-center font-semibold transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Get Agency Plan
                        </button>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
}
