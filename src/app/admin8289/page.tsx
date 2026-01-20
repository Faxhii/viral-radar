'use client';

import { useEffect, useState } from 'react';
import { getAdminStats, AdminStats } from '@/lib/api/admin';
import { Users, Activity, CreditCard, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

function StatCard({ icon: Icon, label, value, trend }: any) {
    return (
        <div className="glass-card p-6 flex items-start justify-between">
            <div>
                <p className="text-muted-foreground text-sm font-medium mb-1">{label}</p>
                <h3 className="text-3xl font-bold font-heading">
                    {(value !== undefined && value !== null) ? value.toLocaleString() : '-'}
                </h3>
                {trend && (
                    <p className={`text-xs mt-2 font-medium ${trend > 0 ? 'text-green-500' : 'text-red-500'}`}>
                        {trend > 0 ? '+' : ''}{trend}% from last month
                    </p>
                )}
            </div>
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                <Icon className="w-5 h-5" />
            </div>
        </div>
    );
}

export default function AdminDashboard() {
    const [stats, setStats] = useState<AdminStats | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchStats() {
            try {
                const data = await getAdminStats();
                setStats(data);
            } catch (error) {
                console.error("Failed to fetch admin stats:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchStats();
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
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold font-heading">Dashboard</h1>
                    <p className="text-muted-foreground">Overview of ViralRadar performance.</p>
                </div>
                <div className="flex gap-2">
                    <select className="bg-secondary border border-border rounded-lg text-sm px-3 py-1.5 focus:outline-none">
                        <option>Last 7 Days</option>
                        <option>Last 30 Days</option>
                        <option>All Time</option>
                    </select>
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
                        trend={12}
                    />
                </motion.div>
                <motion.div variants={item}>
                    <StatCard
                        icon={Activity}
                        label="Active Users"
                        value={stats?.active_users}
                        trend={5}
                    />
                </motion.div>
                <motion.div variants={item}>
                    <StatCard
                        icon={CreditCard}
                        label="Paid Users"
                        value={stats?.paid_users}
                        trend={8}
                    />
                </motion.div>
                <motion.div variants={item}>
                    <StatCard
                        icon={Zap}
                        label="Credits Used (Today)"
                        value={stats?.credits_used_today}
                        trend={-2}
                    />
                </motion.div>
            </motion.div>

            {/* Placeholder for Charts/Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 glass-card p-6 h-[400px]">
                    <h3 className="font-heading font-semibold text-lg mb-4">User Growth</h3>
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground border-2 border-dashed border-border rounded-xl">
                        Chart Placeholder
                    </div>
                </div>
                <div className="glass-card p-6 h-[400px]">
                    <h3 className="font-heading font-semibold text-lg mb-4">Recent Activity</h3>
                    <div className="space-y-4">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <div key={i} className="flex items-center gap-3 pb-3 border-b border-border/50 last:border-0">
                                <div className="w-8 h-8 rounded-full bg-secondary flex-shrink-0" />
                                <div>
                                    <p className="text-sm font-medium">New user registered</p>
                                    <p className="text-xs text-muted-foreground">2 minutes ago</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
