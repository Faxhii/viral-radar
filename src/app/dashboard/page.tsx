'use client';

import { useState, useEffect } from 'react';
import { Upload, Link as LinkIcon, Loader2, AlertCircle, Sparkles, TrendingUp, Zap, FileText, ChevronRight } from 'lucide-react';
import { uploadVideo, importLink, getStats, analyzeScript } from '@/lib/api';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import UpgradeModal from '@/components/UpgradeModal';
import { toast } from 'sonner';

export default function DashboardPage() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<'upload' | 'link' | 'script'>('upload');
    const [file, setFile] = useState<File | null>(null);
    const [url, setUrl] = useState('');
    const [scriptContent, setScriptContent] = useState('');
    const [scriptPlatform, setScriptPlatform] = useState('TikTok');
    const [scriptCategory, setScriptCategory] = useState('Education');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const [stats, setStats] = useState({ total_analyzed: 0, avg_score: 0, growth_potential: '--' });
    const [showUpgradeModal, setShowUpgradeModal] = useState(false);

    const searchParams = useSearchParams();

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const data = await getStats();
                setStats(data);
            } catch (error) {
                console.error('Failed to fetch stats:', error);
            }
        };
        fetchStats();

        if (searchParams.get('payment') === 'success') {
            toast.success("Payment verified", { description: "Your credits have been updated." });
            router.replace('/dashboard');
            // Re-fetch to ensure UI is in sync
            fetchStats();
        } else if (searchParams.get('payment') === 'failed' || searchParams.get('canceled')) {
            toast.error("Payment incomplete", { description: "No charges were made." });
            router.replace('/dashboard');
        }
    }, [searchParams, router]);

    const handleUpload = async () => {
        if (!file) return;
        setLoading(true);
        setError('');
        try {
            const result = await uploadVideo(file);
            router.push(`/dashboard/analysis/${result.custom_id}`);
        } catch (err: any) {
            console.error("Upload Error:", err);
            if (err.response?.status === 402 || err.response?.status === 403 || err.message?.includes('credits')) {
                setShowUpgradeModal(true);
                return;
            }
            setError('Failed to upload video. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const resolveLink = async (url: string) => {
        try {
            const res = await fetch('/api/resolve-url', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url })
            });
            const data = await res.json();
            if (data.url) return data.url;
        } catch (e) {
            console.warn("Vercel Proxy resolution failed:", e);
        }
        return null;
    };

    const handleLinkImport = async () => {
        if (!url) return;
        setLoading(true);
        setError('');
        try {
            let directUrl = null;
            if (url.includes('youtube.com') || url.includes('youtu.be') || url.includes('instagram.com') || url.includes('tiktok.com')) {
                directUrl = await resolveLink(url);
            }

            const result = await importLink(url, directUrl);
            router.push(`/dashboard/analysis/${result.custom_id}`);
        } catch (err: any) {
            console.error("Link Import Error:", err);
            if (err.response?.status === 402 || err.response?.status === 403 || err.message?.includes('credits')) {
                setShowUpgradeModal(true);
                return;
            }
            setError('Failed to import link. Please check the URL.');
        } finally {
            setLoading(false);
        }
    };

    const handleScriptAnalyze = async () => {
        if (!scriptContent) return;
        setLoading(true);
        setError('');
        try {
            const result = await analyzeScript({
                script_content: scriptContent,
                platform: scriptPlatform,
                category: scriptCategory
            });
            router.push(`/dashboard/analysis/${result.custom_id}`);
        } catch (err: any) {
            console.error("Script Analysis Error:", err);
            if (err.response?.status === 402 || err.response?.status === 403 || err.message?.includes('credits')) {
                setShowUpgradeModal(true);
                return;
            }
            setError('Failed to analyze script. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-6xl mx-auto py-8">
            <header className="mb-12 text-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1E1E26] border border-[#2D2D39] text-purple-400 text-xs font-medium uppercase tracking-wider mb-6 shadow-xl"
                >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>AI-Powered Viral Analysis</span>
                </motion.div>
                <motion.h1
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-4xl md:text-5xl font-bold mb-4 font-heading text-white"
                >
                    Create Your Next <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Viral Hit</span>
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-zinc-500 text-lg max-w-2xl mx-auto font-light"
                >
                    Upload your video or paste a link to get instant, AI-driven insights on how to maximize your reach and engagement.
                </motion.p>
            </header>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                {[
                    { label: 'Total Analyzed', value: stats.total_analyzed, icon: TrendingUp, color: 'text-blue-400', bg: 'bg-blue-500/10' },
                    { label: 'Avg. Viral Score', value: stats.avg_score, icon: Zap, color: 'text-purple-400', bg: 'bg-purple-500/10' },
                    { label: 'Growth Potential', value: stats.growth_potential, icon: Sparkles, color: 'text-orange-400', bg: 'bg-orange-500/10' },
                ].map((stat, i) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + (i * 0.1) }}
                        className="bg-[#13131A] border border-white/5 p-6 rounded-2xl relative overflow-hidden group hover:border-purple-500/20 transition-all duration-300"
                    >
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-zinc-500 text-sm font-medium mb-1">{stat.label}</p>
                                <h3 className="text-3xl font-bold text-white">{stat.value}</h3>
                            </div>
                            <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                                <stat.icon className="w-6 h-6" />
                            </div>
                        </div>
                        {/* Decorative glow */}
                        <div className={`absolute -right-4 -bottom-4 w-24 h-24 rounded-full ${stat.bg} blur-2xl opacity-20 group-hover:opacity-40 transition-opacity`} />
                    </motion.div>
                ))}
            </div>

            {/* Main Action Area */}
            <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
                className="bg-[#13131A] border border-white/5 rounded-3xl overflow-hidden shadow-2xl shadow-black/50"
            >
                {/* Tab Navigation */}
                <div className="flex justify-center border-b border-white/5 p-2 bg-[#0F0F12]/50 backdrop-blur-md sticky top-0 z-20">
                    <div className="flex p-1 bg-[#0a0a0b] rounded-xl border border-white/5">
                        <button
                            onClick={() => setActiveTab('upload')}
                            className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 flex items-center gap-2 ${activeTab === 'upload'
                                ? 'bg-[#1E1E26] text-white shadow-lg shadow-purple-900/10 border border-white/5'
                                : 'text-zinc-500 hover:text-zinc-300'
                                }`}
                        >
                            <Upload className="w-4 h-4" /> Upload Video
                        </button>
                        <button
                            onClick={() => setActiveTab('link')}
                            className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 flex items-center gap-2 ${activeTab === 'link'
                                ? 'bg-[#1E1E26] text-white shadow-lg shadow-purple-900/10 border border-white/5'
                                : 'text-zinc-500 hover:text-zinc-300'
                                }`}
                        >
                            <LinkIcon className="w-4 h-4" /> Paste Link
                        </button>
                        <button
                            onClick={() => setActiveTab('script')}
                            className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 flex items-center gap-2 ${activeTab === 'script'
                                ? 'bg-[#1E1E26] text-white shadow-lg shadow-purple-900/10 border border-white/5'
                                : 'text-zinc-500 hover:text-zinc-300'
                                }`}
                        >
                            <FileText className="w-4 h-4" /> Analyze Script
                        </button>
                    </div>
                </div>

                <div className="p-8 md:p-12 min-h-[400px]">
                    <AnimatePresence mode="wait">
                        {activeTab === 'upload' ? (
                            <motion.div
                                key="upload"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                transition={{ duration: 0.3 }}
                                className="text-center max-w-xl mx-auto"
                            >
                                <div
                                    className={`border-2 border-dashed rounded-3xl p-12 transition-all duration-300 relative group overflow-hidden ${file ? 'border-purple-500/50 bg-purple-500/5' : 'border-[#2D2D39] hover:border-zinc-600 hover:bg-[#1E1E26]'
                                        }`}
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                                    <div className="w-24 h-24 bg-[#1E1E26] border border-white/5 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl relative z-10 group-hover:scale-110 transition-transform duration-300">
                                        <div className="w-full h-full rounded-full bg-gradient-to-t from-purple-500/10 to-transparent absolute inset-0" />
                                        <Upload className="w-10 h-10 text-purple-400 group-hover:text-purple-300 transition-colors" />
                                    </div>

                                    <h3 className="text-2xl font-bold mb-3 text-white">Upload your video</h3>
                                    <p className="text-zinc-500 mb-8 max-w-sm mx-auto">Drag and drop your video here, or click to browse. Supports MP4, MOV, WebM.</p>

                                    <input
                                        type="file"
                                        accept="video/*"
                                        onChange={(e) => setFile(e.target.files?.[0] || null)}
                                        className="hidden"
                                        id="video-upload"
                                    />

                                    {!file ? (
                                        <label
                                            htmlFor="video-upload"
                                            className="inline-flex cursor-pointer bg-white text-black px-10 py-4 rounded-xl font-bold hover:bg-zinc-200 transition-colors shadow-lg shadow-white/5 relative z-10"
                                        >
                                            Select File
                                        </label>
                                    ) : (
                                        <div className="space-y-6 relative z-10">
                                            <div className="bg-[#0a0a0b] border border-white/10 px-6 py-4 rounded-xl text-zinc-300 flex items-center justify-between shadow-lg">
                                                <div className="flex items-center gap-3 overflow-hidden">
                                                    <div className="w-10 h-10 bg-zinc-800 rounded-lg flex items-center justify-center flex-shrink-0">
                                                        <FileText className="w-5 h-5 text-zinc-400" />
                                                    </div>
                                                    <span className="truncate max-w-[200px] font-medium">{file.name}</span>
                                                </div>
                                                <button onClick={() => setFile(null)} className="text-zinc-500 hover:text-red-400 transition-colors p-2">
                                                    Change
                                                </button>
                                            </div>
                                            <button
                                                onClick={handleUpload}
                                                disabled={loading}
                                                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-xl font-bold hover:opacity-90 transition-all shadow-lg shadow-purple-500/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                            >
                                                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Start Analysis <ChevronRight className="w-5 h-5" /></>}
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        ) : activeTab === 'link' ? (
                            <motion.div
                                key="link"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                transition={{ duration: 0.3 }}
                                className="text-center max-w-xl mx-auto"
                            >
                                <div className="w-20 h-20 bg-[#1E1E26] border border-white/5 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
                                    <LinkIcon className="w-10 h-10 text-pink-400" />
                                </div>
                                <h3 className="text-2xl font-bold mb-3 text-white">Import from URL</h3>
                                <p className="text-zinc-500 mb-8">Paste a link from YouTube, Instagram, or TikTok</p>

                                <div className="relative mb-6">
                                    <input
                                        type="text"
                                        placeholder="https://www.tiktok.com/@user/video/..."
                                        value={url}
                                        onChange={(e) => setUrl(e.target.value)}
                                        className="w-full bg-[#0a0a0b] border border-[#2D2D39] rounded-xl px-6 py-5 text-white placeholder-zinc-700 focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition-all font-mono text-sm"
                                    />
                                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-600">
                                        <LinkIcon className="w-4 h-4" />
                                    </div>
                                </div>

                                <button
                                    onClick={handleLinkImport}
                                    disabled={loading || !url}
                                    className="w-full bg-gradient-to-r from-pink-600 to-orange-600 text-white px-8 py-4 rounded-xl font-bold hover:opacity-90 transition-all shadow-lg shadow-pink-500/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Analyze Link <ChevronRight className="w-5 h-5" /></>}
                                </button>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="script"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                transition={{ duration: 0.3 }}
                                className="text-center max-w-2xl mx-auto"
                            >
                                <div className="w-20 h-20 bg-[#1E1E26] border border-white/5 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
                                    <FileText className="w-10 h-10 text-blue-400" />
                                </div>
                                <h3 className="text-2xl font-bold mb-3 text-white">Analyze Script</h3>
                                <p className="text-zinc-500 mb-8">Optimize your video script for maximum retention</p>

                                <div className="space-y-6 text-left">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider ml-1">Platform</label>
                                            <div className="relative group">
                                                <select
                                                    value={scriptPlatform}
                                                    onChange={(e) => setScriptPlatform(e.target.value)}
                                                    className="w-full appearance-none bg-[#0a0a0b] border border-[#2D2D39] rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all cursor-pointer hover:bg-[#1E1E26]"
                                                >
                                                    <option value="TikTok">TikTok</option>
                                                    <option value="Instagram Reels">Instagram Reels</option>
                                                    <option value="YouTube Shorts">YouTube Shorts</option>
                                                </select>
                                                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-500">
                                                    <ChevronRight className="w-4 h-4 rotate-90" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider ml-1">Category</label>
                                            <div className="relative group">
                                                <select
                                                    value={scriptCategory}
                                                    onChange={(e) => setScriptCategory(e.target.value)}
                                                    className="w-full appearance-none bg-[#0a0a0b] border border-[#2D2D39] rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all cursor-pointer hover:bg-[#1E1E26]"
                                                >
                                                    <option value="Education">Education</option>
                                                    <option value="Entertainment">Entertainment</option>
                                                    <option value="Lifestyle">Lifestyle</option>
                                                    <option value="Business">Business</option>
                                                </select>
                                                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-500">
                                                    <ChevronRight className="w-4 h-4 rotate-90" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider ml-1">Script Content</label>
                                        <textarea
                                            placeholder="Paste your script, outline, or rough ideas here..."
                                            value={scriptContent}
                                            onChange={(e) => setScriptContent(e.target.value)}
                                            rows={8}
                                            className="w-full bg-[#0a0a0b] border border-[#2D2D39] rounded-xl px-6 py-4 text-white placeholder-zinc-700 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all resize-none leading-relaxed"
                                        />
                                    </div>
                                </div>

                                <button
                                    onClick={handleScriptAnalyze}
                                    disabled={loading || !scriptContent}
                                    className="w-full mt-8 bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-8 py-4 rounded-xl font-bold hover:opacity-90 transition-all shadow-lg shadow-blue-500/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Analyze Script <ChevronRight className="w-5 h-5" /></>}
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-6 flex items-center gap-3 text-red-400 bg-red-500/10 border border-red-500/20 px-6 py-4 rounded-xl"
                        >
                            <AlertCircle className="w-5 h-5 flex-shrink-0" />
                            <span className="text-sm font-medium">{error}</span>
                        </motion.div>
                    )}
                </div>
            </motion.div>

            <UpgradeModal
                isOpen={showUpgradeModal}
                onClose={() => setShowUpgradeModal(false)}
            />
        </div>
    );
}
