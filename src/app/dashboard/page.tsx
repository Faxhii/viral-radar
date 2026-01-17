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
    // New Onboarding-style preferences
    const [scriptGoal, setScriptGoal] = useState('Go Viral');
    const [scriptTone, setScriptTone] = useState('High Energy');
    const [scriptAudience, setScriptAudience] = useState('Gen Z');

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const [stats, setStats] = useState({ total_analyzed: 0, avg_score: 0, growth_potential: '--' });
    const [showUpgradeModal, setShowUpgradeModal] = useState(false);

    const searchParams = useSearchParams();

    // ... (useEffect remains same) ...

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
            const returnUrl = localStorage.getItem('payment_return_url');
            if (returnUrl && !returnUrl.includes('/dashboard?')) {
                localStorage.removeItem('payment_return_url');
                window.location.href = returnUrl;
            } else {
                router.replace('/dashboard');
                fetchStats();
            }
        } else if (searchParams.get('payment') === 'failed' || searchParams.get('canceled')) {
            toast.error("Payment incomplete", { description: "No charges were made." });
            const returnUrl = localStorage.getItem('payment_return_url');
            if (returnUrl) {
                localStorage.removeItem('payment_return_url');
                window.location.href = returnUrl;
            } else {
                router.replace('/dashboard');
            }
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
            // Inject preferences into script content as Context for the AI
            // This allows us to use specific preferences without migrating the database
            const enrichedScriptContent = `CONTEXT_START
Goal: ${scriptGoal}
Tone: ${scriptTone}
Audience: ${scriptAudience}
CONTEXT_END

${scriptContent}`;

            const result = await analyzeScript({
                script_content: enrichedScriptContent,
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
                    className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary border border-border text-purple-500 text-xs font-medium uppercase tracking-wider mb-6 shadow-xl"
                >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>AI-Powered Viral Analysis</span>
                </motion.div>
                <motion.h1
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-4xl md:text-5xl font-bold mb-4 font-heading text-foreground"
                >
                    Create Your Next <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Viral Hit</span>
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-muted-foreground text-lg max-w-2xl mx-auto font-light"
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
                        className="glass-card p-6 rounded-3xl border border-border group hover:border-purple-500/30 transition-all duration-300"
                    >
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-muted-foreground text-sm font-medium mb-1">{stat.label}</p>
                                <h3 className="text-3xl font-bold text-foreground">{stat.value}</h3>
                            </div>
                            <div className={`p-3 rounded-2xl ${stat.bg} ${stat.color}`}>
                                <stat.icon className="w-6 h-6" />
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Main Action Area */}
            <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
                className="glass-card border border-border rounded-3xl overflow-hidden shadow-2xl backdrop-blur-xl"
            >
                {/* Tab Navigation */}
                <div className="flex justify-center border-b border-border p-2 bg-secondary/30 backdrop-blur-md sticky top-0 z-20">
                    <div className="flex p-1 bg-background/50 rounded-2xl border border-border/50">
                        <button
                            onClick={() => setActiveTab('upload')}
                            className={`px-6 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 flex items-center gap-2 ${activeTab === 'upload'
                                ? 'bg-card text-foreground shadow-lg shadow-purple-900/10 border border-border'
                                : 'text-muted-foreground hover:text-foreground'
                                }`}
                        >
                            <Upload className="w-4 h-4" /> Upload Video
                        </button>
                        <button
                            onClick={() => setActiveTab('link')}
                            className={`px-6 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 flex items-center gap-2 ${activeTab === 'link'
                                ? 'bg-card text-foreground shadow-lg shadow-purple-900/10 border border-border'
                                : 'text-muted-foreground hover:text-foreground'
                                }`}
                        >
                            <LinkIcon className="w-4 h-4" /> Paste Link
                        </button>
                        <button
                            onClick={() => setActiveTab('script')}
                            className={`px-6 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 flex items-center gap-2 ${activeTab === 'script'
                                ? 'bg-card text-foreground shadow-lg shadow-purple-900/10 border border-border'
                                : 'text-muted-foreground hover:text-foreground'
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
                                    className={`border-2 border-dashed rounded-[32px] p-12 transition-all duration-300 relative group overflow-hidden ${file ? 'border-purple-500/50 bg-purple-500/5' : 'border-border hover:border-foreground/20 hover:bg-secondary/50'
                                        }`}
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                                    <div className="w-24 h-24 bg-card border border-border rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl relative z-10 group-hover:scale-110 transition-transform duration-300">
                                        <div className="w-full h-full rounded-full bg-gradient-to-t from-purple-500/10 to-transparent absolute inset-0" />
                                        <Upload className="w-10 h-10 text-purple-500 group-hover:text-purple-400 transition-colors" />
                                    </div>

                                    <h3 className="text-2xl font-bold mb-3 text-foreground">Upload your video</h3>
                                    <p className="text-muted-foreground mb-8 max-w-sm mx-auto">Drag and drop your video here, or click to browse. Supports MP4, MOV, WebM.</p>

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
                                            className="inline-flex cursor-pointer bg-primary text-primary-foreground px-10 py-4 rounded-2xl font-bold hover:opacity-90 transition-all shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 duration-200 relative z-10"
                                        >
                                            Select File
                                        </label>
                                    ) : (
                                        <div className="space-y-6 relative z-10">
                                            <div className="glass-card px-6 py-4 rounded-xl text-foreground flex items-center justify-between shadow-lg border border-border">
                                                <div className="flex items-center gap-3 overflow-hidden">
                                                    <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center flex-shrink-0">
                                                        <FileText className="w-5 h-5 text-muted-foreground" />
                                                    </div>
                                                    <span className="truncate max-w-[200px] font-medium">{file.name}</span>
                                                </div>
                                                <button onClick={() => setFile(null)} className="text-muted-foreground hover:text-red-400 transition-colors p-2">
                                                    Change
                                                </button>
                                            </div>
                                            <button
                                                onClick={handleUpload}
                                                disabled={loading}
                                                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-2xl font-bold hover:opacity-90 transition-all shadow-lg shadow-purple-500/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] duration-200"
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
                                <div className="w-20 h-20 bg-card border border-border rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
                                    <LinkIcon className="w-10 h-10 text-pink-500" />
                                </div>
                                <h3 className="text-2xl font-bold mb-3 text-foreground">Import from URL</h3>
                                <p className="text-muted-foreground mb-8">Paste a link from YouTube, Instagram, or TikTok</p>

                                <div className="relative mb-6">
                                    <input
                                        type="text"
                                        placeholder="https://www.tiktok.com/@user/video/..."
                                        value={url}
                                        onChange={(e) => setUrl(e.target.value)}
                                        className="w-full glass-input rounded-2xl px-6 py-5 text-foreground placeholder-muted-foreground focus:ring-1 focus:ring-pink-500 transition-all font-mono text-sm"
                                    />
                                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                                        <LinkIcon className="w-4 h-4" />
                                    </div>
                                </div>

                                <button
                                    onClick={handleLinkImport}
                                    disabled={loading || !url}
                                    className="w-full bg-gradient-to-r from-pink-600 to-orange-600 text-white px-8 py-4 rounded-2xl font-bold hover:opacity-90 transition-all shadow-lg shadow-pink-500/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] duration-200"
                                >
                                    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Analyze Link <ChevronRight className="w-5 h-5" /></>}
                                </button>
                            </motion.div>
                        ) : (
                            <ScriptAnalysisForm
                                loading={loading}
                                onSubmit={handleScriptAnalyze}
                                scriptContent={scriptContent}
                                setScriptContent={setScriptContent}
                                scriptPlatform={scriptPlatform}
                                setScriptPlatform={setScriptPlatform}
                                scriptCategory={scriptCategory}
                                setScriptCategory={setScriptCategory}
                                scriptGoal={scriptGoal}
                                setScriptGoal={setScriptGoal}
                                scriptTone={scriptTone}
                                setScriptTone={setScriptTone}
                                scriptAudience={scriptAudience}
                                setScriptAudience={setScriptAudience}
                            />
                        )}
                    </AnimatePresence>

                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-6 flex items-center gap-3 text-red-500 bg-red-500/10 border border-red-500/20 px-6 py-4 rounded-2xl"
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

// Sub-component for Script Analysis Form to keep main file clean
function ScriptAnalysisForm({
    loading, onSubmit,
    scriptContent, setScriptContent,
    scriptPlatform, setScriptPlatform,
    scriptCategory, setScriptCategory,
    scriptGoal, setScriptGoal,
    scriptTone, setScriptTone,
    scriptAudience, setScriptAudience
}: any) {
    const preferences = [
        {
            id: 'goal', label: 'Goal', icon: Target, value: scriptGoal, setter: setScriptGoal,
            options: [
                { value: 'Go Viral', label: 'Viral Growth' },
                { value: 'Engagement', label: 'Community' },
                { value: 'Sales', label: 'Sales/Leads' },
                { value: 'Brand', label: 'Brand Awareness' }
            ]
        },
        {
            id: 'tone', label: 'Tone', icon: Zap, value: scriptTone, setter: setScriptTone,
            options: [
                { value: 'High Energy', label: 'High Energy' },
                { value: 'Professional', label: 'Professional' },
                { value: 'Storytelling', label: 'Storytelling' },
                { value: 'Humorous', label: 'Humorous' }
            ]
        },
        {
            id: 'audience', label: 'Audience', icon: Users, value: scriptAudience, setter: setScriptAudience,
            options: [
                { value: 'Gen Z', label: 'Gen Z' },
                { value: 'Millennials', label: 'Millennials' },
                { value: 'Professionals', label: 'Professionals' },
                { value: 'General Public', label: 'General' }
            ]
        }
    ];

    return (
        <motion.div
            key="script"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
            className="max-w-4xl mx-auto"
        >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {/* Platform */}
                <div className="glass-card p-5 rounded-2xl border border-border">
                    <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3 block flex items-center gap-2">
                        <Layout className="w-3 h-3" /> Platform
                    </label>
                    <div className="grid gap-2">
                        {['TikTok', 'Instagram Reels', 'YouTube Shorts'].map((p) => (
                            <button
                                key={p}
                                onClick={() => setScriptPlatform(p)}
                                className={`text-left px-4 py-3 rounded-xl text-sm font-medium transition-all ${scriptPlatform === p
                                    ? 'bg-primary text-primary-foreground shadow-md'
                                    : 'bg-secondary/50 text-muted-foreground hover:bg-secondary hover:text-foreground'
                                    }`}
                            >
                                {p}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Category */}
                <div className="glass-card p-5 rounded-2xl border border-border md:col-span-2">
                    <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3 block flex items-center gap-2">
                        <Sparkles className="w-3 h-3" /> Category
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                        {['Education', 'Entertainment', 'Lifestyle', 'Business', 'Gaming', 'Motivational'].map((c) => (
                            <button
                                key={c}
                                onClick={() => setScriptCategory(c)}
                                className={`px-3 py-3 rounded-xl text-sm font-medium transition-all text-center ${scriptCategory === c
                                    ? 'bg-primary text-primary-foreground shadow-md'
                                    : 'bg-secondary/50 text-muted-foreground hover:bg-secondary hover:text-foreground'
                                    }`}
                            >
                                {c}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                    <Target className="w-4 h-4 text-purple-500" />
                    <span className="text-sm font-bold text-foreground uppercase tracking-wider">Content Strategy</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {preferences.map((pref) => (
                        <div key={pref.id} className="glass-card p-4 rounded-2xl border border-border">
                            <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3 block">{pref.label}</label>
                            <div className="grid grid-cols-1 gap-2">
                                {pref.options.map((opt) => (
                                    <button
                                        key={opt.value}
                                        onClick={() => pref.setter(opt.value)}
                                        className={`px-3 py-2 rounded-lg text-xs font-medium transition-all text-left flex items-center justify-between ${pref.value === opt.value
                                            ? 'bg-primary/10 text-primary border border-primary/20'
                                            : 'bg-transparent text-muted-foreground hover:bg-secondary hover:text-foreground'
                                            }`}
                                    >
                                        {opt.label}
                                        {pref.value === opt.value && <Check className="w-3 h-3" />}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider ml-1 flex items-center gap-2">
                        <FileText className="w-3 h-3" /> Script Content
                    </label>
                    <span className="text-xs text-muted-foreground">{scriptContent.length} chars</span>
                </div>
                <textarea
                    placeholder="Paste your script, outline, or rough ideas here. The more detail, the better the analysis."
                    value={scriptContent}
                    onChange={(e) => setScriptContent(e.target.value)}
                    rows={12}
                    className="w-full glass-input rounded-2xl px-6 py-6 text-foreground placeholder-muted-foreground focus:ring-1 focus:ring-blue-500 transition-all resize-none leading-relaxed text-base font-mono"
                />
            </div>

            <button
                onClick={onSubmit}
                disabled={loading || !scriptContent}
                className="w-full mt-8 bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-8 py-5 rounded-2xl font-bold hover:opacity-90 transition-all shadow-lg shadow-blue-500/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-lg hover:scale-[1.01] active:scale-[0.99] duration-200"
            >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Analyze Script <ChevronRight className="w-5 h-5" /></>}
            </button>
        </motion.div>
    );
}

// Helper icons
import { Target, Users, Layout, Check } from 'lucide-react';

