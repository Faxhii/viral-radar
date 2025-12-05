"use client";
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const testimonials = [
    {
        name: "Sarah Jenkins",
        role: "Lifestyle Creator",
        content: "ViralVision completely changed my strategy. My average views went from 2k to 50k in just two weeks!",
        image: "https://i.pravatar.cc/150?u=a042581f4e29026024d"
    },
    {
        name: "Marcus Chen",
        role: "Tech Reviewer",
        content: "The hook optimization is insane. It catches things I would never notice. Worth every penny.",
        image: "https://i.pravatar.cc/150?u=a042581f4e29026704d"
    },
    {
        name: "Elena Rodriguez",
        role: "Fitness Coach",
        content: "Finally a tool that actually understands the algorithm. The checklist is my new pre-posting ritual.",
        image: "https://i.pravatar.cc/150?u=a04258114e29026302d"
    }
];

export default function TestimonialsSection() {
    return (
        <section className="py-24">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">Loved by Creators</h2>
                    <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
                        Join thousands of content creators who are scaling their audience with AI.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {testimonials.map((t, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-zinc-900/50 border border-zinc-800 p-8 rounded-2xl hover:border-purple-500/30 transition-colors"
                        >
                            <div className="flex gap-1 text-yellow-500 mb-6">
                                {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
                            </div>
                            <p className="text-lg text-zinc-300 mb-8 leading-relaxed">"{t.content}"</p>
                            <div className="flex items-center gap-4">
                                <img src={t.image} alt={t.name} className="w-12 h-12 rounded-full border-2 border-zinc-800" />
                                <div>
                                    <h4 className="font-bold text-white">{t.name}</h4>
                                    <p className="text-sm text-zinc-500">{t.role}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
