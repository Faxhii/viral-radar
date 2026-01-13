"use client";

import { motion } from 'framer-motion';
import { Zap, ListChecks, Anchor } from 'lucide-react';

export default function FeaturesSection() {
    const features = [
        {
            title: "Viral Score",
            description: "Predicts specific viral metrics closer to the algorithm's actual assessment.",
            icon: Zap
        },
        {
            title: "Actionable Checklist",
            description: "Checklist ensures a brief, complete, and on-point script before filming.",
            icon: ListChecks
        },
        {
            title: "Hook Optimization",
            description: "Optimize hooks to ensure your development team executes easily with your vision.",
            icon: Anchor
        }
    ];

    return (
        <section className="py-20 bg-black relative z-10 overflow-hidden">
            {/* Subtle Glass Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-purple-900/10 blur-[120px] pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl font-bold text-white mb-2 font-heading">Unlock Viral Success with AI-Powered Features</h2>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto perspective-1000">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30, rotateX: 10 }}
                            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.6, type: "spring" }}
                            whileHover={{
                                y: -10,
                                rotateX: 5,
                                rotateY: index === 0 ? 5 : index === 2 ? -5 : 0,
                                scale: 1.05
                            }}
                            className="glass-card p-8 rounded-2xl group border border-white/5 hover:border-purple-500/30 transition-all duration-300 preserve-3d"
                        >
                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-white/10 to-transparent flex items-center justify-center mb-6 text-gray-300 group-hover:text-white group-hover:scale-110 transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.05)] group-hover:shadow-[0_0_30px_rgba(139,92,246,0.3)] border border-white/5">
                                <feature.icon size={28} strokeWidth={1.5} />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3 translate-z-10 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-400 transition-colors">
                                {feature.title}
                            </h3>
                            <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors">
                                {feature.description}
                            </p>

                            {/* Inner Glow Card for Depth */}
                            <div className="absolute inset-0 bg-gradient-to-t from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl pointer-events-none" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
