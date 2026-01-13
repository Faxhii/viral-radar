"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import { useState } from 'react';
import DemoModal from '../DemoModal';
import Waveform from './Waveform';
import Floating3DShapes from './Floating3DShapes';

export default function HeroSection() {
    const [isDemoOpen, setIsDemoOpen] = useState(false);

    return (
        <section className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden pt-20 bg-black">
            <DemoModal isOpen={isDemoOpen} onClose={() => setIsDemoOpen(false)} />

            {/* Background Animation */}
            <div className="absolute inset-0 z-0">
                <Waveform />
                <Floating3DShapes />
                {/* Subtle gradient glow at the top for depth */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-purple-900/10 blur-[120px]" />
            </div>

            <div className="container relative z-10 px-4 mx-auto text-center mt-10">

                {/* Main Heading */}
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-5xl md:text-7xl font-bold font-sans mb-6 tracking-tight text-white max-w-5xl mx-auto leading-[1.1]"
                >
                    ViralRadar AI: Elevate Your <br className="hidden md:block" />
                    Content Creation with <span className="text-gray-400">Data-Driven Insights</span>
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed font-light"
                >
                    The ultimate AI tool for creators. Analyze, optimize, and explode your
                    video's viral potential with pinpoint accuracy.
                </motion.p>

                {/* CTA Buttons - Pill Style */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-24"
                >
                    <Link href="/login" className="px-8 py-3 rounded-full bg-white text-black font-semibold text-base hover:bg-gray-200 transition-colors shadow-lg shadow-white/5 whitespace-nowrap">
                        Analyze Video Now &rarr;
                    </Link>

                    <button
                        onClick={() => setIsDemoOpen(true)}
                        className="px-8 py-3 rounded-full border border-gray-700 text-white font-medium text-base hover:bg-white/5 transition-all flex items-center gap-2"
                    >
                        <Play className="w-4 h-4 fill-current" />
                        Watch Demo
                    </button>
                </motion.div>

            </div>
        </section>
    );
}
