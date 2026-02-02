'use client';

import { useEffect, useState } from 'react';
import { getAdminStats, AdminStats, getVideos, Video } from '@/lib/api/admin';
import { Users, Activity, CreditCard, Zap, Play } from 'lucide-react';
import { motion } from 'framer-motion';
import { OnboardingStatsPanel } from '@/components/admin/OnboardingStats';
import { format } from 'date-fns';

function StatCard({ icon: Icon, label, value }: any) {
    return (
        <div className="glass-card p-6 flex items-start justify-between">
            <div>
                <p className="text-muted-foreground text-sm font-medium mb-1">{label}</p>
                <h3 className="text-3xl font-bold font-heading">
                    {(value !== undefined && value !== null) ? value.toLocaleString() : '-'}
                </h3>
            </div>
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                <Icon className="w-5 h-5" />
            </div>
        </div>
    );
}

export default function AdminDashboard() {
    const [stats, setStats] = useState<AdminStats | null>(null);
    const [recentVideos, setRecentVideos] = useState<Video[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const [statsData, videosData] = await Promise.all([
                    getAdminStats(),
                    getVideos(1, 5) // Fetch top 5 recent videos
                ]);
                setStats(statsData);
                setRecentVideos(videosData.data);
            } catch (error) {
                console.error("Failed to fetch dashboard data:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold font-heading">Dashboard</h1>
                    <p className="text-muted-foreground">Overview of ViralRadar performance.</p>
                </div>
            </div>

            <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
                <motion.div variants={item}>
                    <StatCard
                        icon={Users}
                        label="Total Users"
                        value={stats?.total_users}
                    />
                </motion.div>
                <motion.div variants={item}>
                    <StatCard
                        icon={Activity}
                        label="Active Users"
                        value={stats?.active_users}
                    />
                </motion.div>
                <motion.div variants={item}>
                    <StatCard
                        icon={CreditCard}
                        label="Paid Users"
                        value={stats?.paid_users}
                    />
                </motion.div>
                <motion.div variants={item}>
                    <StatCard
                        icon={Zap}
                        label="Credits Used (Today)"
                        value={stats?.credits_used_today}
                    />
                </motion.div>
            </motion.div>

            {/* Analytics Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
            >
                <h2 className="text-xl font-bold font-heading mb-4">Onboarding Analytics</h2>
                <OnboardingStatsPanel />
            </motion.div>

            {/* Recent Activity */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="glass-card p-6"
            >
                <h3 className="font-heading font-semibold text-lg mb-4">Recent Uploads</h3>
                <div className="space-y-4">
                    {recentVideos.length === 0 ? (
                        <p className="text-sm text-muted-foreground">No recent activity.</p>
                    ) : (
                        recentVideos.map((video) => (
                            <div key={video.id} className="flex items-center gap-4 pb-3 border-b border-border/50 last:border-0">
                                <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground flex-shrink-0">
                                    <Play className="w-4 h-4 fill-current" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium truncate">{video.title || 'Untitled Video'}</p>
                                    <p className="text-xs text-muted-foreground">
                                        by User #{video.user_id} • {format(new Date(video.created_at), 'MMM d, h:mm a')}
                                    </p>
                                </div>
                                <div className="text-xs px-2 py-1 rounded-full bg-secondary text-muted-foreground capitalize">
                                    {video.status}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </motion.div>
        </div>
    );
}
