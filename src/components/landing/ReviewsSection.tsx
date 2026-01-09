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

    // Form State
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
            const rawUrl = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080').replace(/\/$/, '');
            const API_URL = rawUrl.match(/^https?:\/\//) ? rawUrl : `https://${rawUrl}`;

            const response = await fetch(`${API_URL}/reviews`);
            if (response.ok) {
                const data = await response.json();
                setReviews(data);
            }
        } catch (error) {
            console.error("Failed to fetch reviews", error);
        } finally {
            setIsLoading(false);
        }
    };

    // Prepare reviews for marquee
    const getMarqueeItems = () => {
        if (reviews.length === 0) return [];
        let items = [...reviews];
        // Ensure we have enough items for a smooth loop
        while (items.length < 10) {
            items = [...items, ...reviews];
        }
        return [...items, ...items];
    };

    const marqueeReviews = getMarqueeItems();

    if (!isMounted) {
        return (
            <section className="py-12 bg-zinc-900/30 relative overflow-hidden min-h-[400px]">
                <div className="container mx-auto px-6 relative z-10">
                    <div className="flex justify-between items-end mb-8 max-w-6xl mx-auto">
                        <div>
                            <h2 className="text-3xl font-bold mb-2">Community Reviews</h2>
                            <p className="text-zinc-400 text-sm">See what other creators are saying.</p>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    const handleSubmitReview = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newName || !newContent) {
            toast.error("Please fill in your name and review.");
            return;
        }

        setIsSubmitting(true);

        try {
            const rawUrl = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080').replace(/\/$/, '');
            const API_URL = rawUrl.match(/^https?:\/\//) ? rawUrl : `https://${rawUrl}`;

            const response = await fetch(`${API_URL}/reviews`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
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
        <section className="py-12 bg-zinc-900/30 relative overflow-hidden">
            {/* CSS Animation for Marquee */}
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

            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 -left-64 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-1/4 -right-64 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
            </div>

            {/* Header Content - Constrained Width */}
            <div className="container mx-auto px-6 relative z-10 mb-8">
                <div className="flex justify-between items-end max-w-6xl mx-auto">
                    <div>
                        <h2 className="text-3xl font-bold mb-2">Community Reviews</h2>
                        <p className="text-zinc-400 text-sm">
                            See what other creators are saying.
                        </p>
                    </div>
                    <button
                        onClick={() => setIsFormOpen(true)}
                        className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-full font-bold text-sm hover:bg-zinc-200 transition-colors shadow-lg shadow-white/10"
                    >
                        <Plus className="w-4 h-4" /> Add Review
                    </button>
                </div>
            </div>

            {/* Marquee Container - Full Width (Outside Container) */}
            <div className="relative w-full overflow-hidden">
                <div className="flex w-max animate-scroll gap-6 py-4">
                    {marqueeReviews.map((review, index) => (
                        <div
                            key={`${review.id}-${index}`}
                            className="w-[350px] flex-shrink-0"
                        >
                            <motion.div
                                whileHover={{ scale: 1.02, y: -5 }}
                                className="bg-zinc-900/80 border border-zinc-800 p-6 rounded-2xl hover:border-purple-500/30 transition-all hover:shadow-xl hover:shadow-purple-500/20 flex flex-col h-full cursor-pointer h-[220px]"
                            >
                                <div className="flex gap-1 text-yellow-500 mb-4">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className={`w-3 h-3 ${i < review.rating ? 'fill-current' : 'text-zinc-700 fill-zinc-700'}`}
                                        />
                                    ))}
                                </div>
                                <p className="text-zinc-300 text-sm mb-4 leading-relaxed flex-grow line-clamp-4">"{review.content}"</p>
                                <div className="flex items-center gap-3 mt-auto">
                                    {review.image ? (
                                        <img src={review.image} alt={review.name} className="w-8 h-8 rounded-full border border-zinc-700 object-cover" />
                                    ) : (
                                        <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center border border-zinc-700">
                                            <User className="w-4 h-4 text-zinc-500" />
                                        </div>
                                    )}
                                    <div>
                                        <h4 className="font-bold text-white text-xs">{review.name}</h4>
                                        <p className="text-[10px] text-zinc-500">{review.role}</p>
                                    </div>
                                    <span className="ml-auto text-[10px] text-zinc-600">
                                        {review.created_at ? new Date(review.created_at).toLocaleDateString() : "Just now"}
                                    </span>
                                </div>
                            </motion.div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Review Modal */}
            <AnimatePresence>
                {isFormOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsFormOpen(false)}
                            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="fixed inset-0 m-auto w-full max-w-lg h-fit bg-zinc-900 border border-zinc-800 rounded-3xl p-8 z-50 shadow-2xl shadow-purple-500/20"
                        >
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-2xl font-bold">Share Your Experience</h3>
                                <button
                                    onClick={() => setIsFormOpen(false)}
                                    className="p-2 hover:bg-zinc-800 rounded-full transition-colors"
                                >
                                    <X className="w-5 h-5 text-zinc-400" />
                                </button>
                            </div>

                            <form onSubmit={handleSubmitReview} className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-xs font-medium text-zinc-400 ml-1">Name</label>
                                        <input
                                            type="text"
                                            value={newName}
                                            onChange={(e) => setNewName(e.target.value)}
                                            placeholder="Your Name"
                                            className="w-full bg-black/50 border border-zinc-800 rounded-xl px-4 py-2 text-white text-sm focus:outline-none focus:border-purple-500 transition-colors"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs font-medium text-zinc-400 ml-1">Role</label>
                                        <input
                                            type="text"
                                            value={newRole}
                                            onChange={(e) => setNewRole(e.target.value)}
                                            placeholder="e.g. YouTuber"
                                            className="w-full bg-black/50 border border-zinc-800 rounded-xl px-4 py-2 text-white text-sm focus:outline-none focus:border-purple-500 transition-colors"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <label className="text-xs font-medium text-zinc-400 ml-1">Rating</label>
                                    <div className="flex gap-2">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <button
                                                key={star}
                                                type="button"
                                                onClick={() => setNewRating(star)}
                                                className="focus:outline-none transition-transform hover:scale-110"
                                            >
                                                <Star
                                                    className={`w-6 h-6 ${star <= newRating ? 'text-yellow-500 fill-yellow-500' : 'text-zinc-700'}`}
                                                />
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <label className="text-xs font-medium text-zinc-400 ml-1">Review</label>
                                    <textarea
                                        value={newContent}
                                        onChange={(e) => setNewContent(e.target.value)}
                                        placeholder="What did you think?"
                                        rows={3}
                                        className="w-full bg-black/50 border border-zinc-800 rounded-xl px-4 py-2 text-white text-sm focus:outline-none focus:border-purple-500 transition-colors resize-none"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-white text-black font-bold py-3 rounded-xl hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
                                >
                                    {isSubmitting ? (
                                        <span className="animate-pulse">Submitting...</span>
                                    ) : (
                                        <>
                                            Submit Review <Send className="w-4 h-4" />
                                        </>
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
