"use client";
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Zap } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface UpgradeModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function UpgradeModal({ isOpen, onClose }: UpgradeModalProps) {
    const router = useRouter();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                    >
                        {/* Modal Container */}
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="relative w-full max-w-lg bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl shadow-purple-500/20"
                        >
                            {/* Header */}
                            <div className="flex items-center justify-between p-6 border-b border-zinc-800 bg-zinc-900/50">
                                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                                    <Zap className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                                    Insufficient Credits
                                </h3>
                                <button
                                    onClick={onClose}
                                    className="p-2 hover:bg-zinc-800 rounded-full transition-colors text-zinc-400 hover:text-white"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Content */}
                            <div className="p-8 text-center">
                                <div className="w-16 h-16 bg-gradient-to-tr from-purple-500/20 to-pink-500/20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl shadow-purple-500/10">
                                    <Sparkles className="w-8 h-8 text-purple-400" />
                                </div>
                                <h4 className="text-2xl font-bold text-white mb-2">Unlock More Potential</h4>
                                <p className="text-zinc-400 mb-8 leading-relaxed">
                                    You've run out of credits to analyze this video. Upgrade your plan to continue creating viral hits without limits.
                                </p>

                                <div className="space-y-3">
                                    <button
                                        onClick={() => router.push('/dashboard/pricing')}
                                        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3.5 rounded-xl font-bold hover:opacity-90 transition-all shadow-lg shadow-purple-500/25 flex items-center justify-center gap-2"
                                    >
                                        <Zap className="w-4 h-4 fill-current" />
                                        Get More Credits
                                    </button>
                                    <button
                                        onClick={onClose}
                                        className="w-full bg-zinc-800 text-zinc-300 px-6 py-3.5 rounded-xl font-medium hover:bg-zinc-700 transition-colors"
                                    >
                                        Maybe Later
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
