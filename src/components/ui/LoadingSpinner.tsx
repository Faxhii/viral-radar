"use client";
import { motion } from "framer-motion";

export default function LoadingSpinner({ size = "md", className = "" }: { size?: "sm" | "md" | "lg", className?: string }) {
    const sizes = {
        sm: "w-4 h-4",
        md: "w-8 h-8",
        lg: "w-12 h-12"
    };

    return (
        <div className={`relative flex items-center justify-center ${sizes[size]} ${className}`}>
            <motion.span
                className="absolute w-full h-full border-2 border-zinc-700 rounded-full"
            />
            <motion.span
                className="absolute w-full h-full border-t-2 border-white rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
        </div>
    );
}
