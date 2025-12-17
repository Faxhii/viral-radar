"use client";
import Link from 'next/link';
import { ArrowRight, Play, BarChart2, CheckCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DemoModal from '@/components/DemoModal';

const failureReasons = [
    "Weak Hook",
    "Bad Pacing",
    "Low Retention",
    "Boring Script",
    "Poor Audio",
    "No Call to Action"
];

export default function HeroSection() {
    const [showDemo, setShowDemo] = useState(false);
    const [reasonIndex, setReasonIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setReasonIndex((prev) => (prev + 1) % failureReasons.length);
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    return (
        <main className="container mx-auto px-6 py-20 text-center relative z-10">
            <h1 className="text-4xl md:text-7xl font-bold mb-8 tracking-tight">
                ViralRadar: AI for <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
                    Content Creation
                </span>
            </h1>

            <div className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-12 flex flex-col items-center gap-2">
                <p>
                    The ultimate AI tool for content creators. Paste your link or upload your video. Uncover exactly why your content isn't going viral due to
                </p>
                <div className="h-8 relative overflow-hidden w-full flex justify-center">
                    <AnimatePresence mode="wait">
                        <motion.span
                            key={reasonIndex}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -20, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="text-red-400 font-bold absolute"
                        >
                            {failureReasons[reasonIndex]}
                        </motion.span>
                    </AnimatePresence>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-4 px-4 sm:px-0">
                <Link href="/register" className="group w-full sm:w-auto flex items-center justify-center gap-2 bg-white text-black px-8 py-4 rounded-full text-lg font-bold hover:bg-gray-200 transition shadow-lg shadow-white/10">
                    Analyze Video Now
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <button
                    onClick={() => setShowDemo(true)}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-gray-700 hover:bg-gray-900 transition"
                >
                    <Play className="w-5 h-5" />
                    Watch Demo
                </button>
            </div>

            {/* Feature Grid */}
            <div id="features" className="grid md:grid-cols-3 gap-8 mt-32 text-left mb-32">
                <div className="p-8 rounded-2xl bg-gray-900/50 border border-gray-800 hover:border-purple-500/50 transition group">
                    <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                        <BarChart2 className="w-6 h-6 text-purple-400" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">Viral Score</h3>
                    <p className="text-gray-400">Get a 0-100 score based on hook, pacing, and emotional impact.</p>
                </div>
                <div className="p-8 rounded-2xl bg-gray-900/50 border border-gray-800 hover:border-pink-500/50 transition group">
                    <div className="w-12 h-12 bg-pink-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                        <CheckCircle className="w-6 h-6 text-pink-400" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">Actionable Checklist</h3>
                    <p className="text-gray-400">Specific steps to fix your video before you hit publish.</p>
                </div>
                <div className="p-8 rounded-2xl bg-gray-900/50 border border-gray-800 hover:border-red-500/50 transition group">
                    <div className="w-12 h-12 bg-red-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                        <Play className="w-6 h-6 text-red-400" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">Hook Optimization</h3>
                    <p className="text-gray-400">AI rewrites your hook to maximize retention in the first 3 seconds.</p>
                </div>
            </div>

            <DemoModal isOpen={showDemo} onClose={() => setShowDemo(false)} />
        </main>
    );
}
