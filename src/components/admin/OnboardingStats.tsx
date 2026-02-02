'use client';

import { useEffect, useState } from 'react';
import { getOnboardingStats, OnboardingStats } from '@/lib/api/admin';
import { motion } from 'framer-motion';
import { Users, ArrowRight, Target, Smartphone } from 'lucide-react';

export function OnboardingStatsPanel() {
    const [stats, setStats] = useState<OnboardingStats | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchStats() {
            try {
                const data = await getOnboardingStats();
                setStats(data);
            } catch (error) {
                console.error("Failed to fetch onboarding stats:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchStats();
    }, []);

    if (loading) {
        return <div className="animate-pulse h-64 bg-secondary/50 rounded-xl" />;
    }

    if (!stats) return null;

    const { funnel, breakdown } = stats;

    const funnelSteps = [
        { label: 'Signups', value: funnel.total_signups, color: 'bg-blue-500' },
        { label: 'Started Onboarding', value: funnel.started_onboarding, color: 'bg-indigo-500' },
        { label: 'Goals Set', value: funnel.goals_set, color: 'bg-purple-500' },
        { label: 'Completed', value: funnel.completed, color: 'bg-green-500' },
    ];

    const maxVal = funnel.total_signups || 1;

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Funnel Chart */}
            <div className="glass-card p-6">
                <h3 className="font-heading font-semibold text-lg mb-6 flex items-center gap-2">
                    <Users className="w-5 h-5 text-primary" />
                    Onboarding Funnel
                </h3>
                <div className="space-y-4">
                    {funnelSteps.map((step, index) => {
                        const percent = Math.round((step.value / maxVal) * 100);
                        const prevStep = funnelSteps[index - 1];
                        const dropOff = prevStep ? Math.round(((prevStep.value - step.value) / prevStep.value) * 100) : 0;

                        return (
                            <div key={step.label} className="relative">
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="font-medium">{step.label}</span>
                                    <div className="text-right">
                                        <span className="font-bold">{step.value}</span>
                                        <span className="text-muted-foreground text-xs ml-2">({percent}%)</span>
                                    </div>
                                </div>
                                <div className="h-4 bg-secondary rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${percent}%` }}
                                        transition={{ duration: 1, ease: "easeOut" }}
                                        className={`h-full rounded-full ${step.color}`}
                                    />
                                </div>
                                {index > 0 && (
                                    <div className="text-xs text-red-400 mt-1 flex justify-end">
                                        {dropOff}% drop-off
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Breakdowns */}
            <div className="space-y-6">
                {/* Platforms */}
                <div className="glass-card p-6">
                    <h3 className="font-heading font-semibold text-lg mb-4 flex items-center gap-2">
                        <Smartphone className="w-5 h-5 text-primary" />
                        Platform Choices
                    </h3>
                    <div className="space-y-3">
                        {breakdown.platforms.length === 0 ? (
                            <p className="text-sm text-muted-foreground">No data yet</p>
                        ) : (
                            breakdown.platforms
                                .sort((a, b) => b.value - a.value)
                                .map((item) => (
                                    <div key={item.name} className="flex items-center gap-3 text-sm">
                                        <div className="w-24 font-medium truncate capitalize">{item.name}</div>
                                        <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-primary/80"
                                                style={{ width: `${(item.value / maxVal) * 100}%` }}
                                            />
                                        </div>
                                        <div className="w-8 text-right text-xs text-muted-foreground">{item.value}</div>
                                    </div>
                                ))
                        )}
                    </div>
                </div>

                {/* Goals */}
                <div className="glass-card p-6">
                    <h3 className="font-heading font-semibold text-lg mb-4 flex items-center gap-2">
                        <Target className="w-5 h-5 text-primary" />
                        Content Goals
                    </h3>
                    <div className="space-y-3">
                        {breakdown.goals.length === 0 ? (
                            <p className="text-sm text-muted-foreground">No data yet</p>
                        ) : (
                            breakdown.goals
                                .sort((a, b) => b.value - a.value)
                                .map((item) => (
                                    <div key={item.name} className="flex items-center gap-3 text-sm">
                                        <div className="w-24 font-medium truncate capitalize">{item.name}</div>
                                        <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-emerald-500/80"
                                                style={{ width: `${(item.value / maxVal) * 100}%` }}
                                            />
                                        </div>
                                        <div className="w-8 text-right text-xs text-muted-foreground">{item.value}</div>
                                    </div>
                                ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
