"use client";
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Plus, Minus } from 'lucide-react';

const faqs = [
    {
        question: "How does the AI analysis work?",
        answer: "We use advanced computer vision and natural language processing models (including gemini-2.0-flash) to analyze your video frame-by-frame. We check for pacing, hook strength, emotional triggers, and audio quality to predict viral potential."
    },
    {
        question: "Which platforms do you support?",
        answer: "Currently, we are optimized for short-form vertical video: YouTube Shorts, TikTok, and Instagram Reels. Our insights are tailored to the specific algorithms of these platforms."
    },
    {
        question: "Is there a free trial?",
        answer: "Yes! You can analyze your first 3 videos for free to see the power of our insights. No credit card required to get started."
    },
    {
        question: "Can I cancel my subscription anytime?",
        answer: "Absolutely. There are no long-term contracts. You can cancel your subscription at any time from your dashboard settings."
    }
];

export default function FAQSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return (
            <section className="py-24 bg-zinc-900/20">
                <div className="container mx-auto px-6 max-w-3xl">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold mb-6">Frequently Asked Questions</h2>
                        <p className="text-xl text-zinc-400">Everything you need to know about ViralRadar.in.</p>
                    </div>
                    <div className="space-y-4">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="h-20 bg-zinc-900/50 border border-zinc-800 rounded-2xl animate-pulse"></div>
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="py-24 bg-zinc-900/20">
            <div className="container mx-auto px-6 max-w-3xl">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">Frequently Asked Questions</h2>
                    <p className="text-xl text-zinc-400">Everything you need to know about ViralRadar.in.</p>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="border border-zinc-800 rounded-2xl bg-zinc-900/50 overflow-hidden"
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                                className="w-full flex items-center justify-between p-6 text-left hover:bg-zinc-800/50 transition-colors"
                            >
                                <span className="text-lg font-medium text-white">{faq.question}</span>
                                {openIndex === i ? (
                                    <Minus className="w-5 h-5 text-purple-500" />
                                ) : (
                                    <Plus className="w-5 h-5 text-zinc-500" />
                                )}
                            </button>
                            <AnimatePresence>
                                {openIndex === i && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="px-6 pb-6"
                                    >
                                        <p className="text-zinc-400 leading-relaxed">{faq.answer}</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
