'use client';

import { useState, useEffect } from 'react';
import {
    Search,
    Star,
    CheckCircle,
    XCircle,
    Trash2,
    Loader2
} from 'lucide-react';
import { getReviews, updateReviewStatus, deleteReview, Review } from '@/lib/api/admin';
import { format } from 'date-fns';
import { toast } from 'sonner';

export function ReviewsTable() {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const limit = 10;

    const fetchReviews = async () => {
        setLoading(true);
        try {
            const res = await getReviews(page, limit);
            setReviews(res.data);
            setTotal(res.total);
        } catch (error) {
            toast.error('Failed to fetch reviews');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReviews();
    }, [page]);

    const handleStatusUpdate = async (id: number, approved: boolean) => {
        try {
            await updateReviewStatus(id, approved);
            toast.success(approved ? 'Review approved' : 'Review unapproved');
            fetchReviews();
        } catch (error) {
            toast.error('Failed to update status');
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Are you sure you want to delete this review?')) return;
        try {
            await deleteReview(id);
            toast.success('Review deleted');
            fetchReviews();
        } catch (error) {
            toast.error('Failed to delete review');
        }
    };

    return (
        <div className="space-y-4">
            <div className="border border-border/50 rounded-xl overflow-hidden bg-card/50 backdrop-blur-sm">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-border/50 bg-secondary/30">
                                <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">Reviewer</th>
                                <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">Rating</th>
                                <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">Content</th>
                                <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">Date</th>
                                <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border/50">
                            {loading && reviews.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="py-8 text-center text-muted-foreground">
                                        <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2" />
                                        Loading reviews...
                                    </td>
                                </tr>
                            ) : reviews.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="py-8 text-center text-muted-foreground">
                                        No reviews found
                                    </td>
                                </tr>
                            ) : (
                                reviews.map((review) => (
                                    <tr key={review.id} className="group hover:bg-secondary/20 transition-colors">
                                        <td className="py-3 px-4">
                                            <div className="font-medium text-sm">{review.name}</div>
                                            <div className="text-xs text-muted-foreground">{review.role}</div>
                                        </td>
                                        <td className="py-3 px-4">
                                            <div className="flex items-center gap-1">
                                                <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" />
                                                <span className="text-sm font-medium">{review.rating}</span>
                                            </div>
                                        </td>
                                        <td className="py-3 px-4">
                                            <p className="text-sm text-muted-foreground max-w-[300px] truncate" title={review.content}>
                                                {review.content}
                                            </p>
                                        </td>
                                        <td className="py-3 px-4">
                                            <span className="text-sm text-muted-foreground">
                                                {format(new Date(review.created_at), 'MMM d, yyyy')}
                                            </span>
                                        </td>
                                        <td className="py-3 px-4">
                                            <div className="flex items-center gap-2">
                                                {review.is_approved ? (
                                                    <button
                                                        onClick={() => handleStatusUpdate(review.id, false)}
                                                        className="p-1.5 rounded-lg bg-green-500/10 text-green-500 hover:bg-green-500/20"
                                                        title="Approved (Click to Unapprove)"
                                                    >
                                                        <CheckCircle className="w-4 h-4" />
                                                    </button>
                                                ) : (
                                                    <button
                                                        onClick={() => handleStatusUpdate(review.id, true)}
                                                        className="p-1.5 rounded-lg bg-secondary text-muted-foreground hover:bg-secondary/80"
                                                        title="Pending (Click to Approve)"
                                                    >
                                                        <CheckCircle className="w-4 h-4 opacity-50" />
                                                    </button>
                                                )}
                                                <button
                                                    onClick={() => handleDelete(review.id)}
                                                    className="p-1.5 rounded-lg hover:bg-red-500/10 text-muted-foreground hover:text-red-500 transition-colors"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
