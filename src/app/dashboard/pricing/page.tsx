"use client";

import { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import { Check, Zap, Star, Crown, Shield } from "lucide-react";
import Link from "next/link";
import { createRazorpayOrder, verifyRazorpayPayment, getMe } from "@/lib/api";

interface User {
    id: number;
    email: string;
    plan: string;
    credits: number;
    has_used_starter: boolean;
}

export default function PricingPage() {
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const [showPaymentNotice, setShowPaymentNotice] = useState(false);
    const [pendingTransaction, setPendingTransaction] = useState<{ planId: string, amount: number } | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userData = await getMe();
                setUser(userData);
            } catch (error) {
                console.log("Not logged in");
            }
        };
        fetchUser();
    }, []);

    const loadRazorpay = () => {
        return new Promise((resolve) => {
            const script = document.createElement('script');
            script.src = 'https://checkout.razorpay.com/v1/checkout.js';
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    const initiatePayment = (planId: string, amount: number) => {
        setPendingTransaction({ planId, amount });
        setShowPaymentNotice(true);
    };

    const proceedWithPayment = async () => {
        if (!pendingTransaction) return;
        const { planId, amount } = pendingTransaction;
        setShowPaymentNotice(false);
        setLoading(true);
        const currency = "INR";
        try {
            const res = await loadRazorpay();
            if (!res) {
                alert('Razorpay SDK failed to load. Are you online?');
                return;
            }

            // 1. Create Order
            // Razorpay checks: 
            // INR: amount in paise (1000 = ₹10)
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

    const isCurrentPlan = (planName: string) => {
        if (!user) return planName === 'free';
        return user.plan === planName;
    };

    return (
        <div className="min-h-screen bg-[#050505] text-white pt-24 pb-12 relative overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[-20%] left-[-10%] w-[800px] h-[800px] bg-pink-600/10 rounded-full blur-[120px] pointer-events-none" />

            {/* Payment Notice Modal */}
            {showPaymentNotice && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="bg-zinc-900 border border-white/10 rounded-2xl max-w-md w-full p-6 shadow-2xl relative"
                    >
                        <div className="flex items-center gap-3 mb-4 text-purple-400">
                            <Shield className="w-8 h-8" />
                            <h3 className="text-xl font-bold text-white">Payment Update</h3>
                        </div>

                        <div className="space-y-4 text-zinc-300 text-sm leading-relaxed mb-8">
                            <p>
                                <strong>Measures to keep our prices low:</strong> We are currently upgrading our business banking infrastructure to bring you these launch offers.
                            </p>
                            <p>
                                To ensure uninterrupted service, payments are temporarily processed through our authorized billing representative, <strong className="text-white">Jumailath Kainottu</strong>.
                            </p>
                            <div className="bg-white/5 p-3 rounded-lg border border-white/5 text-xs text-zinc-400">
                                <p className="flex items-center gap-2 mb-1">
                                    <Shield size={12} className="text-green-500" />
                                    Your transaction is <strong>100% secure</strong> & encrypted.
                                </p>
                                <p>Backed by Razorpay protection. You will receive a receipt from ViralRadar immediately.</p>
                            </div>
                        </div>

                        <div className="flex flex-col gap-3">
                            <button
                                onClick={proceedWithPayment}
                                className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold transition-all"
                            >
                                Understood, Proceed to Secure Payment
                            </button>
                            <button
                                onClick={() => setShowPaymentNotice(false)}
                                className="w-full py-3 rounded-xl bg-transparent hover:bg-white/5 text-zinc-400 font-semibold transition-all"
                            >
                                Cancel
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}

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
                    className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-[1400px] mx-auto"
                >
                    {/* Free Plan */}
                    <motion.div variants={itemVariants} className="p-6 rounded-3xl bg-zinc-900/40 border border-white/5 backdrop-blur-xl flex flex-col hover:border-white/10 transition-colors">
                        <div className="w-10 h-10 rounded-2xl bg-zinc-800 flex items-center justify-center mb-6">
                            <Star className="text-zinc-400" size={20} />
                        </div>
                        <h3 className="text-xl font-bold mb-2">Free</h3>
                        <div className="text-3xl font-bold mb-6">$0<span className="text-sm text-zinc-500 font-normal">/mo</span></div>
                        <p className="text-zinc-400 mb-6 text-xs">Test the waters.</p>

                        <ul className="space-y-3 mb-8 flex-1 text-sm">
                            <li className="flex items-center gap-3 text-zinc-300">
                                <Check className="text-zinc-500" size={16} />
                                <span className="font-semibold text-white">3 Credits</span> / one-time
                            </li>
                            <li className="flex items-center gap-3 text-zinc-300">
                                <Check className="text-zinc-500" size={16} /> 1 Credit = 2 Mins Video
                            </li>
                        </ul>
                        {isCurrentPlan('free') ? (
                            <button disabled className="w-full py-3 rounded-xl bg-zinc-700/50 text-zinc-400 text-center font-semibold cursor-not-allowed text-sm">
                                Current Plan
                            </button>
                        ) : (
                            <Link href="/dashboard" className="w-full py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-center font-semibold transition-all hover:scale-[1.02] text-sm">
                                Downgrade
                            </Link>
                        )}
                    </motion.div>

                    {/* Starter Plan (New) */}
                    <motion.div variants={itemVariants} className="p-6 rounded-3xl bg-zinc-900/40 border border-blue-500/30 backdrop-blur-xl flex flex-col hover:border-blue-500/50 transition-colors relative">
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 px-3 py-1 rounded-full text-xs font-bold shadow-lg shadow-blue-500/20">
                            QUICK START
                        </div>
                        <div className="w-10 h-10 rounded-2xl bg-blue-900/40 flex items-center justify-center mb-6">
                            <Zap className="text-blue-400" size={20} />
                        </div>
                        <h3 className="text-xl font-bold mb-2">Starter</h3>
                        <div className="flex items-baseline gap-2 mb-6">
                            <span className="text-zinc-500 line-through text-lg">₹199</span>
                            <span className="text-3xl font-bold">₹49</span>
                            <span className="text-sm text-zinc-500 font-normal">/once</span>
                        </div>
                        <p className="text-zinc-400 mb-6 text-xs">Perfect for testing the waters and seeing the magic happen.</p>

                        <ul className="space-y-3 mb-8 flex-1 text-sm">
                            <li className="flex items-center gap-3 text-zinc-300">
                                <Check className="text-blue-500" size={16} />
                                <span className="font-semibold text-white">15 Credits</span> (Analyze ~15 Shorts)
                            </li>
                            <li className="flex items-center gap-3 text-zinc-300">
                                <Check className="text-blue-500" size={16} />
                                Complete Video & Script Analysis
                            </li>
                            <li className="flex items-center gap-3 text-zinc-300">
                                <Check className="text-blue-500" size={16} />
                                Actionable Improvement Plan
                            </li>
                            <li className="flex items-center gap-3 text-zinc-300">
                                <Check className="text-blue-500" size={16} />
                                Viral Potential Score
                            </li>
                            <li className="flex items-center gap-3 text-zinc-300 opacity-80 italic">
                                <Check className="text-blue-500" size={16} />
                                + Many more insights inside
                            </li>
                        </ul>

                        {user?.has_used_starter ? (
                            <button
                                disabled
                                className="w-full py-3 rounded-xl bg-zinc-800 text-zinc-500 text-center font-semibold cursor-not-allowed text-sm"
                            >
                                One-Time Offer Used
                            </button>
                        ) : (
                            <button
                                onClick={() => initiatePayment('starter', 49)}
                                disabled={loading}
                                className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-center font-semibold transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                            >
                                Get Started
                            </button>
                        )}
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
                        <div className="flex items-baseline gap-2 mb-6">
                            <span className="text-purple-300/50 line-through text-xl">₹999</span>
                            <span className="text-4xl font-bold">₹699</span>
                            <span className="text-lg text-zinc-500 font-normal">/mo</span>
                        </div>
                        <p className="text-purple-200/60 mb-6 text-sm">For serious creators ready to dominate the algorithm.</p>

                        <ul className="space-y-4 mb-8 flex-1 text-sm">
                            <li className="flex items-center gap-3 text-white">
                                <div className="p-1 rounded-full bg-purple-500/20 text-purple-400"><Check size={14} /></div>
                                <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">50 Credits</span> (Analyze ~50 Shorts)
                            </li>
                            <li className="flex items-center gap-3 text-white">
                                <div className="p-1 rounded-full bg-purple-500/20 text-purple-400"><Check size={14} /></div>
                                Advanced Full-Video Analysis
                            </li>
                            <li className="flex items-center gap-3 text-white">
                                <div className="p-1 rounded-full bg-purple-500/20 text-purple-400"><Check size={14} /></div>
                                Actionable Improvement Plan
                            </li>
                            <li className="flex items-center gap-3 text-white">
                                <div className="p-1 rounded-full bg-purple-500/20 text-purple-400"><Check size={14} /></div>
                                Audience Retention Strategy
                            </li>
                            <li className="flex items-center gap-3 text-white">
                                <div className="p-1 rounded-full bg-purple-500/20 text-purple-400"><Check size={14} /></div>
                                Viral Script Rewrites
                            </li>
                            <li className="flex items-center gap-3 text-white opacity-80 italic">
                                <div className="p-1 rounded-full bg-purple-500/20 text-purple-400"><Check size={14} /></div>
                                + All Deep-Dive Metrics
                            </li>
                        </ul>

                        {isCurrentPlan('pro') ? (
                            <button disabled className="w-full py-4 rounded-xl bg-zinc-700/50 text-zinc-400 text-center font-bold cursor-not-allowed">
                                Current Plan
                            </button>
                        ) : (
                            <button
                                onClick={() => initiatePayment('pro', 699)}
                                disabled={loading}
                                className="w-full py-4 rounded-xl bg-white text-black hover:bg-zinc-200 text-center font-bold transition-all hover:scale-[1.02] flex items-center justify-center gap-2 shadow-lg shadow-white/10 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" /> : <Zap size={20} className="fill-current" />}
                                Upgrade to Pro
                            </button>
                        )}
                    </motion.div>

                    {/* Agency Plan */}
                    <motion.div variants={itemVariants} className="p-8 rounded-3xl bg-gradient-to-b from-purple-900/20 to-zinc-900/40 border-2 border-purple-500/50 backdrop-blur-xl flex flex-col relative group shadow-2xl shadow-purple-900/20 hover:scale-105 transition-transform duration-300">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-600 to-pink-600 flex items-center justify-center mb-6 shadow-lg shadow-purple-500/20 group-hover:scale-110 transition-transform duration-300">
                            <Shield className="text-white fill-white" strokeWidth={0} />
                        </div>
                        <h3 className="text-2xl font-bold mb-2">Agency</h3>
                        <div className="flex items-baseline gap-2 mb-6">
                            <span className="text-zinc-500 line-through text-xl">₹1999</span>
                            <span className="text-4xl font-bold">₹899</span>
                            <span className="text-lg text-zinc-500 font-normal">/mo</span>
                        </div>
                        <p className="text-zinc-400 mb-6 text-sm">Maximum power for high-volume content production & full video analysis.</p>

                        <ul className="space-y-4 mb-8 flex-1 text-sm">
                            <li className="flex items-center gap-3 text-zinc-300">
                                <Check className="text-white" size={18} />
                                <span className="font-semibold text-white">110 Credits</span> (Analyze ~110 Shorts)
                            </li>
                            <li className="flex items-center gap-3 text-zinc-300">
                                <Check className="text-white" size={18} />
                                Priority Analysis Queue (Skip Line)
                            </li>
                            <li className="flex items-center gap-3 text-zinc-300">
                                <Check className="text-white" size={18} />
                                Advanced Script & Content Strategy
                            </li>
                            <li className="flex items-center gap-3 text-zinc-300">
                                <Check className="text-white" size={18} />
                                Comprehensive Growth Roadmap
                            </li>
                            <li className="flex items-center gap-3 text-zinc-300">
                                <Check className="text-white" size={18} />
                                Best Value per Analysis
                            </li>
                        </ul>

                        {isCurrentPlan('agency') ? (
                            <button disabled className="w-full py-4 rounded-xl bg-zinc-700/50 text-white text-center font-semibold cursor-not-allowed">
                                Current Plan
                            </button>
                        ) : (
                            <button
                                onClick={() => initiatePayment('agency', 899)}
                                disabled={loading}
                                className="w-full py-4 rounded-xl bg-white text-black hover:bg-zinc-100 text-center font-bold transition-all hover:scale-[1.02] shadow-xl shadow-white/10 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Get Agency Access
                            </button>
                        )}
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
}
