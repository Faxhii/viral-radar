"use client";

import { useState } from 'react';
import { X, MessageSquarePlus, Bug } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '@/lib/api';
import { toast } from 'sonner';

interface FeedbackModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function FeedbackModal({ isOpen, onClose }: FeedbackModalProps) {
    const [type, setType] = useState<'feature_request' | 'bug_report'>('feature_request');
    const [content, setContent] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!content.trim()) return;

        setIsSubmitting(true);
        try {
            await api.post('/feedback/', { type, content });
            toast.success("Feedback submitted! Thank you.");
            setContent('');
            onClose();
        } catch (error) {
            console.error(error);
            toast.error("Failed to submit feedback.");
        } finally {
            setIsSubmitting(false);
        }
    };

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
                        className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none"
                    >
                        <div className="w-full max-w-md bg-zinc-900 border border-white/10 rounded-2xl shadow-2xl pointer-events-auto flex flex-col overflow-hidden">
                            {/* Header */}
                            <div className="p-4 border-b border-white/5 flex items-center justify-between bg-zinc-900/50">
                                <h2 className="text-lg font-semibold text-white">Send Feedback</h2>
                                <button
                                    onClick={onClose}
                                    className="p-1 text-zinc-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            {/* Body */}
                            <form onSubmit={handleSubmit} className="p-6 space-y-6">
                                {/* Type Selection */}
                                <div className="grid grid-cols-2 gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setType('feature_request')}
                                        className={`flex flex-col items-center gap-2 p-3 rounded-xl border transition-all ${type === 'feature_request'
                                                ? 'bg-purple-500/10 border-purple-500/50 text-purple-400'
                                                : 'bg-zinc-800/50 border-white/5 text-zinc-400 hover:bg-zinc-800'
                                            }`}
                                    >
                                        <MessageSquarePlus size={24} />
                                        <span className="text-sm font-medium">Feature Request</span>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setType('bug_report')}
                                        className={`flex flex-col items-center gap-2 p-3 rounded-xl border transition-all ${type === 'bug_report'
                                                ? 'bg-red-500/10 border-red-500/50 text-red-400'
                                                : 'bg-zinc-800/50 border-white/5 text-zinc-400 hover:bg-zinc-800'
                                            }`}
                                    >
                                        <Bug size={24} />
                                        <span className="text-sm font-medium">Report Bug</span>
                                    </button>
                                </div>

                                {/* Text Area */}
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-zinc-400">
                                        {type === 'feature_request' ? 'What would you like to see?' : 'Describe the problem'}
                                    </label>
                                    <textarea
                                        value={content}
                                        onChange={(e) => setContent(e.target.value)}
                                        placeholder={type === 'feature_request' ? "I wish the platform could..." : "I found an issue with..."}
                                        className="w-full h-32 bg-zinc-950 border border-white/10 rounded-xl p-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-purple-500/50 resize-none"
                                        required
                                    />
                                </div>

                                {/* Footer */}
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full py-3 rounded-xl bg-white text-black font-bold text-sm hover:bg-zinc-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isSubmitting ? 'Sending...' : 'Submit Feedback'}
                                </button>
                            </form>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
