'use client';

import { useState, useEffect } from 'react';
import {
    MessageSquare,
    Bug,
    Clock,
    CheckCircle,
    Loader2
} from 'lucide-react';
import { getFeedback, Feedback } from '@/lib/api/admin';
import { format } from 'date-fns';
import { toast } from 'sonner';

export function FeedbackList({ type }: { type?: string }) {
    const [items, setItems] = useState<Feedback[]>([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const limit = 10;

    const fetchFeedback = async () => {
        setLoading(true);
        try {
            // Note: 'status' argument is passed as undefined to query all statuses
            const res = await getFeedback(page, limit, undefined, type);
            setItems(res.data);
            setTotal(res.total);
        } catch (error) {
            toast.error('Failed to fetch feedback');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFeedback();
    }, [page]);

    return (
        <div className="space-y-4">
            <div className="grid gap-4">
                {loading && items.length === 0 ? (
                    <div className="text-center py-12 text-muted-foreground">
                        <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
                        Loading feedback...
                    </div>
                ) : items.length === 0 ? (
                    <div className="text-center py-12 text-muted-foreground bg-card/50 rounded-xl border border-border/50">
                        <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-20" />
                        No feedback found
                    </div>
                ) : (
                    items.map((item) => (
                        <div key={item.id} className="p-4 rounded-xl bg-card/50 border border-border/50 hover:border-primary/20 transition-colors flex gap-4">
                            <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center shrink-0">
                                {item.type === 'bug_report' ? (
                                    <Bug className="w-5 h-5 text-red-500" />
                                ) : (
                                    <MessageSquare className="w-5 h-5 text-blue-500" />
                                )}
                            </div>
                            <div className="flex-1 space-y-1">
                                <div className="flex items-center justify-between">
                                    <h3 className="font-medium capitalize">{item.type.replace('_', ' ')}</h3>
                                    <span className="text-xs text-muted-foreground">
                                        {format(new Date(item.created_at), 'MMM d, yyyy h:mm a')}
                                    </span>
                                </div>
                                <p className="text-sm text-foreground/80">{item.content}</p>
                                <div className="flex items-center gap-4 mt-2">
                                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                                        <Clock className="w-3 h-3" />
                                        Status: {item.status}
                                    </span>
                                    {item.user?.email && (
                                        <span className="text-xs text-muted-foreground">
                                            User: {item.user.email}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
