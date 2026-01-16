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
        <div className="min-h-screen bg-[#050505] text-white flex flex-col relative overflow-hidden">
            {/* Background */}
            <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-purple-900/20 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-pink-900/10 rounded-full blur-[120px] pointer-events-none" />

            {/* Progress Bar */}
            <div className="w-full h-1 bg-white/5 relative z-10">
                <motion.div
                    className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                    transition={{ duration: 0.5 }}
                />
            </div>

            <div className="flex-1 flex flex-col items-center justify-center p-6 relative z-10">
                <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="max-w-2xl w-full"
                >
                    <div className="text-center mb-10">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-purple-600/20 to-pink-600/20 border border-white/10 mb-6 shadow-xl shadow-purple-500/5">
                            <stepData.icon className="w-8 h-8 text-white" />
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold mb-3">{stepData.title}</h1>
                        <p className="text-zinc-400 text-lg">{stepData.subtitle}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
                        {stepData.options.map((option) => (
                            <button
                                key={option.value}
                                onClick={() => handleSelect(option.value)}
                                className={`text-left p-5 rounded-2xl border transition-all duration-200 relative group ${answers[stepData.id] === option.value
                                        ? 'bg-white/10 border-purple-500 shadow-[0_0_30px_rgba(168,85,247,0.15)]'
                                        : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                                    }`}
                            >
                                <div className="flex justify-between items-start">
                                    <div>
                                        <div className={`font-bold text-lg mb-1 ${answers[stepData.id] === option.value ? 'text-purple-400' : 'text-white'}`}>
                                            {option.label}
                                        </div>
                                        <div className="text-sm text-zinc-500 group-hover:text-zinc-400 transition-colors">
                                            {option.desc}
                                        </div>
                                    </div>
                                    {answers[stepData.id] === option.value && (
                                        <div className="bg-purple-500 rounded-full p-1">
                                            <Check className="w-4 h-4 text-white" />
                                        </div>
                                    )}
                                </div>
                            </button>
                        ))}
                    </div>

                    <div className="flex justify-between items-center">
                        <button
                            onClick={handleBack}
                            disabled={currentStep === 0}
                            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-colors ${currentStep === 0
                                    ? 'text-zinc-700 cursor-not-allowed'
                                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                                }`}
                        >
                            <ChevronLeft className="w-5 h-5" /> Back
                        </button>

                        <button
                            onClick={handleNext}
                            disabled={!isStepValid || loading}
                            className="bg-white text-black px-8 py-3.5 rounded-xl font-bold hover:bg-zinc-200 transition-all shadow-lg hover:shadow-xl shadow-white/5 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 min-w-[140px] justify-center"
                        >
                            {loading ? (
                                <LoadingSpinner size="sm" color="#000" />
                            ) : (
                                <>
                                    {currentStep === steps.length - 1 ? 'Finish' : 'Next'}
                                    <ChevronRight className="w-5 h-5" />
                                </>
                            )}
                        </button>
                    </div>
                </motion.div>
            </div>

            {/* Step Counter */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-zinc-600 font-mono text-sm">
                Step {currentStep + 1} of {steps.length}
            </div>
        </div>
    );
}
