"use client";
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function StatsSection() {
    const [statsData, setStatsData] = useState({
        analyzed: 2538,
        creators: 1249,
        views: 12000008
    });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
                const res = await fetch(`${baseUrl}/api/videos/stats/public-total`);
                if (res.ok) {
                    const data = await res.json();
                    setStatsData(prev => ({
                        ...prev,
                        analyzed: 2538 + (data.total_videos_analyzed || 0),
                        creators: 1249 + (data.total_creators || 0)
                    }));
                }
            } catch (error) {
                console.warn("Stats fetch failed, using default values.");
            }
        };

        fetchStats();
    }, []);

    const stats = [
        { value: statsData.analyzed.toLocaleString() + "+", label: "Videos Analyzed" },
        { value: statsData.creators.toLocaleString() + "+", label: "Creators Helped" },
        { value: "12,000,000+", label: "Viral Views Generated" },
        { value: "96%", label: "Platform Accuracy" },
    ];

    return (
        <section className="py-16 bg-black/50 border-y border-white/5 backdrop-blur-sm relative z-20">
            <div className="container mx-auto px-6">
                <div className="flex flex-wrap justify-center md:justify-between items-center max-w-5xl mx-auto divide-y md:divide-y-0 md:divide-x divide-white/5">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="flex-1 px-8 py-4 text-center group cursor-default"
                        >
                            <motion.h3
                                whileHover={{ scale: 1.05 }}
                                className="text-3xl md:text-4xl font-bold text-white mb-2 font-sans tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-cyan-400 transition-all duration-300"
                            >
                                {stat.value}
                            </motion.h3>
                            <p className="text-gray-500 text-sm font-medium group-hover:text-gray-400 transition-colors">{stat.label}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
