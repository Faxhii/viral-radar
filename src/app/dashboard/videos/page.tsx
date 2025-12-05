"use client";

import { useState, useEffect } from 'react';
import { getUserVideos } from '@/lib/api';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Play, Calendar, Search, Filter, ArrowRight, FileText } from 'lucide-react';

export default function MyVideosPage() {
    const [videos, setVideos] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const [activeTab, setActiveTab] = useState<'videos' | 'scripts'>('videos');

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                console.log("Fetching user videos...");
                const data = await getUserVideos();
                console.log("Fetched videos:", data);
                setVideos(data);
            } catch (error) {
                console.error('Failed to fetch videos:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchVideos();
    }, []);

    const filteredVideos = videos.filter(video => {
        if (activeTab === 'videos') {
            return video.source_type !== 'script';
        } else {
            return video.source_type === 'script';
        }
    });

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <div className="relative">
                    <div className="w-12 h-12 rounded-full border-4 border-white/20 border-t-white animate-spin"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-end md:items-center mb-8 gap-6">
                <div>
                    <h1 className="text-5xl font-bold text-white tracking-tight mb-3">
                        Library
                    </h1>
                    <p className="text-zinc-400 text-lg">Your analyzed content collection</p>
                </div>

                <div className="flex items-center gap-3 bg-[#1c1c1e] p-1.5 rounded-2xl border border-white/10">
                    <div className="relative">
                        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                        <input
                            type="text"
                            placeholder="Search"
                            className="bg-transparent border-none pl-9 pr-4 py-2 text-sm text-white placeholder-zinc-600 focus:outline-none w-48"
                        />
                    </div>
                    <div className="w-px h-6 bg-white/10"></div>
                    <button className="p-2 text-zinc-400 hover:text-white transition-colors">
                        <Filter className="w-5 h-5" />
                    </button>
                    <Link
                        href="/dashboard"
                        className="px-5 py-2 bg-white text-black rounded-xl font-semibold hover:bg-zinc-200 transition-colors text-sm"
                    >
                        Analyze New
                    </Link>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-4 mb-8 border-b border-white/10">
                <button
                    onClick={() => setActiveTab('videos')}
                    className={`pb-4 px-2 text-sm font-bold uppercase tracking-wider transition-all relative ${activeTab === 'videos' ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'}`}
                >
                    Videos
                    {activeTab === 'videos' && (
                        <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-white" />
                    )}
                </button>
                <button
                    onClick={() => setActiveTab('scripts')}
                    className={`pb-4 px-2 text-sm font-bold uppercase tracking-wider transition-all relative ${activeTab === 'scripts' ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'}`}
                >
                    Scripts
                    {activeTab === 'scripts' && (
                        <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-white" />
                    )}
                </button>
            </div>

            {filteredVideos.length === 0 ? (
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-40 glass-card rounded-[40px] text-center"
                >
                    <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mb-8 backdrop-blur-md">
                        {activeTab === 'videos' ? (
                            <Play className="w-10 h-10 text-white/40 ml-1" />
                        ) : (
                            <FileText className="w-10 h-10 text-white/40" />
                        )}
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3">No {activeTab} yet</h3>
                    <p className="text-zinc-400 mb-10 max-w-md text-lg leading-relaxed">
                        {activeTab === 'videos'
                            ? "Upload your first video to unlock AI-powered insights and viral predictions."
                            : "Analyze your first script to get feedback on hooks, story arc, and more."}
                    </p>
                    <Link
                        href="/dashboard"
                        className="group flex items-center gap-2 px-8 py-3 bg-white text-black rounded-full font-bold hover:bg-zinc-200 transition-all hover:scale-105"
                    >
                        Start Analysis <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </motion.div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredVideos.map((video, i) => (
                        <Link
                            href={video.analysis_id ? `/dashboard/analysis/${video.analysis_id}` : '#'}
                            key={video.id}
                            className={!video.analysis_id ? 'pointer-events-none' : ''}
                        >
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.05 }}
                                whileHover={{ scale: 1.02 }}
                                className="group glass-card rounded-[32px] overflow-hidden hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-500"
                            >
                                <div className="aspect-video bg-black/40 relative flex items-center justify-center overflow-hidden">
                                    {/* Thumbnail Placeholder or Image */}
                                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 opacity-60" />

                                    <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center group-hover:scale-110 transition-transform duration-500 border border-white/20">
                                        {video.source_type === 'script' ? (
                                            <FileText className="w-8 h-8 text-white" />
                                        ) : (
                                            <Play className="w-6 h-6 text-white ml-1" />
                                        )}
                                    </div>

                                    <div className="absolute top-4 right-4">
                                        <div className="bg-black/40 backdrop-blur-xl border border-white/10 px-3 py-1.5 rounded-full text-xs font-medium text-white/90">
                                            {video.platform_guess || 'Unknown'}
                                        </div>
                                    </div>
                                </div>

                                <div className="p-6">
                                    <div className="flex justify-between items-start mb-4">
                                        <h3 className="font-semibold text-xl text-white truncate pr-4">
                                            {video.title || `${video.source_type === 'script' ? 'Script Analysis' : 'Video Analysis'} #${video.id}`}
                                        </h3>
                                        <span className="text-xs text-zinc-500 font-medium bg-white/5 px-2 py-1 rounded-lg">
                                            {new Date(video.created_at).toLocaleDateString()}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <div className="flex-1 bg-white/5 rounded-2xl p-3 border border-white/5">
                                            <span className="text-xs text-zinc-500 block mb-1 uppercase tracking-wider font-bold">Score</span>
                                            <span className={`text-2xl font-bold ${video.viral_score ? 'text-white' : 'text-zinc-600'}`}>
                                                {video.viral_score || '--'}
                                            </span>
                                        </div>
                                        <div className="flex-1 bg-white/5 rounded-2xl p-3 border border-white/5">
                                            <span className="text-xs text-zinc-500 block mb-1 uppercase tracking-wider font-bold">Status</span>
                                            <div className="flex items-center gap-2">
                                                <div className={`w-2 h-2 rounded-full ${video.status === 'completed' ? 'bg-green-500' :
                                                    video.status === 'failed' ? 'bg-red-500' : 'bg-yellow-500 animate-pulse'
                                                    }`} />
                                                <span className="text-sm font-medium text-zinc-300">
                                                    {video.status ? video.status.charAt(0).toUpperCase() + video.status.slice(1) : 'Unknown'}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}
