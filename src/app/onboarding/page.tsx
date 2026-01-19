"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, Check, Sparkles, Target, Zap, Users, Layout, Play } from 'lucide-react';
import { submitOnboarding } from '@/lib/api';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

const steps = [
    {
        id: 'platform',
        title: "Where do you post content?",
        subtitle: "We'll tailor our analysis to the specific algorithm of your platform.",
        icon: Layout,
        options: [
            { value: 'TikTok', label: 'TikTok', desc: 'Short-form, trend-heavy, fast-paced.' },
            { value: 'Instagram Reels', label: 'Instagram Reels', desc: 'Aesthetic, lifestyle, audio-driven.' },
            { value: 'YouTube Shorts', label: 'YouTube Shorts', desc: 'Search-driven, evergreen potential.' },
            { value: 'LinkedIn', label: 'LinkedIn', desc: 'Professional, authority-building video.' },
            { value: 'Cross-Platform', label: 'Cross-Platform', desc: 'I aim for all of them.' },
        ]
    },
    {
        id: 'category',
        title: "What represents your niche?",
        subtitle: "This helps us benchmark you against successful creators in your field.",
        icon: Sparkles,
        options: [
            { value: 'Entertainment', label: 'Entertainment', desc: 'Comedy, skits, challenges, fun.' },
            { value: 'Education', label: 'Education', desc: 'Tutorials, how-tos, facts.' },
            { value: 'Business', label: 'Business / Finance', desc: 'Money, entrepreneurship, marketing.' },
            { value: 'Lifestyle', label: 'Lifestyle / Vlog', desc: 'Daily life, travel, fashion.' },
            { value: 'Gaming', label: 'Gaming', desc: 'Gameplay, commentary, highlights.' },
            { value: 'Motivational', label: 'Motivational', desc: 'Inspiration, mental health, advice.' },
        ]
    },
    {
        id: 'goal',
        title: "What is your main goal?",
        subtitle: "We'll prioritize insights that help you achieve this specific outcome.",
        icon: Target,
        options: [
            { value: 'Go Viral', label: 'Go Viral / Max Views', desc: 'Focus on hooks, retention, and shareability.' },
            { value: 'Engagement', label: 'Build Community', desc: 'Focus on comments, relatability, and trust.' },
            { value: 'Sales', label: 'Sales / Leads', desc: 'Focus on value proposition and Call to Actions.' },
            { value: 'Brand', label: 'Brand Awareness', desc: 'Focus on polish, consistency, and authority.' },
        ]
    },
    {
        id: 'tone',
        title: "What's your video tone?",
        subtitle: "We'll judge your delivery based on this style.",
        icon: Zap,
        options: [
            { value: 'High Energy', label: 'High Energy / Fast', desc: 'Loud, fast cuts, excitement (MrBeast style).' },
            { value: 'Professional', label: 'Professional / Calm', desc: 'Clear, articulated, trustworthy.' },
            { value: 'Storytelling', label: 'Storytelling / Cinematic', desc: 'Emotional, slower paced, narrative.' },
            { value: 'Humorous', label: 'Humorous / Fun', desc: 'Lighthearted, memes, sketch.' },
        ]
    },
    {
        id: 'audience',
        title: "Who is your target audience?",
        subtitle: "We'll check if your language and references fit this demographic.",
        icon: Users,
        options: [
            { value: 'Gen Z', label: 'Gen Z (13-24)', desc: 'Trend-aware, short attention span.' },
            { value: 'Millennials', label: 'Millennials (25-40)', desc: 'Value-driven, nostalgic, relatable.' },
            { value: 'Professionals', label: 'Professionals (B2B)', desc: 'Career-focused, serious, efficient.' },
            { value: 'General Public', label: 'General Public', desc: 'Broad appeal, simple language.' },
        ]
    }
];

export default function OnboardingPage() {
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState(0);
    const [answers, setAnswers] = useState<any>({});
    const [loading, setLoading] = useState(false);

    const stepData = steps[currentStep];

    const handleSelect = (value: string) => {
        setAnswers({ ...answers, [stepData.id]: value });
    };

    const handleNext = async () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            // Submit
            setLoading(true);
            try {
                const payload = {
                    primary_platform: answers.platform,
                    primary_category: answers.category,
                    content_goal: answers.goal,
                    video_tone: answers.tone,
                    target_audience: answers.audience
                };
                await submitOnboarding(payload);
                router.push('/dashboard');
            } catch (err) {
                console.error("Onboarding failed", err);
                setLoading(false);
            }
        }
    };

    const handleBack = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    const isStepValid = answers[stepData.id];

    return (
        <div className="min-h-screen bg-[#030303] text-white flex flex-col relative overflow-hidden font-sans selection:bg-purple-500/30">
            {/* Ambient Background */}
            <div className="absolute top-[-20%] left-[-10%] w-[1000px] h-[1000px] bg-purple-900/10 rounded-full blur-[150px] pointer-events-none" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[1000px] h-[1000px] bg-blue-900/10 rounded-full blur-[150px] pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/5 rounded-full blur-[100px] pointer-events-none opacity-20" />

            {/* Top Bar / Progress */}
            <div className="w-full h-1 bg-white/5 relative z-20">
                <motion.div
                    className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 shadow-[0_0_20px_rgba(168,85,247,0.5)]"
                    initial={{ width: 0 }}
                    animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                />
            </div>

            <div className="flex-1 flex flex-col items-center justify-center p-6 relative z-10">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentStep}
                        initial={{ opacity: 0, x: 20, filter: "blur(10px)" }}
                        animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                        exit={{ opacity: 0, x: -20, filter: "blur(10px)" }}
                        transition={{ duration: 0.4, type: "spring", stiffness: 100, damping: 20 }}
                        className="max-w-4xl w-full"
                    >
                        <div className="text-center mb-12">
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: 0.1 }}
                                className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-tr from-purple-500/20 to-blue-500/20 border border-white/10 mb-8 shadow-2xl shadow-purple-500/10 backdrop-blur-3xl group"
                            >
                                <stepData.icon className="w-10 h-10 text-white group-hover:scale-110 transition-transform duration-300 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]" />
                            </motion.div>
                            <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight bg-clip-text text-transparent bg-gradient-to-br from-white via-white to-zinc-500">
                                {stepData.title}
                            </h1>
                            <p className="text-zinc-400 text-xl font-medium max-w-2xl mx-auto leading-relaxed">
                                {stepData.subtitle}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-12">
                            {stepData.options.map((option, idx) => (
                                <motion.button
                                    key={option.value}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 + (idx * 0.05) }}
                                    onClick={() => handleSelect(option.value)}
                                    className={`relative text-left p-6 rounded-3xl border transition-all duration-300 group overflow-hidden ${answers[stepData.id] === option.value
                                        ? 'bg-purple-500/10 border-purple-500/50 shadow-[0_0_50px_rgba(168,85,247,0.15)] ring-1 ring-purple-500/50'
                                        : 'bg-zinc-900/40 border-white/5 hover:bg-zinc-800/40 hover:border-white/10'
                                        }`}
                                >
                                    {/* Active Glow Gradient */}
                                    {answers[stepData.id] === option.value && (
                                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-transparent opacity-20" />
                                    )}

                                    <div className="flex justify-between items-start relative z-10">
                                        <div className="pr-8">
                                            <div className={`font-bold text-xl mb-2 tracking-tight ${answers[stepData.id] === option.value ? 'text-white' : 'text-zinc-200'}`}>
                                                {option.label}
                                            </div>
                                            <div className={`text-sm leading-relaxed transition-colors ${answers[stepData.id] === option.value ? 'text-purple-200/70' : 'text-zinc-500 group-hover:text-zinc-400'}`}>
                                                {option.desc}
                                            </div>
                                        </div>
                                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${answers[stepData.id] === option.value
                                            ? 'bg-purple-500 border-purple-500 scale-110 shadow-lg shadow-purple-500/40'
                                            : 'border-zinc-700 bg-zinc-900 group-hover:border-zinc-600'
                                            }`}>
                                            {answers[stepData.id] === option.value && (
                                                <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
                                            )}
                                        </div>
                                    </div>
                                </motion.button>
                            ))}
                        </div>

                        <div className="flex justify-between items-center max-w-2xl mx-auto w-full">
                            <button
                                onClick={handleBack}
                                disabled={currentStep === 0}
                                className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-medium transition-all ${currentStep === 0
                                    ? 'text-zinc-800 cursor-not-allowed opacity-50'
                                    : 'text-zinc-400 hover:text-white hover:bg-white/5 active:scale-95'
                                    }`}
                            >
                                <ChevronLeft className="w-5 h-5" /> Back
                            </button>

                            <button
                                onClick={handleNext}
                                disabled={!isStepValid || loading}
                                className="group relative bg-white text-black px-10 py-4 rounded-2xl font-bold text-lg hover:bg-zinc-200 transition-all shadow-xl shadow-white/5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 hover:scale-105 active:scale-95 flex items-center gap-2 overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
                                <span className="relative z-10 flex items-center gap-2">
                                    {loading ? (
                                        <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                                    ) : (
                                        <>
                                            {currentStep === steps.length - 1 ? 'Finish Setup' : 'Continue'}
                                            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                        </>
                                    )}
                                </span>
                            </button>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Step Counter - Minimal */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-10">
                {steps.map((_, i) => (
                    <div
                        key={i}
                        className={`h-1.5 rounded-full transition-all duration-300 ${i === currentStep ? 'w-8 bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)]' :
                                i < currentStep ? 'w-1.5 bg-white/30' :
                                    'w-1.5 bg-white/10'
                            }`}
                    />
                ))}
            </div>
        </div>
    );
}
