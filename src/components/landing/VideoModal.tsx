"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { X, Play } from 'lucide-react';
import { useState, useEffect } from 'react';

interface VideoModalProps {
    isOpen: boolean;
    onClose: () => void;
    videoId?: string; // YouTube Video ID
}

export default function VideoModal({ isOpen, onClose, videoId = "dQw4w9WgXcQ" }: VideoModalProps) {
    // Defaulting to "Never Gonna Give You Up" as a placeholder safely, or better, use a generic tech demo.
    // Let's use a placeholder for now, user can change ID.

    // Prevent scrolling when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

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
                        className="fixed inset-0 bg-black/90 backdrop-blur-md z-[60] flex items-center justify-center p-4"
                    >
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-50"
                        >
                            <X size={24} />
                        </button>

                        {/* Modal Content */}
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="relative w-full max-w-5xl aspect-video bg-black rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-purple-500/20"
                        >
                            <iframe
                                width="100%"
                                height="100%"
                                src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                                title="ViralRadar Demo"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                className="w-full h-full"
                            ></iframe>
                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
