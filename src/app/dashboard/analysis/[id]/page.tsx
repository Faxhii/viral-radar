"use client";

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { getAnalysis, downloadReportPdf } from '@/lib/api';
import { motion } from 'framer-motion';
import {
    Play, Download, Share2, CheckCircle, AlertTriangle,
    TrendingUp, Award, Zap, Target, Hash, FileText, ChevronRight, Sparkles
} from 'lucide-react';
import { toast } from 'sonner';

import ScriptAnalysisView from '@/components/ScriptAnalysisView';

export default function AnalysisPage() {
    const params = useParams();
    const [analysis, setAnalysis] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('breakdown');

    const [checklistState, setChecklistState] = useState<Record<string, boolean>>({});

    useEffect(() => {
        let intervalId: NodeJS.Timeout;
        let isPolling = true;

        const fetchAnalysis = async () => {
            if (!params.id || !isPolling) return false;
            try {
                const data = await getAnalysis(Number(params.id));
                setAnalysis(data);

                // Initialize checklist state if not already set
                if (data.status === 'completed' && Object.keys(checklistState).length === 0) {
                    const initialChecklist: Record<string, boolean> = {};

                    // Add AI items
                    if (data.checklist && data.checklist.next_steps) {
                        data.checklist.next_steps.forEach((step: string) => {
                            initialChecklist[step] = false;
                        });
                    }

                    // Add Default items
                    const defaultItems = [
                        "Reply to the first 5 comments",
                        "Pin the best comment",
                        "Share to Instagram Story",
                        "Add a call-to-action in comments",
                        "Cross-post to YouTube Shorts"
                    ];
                    defaultItems.forEach(item => {
                        initialChecklist[item] = false;
                    });

                    setChecklistState(initialChecklist);
                }

                if (data.status === 'completed') {
                    setLoading(false);
                    return true; // Stop polling
                }

                if (data.status === 'failed') {
                    setLoading(false);
                    toast.error("Analysis Failed. Please try again or contact support.");
                    return true; // Stop polling
                }

            } catch (error) {
                console.error('Failed to fetch analysis:', error);
            }
            return false;
        };

        // Initial fetch
        fetchAnalysis().then(done => {
            if (!done) {
                setLoading(false); // Show loading UI but start polling
                // Start polling every 5 seconds if not done
                intervalId = setInterval(async () => {
                    const done = await fetchAnalysis();
                    if (done) clearInterval(intervalId);
                }, 5000);
            }
        });

        return () => {
            isPolling = false;
            clearInterval(intervalId);
        };
    }, [params.id]); // Removed checklistState dependency

    const toggleChecklistItem = (key: string) => {
        setChecklistState(prev => ({
            ...prev,
            [key]: !prev[key]
        }));
    };

    if (loading) {
        return (
            <div className="max-w-7xl mx-auto pb-20 animate-pulse">
                <div className="flex justify-between items-center mb-8">
                    <div className="space-y-2">
                        <div className="h-4 w-24 bg-zinc-800 rounded-full"></div>
                        <div className="h-8 w-64 bg-zinc-800 rounded-lg"></div>
                    </div>
                    <div className="h-10 w-32 bg-zinc-800 rounded-xl"></div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-8">
                        <div className="aspect-video bg-zinc-900 rounded-3xl border border-zinc-800"></div>
                        <div className="h-40 bg-zinc-900 rounded-3xl border border-zinc-800"></div>
                        <div className="h-96 bg-zinc-900 rounded-3xl border border-zinc-800"></div>
                    </div>
                    <div className="space-y-8">
                        <div className="h-80 bg-zinc-900 rounded-3xl border border-zinc-800"></div>
                        <div className="h-64 bg-zinc-900 rounded-3xl border border-zinc-800"></div>
                    </div>
                </div>
            </div>
        );
    }

    if (!analysis) {
        return (
            <div className="text-center py-20">
                <h2 className="text-2xl font-bold text-white mb-2">Analysis Not Found</h2>
                <p className="text-zinc-400">The requested analysis could not be retrieved.</p>
            </div>
        );
    }

    if (analysis.status === 'queued' || analysis.status === 'processing' || analysis.status === 'analyzing') {

        // Dedicated Script Loading Screen
        if (analysis.source_type === 'script') {
            return (
                <div className="flex flex-col justify-center items-center min-h-[600px] max-w-2xl mx-auto text-center px-4 relative">
                    <div className="relative mb-10">
                        <div className="w-24 h-24 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center animate-pulse">
                            <FileText className="w-10 h-10 text-purple-500" />
                        </div>
                        <div className="absolute -bottom-2 -right-2 bg-green-500 rounded-full p-1.5 border-4 border-black">
                            <Sparkles className="w-4 h-4 text-white animate-spin-slow" />
                        </div>
                    </div>

                    <h2 className="text-3xl font-bold text-white mb-4">
                        Analyzing Your Script
                    </h2>

                    <div className="h-8 mb-8 overflow-hidden relative">
                        <motion.div
                            initial={{ y: 0 }}
                            animate={{ y: -120 }}
                            transition={{
                                repeat: Infinity,
                                duration: 8,
                                ease: "linear",
                                repeatType: "loop"
                            }}
                            className="text-zinc-400 text-lg space-y-2"
                        >
                            <p>Reading script content...</p>
                            <p>Checking hook strength...</p>
                            <p>Analyzing pacing & flow...</p>
                            <p>Predicting audience retention...</p>
                            <p>Generating viral titles...</p>
                            <p>Finalizing score...</p>
                        </motion.div>
                        {/* Gradient masks for fade effect */}
                        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-b from-black to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-t from-black to-transparent" />
                    </div>

                    <div className="w-64 h-1.5 bg-zinc-900 rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-purple-500"
                            initial={{ width: "0%" }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 15, ease: "linear" }}
                        />
                    </div>
                </div>
            );
        }

        // Smart Progress Calculation for Videos
        // Base time: 30s. If duration is known, add 20% of duration.
        const estimatedTime = analysis.duration ? 30 + (analysis.duration * 0.2) : 45;
        const isLongVideo = analysis.duration && analysis.duration > 600; // > 10 mins

        return (
            <div className="flex flex-col justify-center items-center min-h-[600px] max-w-2xl mx-auto text-center px-4 relative">
                {/* Background Badge */}
                <div className="absolute top-10 md:top-0 bg-zinc-900/80 border border-zinc-800 rounded-full px-4 py-2 flex items-center gap-2 backdrop-blur-md animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-xs font-medium text-zinc-400">Runs in background. Safe to minimize.</span>
                </div>

                <div className="relative mb-10 mt-16 md:mt-0">
                    <div className="w-32 h-32 rounded-full border-4 border-zinc-800 border-t-purple-500 animate-spin" />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <Sparkles className="w-10 h-10 text-purple-500 animate-pulse" />
                    </div>
                </div>

                <h2 className="text-4xl font-bold text-white mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-500">
                    Analyzing Your Content
                </h2>

                <div className="space-y-4 max-w-lg mx-auto mb-10">
                    <p className="text-zinc-400 text-lg">
                        Our AI is dissecting your video's hook, pacing, and viral potential.
                    </p>

                    {isLongVideo ? (
                        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4 flex items-start gap-3 text-left">
                            <AlertTriangle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                            <div>
                                <p className="text-yellow-200 font-bold text-sm">Long Video Detected ({Math.floor(analysis.duration / 60)}m)</p>
                                <p className="text-yellow-500/80 text-xs mt-1">
                                    Downloading and analyzing longer videos takes a bit more time.
                                    Expect this to take <strong>2-5 minutes</strong>. Feel free to grab a coffee! ☕
                                </p>
                            </div>
                        </div>
                    ) : (
                        <p className="text-zinc-500 text-sm">
                            {analysis.duration ? `Estimated time: ~${Math.ceil(estimatedTime)} seconds.` : "This usually takes about 30-60 seconds."}
                        </p>
                    )}
                </div>

                {/* Progress Bar */}
                <div className="w-full max-w-md bg-zinc-900 rounded-full h-1.5 overflow-hidden relative mb-4">
                    <motion.div
                        className="h-full bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600"
                        initial={{ width: "0%" }}
                        animate={{ width: "95%" }}
                        transition={{
                            duration: estimatedTime,
                            ease: "easeOut"
                        }}
                    />
                </div>

                <p className="text-zinc-600 text-xs font-mono uppercase tracking-widest animate-pulse">
                    {analysis.status === 'queued' && "Step 1/3: Queued..."}
                    {analysis.status === 'processing' && "Step 2/3: Processing Video..."}
                    {analysis.status === 'analyzing' && "Step 3/3: AI Analysis..."}
                </p>
            </div>
        );
    }

    if (analysis.source_type === 'script') {
        return <ScriptAnalysisView analysis={analysis} />;
    }

    const getScoreColor = (score: number) => {
        if (score >= 90) return 'text-green-400';
        if (score >= 70) return 'text-purple-400';
        if (score >= 50) return 'text-yellow-400';
        return 'text-red-400';
    };

    const getScoreBg = (score: number) => {
        if (score >= 90) return 'bg-green-500';
        if (score >= 70) return 'bg-purple-500';
        if (score >= 50) return 'bg-yellow-500';
        return 'bg-red-500';
    };

    return (
        <div className="max-w-7xl mx-auto pb-20">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <span className="px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-bold uppercase tracking-wider">
                            Analysis #{analysis.id}
                        </span>
                        <span className="text-zinc-500 text-sm">
                            {new Date(analysis.created_at).toLocaleDateString()}
                        </span>
                    </div>
                    <h1 className="text-3xl font-bold text-white">Viral Potential Analysis</h1>
                </div>

                <div className="flex items-center gap-3">
                    <button className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors">
                        <Share2 className="w-5 h-5" />
                    </button>
                    <button
                        onClick={async () => {
                            try {
                                const blob = await downloadReportPdf(analysis.id);
                                const url = window.URL.createObjectURL(blob);
                                const a = document.createElement('a');
                                a.href = url;
                                a.download = `analysis_${analysis.id}.pdf`;
                                document.body.appendChild(a);
                                a.click();
                                window.URL.revokeObjectURL(url);
                                document.body.removeChild(a);
                                toast.success("Report downloaded successfully!");
                            } catch (error) {
                                console.error("Download failed", error);
                                toast.error("Failed to download PDF. Please try again.");
                            }
                        }}
                        className="flex items-center gap-2 px-4 py-2 bg-white text-black rounded-xl font-bold hover:bg-zinc-200 transition-colors"
                    >
                        <Download className="w-4 h-4" />
                        Export PDF
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Video & Key Stats */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Video Player */}
                    <div className="aspect-video bg-black rounded-3xl overflow-hidden border border-zinc-800 relative group">
                        {analysis.video_url ? (
                            <video
                                src={analysis.video_url.startsWith('http') ? analysis.video_url : `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}${analysis.video_url}`}
                                controls
                                className="w-full h-full object-contain"
                                poster="/placeholder.jpg" // Optional
                            />
                        ) : (
                            <div className="absolute inset-0 flex items-center justify-center bg-zinc-900/50">
                                <Play className="w-20 h-20 text-white/20" />
                                <p className="absolute bottom-4 text-zinc-500">Video not available</p>
                            </div>
                        )}

                        {!analysis.video_url && (
                            <div className="absolute bottom-4 left-4 right-4 glass p-4 rounded-xl">
                                <p className="text-sm font-medium text-zinc-300">Video Source</p>
                                <p className="text-xs text-zinc-500 truncate">ID: {analysis.video_id}</p>
                            </div>
                        )}
                    </div>

                    {/* Executive Summary */}
                    <div className="glass p-8 rounded-3xl">
                        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                            <FileText className="w-5 h-5 text-purple-400" />
                            Executive Summary
                        </h3>
                        <p className="text-zinc-300 leading-relaxed">
                            {analysis.insights?.executive_summary || "No summary available."}
                        </p>
                    </div>

                    {/* Detailed Breakdown Tabs */}
                    <div className="glass rounded-3xl overflow-hidden">
                        <div className="flex border-b border-white/5 overflow-x-auto">
                            {[
                                { id: 'breakdown', label: 'Breakdown', count: analysis.subscores ? Object.keys(analysis.subscores).length : 0 },
                                { id: 'insights', label: 'Insights', count: analysis.insights ? (analysis.insights.strengths?.length || 0) + (analysis.insights.weaknesses?.length || 0) : 0 },
                                { id: 'assets', label: 'Assets', count: analysis.optimized_assets ? (analysis.optimized_assets.titles?.length || 0) + (analysis.optimized_assets.hashtags?.length || 0) : 0 }
                            ].map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`px-6 py-4 text-sm font-bold uppercase tracking-wider transition-all whitespace-nowrap relative ${activeTab === tab.id
                                        ? 'text-white border-b-2 border-purple-500 bg-white/5'
                                        : 'text-zinc-500 hover:text-zinc-300'
                                        }`}
                                >
                                    {tab.label}
                                    {tab.count > 0 && (
                                        <span className={`absolute top-3 right-2 w-2 h-2 rounded-full ${activeTab === tab.id ? 'bg-purple-500' : 'bg-zinc-700'}`} />
                                    )}
                                </button>
                            ))}
                        </div>

                        <div className="p-8">
                            {activeTab === 'breakdown' && analysis.subscores && (
                                <div className="space-y-6">
                                    {Object.entries(analysis.subscores).map(([key, data]: [string, any]) => (
                                        <div key={key} className="bg-zinc-900/50 rounded-xl p-6 border border-white/5">
                                            <div className="flex justify-between items-center mb-4">
                                                <h4 className="text-lg font-bold text-white capitalize">
                                                    {key.replace(/_/g, ' ')}
                                                </h4>
                                                <div className={`px-3 py-1 rounded-lg text-sm font-bold ${getScoreColor(data.score)} bg-white/5`}>
                                                    {data.score}/100
                                                </div>
                                            </div>
                                            <p className="text-zinc-400 text-sm mb-4">{data.analysis}</p>

                                            {data.tips && data.tips.length > 0 && (
                                                <div className="bg-purple-500/5 rounded-lg p-4 border border-purple-500/10">
                                                    <p className="text-xs font-bold text-purple-400 uppercase mb-2 flex items-center gap-2">
                                                        <Zap className="w-3 h-3" /> Pro Tips
                                                    </p>
                                                    <ul className="space-y-2">
                                                        {data.tips.map((tip: string, i: number) => (
                                                            <li key={i} className="text-sm text-zinc-300 flex items-start gap-2">
                                                                <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-500 flex-shrink-0" />
                                                                {tip}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}

                            {activeTab === 'insights' && analysis.insights && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="bg-green-500/5 border border-green-500/10 rounded-xl p-6">
                                        <h4 className="text-green-400 font-bold mb-4 flex items-center gap-2">
                                            <TrendingUp className="w-5 h-5" /> Strengths
                                        </h4>
                                        <ul className="space-y-3">
                                            {analysis.insights.strengths?.map((item: string, i: number) => (
                                                <li key={i} className="flex items-start gap-3 text-zinc-300 text-sm">
                                                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="bg-red-500/5 border border-red-500/10 rounded-xl p-6">
                                        <h4 className="text-red-400 font-bold mb-4 flex items-center gap-2">
                                            <AlertTriangle className="w-5 h-5" /> Weaknesses
                                        </h4>
                                        <ul className="space-y-3">
                                            {analysis.insights.weaknesses?.map((item: string, i: number) => (
                                                <li key={i} className="flex items-start gap-3 text-zinc-300 text-sm">
                                                    <div className="w-4 h-4 rounded-full border border-red-500/50 flex items-center justify-center mt-0.5 flex-shrink-0">
                                                        <div className="w-1.5 h-1.5 bg-red-500 rounded-full" />
                                                    </div>
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'assets' && (
                                <div className="space-y-6">
                                    {analysis.optimized_assets ? (
                                        <>
                                            <div className="bg-zinc-900/50 rounded-xl p-6 border border-white/5 backdrop-blur-sm">
                                                <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                                                    <Target className="w-5 h-5 text-blue-400" /> Viral Titles
                                                </h4>
                                                <div className="space-y-3">
                                                    {analysis.optimized_assets.titles?.map((title: string, i: number) => (
                                                        <div key={i} className="flex items-center justify-between p-3 bg-black/20 rounded-lg border border-white/5 hover:border-blue-500/30 transition-colors group">
                                                            <span className="text-zinc-300 text-sm">{title}</span>
                                                            <button
                                                                onClick={() => {
                                                                    navigator.clipboard.writeText(title);
                                                                    toast.success("Title copied!");
                                                                }}
                                                                className="text-zinc-600 group-hover:text-blue-400 transition-colors"
                                                            >
                                                                <Share2 className="w-4 h-4" />
                                                            </button>
                                                        </div>
                                                    ))}
                                                    {(!analysis.optimized_assets.titles || analysis.optimized_assets.titles.length === 0) && (
                                                        <p className="text-zinc-500 text-sm italic">No titles generated.</p>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="bg-zinc-900/50 rounded-xl p-6 border border-white/5 backdrop-blur-sm">
                                                <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                                                    <Hash className="w-5 h-5 text-pink-400" /> Hashtags
                                                </h4>
                                                <div className="flex flex-wrap gap-2">
                                                    {analysis.optimized_assets.hashtags?.map((tag: string, i: number) => (
                                                        <button
                                                            key={i}
                                                            onClick={() => {
                                                                navigator.clipboard.writeText(tag);
                                                                toast.success("Hashtag copied!");
                                                            }}
                                                            className="px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-400 text-sm hover:bg-pink-500/20 transition-colors"
                                                        >
                                                            {tag}
                                                        </button>
                                                    ))}
                                                    {(!analysis.optimized_assets.hashtags || analysis.optimized_assets.hashtags.length === 0) && (
                                                        <p className="text-zinc-500 text-sm italic">No hashtags generated.</p>
                                                    )}
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        <div className="text-center py-10">
                                            <p className="text-zinc-500">No assets available for this analysis.</p>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Right Column: Score & Checklist */}
                <div className="space-y-8">
                    {/* Overall Score Card */}
                    <div className="glass p-8 rounded-3xl text-center relative overflow-hidden">
                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500" />

                        <h3 className="text-zinc-400 font-medium uppercase tracking-widest text-sm mb-6">Viral Score</h3>

                        <div className="relative w-40 h-40 mx-auto mb-6 flex items-center justify-center">
                            {/* Circular Progress Background */}
                            <svg className="w-full h-full transform -rotate-90">
                                <circle
                                    cx="80"
                                    cy="80"
                                    r="70"
                                    stroke="currentColor"
                                    strokeWidth="10"
                                    fill="transparent"
                                    className="text-zinc-800"
                                />
                                <circle
                                    cx="80"
                                    cy="80"
                                    r="70"
                                    stroke="currentColor"
                                    strokeWidth="10"
                                    fill="transparent"
                                    strokeDasharray={440}
                                    strokeDashoffset={440 - (440 * (analysis.overall_score || 0)) / 100}
                                    className={`${getScoreColor(analysis.overall_score || 0)} transition-all duration-1000 ease-out`}
                                    strokeLinecap="round"
                                />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className={`text-5xl font-black ${getScoreColor(analysis.overall_score || 0)}`}>
                                    {analysis.overall_score || 0}
                                </span>
                            </div>
                        </div>

                        <div className="flex justify-center gap-2 mb-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <Award
                                    key={star}
                                    className={`w-6 h-6 ${(analysis.overall_score || 0) / 20 >= star
                                        ? 'text-yellow-400 fill-yellow-400'
                                        : 'text-zinc-700'
                                        }`}
                                />
                            ))}
                        </div>
                        <p className="text-zinc-400 text-sm">Based on AI analysis</p>
                    </div>

                    {/* Checklist */}
                    <div className="glass p-6 rounded-3xl">
                        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                            <CheckCircle className="w-5 h-5 text-blue-400" />
                            Optimization Checklist
                        </h3>

                        {/* Progress Bar */}
                        <div className="mb-6">
                            <div className="flex justify-between text-xs text-zinc-400 mb-2">
                                <span>Optimization Progress</span>
                                <span>
                                    {Math.round(
                                        (Object.values(checklistState).filter(Boolean).length /
                                            Object.keys(checklistState).length) * 100
                                    ) || 0}%
                                </span>
                            </div>
                            <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                                <motion.div
                                    className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                                    initial={{ width: 0 }}
                                    animate={{
                                        width: `${Math.round(
                                            (Object.values(checklistState).filter(Boolean).length /
                                                Object.keys(checklistState).length) * 100
                                        ) || 0}%`
                                    }}
                                    transition={{ duration: 0.5, ease: "easeOut" }}
                                />
                            </div>
                        </div>

                        <div className="space-y-3">
                            {/* Combined Checklist Items (AI + Default) */}
                            {Object.entries(checklistState).map(([key, isChecked]) => (
                                <div
                                    key={key}
                                    onClick={() => toggleChecklistItem(key)}
                                    className="flex items-start gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer group"
                                >
                                    <div className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center border transition-colors ${isChecked
                                        ? 'bg-green-500/20 border-green-500 text-green-500'
                                        : 'bg-zinc-800 border-zinc-700 text-zinc-500 group-hover:border-zinc-500'
                                        }`}>
                                        {isChecked && <CheckCircle className="w-3 h-3" />}
                                    </div>
                                    <span className={`text-sm transition-colors ${isChecked ? 'text-zinc-300 line-through opacity-70' : 'text-zinc-300'}`}>
                                        {key.replace(/_/g, ' ')}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
