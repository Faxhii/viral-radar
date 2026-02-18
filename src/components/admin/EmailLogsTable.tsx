'use client';

import { useState, useEffect } from 'react';
import { getEmailLogs, EmailLog } from '@/lib/api/admin';
import {
    Search,
    ChevronLeft,
    ChevronRight,
    CheckCircle,
    XCircle,
    Mail
} from 'lucide-react';
import { toast } from 'sonner';

export function EmailLogsTable() {
    const [logs, setLogs] = useState<EmailLog[]>([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [statusFilter, setStatusFilter] = useState('');
    const [typeFilter, setTypeFilter] = useState('');

    const fetchLogs = async () => {
        setLoading(true);
        try {
            const res = await getEmailLogs(page, 10, statusFilter, typeFilter);
            setLogs(res.data);
            setTotalPages(Math.ceil(res.total / res.limit));
        } catch (err) {
            toast.error('Failed to load email logs');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLogs();
    }, [page, statusFilter, typeFilter]);

    return (
        <div className="space-y-4">
            {/* Filters */}
            <div className="flex items-center gap-4 bg-background/50 p-4 rounded-xl border border-border/50 backdrop-blur-sm flex-wrap">
                <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">Status:</span>
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="bg-secondary/50 border border-border/50 rounded-lg text-sm px-3 py-2 outline-none"
                    >
                        <option value="">All</option>
                        <option value="sent">Sent</option>
                        <option value="failed">Failed</option>
                    </select>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">Type:</span>
                    <select
                        value={typeFilter}
                        onChange={(e) => setTypeFilter(e.target.value)}
                        className="bg-secondary/50 border border-border/50 rounded-lg text-sm px-3 py-2 outline-none"
                    >
                        <option value="">All</option>
                        <option value="verification">Verification</option>
                        <option value="analysis_completed">Analysis Completed</option>
                        <option value="reengagement">Re-engagement</option>
                        <option value="login_notification">Login Notification</option>
                    </select>
                </div>
                <button onClick={fetchLogs} className="ml-auto px-4 py-2 bg-primary text-primary-foreground text-sm rounded-lg hover:bg-primary/90 transition-colors">
                    Refresh
                </button>
            </div>

            {/* Table */}
            <div className="glass-card overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-secondary/50 text-muted-foreground uppercase text-xs font-semibold">
                            <tr>
                                <th className="px-6 py-4">Recipient</th>
                                <th className="px-6 py-4">Subject</th>
                                <th className="px-6 py-4">Type</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4">Sent At</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border/50">
                            {loading ? (
                                [...Array(5)].map((_, i) => (
                                    <tr key={i} className="animate-pulse">
                                        <td className="px-6 py-4"><div className="h-4 bg-secondary rounded w-32"></div></td>
                                        <td className="px-6 py-4"><div className="h-4 bg-secondary rounded w-48"></div></td>
                                        <td className="px-6 py-4"><div className="h-4 bg-secondary rounded w-24"></div></td>
                                        <td className="px-6 py-4"><div className="h-4 bg-secondary rounded w-16"></div></td>
                                        <td className="px-6 py-4"><div className="h-4 bg-secondary rounded w-32"></div></td>
                                    </tr>
                                ))
                            ) : logs.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center text-muted-foreground">No logs found.</td>
                                </tr>
                            ) : (
                                logs.map((log) => (
                                    <tr key={log.id} className="hover:bg-secondary/30 transition-colors">
                                        <td className="px-6 py-4 font-medium">{log.recipient}</td>
                                        <td className="px-6 py-4 text-muted-foreground">{log.subject}</td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-secondary text-foreground border border-border">
                                                <Mail className="w-3 h-3" />
                                                {log.email_type}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            {log.status === 'sent' ? (
                                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-500/10 text-green-500 border border-green-500/20">
                                                    <CheckCircle className="w-3 h-3" /> Sent
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-red-500/10 text-red-500 border border-red-500/20">
                                                    <XCircle className="w-3 h-3" /> Failed
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-muted-foreground font-mono text-xs">
                                            {new Date(log.sent_at).toLocaleString()}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="p-4 border-t border-border/50 flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Page {page} of {totalPages}</span>
                    <div className="flex gap-2">
                        <button
                            disabled={page <= 1}
                            onClick={() => setPage(p => p - 1)}
                            className="p-2 rounded-lg border border-border hover:bg-secondary disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button
                            disabled={page >= totalPages}
                            onClick={() => setPage(p => p + 1)}
                            className="p-2 rounded-lg border border-border hover:bg-secondary disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
