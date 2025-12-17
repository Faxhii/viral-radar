"use client";
import { motion, useSpring, useTransform, useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { TrendingUp, Users, Video, Award } from 'lucide-react';

const stats = [
    { label: "Videos Analyzed", value: 2540, start: 1000, suffix: "+", icon: Video, color: "text-blue-400" },
    { label: "Creators Helped", value: 1250, start: 1000, suffix: "+", icon: Users, color: "text-purple-400" },
    { label: "Viral Views Generated", value: 12, start: 0, suffix: "M+", icon: TrendingUp, color: "text-green-400" },
    { label: "Platform Accuracy", value: 94, start: 0, suffix: "%", icon: Award, color: "text-pink-400" },
];

function Counter({ value, start, suffix }: { value: number, start: number, suffix: string }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    // Start from the 'start' value
    const spring = useSpring(start, { mass: 1, stiffness: 20, damping: 20 }); // Even slower
    const display = useTransform(spring, (current) => Math.round(current).toLocaleString());

    useEffect(() => {
        if (isInView) {
            spring.set(value);
        }
    }, [isInView, value, spring]);

    return (
        <span ref={ref} className="flex justify-center items-center">
            <motion.span>{display}</motion.span>
            <span>{suffix}</span>
        </span>
    );
}

export default function StatsSection() {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return (
            <section className="py-20 border-y border-zinc-900 bg-zinc-900/20">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {/* Static Skeleton for SSR */}
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="text-center animate-pulse">
                                <div className="h-12 w-12 bg-zinc-800 rounded-2xl mx-auto mb-4"></div>
                                <div className="h-10 w-32 bg-zinc-800 rounded mx-auto mb-2"></div>
                                <div className="h-4 w-24 bg-zinc-800 rounded mx-auto"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="py-20 border-y border-zinc-900 bg-zinc-900/20">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="text-center"
                        >
                            <div className="flex justify-center mb-4">
                                <div className={`p-3 rounded-2xl bg-zinc-900 border border-zinc-800 ${stat.color}`}>
                                    <stat.icon className="w-6 h-6" />
                                </div>
                            </div>
                            <h3 className="text-2xl md:text-4xl font-bold text-white mb-2 flex justify-center">
                                <Counter value={stat.value} start={stat.start} suffix={stat.suffix} />
                            </h3>
                            <p className="text-zinc-500 font-medium">{stat.label}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
