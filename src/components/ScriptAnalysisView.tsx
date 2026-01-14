"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FileText, Share2, Download, CheckCircle, AlertTriangle,
    TrendingUp, Award, Zap, Target, Hash, Copy, Sparkles, ArrowLeft
} from 'lucide-react';
import { downloadReportPdf } from '@/lib/api';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

interface ScriptAnalysisViewProps {
    analysis: any;
}

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2
        }
    }
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: { type: "spring", stiffness: 100 }
    }
};

export default function ScriptAnalysisView({ analysis }: ScriptAnalysisViewProps) {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState('breakdown');

    const getScoreColor = (score: number) => {
        if (score >= 90) return 'text-green-400';
        if (score >= 70) return 'text-purple-400';
        if (score >= 50) return 'text-yellow-400';
        return 'text-red-400';
    };

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="max-w-7xl mx-auto pb-20 pt-8 px-6"
        >
            {/* Header */}
            <motion.div variants={itemVariants} className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
                <div>
                    <button
                        onClick={() => router.push('/dashboard')}
                        className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors mb-4 text-sm font-medium group"
                    >
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        Back to Dashboard
                    </button>
                    <div className="flex items-center gap-3 mb-1">
                        <div className="flex items-center gap-3">
                            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-400">
                                Script Viral Potential
                            </h1>
                            <span className="px-3 py-1 rounded-full bg-[#1E1E26] border border-white/5 text-zinc-400 text-xs font-mono">
                                #{analysis.custom_id}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <button className="p-2.5 rounded-xl bg-[#1E1E26] border border-[#2D2D39] text-zinc-400 hover:text-white hover:bg-[#2D2D39] transition-all">
                        <Share2 className="w-5 h-5" />
                    </button>
                    <button
                        onClick={async () => {
                            try {
                                const blob = await downloadReportPdf(analysis.id);
                                const url = window.URL.createObjectURL(blob);
                                const a = document.createElement('a');
                                a.href = url;
                                a.download = `analysis_${analysis.custom_id}.pdf`;
                                a.click();
                            } catch (e) { toast.error("Download failed"); }
                        }}
                        className="flex items-center gap-2 px-6 py-2.5 bg-white text-black rounded-xl font-bold hover:bg-zinc-200 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                    >
                        <Download className="w-4 h-4" />
                        Export PDF
                    </button>
                </div>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Script Content & Key Stats */}
                <div className="lg:col-span-2 space-y-8">

                    {/* Script Content Viewer */}
                    <motion.div variants={itemVariants} className="bg-[#13131A] border border-[#2D2D39] rounded-3xl overflow-hidden shadow-2xl">
                        <div className="bg-[#1E1E26] border-b border-[#2D2D39] px-6 py-4 flex items-center justify-between">
                            <h3 className="text-lg font-bold text-white flex items-center gap-2">
                                <FileText className="w-5 h-5 text-purple-400" />
                                Script Content
                            </h3>
                            <button
                                onClick={() => {
                                    navigator.clipboard.writeText(analysis.script_content);
                                    toast.success("Script copied!");
                                }}
                                className="text-zinc-500 hover:text-white transition-colors p-2 hover:bg-[#2D2D39] rounded-lg"
                            >
                                <Copy className="w-4 h-4" />
                            </button>
                        </div>
                        <div className="p-6 max-h-[400px] overflow-y-auto custom-scrollbar bg-[#0E0E12]">
                            <pre className="whitespace-pre-wrap font-mono text-sm text-zinc-400 leading-relaxed font-medium">
                                {analysis.script_content}
                            </pre>
                        </div>
                    </motion.div>

                    {/* Executive Summary */}
                    <motion.div variants={itemVariants} className="bg-[#13131A] rounded-3xl p-8 border border-[#2D2D39] relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2 relative z-10">
                            <Sparkles className="w-5 h-5 text-purple-400" />
                            Executive Summary
                        </h3>
                        <p className="text-zinc-300 leading-relaxed relative z-10">
                            {analysis.insights?.executive_summary || "No summary available."}
                        </p>
                    </motion.div>

                    {/* Detailed Breakdown Tabs */}
                    <motion.div variants={itemVariants} className="bg-[#13131A] rounded-3xl border border-[#2D2D39] overflow-hidden min-h-[500px] flex flex-col">
                        <div className="flex border-b border-[#2D2D39] p-2 bg-[#0E0E12]">
                            {['breakdown', 'insights', 'assets'].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`flex-1 py-3 text-sm font-bold uppercase tracking-wider rounded-xl transition-all relative ${activeTab === tab
                                            ? 'text-white bg-[#1E1E26] shadow-lg'
                                            : 'text-zinc-500 hover:text-zinc-300 hover:bg-[#1E1E26]/50'
                                        }`}
                                >
                                    {tab}
                                    {activeTab === tab && (
                                        <motion.div layoutId="activeTabIndicatorScript" className="absolute bottom-0 left-1/2 w-1 h-1 bg-purple-500 rounded-full -translate-x-1/2 translate-y-2" />
                                    )}
                                </button>
                            ))}
                        </div>

                        <div className="p-8 flex-1">
                            <AnimatePresence mode="wait">
                                {activeTab === 'breakdown' && analysis.subscores && (
                                    <motion.div
                                        key="breakdown"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="space-y-6"
                                    >
                                        {Object.entries(analysis.subscores).map(([key, data]: [string, any], idx) => (
                                            <motion.div
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: idx * 0.1 }}
                                                key={key}
                                                className="bg-[#0E0E12] rounded-xl p-6 border border-[#2D2D39]"
                                            >
                                                <div className="flex justify-between items-center mb-4">
                                                    <h4 className="text-lg font-bold text-white capitalize flex items-center gap-3">
                                                        <span className="w-8 h-8 rounded-lg bg-[#1E1E26] flex items-center justify-center text-xs text-zinc-400 font-mono border border-[#2D2D39]">
                                                            {idx + 1}
                                                        </span>
                                                        {key.replace(/_/g, ' ')}
                                                    </h4>
                                                    <div className={`px-4 py-1.5 rounded-full text-sm font-bold bg-[#1E1E26] border border-[#2D2D39] ${getScoreColor(data.score)}`}>
                                                        {data.score}/100
                                                    </div>
                                                </div>
                                                <p className="text-zinc-400 text-sm mb-4 leading-relaxed pl-4 border-l-2 border-[#2D2D39]">{data.analysis}</p>

                                                {data.tips && data.tips.length > 0 && (
                                                    <div className="bg-purple-500/5 rounded-xl p-4 border border-purple-500/10">
                                                        <p className="text-xs font-bold text-purple-400 uppercase mb-2 flex items-center gap-2">
                                                            <Zap className="w-3 h-3" /> Improvement Tips
                                                        </p>
                                                        <ul className="space-y-2">
                                                            {data.tips.map((tip: string, i: number) => (
                                                                <li key={i} className="text-sm text-zinc-300 flex items-start gap-2">
                                                                    <div className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                                                                    {tip}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                )}
                                            </motion.div>
                                        ))}
                                    </motion.div>
                                )}

                                {activeTab === 'insights' && (
                                    <motion.div
                                        key="insights"
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="grid grid-cols-1 md:grid-cols-2 gap-6"
                                    >
                                        <div className="bg-emerald-500/5 border border-emerald-500/10 rounded-2xl p-6">
                                            <h4 className="text-emerald-400 font-bold mb-6 flex items-center gap-2 text-lg">
                                                <TrendingUp className="w-5 h-5" /> Strengths
                                            </h4>
                                            <ul className="space-y-4">
                                                {analysis.insights.strengths?.map((item: string, i: number) => (
                                                    <li key={i} className="flex items-start gap-3 text-zinc-300 text-sm">
                                                        <CheckCircle className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                                                        <span className="leading-relaxed">{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div className="bg-red-500/5 border border-red-500/10 rounded-2xl p-6">
                                            <h4 className="text-red-400 font-bold mb-6 flex items-center gap-2 text-lg">
                                                <AlertTriangle className="w-5 h-5" /> Weaknesses
                                            </h4>
                                            <ul className="space-y-4">
                                                {analysis.insights.weaknesses?.map((item: string, i: number) => (
                                                    <li key={i} className="flex items-start gap-3 text-zinc-300 text-sm">
                                                        <div className="mt-1 w-5 h-5 rounded-full bg-red-500/10 flex items-center justify-center flex-shrink-0">
                                                            <div className="w-1.5 h-1.5 bg-red-500 rounded-full" />
                                                        </div>
                                                        <span className="leading-relaxed">{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </motion.div>
                                )}

                                {activeTab === 'assets' && (
                                    <motion.div key="assets" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                                        <div className="bg-[#0E0E12] rounded-xl p-6 border border-[#2D2D39]">
                                            <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                                                <Target className="w-5 h-5 text-blue-400" /> Improved Hooks
                                            </h4>
                                            <div className="space-y-3">
                                                {analysis.optimized_assets.improved_hook?.map((hook: string, i: number) => (
                                                    <div key={i} className="flex items-center justify-between p-4 bg-[#1E1E26] rounded-lg border border-white/5 hover:border-blue-500/30 transition-all group cursor-copy"
                                                        onClick={() => { navigator.clipboard.writeText(hook); toast.success("Copied!"); }}>
                                                        <span className="text-zinc-300 text-sm font-medium">{hook}</span>
                                                        <Copy className="w-4 h-4 text-zinc-600 group-hover:text-blue-400 transition-colors" />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {analysis.optimized_assets.full_script_rewrite && (
                                            <div className="bg-gradient-to-br from-purple-900/10 to-blue-900/10 rounded-xl p-6 border border-purple-500/20">
                                                <div className="flex items-center justify-between mb-4">
                                                    <h4 className="text-white font-bold flex items-center gap-2">
                                                        <Sparkles className="w-5 h-5 text-purple-400" />
                                                        Viral Rewrite
                                                    </h4>
                                                    <button
                                                        onClick={() => {
                                                            navigator.clipboard.writeText(analysis.optimized_assets.full_script_rewrite);
                                                            toast.success("Script copied!");
                                                        }}
                                                        className="flex items-center gap-2 px-3 py-1.5 bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 rounded-lg text-xs font-bold transition-colors border border-purple-500/20"
                                                    >
                                                        <Copy className="w-3 h-3" /> Copy Script
                                                    </button>
                                                </div>
                                                <div className="p-4 bg-[#0E0E12] rounded-lg border border-[#2D2D39]">
                                                    <pre className="whitespace-pre-wrap font-mono text-sm text-zinc-300 leading-relaxed">
                                                        {analysis.optimized_assets.full_script_rewrite}
                                                    </pre>
                                                </div>
                                            </div>
                                        )}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                </div>

                {/* Right Column: Score & Checklist */}
                <div className="space-y-8">
                    {/* Score Card */}
                    <motion.div variants={itemVariants} className="bg-[#13131A] p-8 rounded-3xl text-center relative overflow-hidden border border-[#2D2D39]">
                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 opacity-50" />
                        <h3 className="text-zinc-500 text-xs font-bold uppercase tracking-[0.2em] mb-8">Viral Potential Score</h3>

                        <div className="relative w-48 h-48 mx-auto mb-8 flex items-center justify-center">
                            <svg className="w-full h-full transform -rotate-90 drop-shadow-2xl">
                                <circle cx="96" cy="96" r="88" stroke="#1E1E26" strokeWidth="12" fill="transparent" />
                                <motion.circle
                                    cx="96" cy="96" r="88"
                                    stroke="url(#gradient-script)" strokeWidth="12" fill="transparent"
                                    strokeDasharray={552} strokeDashoffset={552}
                                    strokeLinecap="round"
                                    className="drop-shadow-[0_0_10px_rgba(168,85,247,0.4)]"
                                    animate={{ strokeDashoffset: 552 - (552 * (analysis.overall_score || 0)) / 100 }}
                                    transition={{ duration: 1.5, ease: "easeOut" }}
                                />
                                <defs>
                                    <linearGradient id="gradient-script" x1="0%" y1="0%" x2="100%" y2="0%">
                                        <stop offset="0%" stopColor="#A855F7" />
                                        <stop offset="100%" stopColor="#EC4899" />
                                    </linearGradient>
                                </defs>
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <motion.span
                                    initial={{ opacity: 0, scale: 0.5 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="text-6xl font-black text-white tracking-tighter"
                                >
                                    {analysis.overall_score || 0}
                                </motion.span>
                                <span className="text-zinc-500 text-xs mt-1">out of 100</span>
                            </div>
                        </div>

                        <div className="flex justify-center gap-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <Award key={star} className={`w-6 h-6 ${(analysis.overall_score || 0) / 20 >= star ? 'text-yellow-400 fill-yellow-400' : 'text-[#2D2D39]'}`} />
                            ))}
                        </div>
                    </motion.div>

                    {/* Checklist */}
                    <motion.div variants={itemVariants} className="bg-[#13131A] p-6 rounded-3xl border border-[#2D2D39]">
                        <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400"><CheckCircle className="w-5 h-5" /></div>
                            Optimization Checklist
                        </h3>
                        <div className="space-y-3">
                            {analysis.checklist && Object.entries(analysis.checklist).map(([key, value]: [string, any]) => (
                                <div key={key} className="flex items-start gap-4 p-4 rounded-xl border border-[#2D2D39] bg-[#1E1E26]">
                                    <div className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center border ${value
                                        ? 'bg-green-500/20 border-green-500 text-green-500'
                                        : 'bg-zinc-800 border-zinc-700 text-zinc-500'
                                        }`}>
                                        {value && <CheckCircle className="w-3 h-3" />}
                                    </div>
                                    <span className={`text-sm font-medium ${value ? 'text-zinc-300' : 'text-zinc-500'}`}>
                                        {key.replace(/_/g, ' ')}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
}
