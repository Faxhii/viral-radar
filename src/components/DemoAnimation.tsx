"use client";
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Upload, Zap, CheckCircle, BarChart2, FileVideo, Sparkles } from 'lucide-react';

export default function DemoAnimation() {
    const [step, setStep] = useState<'upload' | 'scanning' | 'result'>('upload');
    const [score, setScore] = useState(0);

    useEffect(() => {
        // Animation sequence
        const uploadTimer = setTimeout(() => setStep('scanning'), 2000);

        const scanningTimer = setTimeout(() => {
            setStep('result');
            // Animate score up to 92
            let currentScore = 0;
            const scoreInterval = setInterval(() => {
                currentScore += 2;
                if (currentScore >= 92) {
                    currentScore = 92;
                    clearInterval(scoreInterval);
                }
                setScore(currentScore);
            }, 20);
        }, 5000);

        return () => {
            clearTimeout(uploadTimer);
            clearTimeout(scanningTimer);
        };
    }, []);

    return (
        <div className="w-full h-full bg-zinc-950 relative overflow-hidden flex items-center justify-center">
            {/* Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

            <AnimatePresence mode="wait">
                {step === 'upload' && (
                    <motion.div
                        key="upload"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
                        className="flex flex-col items-center gap-6 relative z-10"
                    >
                        <motion.div
                            animate={{ y: [0, -10, 0] }}
                            transition={{ repeat: Infinity, duration: 2 }}
                            className="w-24 h-24 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 flex items-center justify-center shadow-[0_0_30px_rgba(168,85,247,0.2)]"
                        >
                            <Upload className="w-10 h-10 text-purple-400" />
                        </motion.div>
                        <div className="text-center">
                            <h3 className="text-xl font-bold text-white mb-2">Upload Video</h3>
                            <p className="text-zinc-500">Drag & drop your content</p>
                        </div>

                        {/* Simulated File Drop */}
                        <motion.div
                            initial={{ y: 100, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="absolute top-0 bg-zinc-800 p-3 rounded-lg border border-zinc-700 flex items-center gap-3 shadow-xl"
                        >
                            <FileVideo className="w-5 h-5 text-blue-400" />
                            <span className="text-sm text-zinc-300">my_viral_video.mp4</span>
                        </motion.div>
                    </motion.div>
                )}

                {step === 'scanning' && (
                    <motion.div
                        key="scanning"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="flex flex-col items-center gap-8 relative z-10 w-full max-w-md px-8"
                    >
                        <div className="relative">
                            {/* Pulsing Rings */}
                            <motion.div
                                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                                transition={{ repeat: Infinity, duration: 2 }}
                                className="absolute inset-0 bg-purple-500/20 rounded-full blur-xl"
                            />
                            <div className="w-20 h-20 bg-zinc-900 rounded-full border border-purple-500/50 flex items-center justify-center relative z-10">
                                <Zap className="w-8 h-8 text-purple-400 fill-purple-400" />
                            </div>
                        </div>

                        <div className="w-full space-y-4">
                            <div className="flex justify-between text-sm">
                                <span className="text-purple-300 font-medium">AI Analyzing...</span>
                                <span className="text-zinc-500">78%</span>
                            </div>
                            <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: "0%" }}
                                    animate={{ width: "100%" }}
                                    transition={{ duration: 2.5, ease: "easeInOut" }}
                                    className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                                />
                            </div>
                            <div className="space-y-2">
                                <motion.div
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.5 }}
                                    className="flex items-center gap-2 text-xs text-zinc-400"
                                >
                                    <CheckCircle className="w-3 h-3 text-green-500" /> Checking hook retention
                                </motion.div>
                                <motion.div
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 1.0 }}
                                    className="flex items-center gap-2 text-xs text-zinc-400"
                                >
                                    <CheckCircle className="w-3 h-3 text-green-500" /> Analyzing pacing
                                </motion.div>
                                <motion.div
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 1.5 }}
                                    className="flex items-center gap-2 text-xs text-zinc-400"
                                >
                                    <CheckCircle className="w-3 h-3 text-green-500" /> Detecting emotional triggers
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                )}

                {step === 'result' && (
                    <motion.div
                        key="result"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col items-center gap-6 relative z-10 w-full max-w-lg"
                    >
                        <div className="flex items-center gap-6">
                            {/* Score Card */}
                            <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl flex flex-col items-center gap-2 shadow-2xl shadow-purple-500/10">
                                <span className="text-zinc-400 text-sm font-medium">Viral Score</span>
                                <div className="text-5xl font-bold bg-gradient-to-br from-green-400 to-emerald-600 bg-clip-text text-transparent">
                                    {score}
                                </div>
                                <div className="flex items-center gap-1 text-xs text-green-400 bg-green-400/10 px-2 py-1 rounded-full">
                                    <Sparkles className="w-3 h-3" /> Excellent
                                </div>
                            </div>

                            {/* Stats */}
                            <div className="space-y-3">
                                <div className="bg-zinc-900/50 border border-zinc-800 p-3 rounded-xl flex items-center gap-3 w-48">
                                    <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
                                        <BarChart2 className="w-4 h-4 text-blue-400" />
                                    </div>
                                    <div>
                                        <div className="text-xs text-zinc-500">Predicted Views</div>
                                        <div className="text-sm font-bold text-white">10k - 50k</div>
                                    </div>
                                </div>
                                <div className="bg-zinc-900/50 border border-zinc-800 p-3 rounded-xl flex items-center gap-3 w-48">
                                    <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center">
                                        <Zap className="w-4 h-4 text-purple-400" />
                                    </div>
                                    <div>
                                        <div className="text-xs text-zinc-500">Hook Strength</div>
                                        <div className="text-sm font-bold text-white">Strong</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Insight */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 border border-purple-500/20 p-4 rounded-xl w-full text-center"
                        >
                            <p className="text-sm text-purple-200">
                                <span className="font-bold">AI Tip:</span> Your hook is great! Try cutting the silence at 0:04 to improve retention.
                            </p>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
