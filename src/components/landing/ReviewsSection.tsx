"use client";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, User, Send, Plus, X } from 'lucide-react';
import { toast } from 'sonner';

interface Review {
    id: number;
    name: string;
    role: string;
    content: string;
    rating: number;
    image?: string;
    created_at?: string;
}

export default function ReviewsSection() {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const [newName, setNewName] = useState('');
    const [newRole, setNewRole] = useState('');
    const [newContent, setNewContent] = useState('');
    const [newRating, setNewRating] = useState(5);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        fetchReviews();
    }, []);

    const fetchReviews = async () => {
        try {
            const rawUrl = (process.env.NEXT_PUBLIC_API_URL || 'https://viral-radar-backend.up.railway.app').replace(/\/$/, '');
            const API_URL = rawUrl.match(/^https?:\/\//) ? rawUrl : `https://${rawUrl}`;

            try {
                const response = await fetch(`${API_URL}/reviews`);
                if (response.ok) {
                    const data = await response.json();
                    setReviews(data);
                }
            } catch (error) {
                console.warn("Reviews fetch failed.");
            }
        } catch (error) {
            console.error("Failed to fetch reviews", error);
        } finally {
            setIsLoading(false);
        }
    };

    const getMarqueeItems = () => {
        if (reviews.length === 0) return [];
        let items = [...reviews];
        while (items.length < 10) {
            items = [...items, ...reviews];
        }
        return [...items, ...items];
    };

    const marqueeReviews = getMarqueeItems();

    if (!isMounted) return null;

    const handleSubmitReview = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newName || !newContent) {
            toast.error("Please fill in your name and review.");
            return;
        }

        setIsSubmitting(true);

        try {
            const rawUrl = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000').replace(/\/$/, '');
            const API_URL = rawUrl.match(/^https?:\/\//) ? rawUrl : `https://${rawUrl}`;

            const response = await fetch(`${API_URL}/reviews`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: newName,
                    role: newRole || "Content Creator",
                    content: newContent,
                    rating: newRating,
                }),
            });

            if (response.ok) {
                const newReview = await response.json();
                setReviews([newReview, ...reviews]);
                setNewName('');
                setNewRole('');
                setNewContent('');
                setNewRating(5);
                setIsFormOpen(false);
                toast.success("Review submitted successfully!");
            } else {
                toast.error("Failed to submit review.");
            }
        } catch (error) {
            console.error("Error submitting review", error);
            toast.error("Something went wrong.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="relative py-24 overflow-hidden" id="reviews">
            <style jsx>{`
                @keyframes scroll {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .animate-scroll {
                    animation: scroll 40s linear infinite;
                }
                .animate-scroll:hover {
                    animation-play-state: paused;
                }
            `}</style>

            {/* Background Effects */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-1/4 -left-64 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px]" />
                <div className="absolute bottom-1/4 -right-64 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px]" />
            </div>

            <div className="container mx-auto px-6 relative z-10 mb-12">
                <div className="flex flex-col md:flex-row justify-between items-end gap-6">
                    <div>
                        <h2 className="text-3xl md:text-5xl font-bold font-heading mb-4">
                            Community <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">Voices</span>
                        </h2>
                        <p className="text-gray-400">See what 2,500+ creators are saying about ViralRadar.</p>
                    </div>
                    <button
                        onClick={() => setIsFormOpen(true)}
                        className="glass-button px-6 py-3 rounded-full font-bold text-white flex items-center gap-2 hover:bg-white/20 hover:scale-105 transition-all text-sm"
                    >
                        <Plus className="w-4 h-4" /> Add Your Review
                    </button>
                </div>
            </div>

            {/* Marquee */}
            <div className="relative w-full overflow-hidden">
                <div className="flex w-max animate-scroll gap-6 py-4 px-4">
                    {marqueeReviews.map((review, index) => (
                        <div key={`${review.id}-${index}`} className="w-[350px] flex-shrink-0">
                            <motion.div
                                whileHover={{ scale: 1.02, y: -5 }}
                                className="glass-card p-6 rounded-2xl border border-white/5 hover:border-purple-500/30 flex flex-col h-[240px]"
                            >
                                <div className="flex gap-1 mb-4">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            size={14}
                                            className={`${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-700'}`}
                                        />
                                    ))}
                                </div>
                                <p className="text-gray-300 text-sm mb-6 leading-relaxed flex-grow line-clamp-4 italic">
                                    "{review.content}"
                                </p>
                                <div className="flex items-center gap-3 mt-auto">
                                    {review.image ? (
                                        <img src={review.image} alt={review.name} className="w-10 h-10 rounded-full border border-white/10 object-cover" />
                                    ) : (
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500/20 to-cyan-500/20 flex items-center justify-center border border-white/10">
                                            <User className="w-5 h-5 text-gray-400" />
                                        </div>
                                    )}
                                    <div>
                                        <h4 className="font-bold text-white text-sm font-heading">{review.name}</h4>
                                        <p className="text-xs text-gray-500">{review.role}</p>
                                    </div>
                                    <span className="ml-auto text-xs text-gray-600 block">
                                        {review.created_at ? new Date(review.created_at).toLocaleDateString() : "Verified"}
                                    </span>
                                </div>
                            </motion.div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Modal */}
            <AnimatePresence>
                {isFormOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsFormOpen(false)}
                            className="fixed inset-0 bg-black/80 backdrop-blur-md z-50"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="fixed inset-0 m-auto w-full max-w-lg h-fit glass-card p-8 rounded-3xl z-50 border border-white/10 shadow-2xl"
                        >
                            <div className="flex justify-between items-center mb-8">
                                <h3 className="text-2xl font-bold font-heading text-white">Share Experience</h3>
                                <button onClick={() => setIsFormOpen(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                                    <X className="w-5 h-5 text-gray-400" />
                                </button>
                            </div>

                            <form onSubmit={handleSubmitReview} className="space-y-6">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Name</label>
                                        <input
                                            type="text"
                                            value={newName}
                                            onChange={(e) => setNewName(e.target.value)}
                                            placeholder="Your Name"
                                            className="w-full glass-input rounded-xl px-4 py-3 text-white text-sm"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Role</label>
                                        <input
                                            type="text"
                                            value={newRole}
                                            onChange={(e) => setNewRole(e.target.value)}
                                            placeholder="e.g. Creator"
                                            className="w-full glass-input rounded-xl px-4 py-3 text-white text-sm"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Rating</label>
                                    <div className="flex gap-2">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <button
                                                key={star}
                                                type="button"
                                                onClick={() => setNewRating(star)}
                                                className="focus:outline-none hover:scale-110 transition-transform"
                                            >
                                                <Star
                                                    className={`w-8 h-8 ${star <= newRating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-700'}`}
                                                />
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Review</label>
                                    <textarea
                                        value={newContent}
                                        onChange={(e) => setNewContent(e.target.value)}
                                        placeholder="How has ViralRadar helped you?"
                                        rows={4}
                                        className="w-full glass-input rounded-xl px-4 py-3 text-white text-sm resize-none"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-white text-black font-bold py-4 rounded-xl hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 mt-4"
                                >
                                    {isSubmitting ? (
                                        <span className="animate-pulse">Submitting...</span>
                                    ) : (
                                        <>Submit Review <Send className="w-4 h-4" /></>
                                    )}
                                </button>
                            </form>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </section>
    );
}
