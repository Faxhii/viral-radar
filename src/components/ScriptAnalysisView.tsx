"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
    FileText, Share2, Download, CheckCircle, AlertTriangle,
    TrendingUp, Award, Zap, Target, Hash, ChevronRight, Copy, Sparkles
} from 'lucide-react';
import { downloadReportPdf } from '@/lib/api';
import { toast } from 'sonner';

interface ScriptAnalysisViewProps {
    analysis: any;
}

export default function ScriptAnalysisView({ analysis }: ScriptAnalysisViewProps) {
    const [activeTab, setActiveTab] = useState('breakdown');

    const getScoreColor = (score: number) => {
        if (score >= 90) return 'text-green-400';
        if (score >= 70) return 'text-purple-400';
        if (score >= 50) return 'text-yellow-400';
        return 'text-red-400';
    };

    return (
        <div className="max-w-7xl mx-auto pb-20">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <span className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-wider">
                            Script Analysis #{analysis.id}
                        </span>
                        <span className="text-zinc-500 text-sm">
                            {new Date(analysis.created_at).toLocaleDateString()}
                        </span>
                    </div>
                    <h1 className="text-3xl font-bold text-white">Script Viral Potential</h1>
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
                {/* Left Column: Script Content & Key Stats */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Script Content Viewer */}
                    <div className="bg-zinc-900/50 border border-zinc-800 rounded-3xl overflow-hidden">
                        <div className="bg-zinc-900/80 border-b border-zinc-800 px-6 py-4 flex items-center justify-between">
                            <h3 className="text-lg font-bold text-white flex items-center gap-2">
                                <FileText className="w-5 h-5 text-blue-400" />
                                Script Content
                            </h3>
                            <button
                                onClick={() => {
                                    navigator.clipboard.writeText(analysis.script_content);
                                    toast.success("Script copied to clipboard!");
                                }}
                                className="text-zinc-500 hover:text-white transition-colors"
                            >
                                <Copy className="w-4 h-4" />
                            </button>
                        </div>
                        <div className="p-6 max-h-[400px] overflow-y-auto custom-scrollbar">
                            <pre className="whitespace-pre-wrap font-mono text-sm text-zinc-300 leading-relaxed">
                                {analysis.script_content}
                            </pre>
                        </div>
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
                            {['breakdown', 'insights', 'assets'].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`px-6 py-4 text-sm font-bold uppercase tracking-wider transition-colors whitespace-nowrap ${activeTab === tab
                                        ? 'text-white border-b-2 border-blue-500 bg-white/5'
                                        : 'text-zinc-500 hover:text-zinc-300'
                                        }`}
                                >
                                    {tab}
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
                                                <div className="bg-blue-500/5 rounded-lg p-4 border border-blue-500/10">
                                                    <p className="text-xs font-bold text-blue-400 uppercase mb-2 flex items-center gap-2">
                                                        <Zap className="w-3 h-3" /> Improvement Tips
                                                    </p>
                                                    <ul className="space-y-2">
                                                        {data.tips.map((tip: string, i: number) => (
                                                            <li key={i} className="text-sm text-zinc-300 flex items-start gap-2">
                                                                <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-500 flex-shrink-0" />
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

                            {activeTab === 'assets' && analysis.optimized_assets && (
                                <div className="space-y-6">
                                    <div className="bg-zinc-900/50 rounded-xl p-6 border border-white/5">
                                        <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                                            <Target className="w-5 h-5 text-blue-400" /> Improved Hooks
                                        </h4>
                                        <div className="space-y-3">
                                            {analysis.optimized_assets.improved_hook?.map((hook: string, i: number) => (
                                                <div key={i} className="flex items-center justify-between p-3 bg-black/20 rounded-lg border border-white/5 hover:border-blue-500/30 transition-colors group">
                                                    <span className="text-zinc-300 text-sm">{hook}</span>
                                                    <button
                                                        onClick={() => {
                                                            navigator.clipboard.writeText(hook);
                                                            toast.success("Hook copied to clipboard!");
                                                        }}
                                                        className="text-zinc-600 group-hover:text-blue-400 transition-colors"
                                                    >
                                                        <Copy className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {analysis.optimized_assets.full_script_rewrite && (
                                        <div className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 rounded-xl p-6 border border-purple-500/20">
                                            <div className="flex items-center justify-between mb-4">
                                                <h4 className="text-white font-bold flex items-center gap-2">
                                                    <Sparkles className="w-5 h-5 text-purple-400" />
                                                    Viral Rewrite (10/10 Version)
                                                </h4>
                                                <button
                                                    onClick={() => {
                                                        navigator.clipboard.writeText(analysis.optimized_assets.full_script_rewrite);
                                                        toast.success("Viral rewrite copied to clipboard!");
                                                    }}
                                                    className="flex items-center gap-2 px-3 py-1.5 bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 rounded-lg text-xs font-bold transition-colors"
                                                >
                                                    <Copy className="w-3 h-3" /> Copy Script
                                                </button>
                                            </div>
                                            <div className="p-4 bg-black/40 rounded-lg border border-white/5">
                                                <pre className="whitespace-pre-wrap font-mono text-sm text-zinc-200 leading-relaxed">
                                                    {analysis.optimized_assets.full_script_rewrite}
                                                </pre>
                                            </div>
                                        </div>
                                    )}

                                    {analysis.optimized_assets.script_rewrite_start && !analysis.optimized_assets.full_script_rewrite && (
                                        <div className="bg-zinc-900/50 rounded-xl p-6 border border-white/5">
                                            <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                                                <FileText className="w-5 h-5 text-purple-400" /> Rewritten Opening
                                            </h4>
                                            <div className="p-4 bg-black/20 rounded-lg border border-white/5">
                                                <p className="text-zinc-300 text-sm italic">
                                                    "{analysis.optimized_assets.script_rewrite_start}"
                                                </p>
                                            </div>
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
                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />

                        <h3 className="text-zinc-400 font-medium uppercase tracking-widest text-sm mb-6">Script Score</h3>

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
                        <div className="space-y-3">
                            {analysis.checklist && Object.entries(analysis.checklist).map(([key, value]: [string, any]) => (
                                <div key={key} className="flex items-start gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                                    <div className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center border ${value
                                        ? 'bg-green-500/20 border-green-500 text-green-500'
                                        : 'bg-zinc-800 border-zinc-700 text-zinc-500'
                                        }`}>
                                        {value && <CheckCircle className="w-3 h-3" />}
                                    </div>
                                    <span className={`text-sm ${value ? 'text-zinc-300' : 'text-zinc-500'}`}>
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
