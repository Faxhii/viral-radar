"use client";

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getAnalysisBySequence, downloadReportPdf } from '@/lib/api';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Play, Download, Share2, CheckCircle, AlertTriangle,
    TrendingUp, Award, Zap, Target, Hash, FileText, ChevronLeft, Sparkles,
    LayoutDashboard, ArrowLeft, ArrowRight, Eye, AlertCircle, RefreshCw
} from 'lucide-react';
import { toast } from 'sonner';
import ScriptAnalysisView from '@/components/ScriptAnalysisView';

export default function AnalysisPage() {
    const params = useParams();
    const router = useRouter();
    const [analysis, setAnalysis] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState<any>(null);
    const [checklistState, setChecklistState] = useState<Record<string, boolean>>({});

    useEffect(() => {
        let isPolling = true;

        // Fetch User Stats for Benchmarking
        const fetchStats = async () => {
            try {
                const data = await import('@/lib/api').then(m => m.getStats());
                setStats(data);
            } catch (e) { console.error("Failed to fetch stats"); }
        };
        fetchStats();

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

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen text-center p-6">
                <div className="relative mb-8">
                    <div className="w-24 h-24 rounded-full border-t-4 border-purple-500 animate-spin absolute inset-0"></div>
                    <div className="w-24 h-24 rounded-full border-4 border-zinc-800"></div>
                    <Sparkles className="w-8 h-8 text-purple-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" />
                </div>
                <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">Analyzing Your Content</h2>
                <p className="text-zinc-500 mt-2">Checking hooks, pacing, and emotional impact...</p>
            </div>
        );
    }

    if (!analysis) return null;
    if (analysis.source_type === 'script') return <ScriptAnalysisView analysis={analysis} />;

    return (
        <div className="max-w-7xl mx-auto px-4 py-8 pb-20">
            {/* Nav & Header */}
            <div className="flex items-center justify-between mb-8">
                <button onClick={() => router.push('/dashboard/videos')} className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors">
                    <ArrowLeft className="w-4 h-4" /> Back to Library
                </button>
                <div className="flex gap-2">
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
                        className="flex items-center gap-2 px-4 py-2 bg-white text-black rounded-lg font-bold text-sm hover:bg-zinc-200 transition-colors"
                    >
                        <Download className="w-4 h-4" /> PDF Report
                    </button>
                </div>
            </div>

            {/* HERO SECTION: The Verdict */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
                {/* Score & Verdict */}
                <div className="lg:col-span-4 bg-zinc-900/50 border border-zinc-800 rounded-3xl p-8 flex flex-col items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 to-transparent pointer-events-none" />
                    <h2 className="text-zinc-400 text-sm font-bold uppercase tracking-widest mb-6">Viral Potential</h2>

                    <div className="relative mb-6">
                        <svg className="w-40 h-40 transform -rotate-90">
                            <circle cx="80" cy="80" r="70" stroke="#27272a" strokeWidth="12" fill="transparent" />
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
                            <span className="text-5xl font-black text-white">{analysis.overall_score}</span>
                            {stats && stats.avg_score > 0 && (
                                <div className={`flex items-center gap-1 mt-1 text-xs font-medium px-2 py-0.5 rounded-full ${analysis.overall_score >= stats.avg_score ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                                    {analysis.overall_score >= stats.avg_score ? <TrendingUp className="w-3 h-3" /> : <TrendingUp className="w-3 h-3 rotate-180" />}
                                    {Math.abs(analysis.overall_score - stats.avg_score)} vs avg
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="text-center">
                        <h3 className="text-xl font-bold text-white mb-2">
                            {analysis.overall_score >= 80 ? "Viral Contender 🚀" : analysis.overall_score >= 60 ? "Solid Base 🛠️" : "Needs Work 🚧"}
                        </h3>
                        <p className="text-zinc-400 text-sm">
                            {analysis.overall_score >= 80
                                ? "This video has high engagement potential. Minor tweaks needed."
                                : analysis.overall_score >= 60
                                    ? "Good concepts, but execution needs tightening."
                                    : "Fundamental issues with hook or structure detected."}
                        </p>
                    </div>
                </div>

                {/* Main Video & Summary */}
                <div className="lg:col-span-8 space-y-6">
                    <div className="aspect-video bg-black rounded-3xl overflow-hidden border border-zinc-800 relative">
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
                    <div className="bg-zinc-900/30 border border-zinc-800 rounded-2xl p-6">
                        <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
                            <Sparkles className="w-4 h-4 text-purple-400" /> Executive Summary
                        </h3>
                        <p className="text-zinc-300 leading-relaxed">
                            {analysis.insights?.executive_summary}
                        </p>
                    </div>
                </div>
            </div>

            {/* DEEP DIVE: The "Why" & "Fix" (Psychology Driven) */}
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <Eye className="w-6 h-6 text-purple-500" /> Granular Breakdown
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                {analysis.subscores && Object.entries(analysis.subscores).map(([key, data]: [string, any]) => (
                    <div key={key} className="bg-zinc-900/40 border border-zinc-800/60 rounded-2xl p-6 hover:border-zinc-700 transition-colors">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="text-xl font-bold text-white capitalize mb-1">{key.replace(/_/g, ' ')}</h3>
                                <div className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-bold ${data.score >= 70 ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                                    Score: {data.score}/100
                                </div>
                            </div>
                            <div className={`p-2 rounded-lg ${data.score >= 70 ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                                {data.score >= 70 ? <CheckCircle className="w-5 h-5" /> : <AlertTriangle className="w-5 h-5" />}
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <p className="text-zinc-300 text-sm italic mb-1">"{data.analysis}"</p>
                            </div>

                            {/* The Psychology (Why) */}
                            {data.reason && (
                                <div className="bg-blue-500/5 border-l-2 border-blue-500/30 pl-3 py-2">
                                    <p className="text-xs font-bold text-blue-400 uppercase mb-1">Why this matters</p>
                                    <p className="text-zinc-400 text-sm">{data.reason}</p>
                                </div>
                            )}

                            {/* The Fix */}
                            {data.fix && (
                                <div className="bg-purple-500/5 border-l-2 border-purple-500/30 pl-3 py-2">
                                    <p className="text-xs font-bold text-purple-400 uppercase mb-1">How to Fix It</p>
                                    <p className="text-zinc-300 text-sm font-medium">{data.fix}</p>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* OPTIMIZED ASSETS */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                {/* Titles & Hooks */}
                <div className="bg-zinc-900/30 border border-zinc-800 rounded-3xl p-8">
                    <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                        <Target className="w-5 h-5 text-red-400" /> Viral Hooks & Titles
                    </h3>

                    <div className="space-y-6">
                        <div>
                            <h4 className="text-sm font-bold text-zinc-500 uppercase tracking-wider mb-3">Better Titles</h4>
                            <div className="space-y-2">
                                {analysis.optimized_assets?.titles?.map((title: string, i: number) => (
                                    <div key={i} className="flex items-center justify-between p-3 bg-zinc-900 border border-zinc-800 rounded-lg group cursor-pointer hover:border-zinc-700 hover:bg-zinc-800"
                                        onClick={() => { navigator.clipboard.writeText(title); toast.success("Copied!"); }}>
                                        <span className="text-zinc-300 font-medium">{title}</span>
                                        <Share2 className="w-4 h-4 text-zinc-600 group-hover:text-white" />
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h4 className="text-sm font-bold text-zinc-500 uppercase tracking-wider mb-3">Stronger Hooks</h4>
                            <div className="space-y-2">
                                {analysis.optimized_assets?.improved_hook?.map((hook: string, i: number) => (
                                    <div key={i} className="p-4 bg-gradient-to-r from-purple-500/10 to-transparent border-l-4 border-purple-500 rounded-r-lg">
                                        <p className="text-zinc-200 italic">"{hook}"</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Checklist */}
                <div className="bg-zinc-900/30 border border-zinc-800 rounded-3xl p-8">
                    <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-green-400" /> Immediate Action Plan
                    </h3>
                    <div className="space-y-3">
                        {Object.entries(checklistState).map(([key, isChecked]) => (
                            <div
                                key={key}
                                onClick={() => toggleChecklistItem(key)}
                                className={`flex items-start gap-4 p-4 rounded-xl border cursor-pointer transition-all ${isChecked ? 'bg-green-500/5 border-green-500/20 opacity-50' : 'bg-zinc-900 border-zinc-800 hover:border-zinc-600'}`}
                            >
                                <div className={`mt-1 w-5 h-5 rounded-full border flex items-center justify-center ${isChecked ? 'bg-green-500 border-green-500' : 'border-zinc-600'}`}>
                                    {isChecked && <CheckCircle className="w-3.5 h-3.5 text-white" />}
                                </div>
                                <span className={`text-sm font-medium ${isChecked ? 'text-zinc-500 line-through' : 'text-zinc-200'}`}>{key}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Script Rewrite (If present) */}
            {analysis.optimized_assets?.script_rewrite_start && (
                <div className="bg-zinc-900/30 border border-zinc-800 rounded-3xl p-8 mb-12">
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                        <FileText className="w-5 h-5 text-blue-400" /> Suggested Rewrite (First 15s)
                    </h3>
                    <div className="bg-black/50 p-6 rounded-xl border border-zinc-800 font-mono text-zinc-300 text-sm whitespace-pre-wrap leading-relaxed">
                        {analysis.optimized_assets.script_rewrite_start}
                    </div>
                </div>
            )}
        </div>
    );
}
