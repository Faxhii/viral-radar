'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Search,
    Filter,
    MoreVertical,
    Play,
    FileText,
    CheckCircle,
    Clock,
    AlertCircle,
    Loader2
} from 'lucide-react';
import { getVideos, Video, deleteVideo } from '@/lib/api/admin';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

export function VideosTable() {
    const [videos, setVideos] = useState<Video[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [activeMenu, setActiveMenu] = useState<number | null>(null);
    const limit = 10;

    const fetchVideos = async () => {
        setLoading(true);
        try {
            const res = await getVideos(page, limit, search);
            setVideos(res.data);
            setTotal(res.total);
        } catch (error) {
            toast.error('Failed to fetch videos');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const debounce = setTimeout(fetchVideos, 300);
        return () => clearTimeout(debounce);
    }, [page, search]);

    const getStatusColor = (status: string) => {
        switch (status?.toLowerCase()) {
            case 'completed': return 'bg-green-500/10 text-green-500 border-green-500/20';
            case 'processing': return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
            case 'failed': return 'bg-red-500/10 text-red-500 border-red-500/20';
            default: return 'bg-secondary text-muted-foreground border-border';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status?.toLowerCase()) {
            case 'completed': return <CheckCircle className="w-3 h-3" />;
            case 'processing': return <Loader2 className="w-3 h-3 animate-spin" />;
            case 'failed': return <AlertCircle className="w-3 h-3" />;
            default: return <Clock className="w-3 h-3" />;
        }
    };

    return (
        <div className="space-y-4">
            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-card/50 p-4 rounded-xl border border-border/50">
                <div className="relative w-full sm:w-80">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                        type="text"
                        placeholder="Search by title..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full h-10 pl-9 pr-4 rounded-lg bg-background border border-border focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all outline-none"
                    />
                </div>
            </div>

            {/* Table */}
            <div className="border border-border/50 rounded-xl overflow-hidden bg-card/50 backdrop-blur-sm">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-border/50 bg-secondary/30">
                                <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">Content</th>
                                <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">Platform</th>
                                <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
                                <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">Date</th>
                                <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border/50">
                            {loading && videos.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="py-8 text-center text-muted-foreground">
                                        <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2" />
                                        Loading content...
                                    </td>
                                </tr>
                            ) : videos.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="py-8 text-center text-muted-foreground">
                                        No content found
                                    </td>
                                </tr>
                            ) : (
                                videos.map((video) => (
                                    <tr key={video.id} className="group hover:bg-secondary/20 transition-colors">
                                        <td className="py-3 px-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground">
                                                    {video.source_type === 'script' ? (
                                                        <FileText className="w-4 h-4" />
                                                    ) : (
                                                        <Play className="w-4 h-4 fill-current" />
                                                    )}
                                                </div>
                                                <div>
                                                    <p className="font-medium text-sm text-foreground truncate max-w-[200px]" title={video.title || 'Untitled'}>
                                                        {video.title || 'Untitled Video'}
                                                    </p>
                                                    <p className="text-xs text-muted-foreground">
                                                        {video.duration ? `${Math.floor(video.duration / 60)}:${(video.duration % 60).toString().padStart(2, '0')}` : 'Unknown duration'}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-3 px-4">
                                            <span className="text-sm capitalize">{video.platform_guess || 'Unknown'}</span>
                                        </td>
                                        <td className="py-3 px-4">
                                            <div className={cn("inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border", getStatusColor(video.status))}>
                                                {getStatusIcon(video.status)}
                                                <span className="capitalize">{video.status}</span>
                                            </div>
                                        </td>
                                        <td className="py-3 px-4">
                                            <span className="text-sm text-muted-foreground">
                                                {format(new Date(video.created_at), 'MMM d, yyyy')}
                                            </span>
                                        </td>
                                        <td className="py-3 px-4">
                                            <div className="relative">
                                                <button
                                                    onClick={() => setActiveMenu(activeMenu === video.id ? null : video.id)}
                                                    className="p-2 hover:bg-secondary rounded-lg transition-colors text-muted-foreground hover:text-foreground"
                                                >
                                                    <MoreVertical className="w-4 h-4" />
                                                </button>

                                                <AnimatePresence>
                                                    {activeMenu === video.id && (
                                                        <>
                                                            <div
                                                                className="fixed inset-0 z-10"
                                                                onClick={() => setActiveMenu(null)}
                                                            />
                                                            <motion.div
                                                                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                                                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                                                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                                                                className="absolute right-0 top-full mt-2 w-48 bg-card border border-border rounded-xl shadow-xl z-20 overflow-hidden"
                                                            >
                                                                <div className="p-1">
                                                                    <a
                                                                        href={video.id ? `/dashboard/analysis/${video.id}` : '#'}
                                                                        target="_blank"
                                                                        rel="noopener noreferrer"
                                                                        className="flex items-center gap-2 w-full px-3 py-2 text-sm text-foreground hover:bg-secondary rounded-lg transition-colors"
                                                                    >
                                                                        <FileText className="w-4 h-4" />
                                                                        View Analysis
                                                                    </a>
                                                                    <button
                                                                        onClick={async () => {
                                                                            if (!confirm('Are you sure you want to delete this video?')) return;
                                                                            try {
                                                                                await deleteVideo(video.id);
                                                                                toast.success('Video deleted successfully');
                                                                                fetchVideos();
                                                                            } catch (e) {
                                                                                toast.error('Failed to delete video');
                                                                            }
                                                                            setActiveMenu(null);
                                                                        }}
                                                                        className="flex items-center gap-2 w-full px-3 py-2 text-sm text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                                                                    >
                                                                        <AlertCircle className="w-4 h-4" />
                                                                        Delete Video
                                                                    </button>
                                                                </div>
                                                            </motion.div>
                                                        </>
                                                    )}
                                                </AnimatePresence>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="p-4 border-t border-border/50 flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">
                        Showing {videos.length} of {total} videos
                    </p>
                    <div className="flex gap-2">
                        <button
                            onClick={() => setPage(p => Math.max(1, p - 1))}
                            disabled={page === 1}
                            className="px-3 py-1 text-sm rounded-lg border border-border hover:bg-secondary disabled:opacity-50 transition-colors"
                        >
                            Previous
                        </button>
                        <button
                            onClick={() => setPage(p => p + 1)}
                            disabled={page * limit >= total}
                            className="px-3 py-1 text-sm rounded-lg border border-border hover:bg-secondary disabled:opacity-50 transition-colors"
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
