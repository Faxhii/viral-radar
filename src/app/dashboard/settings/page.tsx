"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getMe, updateUser } from '@/lib/api';
import { Loader2, CheckCircle, AlertCircle, HelpCircle, ChevronDown, Mail } from 'lucide-react';

export default function SettingsPage() {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [user, setUser] = useState<any>(null);
    const [fullName, setFullName] = useState('');
    const [platform, setPlatform] = useState('TikTok');
    const [category, setCategory] = useState('Education');
    const [goal, setGoal] = useState('Go Viral');
    const [tone, setTone] = useState('Professional');
    const [audience, setAudience] = useState('General Public');
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userData = await getMe();
                setUser(userData);
                if (userData.full_name) setFullName(userData.full_name);
                if (userData.primary_platform) setPlatform(userData.primary_platform);
                if (userData.primary_category) setCategory(userData.primary_category);
                if (userData.content_goal) setGoal(userData.content_goal);
                if (userData.video_tone) setTone(userData.video_tone);
                if (userData.target_audience) setAudience(userData.target_audience);
            } catch (error) {
                console.error('Failed to fetch user settings:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, []);

    const handleSave = async () => {
        setSaving(true);
        setMessage(null);
        try {
            await updateUser({
                full_name: fullName,
                primary_platform: platform,
                primary_category: category,
                content_goal: goal,
                video_tone: tone,
                target_audience: audience
            });
            setMessage({ type: 'success', text: 'Settings saved successfully!' });

            // Clear success message after 3 seconds
            setTimeout(() => setMessage(null), 3000);
        } catch (error) {
            console.error('Failed to update settings:', error);
            setMessage({ type: 'error', text: 'Failed to save settings. Please try again.' });
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <Loader2 className="w-8 h-8 text-purple-500 animate-spin" />
            </div>
        );
    }

    return (
        <div className="p-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-4xl mx-auto"
            >
                <h1 className="text-3xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
                    Settings
                </h1>

                {message && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`mb-6 p-4 rounded-xl border flex items-center gap-3 ${message.type === 'success'
                            ? 'bg-green-500/10 border-green-500/20 text-green-400'
                            : 'bg-red-500/10 border-red-500/20 text-red-400'
                            }`}
                    >
                        {message.type === 'success' ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
                        {message.text}
                    </motion.div>
                )}

                <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-6 mb-6">
                    <h2 className="text-xl font-semibold mb-4 text-white">Profile Information</h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-zinc-400 mb-1">Email</label>
                            <input
                                type="email"
                                disabled
                                value={user?.email || ''}
                                className="w-full px-4 py-2 bg-zinc-800/50 border border-zinc-700 rounded-lg text-zinc-500 cursor-not-allowed"
                            />
                        </div>
                    </div>
                </div>

                <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-6">
                    <h2 className="text-xl font-semibold mb-4 text-white">Preferences</h2>
                    <div className="space-y-4">

                        <div>
                            <label className="block text-sm font-medium text-zinc-400 mb-1">Primary Platform</label>
                            <select
                                value={platform}
                                onChange={(e) => setPlatform(e.target.value)}
                                className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none text-white"
                            >
                                <option>TikTok</option>
                                <option>Instagram Reels</option>
                                <option>YouTube Shorts</option>
                                <option>LinkedIn</option>
                                <option>Cross-Platform</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-zinc-400 mb-1">Content Category</label>
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none text-white"
                            >
                                <option>Education</option>
                                <option>Entertainment</option>
                                <option>Lifestyle</option>
                                <option>Gaming</option>
                                <option>Business</option>
                                <option>Tech</option>
                                <option>Comedy</option>
                                <option>Motivational</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-zinc-400 mb-1">Content Goal</label>
                            <select
                                value={goal}
                                onChange={(e) => setGoal(e.target.value)}
                                className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none text-white"
                            >
                                <option>Go Viral</option>
                                <option>Engagement</option>
                                <option>Sales</option>
                                <option>Brand</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-zinc-400 mb-1">Video Tone</label>
                            <select
                                value={tone}
                                onChange={(e) => setTone(e.target.value)}
                                className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none text-white"
                            >
                                <option>High Energy</option>
                                <option>Professional</option>
                                <option>Storytelling</option>
                                <option>Humorous</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-zinc-400 mb-1">Target Audience</label>
                            <select
                                value={audience}
                                onChange={(e) => setAudience(e.target.value)}
                                className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none text-white"
                            >
                                <option>Gen Z</option>
                                <option>Millennials</option>
                                <option>Professionals</option>
                                <option>General Public</option>
                            </select>
                        </div>
                    </div>
                    <div className="mt-6">
                        <button
                            onClick={handleSave}
                            disabled={saving}
                            className="px-6 py-2 bg-white text-black rounded-lg font-medium hover:bg-zinc-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                        >
                            {saving && <Loader2 className="w-4 h-4 animate-spin" />}
                            {saving ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </div>

                {/* Help & Support Section */}
                <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-6 mt-6">
                    <h2 className="text-xl font-semibold mb-4 text-white flex items-center gap-2">
                        <HelpCircle className="w-5 h-5 text-blue-400" />
                        Help & Support
                    </h2>

                    <div className="space-y-4">
                        {/* FAQs */}
                        <div className="space-y-2">
                            {[
                                { q: "How do credits work?", a: "Each video analysis (up to 2 mins) costs 1 credit. Longer videos cost 2 credits. You get 3 free credits to start." },
                                { q: "How accurate is the AI?", a: "Our AI is trained on thousands of viral videos. While highly accurate in identifying structure and engagement patterns, virality also depends on execution and luck." },
                                { q: "Can I cancel at any time?", a: "Yes, you can cancel your subscription from the billing portal. You will retain access until the end of your current billing period." }
                            ].map((faq, index) => (
                                <details key={index} className="group bg-zinc-800/30 rounded-lg p-3 cursor-pointer">
                                    <summary className="font-medium text-zinc-300 flex justify-between items-center list-none">
                                        {faq.q}
                                        <ChevronDown className="w-4 h-4 text-zinc-500 group-open:rotate-180 transition-transform" />
                                    </summary>
                                    <p className="text-sm text-zinc-400 mt-2 pl-1 leading-relaxed">
                                        {faq.a}
                                    </p>
                                </details>
                            ))}
                        </div>

                        {/* Contact Support */}
                        <div className="pt-4 border-t border-zinc-800">
                            <a
                                href="mailto:support@viralradar.in"
                                className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors"
                            >
                                <Mail className="w-4 h-4" />
                                Need more help? Contact Support
                            </a>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
