"use client";

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getAnalysisBySequence, downloadReportPdf } from '@/lib/api';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Download, Share2, CheckCircle, AlertTriangle,
    TrendingUp, Award, Zap, Target, Hash, FileText, ChevronLeft, Sparkles,
    LayoutDashboard, ArrowLeft, ArrowRight, Eye, AlertCircle, RefreshCw, Moon, Sun
} from 'lucide-react';
import { toast } from 'sonner';
import ScriptAnalysisView from '@/components/ScriptAnalysisView';
import { ThemeToggle } from '@/components/ThemeToggle';

export default function AnalysisPage() {
    const params = useParams();
    const router = useRouter();
    const [analysis, setAnalysis] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [checklistState, setChecklistState] = useState<Record<string, boolean>>({});

    useEffect(() => {
        let isPolling = true;

        const fetchAnalysis = async () => {
            if (!params.id || !isPolling) return;
            try {
                const data = await getAnalysisBySequence(Number(params.id));
                setAnalysis(data);

                if (data.status === 'completed') {
                    setLoading(false);
                    // Init checklist if empty
                    if (data.checklist?.next_steps && Object.keys(checklistState).length === 0) {
                        const initialChecklist: Record<string, boolean> = {};
                        data.checklist.next_steps.forEach((step: string) => initialChecklist[step] = false);
                        setChecklistState(initialChecklist);
                    }
                    return true; // Stop polling
                } else if (data.status === 'failed') {
                    setLoading(false);
                    return true; // Stop polling
                }
            } catch (error) {
                console.error(error);
            }
            return false; // Continue polling
        };

        const poll = async () => {
            const done = await fetchAnalysis();
            if (!done && isPolling) {
                setTimeout(poll, 3000);
            }
        };
        poll();

        return () => { isPolling = false; };
    }, [params.id]);

    const toggleChecklistItem = (key: string) => {
        setChecklistState(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const [activeMobileTab, setActiveMobileTab] = useState<'overview' | 'details' | 'plan'>('overview');

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen text-center p-6 bg-background text-foreground transition-colors duration-300">
                <div className="relative mb-8">
                    <div className="w-24 h-24 rounded-full border-t-4 border-purple-500 animate-spin absolute inset-0"></div>
                    <div className="w-24 h-24 rounded-full border-4 border-muted/20"></div>
                    <Sparkles className="w-8 h-8 text-purple-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" />
                </div>
                <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">Analyzing Your Content</h2>
                <p className="text-muted-foreground mt-2">Checking hooks, pacing, and emotional impact...</p>
            </div>
        );
    }

    if (!analysis) return null;
    if (analysis.source_type === 'script') return <ScriptAnalysisView analysis={analysis} />;

    return (
        <div className="max-w-7xl mx-auto px-4 py-8 pb-32 md:pb-20 bg-background min-h-screen transition-colors duration-300">
            {/* Nav & Header */}
            <div className="flex items-center justify-between mb-8 sticky top-0 z-50 bg-background/80 backdrop-blur-md p-4 rounded-b-2xl border-b border-border/50 shadow-sm">
                <button onClick={() => router.push('/dashboard/videos')} className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors font-medium">
                    <ArrowLeft className="w-4 h-4" /> <span className="hidden md:inline">Back to Library</span><span className="md:hidden">Back</span>
                </button>
                <div className="flex gap-3 items-center">
                    <ThemeToggle />
                    <button
                        onClick={async () => {
                            try {
                                const blob = await downloadReportPdf(analysis.id);
                                const url = window.URL.createObjectURL(blob);
                                const a = document.createElement('a');
                                a.href = url;
                                a.download = `report_${analysis.custom_id}.pdf`;
                                a.click();
                            } catch (e) { toast.error("Download failed"); }
                        }}
                        className="flex items-center gap-2 px-3 py-2 md:px-4 md:py-2 bg-primary text-primary-foreground rounded-lg font-bold text-xs md:text-sm hover:opacity-90 transition-opacity shadow-lg shadow-primary/20"
                    >
                        <Download className="w-4 h-4" /> <span className="hidden md:inline">PDF Report</span><span className="md:hidden">PDF</span>
                    </button>
                </div>
            </div>

            {/* Mobile Tabs Navigation */}
            <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#0f0f12]/90 dark:bg-zinc-900/90 backdrop-blur-lg border border-white/10 p-1.5 rounded-full shadow-2xl flex items-center gap-1">
                {(['overview', 'details', 'plan'] as const).map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveMobileTab(tab)}
                        className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${activeMobileTab === tab
                            ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/30'
                            : 'text-zinc-400 hover:text-white'
                            }`}
                    >
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                ))}
            </div>

            {/* Content Sections */}
            <div className="space-y-8">

                {/* OVERVIEW SECTION */}
                <div className={`${activeMobileTab === 'overview' ? 'block' : 'hidden md:block'}`}>
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
                        {/* Score & Verdict */}
                        <div className="lg:col-span-4 bg-card dark:bg-card/50 border border-border rounded-3xl p-8 flex flex-col items-center justify-center relative overflow-hidden shadow-xl shadow-black/5 dark:shadow-none">
                            <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 to-transparent pointer-events-none" />
                            <h2 className="text-muted-foreground text-sm font-bold uppercase tracking-widest mb-6">Viral Potential</h2>

                            <div className="relative mb-6">
                                <svg className="w-40 h-40 transform -rotate-90">
                                    <circle cx="80" cy="80" r="70" stroke="currentColor" className="text-muted/20" strokeWidth="12" fill="transparent" />
                                    <circle
                                        cx="80" cy="80" r="70"
                                        stroke={analysis.overall_score >= 80 ? '#10b981' : analysis.overall_score >= 60 ? '#f59e0b' : '#ef4444'}
                                        strokeWidth="12"
                                        fill="transparent"
                                        strokeDasharray={440}
                                        strokeDashoffset={440 - (440 * analysis.overall_score) / 100}
                                        strokeLinecap="round"
                                    />
                                </svg>
                                <div className="absolute inset-0 flex items-center justify-center flex-col">
                                    <span className="text-5xl font-black text-foreground">{analysis.overall_score}</span>
                                </div>
                            </div>

                            <div className="text-center">
                                <h3 className="text-xl font-bold text-foreground mb-2">
                                    {analysis.overall_score >= 80 ? "Viral Contender 🚀" : analysis.overall_score >= 60 ? "Solid Base 🛠️" : "Needs Work 🚧"}
                                </h3>
                                <p className="text-muted-foreground text-sm">
                                    {analysis.overall_score >= 80
                                        ? "This video has high engagement potential. Minor tweaks needed."
                                        : analysis.overall_score >= 60
                                            ? "Good concepts, but execution needs tightening."
                                            : "Fundamental issues with hook or structure detected."}
                                </p>
                            </div>
                        </div>

                        {/* Main Video & Summary */}
                        <div className="lg:col-span-8 flex flex-col gap-6">
                            <div className="aspect-video bg-black rounded-3xl overflow-hidden border border-border relative shadow-2xl">
                                {analysis.source_url?.includes('youtu') ? (
                                    <iframe
                                        src={`https://www.youtube.com/embed/${analysis.source_url.match(/(?:v=|youtu\.be\/|embed\/)([^&?]+)/)?.[1]}`}
                                        className="w-full h-full"
                                        allowFullScreen
                                    />
                                ) : (
                                    <video src={analysis.video_url?.startsWith('http') ? analysis.video_url : `${process.env.NEXT_PUBLIC_API_URL}${analysis.video_url}`} controls className="w-full h-full object-contain" />
                                )}
                            </div>
                            <div className="bg-card dark:bg-card/50 border border-border rounded-2xl p-6 shadow-sm">
                                <h3 className="text-lg font-semibold text-foreground mb-2 flex items-center gap-2">
                                    <Sparkles className="w-4 h-4 text-purple-500" /> Executive Summary
                                </h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    {analysis.insights?.executive_summary}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* DETAILS SECTION (Breakdown) */}
                <div className={`${activeMobileTab === 'details' ? 'block' : 'hidden md:block'}`}>
                    <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3 px-2">
                        <Eye className="w-6 h-6 text-purple-500" /> Granular Breakdown
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                        {analysis.subscores && Object.entries(analysis.subscores).map(([key, data]: [string, any]) => (
                            <div key={key} className="bg-card dark:bg-zinc-900/40 border border-border rounded-2xl p-6 hover:shadow-lg hover:border-purple-500/20 transition-all duration-300 shadow-sm">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="text-xl font-bold text-foreground capitalize mb-1">{key.replace(/_/g, ' ')}</h3>
                                        <div className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-bold ${data.score >= 70 ? 'bg-green-500/10 text-green-600 dark:text-green-400' : 'bg-red-500/10 text-red-600 dark:text-red-400'}`}>
                                            Score: {data.score}/100
                                        </div>
                                    </div>
                                    <div className={`p-2 rounded-lg ${data.score >= 70 ? 'bg-green-500/10 text-green-600 dark:text-green-400' : 'bg-red-500/10 text-red-600 dark:text-red-400'}`}>
                                        {data.score >= 70 ? <CheckCircle className="w-5 h-5" /> : <AlertTriangle className="w-5 h-5" />}
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <p className="text-muted-foreground text-sm italic mb-1">"{data.analysis}"</p>
                                    </div>

                                    {/* The Psychology (Why) */}
                                    {data.reason && (
                                        <div className="bg-blue-500/5 dark:bg-blue-500/10 border-l-2 border-blue-500/30 pl-3 py-2">
                                            <p className="text-xs font-bold text-blue-500 dark:text-blue-400 uppercase mb-1">Why this matters</p>
                                            <p className="text-muted-foreground text-sm">{data.reason}</p>
                                        </div>
                                    )}

                                    {/* The Fix */}
                                    {data.fix && (
                                        <div className="bg-purple-500/5 dark:bg-purple-500/10 border-l-2 border-purple-500/30 pl-3 py-2">
                                            <p className="text-xs font-bold text-purple-600 dark:text-purple-400 uppercase mb-1">How to Fix It</p>
                                            <p className="text-foreground text-sm font-medium">{data.fix}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* PLAN SECTION (Assets & Checklist) */}
                <div className={`${activeMobileTab === 'plan' ? 'block' : 'hidden md:block'}`}>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                        {/* Titles & Hooks */}
                        <div className="bg-card dark:bg-card/50 border border-border rounded-3xl p-8 shadow-sm">
                            <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                                <Target className="w-5 h-5 text-red-500" /> Viral Hooks & Titles
                            </h3>

                            <div className="space-y-6">
                                <div>
                                    <h4 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-3">Better Titles</h4>
                                    <div className="space-y-2">
                                        {(Array.isArray(analysis.optimized_assets?.titles)
                                            ? analysis.optimized_assets.titles
                                            : typeof analysis.optimized_assets?.titles === 'string'
                                                ? [analysis.optimized_assets.titles]
                                                : []
                                        ).map((title: string, i: number) => (
                                            <div key={i} className="flex items-center justify-between p-3 bg-secondary/50 border border-border rounded-lg group cursor-pointer hover:bg-secondary hover:border-primary/20 transition-all"
                                                onClick={() => { navigator.clipboard.writeText(title); toast.success("Copied!"); }}>
                                                <span className="text-foreground font-medium">{title}</span>
                                                <Share2 className="w-4 h-4 text-muted-foreground group-hover:text-foreground" />
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <h4 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-3">Stronger Hooks</h4>
                                <div className="space-y-2">
                                    {(Array.isArray(analysis.optimized_assets?.improved_hook)
                                        ? analysis.optimized_assets.improved_hook
                                        : typeof analysis.optimized_assets?.improved_hook === 'string'
                                            ? [analysis.optimized_assets.improved_hook]
                                            : []
                                    ).map((hook: string, i: number) => (
                                        <div key={i} className="p-4 bg-gradient-to-r from-purple-500/10 to-transparent border-l-4 border-purple-500 rounded-r-lg">
                                            <p className="text-foreground italic">"{hook}"</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Checklist */}
                    <div className="bg-card dark:bg-card/50 border border-border rounded-3xl p-8 shadow-sm">
                        <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                            <CheckCircle className="w-5 h-5 text-green-500" /> Immediate Action Plan
                        </h3>
                        <div className="space-y-3">
                            {Object.entries(checklistState).map(([key, isChecked]) => (
                                <div
                                    key={key}
                                    onClick={() => toggleChecklistItem(key)}
                                    className={`flex items-start gap-4 p-4 rounded-xl border cursor-pointer transition-all ${isChecked ? 'bg-green-500/5 border-green-500/20 opacity-50' : 'bg-secondary/30 border-border hover:border-primary/30 hover:bg-secondary/50'}`}
                                >
                                    <div className={`mt-1 w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${isChecked ? 'bg-green-500 border-green-500' : 'border-muted-foreground/30'}`}>
                                        {isChecked && <CheckCircle className="w-3.5 h-3.5 text-white" />}
                                    </div>
                                    <span className={`text-sm font-medium ${isChecked ? 'text-muted-foreground line-through' : 'text-foreground'}`}>{key}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Script Rewrite (If present) */}
                {analysis.optimized_assets?.script_rewrite_start && (
                    <div className="bg-card dark:bg-card/50 border border-border rounded-3xl p-8 mb-12 shadow-sm">
                        <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                            <FileText className="w-5 h-5 text-blue-500" /> Suggested Rewrite (First 15s)
                        </h3>
                        <div className="bg-zinc-950 dark:bg-black/50 p-6 rounded-xl border border-border font-mono text-zinc-300 text-sm whitespace-pre-wrap leading-relaxed shadow-inner">
                            {analysis.optimized_assets.script_rewrite_start}
                        </div>
                    </div>
                )}
            </div>
        </div>

    );
}
