"use client";
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play } from 'lucide-react';
import { useEffect, useState } from 'react';
import DemoAnimation from './DemoAnimation';

interface DemoModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function DemoModal({ isOpen, onClose }: DemoModalProps) {
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
                            className="relative w-full max-w-5xl bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl shadow-purple-500/20"
                        >
                            {/* Header */}
                            <div className="flex items-center justify-between p-4 border-b border-zinc-800 bg-zinc-900/50">
                                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                                    <Play className="w-4 h-4 text-purple-500 fill-purple-500" />
                                    Platform Demo
                                </h3>
                                <button
                                    onClick={onClose}
                                    className="p-2 hover:bg-zinc-800 rounded-full transition-colors text-zinc-400 hover:text-white"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Video Player Container */}
                            <div className="relative aspect-video bg-black group overflow-hidden">
                                <DemoAnimation />
                            </div>

                            {/* Footer / Call to Action */}
                            <div className="p-6 bg-zinc-900 border-t border-zinc-800 flex flex-col md:flex-row items-center justify-between gap-4">
                                <div>
                                    <h4 className="text-white font-medium mb-1">Ready to go viral?</h4>
                                    <p className="text-sm text-zinc-400">Join thousands of creators optimizing their content.</p>
                                </div>
                                <button
                                    onClick={() => window.location.href = '/register'}
                                    className="px-6 py-2.5 bg-white text-black rounded-lg font-semibold hover:bg-zinc-200 transition-colors"
                                >
                                    Get Started Free
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
