"use client";

import { motion } from 'framer-motion';

export default function Floating3DShapes() {
    return (
        <div className="absolute inset-0 w-full max-w-full overflow-hidden pointer-events-none z-0">
            {/* 3D Cube (CSS only) */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                className="absolute top-[20%] left-[10%] w-20 h-20 md:w-32 md:h-32 perspective-1000"
            >
                <div className="relative w-full h-full transform-style-3d animate-float">
                    <div className="absolute inset-0 bg-purple-500/20 glass-3d transform translate-z-10" />
                    {/* Simplified for performance: Using glass layers for depth */}
                    <div className="absolute top-0 -left-10 w-full h-full bg-cyan-500/10 rounded-full blur-xl" />
                </div>
            </motion.div>

            {/* Floating Orb 1 */}
            <motion.div
                animate={{ y: [0, -30, 0], rotate: [0, 10, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-[15%] right-[15%] w-32 h-32 md:w-48 md:h-48 rounded-full bg-gradient-to-br from-purple-500/10 to-transparent border border-white/5 backdrop-blur-sm shadow-[0_0_50px_rgba(139,92,246,0.1)] z-0"
            />

            {/* Floating Orb 2 */}
            <motion.div
                animate={{ y: [0, 40, 0], x: [0, 20, 0] }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-[20%] left-[5%] w-24 h-24 md:w-40 md:h-40 rounded-full bg-gradient-to-tr from-cyan-500/10 to-transparent border border-white/5 backdrop-blur-md shadow-[0_0_40px_rgba(6,182,212,0.1)] z-0"
            />

            {/* 3D Glass Pyramid (Triangle Shape) */}
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                className="absolute bottom-[10%] right-[10%] w-40 h-40 opacity-30"
            >
                <svg viewBox="0 0 100 100" className="w-full h-full fill-white/5 stroke-white/10 stroke-1 drop-shadow-2xl">
                    <polygon points="50,10 90,90 10,90" />
                </svg>
            </motion.div>
        </div>
    );
}
