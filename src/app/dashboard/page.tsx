'use client';

import { useState, useEffect } from 'react';
import { Upload, Link as LinkIcon, Loader2, AlertCircle, Sparkles, TrendingUp, Zap, FileText } from 'lucide-react';
import { uploadVideo, importLink, getStats, analyzeScript } from '@/lib/api';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

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
    }, []);

    const handleUpload = async () => {
        if (!file) return;
        setLoading(true);
        setError('');
        try {
            const result = await uploadVideo(file);
            router.push(`/dashboard/analysis/${result.id}`);
        } catch (err) {
            setError('Failed to upload video. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleLinkImport = async () => {
        if (!url) return;
        setLoading(true);
        setError('');
        try {
            const result = await importLink(url);
            router.push(`/dashboard/analysis/${result.id}`);
        } catch (err) {
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
            router.push(`/dashboard/analysis/${result.id}`);
        } catch (err) {
            setError('Failed to analyze script. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-5xl mx-auto">
            <header className="mb-12 text-center">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm font-medium mb-6"
                >
                    <Sparkles className="w-4 h-4" />
                    <span>AI-Powered Viral Analysis</span>
                </motion.div>
                <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-200 to-white">
                    Create Your Next Viral Hit
                </h1>
                <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
                    Upload your video or paste a link to get instant, AI-driven insights on how to maximize your reach and engagement.
                </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                {[
                    { label: 'Total Analyzed', value: stats.total_analyzed, icon: TrendingUp, color: 'from-blue-500 to-cyan-500' },
                    { label: 'Avg. Viral Score', value: stats.avg_score, icon: Zap, color: 'from-purple-500 to-pink-500' },
                    { label: 'Growth Potential', value: stats.growth_potential, icon: Sparkles, color: 'from-amber-500 to-orange-500' },
                ].map((stat, i) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="glass p-6 rounded-2xl relative overflow-hidden group"
                    >
                        <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-5 group-hover:opacity-10 transition-opacity`} />
                        <div className="relative z-10">
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-zinc-400 font-medium">{stat.label}</span>
                                <div className={`p-2 rounded-lg bg-gradient-to-br ${stat.color} bg-opacity-10`}>
                                    <stat.icon className="w-5 h-5 text-white" />
                                </div>
                            </div>
                            <div className="text-3xl font-bold">{stat.value}</div>
                        </div>
                    </motion.div>
                ))}
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass p-1 rounded-3xl"
            >
                <div className="bg-black/40 rounded-[22px] p-8 md:p-12 backdrop-blur-sm">
                    <div className="flex justify-center mb-8">
                        <div className="bg-zinc-900/50 p-1 rounded-xl inline-flex">
                            <button
                                onClick={() => setActiveTab('upload')}
                                className={`px-6 py-2.5 rounded-lg font-medium transition-all duration-300 ${activeTab === 'upload'
                                    ? 'bg-zinc-800 text-white shadow-lg'
                                    : 'text-zinc-500 hover:text-zinc-300'
                                    }`}
                            >
                                Upload Video
                            </button>
                            <button
                                onClick={() => setActiveTab('link')}
                                className={`px-6 py-2.5 rounded-lg font-medium transition-all duration-300 ${activeTab === 'link'
                                    ? 'bg-zinc-800 text-white shadow-lg'
                                    : 'text-zinc-500 hover:text-zinc-300'
                                    }`}
                            >
                                Paste Link
                            </button>
                            <button
                                onClick={() => setActiveTab('script')}
                                className={`px-6 py-2.5 rounded-lg font-medium transition-all duration-300 ${activeTab === 'script'
                                    ? 'bg-zinc-800 text-white shadow-lg'
                                    : 'text-zinc-500 hover:text-zinc-300'
                                    }`}
                            >
                                Analyze Script
                            </button>
                        </div>
                    </div>

                    <div className="max-w-xl mx-auto">
                        {activeTab === 'upload' ? (
                            <div className="text-center">
                                <div
                                    className={`border-2 border-dashed rounded-2xl p-12 transition-all duration-300 ${file ? 'border-purple-500/50 bg-purple-500/5' : 'border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900/30'
                                        }`}
                                >
                                    <div className="w-20 h-20 bg-gradient-to-tr from-purple-500/20 to-pink-500/20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl shadow-purple-500/10">
                                        <Upload className="w-10 h-10 text-purple-400" />
                                    </div>
                                    <h3 className="text-xl font-bold mb-2">Upload your video</h3>
                                    <p className="text-zinc-500 mb-8">MP4, MOV or WebM up to 200MB</p>

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
                                            className="inline-flex cursor-pointer bg-white text-black px-8 py-4 rounded-xl font-bold hover:bg-zinc-200 transition-colors shadow-lg shadow-white/10"
                                        >
                                            Select File
                                        </label>
                                    ) : (
                                        <div className="space-y-6">
                                            <div className="bg-zinc-800/50 border border-zinc-700/50 px-6 py-4 rounded-xl text-zinc-300 flex items-center justify-between">
                                                <span className="truncate max-w-[200px]">{file.name}</span>
                                                <button onClick={() => setFile(null)} className="text-zinc-500 hover:text-white">
                                                    Change
                                                </button>
                                            </div>
                                            <button
                                                onClick={handleUpload}
                                                disabled={loading}
                                                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-xl font-bold hover:opacity-90 transition-all shadow-lg shadow-purple-500/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                            >
                                                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Start Analysis'}
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ) : activeTab === 'link' ? (
                            <div className="text-center">
                                <div className="w-20 h-20 bg-gradient-to-tr from-pink-500/20 to-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl shadow-pink-500/10">
                                    <LinkIcon className="w-10 h-10 text-pink-400" />
                                </div>
                                <h3 className="text-xl font-bold mb-2">Import from URL</h3>
                                <p className="text-zinc-500 mb-8">YouTube Videos, Shorts, Reels, or TikTok</p>

                                <div className="relative mb-6">
                                    <input
                                        type="text"
                                        placeholder="Paste video URL here..."
                                        value={url}
                                        onChange={(e) => setUrl(e.target.value)}
                                        className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl px-6 py-4 text-white placeholder-zinc-600 focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition-all"
                                    />
                                </div>

                                <button
                                    onClick={handleLinkImport}
                                    disabled={loading || !url}
                                    className="w-full bg-gradient-to-r from-pink-600 to-orange-600 text-white px-8 py-4 rounded-xl font-bold hover:opacity-90 transition-all shadow-lg shadow-pink-500/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Analyze Link'}
                                </button>
                            </div>
                        ) : (
                            <div className="text-center">
                                <div className="w-20 h-20 bg-gradient-to-tr from-blue-500/20 to-cyan-500/20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl shadow-blue-500/10">
                                    <FileText className="w-10 h-10 text-blue-400" />
                                </div>
                                <h3 className="text-xl font-bold mb-2">Analyze Script</h3>
                                <p className="text-zinc-500 mb-8">Paste your script or outline</p>

                                <div className="space-y-6 text-left">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-zinc-400 ml-1">Platform</label>
                                            <div className="relative group">
                                                <select
                                                    value={scriptPlatform}
                                                    onChange={(e) => setScriptPlatform(e.target.value)}
                                                    className="w-full appearance-none bg-zinc-900/50 border border-zinc-800 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all cursor-pointer hover:bg-zinc-900/80"
                                                >
                                                    <option value="TikTok">TikTok</option>
                                                    <option value="Instagram Reels">Instagram Reels</option>
                                                    <option value="YouTube Shorts">YouTube Shorts</option>
                                                </select>
                                                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-500 group-hover:text-zinc-300 transition-colors">
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-zinc-400 ml-1">Category</label>
                                            <div className="relative group">
                                                <select
                                                    value={scriptCategory}
                                                    onChange={(e) => setScriptCategory(e.target.value)}
                                                    className="w-full appearance-none bg-zinc-900/50 border border-zinc-800 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all cursor-pointer hover:bg-zinc-900/80"
                                                >
                                                    <option value="Education">Education</option>
                                                    <option value="Entertainment">Entertainment</option>
                                                    <option value="Lifestyle">Lifestyle</option>
                                                    <option value="Business">Business</option>
                                                </select>
                                                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-500 group-hover:text-zinc-300 transition-colors">
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-zinc-400 ml-1">Script Content</label>
                                        <textarea
                                            placeholder="Paste your script, outline, or rough ideas here..."
                                            value={scriptContent}
                                            onChange={(e) => setScriptContent(e.target.value)}
                                            rows={8}
                                            className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl px-6 py-4 text-white placeholder-zinc-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all resize-none leading-relaxed"
                                        />
                                    </div>
                                </div>

                                <button
                                    onClick={handleScriptAnalyze}
                                    disabled={loading || !scriptContent}
                                    className="w-full mt-6 bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-8 py-4 rounded-xl font-bold hover:opacity-90 transition-all shadow-lg shadow-blue-500/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Analyze Script'}
                                </button>
                            </div>
                        )}

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
                </div>
            </motion.div>
        </div>
    );
}
