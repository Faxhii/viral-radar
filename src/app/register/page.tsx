"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { register, login, loginWithGoogle } from '@/lib/api';
import { GoogleLogin } from '@react-oauth/google';
import { motion } from 'framer-motion';
import { Zap, AlertCircle } from 'lucide-react';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

export default function RegisterPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [agreedToTerms, setAgreedToTerms] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            // Register
            console.log("Starting registration...");
            await register({
                email,
                password,
                full_name: fullName
            });
            console.log("Registration successful. Redirecting to verification...");

            router.push(`/verify?email=${encodeURIComponent(email)}`);
        } catch (err: any) {
            console.error("Registration Error:", err);
            let errorMessage = 'Registration failed';
            if (err.response) {
                errorMessage = err.response.data?.detail || `Server Error (${err.response.status})`;
            } else if (err.request) {
                errorMessage = "Network Error: Cannot reach server. Is the backend running?";
            } else {
                errorMessage = err.message;
            }
            setError(errorMessage);
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#050505] text-white p-4 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-pink-600/10 rounded-full blur-[120px] pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-md relative z-10"
            >
                <div className="glass p-8 rounded-3xl border border-white/10 shadow-2xl shadow-purple-500/10 backdrop-blur-xl">
                    <div className="flex justify-center mb-8">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-purple-600 to-pink-600 flex items-center justify-center shadow-lg shadow-purple-500/30">
                            <Zap className="w-8 h-8 text-white fill-white" />
                        </div>
                    </div>

                    <h1 className="text-3xl font-bold mb-2 text-center bg-gradient-to-r from-white via-purple-100 to-white bg-clip-text text-transparent">
                        Create Account
                    </h1>
                    <p className="text-center text-zinc-400 mb-8">Join the future of content creation</p>

                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-sm flex items-center gap-3"
                        >
                            <AlertCircle className="w-5 h-5 flex-shrink-0" />
                            {error}
                        </motion.div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-zinc-400 mb-1.5 ml-1">Full Name</label>
                            <input
                                type="text"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                className="w-full px-5 py-3.5 bg-zinc-900/50 border border-zinc-800 rounded-xl focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 outline-none transition-all text-white placeholder-zinc-600"
                                placeholder="John Doe"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-zinc-400 mb-1.5 ml-1">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-5 py-3.5 bg-zinc-900/50 border border-zinc-800 rounded-xl focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 outline-none transition-all text-white placeholder-zinc-600"
                                placeholder="name@example.com"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-zinc-400 mb-1.5 ml-1">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-5 py-3.5 bg-zinc-900/50 border border-zinc-800 rounded-xl focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 outline-none transition-all text-white placeholder-zinc-600"
                                placeholder="••••••••"
                                required
                            />
                        </div>

                        <div className="flex items-start gap-3 pt-2">
                            <div className="flex items-center h-5">
                                <input
                                    id="terms"
                                    type="checkbox"
                                    checked={agreedToTerms}
                                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                                    className="w-4 h-4 rounded border-zinc-700 bg-zinc-900/50 text-purple-600 focus:ring-purple-500/50 focus:ring-offset-0"
                                    required
                                />
                            </div>
                            <label htmlFor="terms" className="text-sm text-zinc-400">
                                I agree to the <Link href="/legal/terms" className="text-purple-400 hover:underline" target="_blank">Terms of Service</Link> and <Link href="/legal/privacy" className="text-purple-400 hover:underline" target="_blank">Privacy Policy</Link>.
                            </label>
                        </div>

                        <button
                            type="submit"
                            disabled={loading || !agreedToTerms}
                            className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-bold text-lg hover:opacity-90 transition-all shadow-lg shadow-purple-500/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-2"
                        >
                            {loading ? <LoadingSpinner size="sm" /> : 'Get Started'}
                        </button>
                    </form>

                    <div className="my-6 flex items-center gap-4">
                        <div className="h-px bg-zinc-800 flex-1" />
                        <span className="text-zinc-500 text-xs uppercase tracking-wider">Or continue with</span>
                        <div className="h-px bg-zinc-800 flex-1" />
                    </div>

                    <div className="flex justify-center">
                        <GoogleLogin
                            onSuccess={async (credentialResponse) => {
                                if (credentialResponse.credential) {
                                    setLoading(true);
                                    try {
                                        const data = await loginWithGoogle(credentialResponse.credential);
                                        localStorage.setItem('token', data.access_token);
                                        router.push('/dashboard');
                                    } catch (err: any) {
                                        console.error(err);
                                        setError('Google Login Failed');
                                        setLoading(false);
                                    }
                                }
                            }}
                            onError={() => {
                                setError('Google Login Failed');
                            }}
                            theme="filled_black"
                            shape="pill"
                            width="350"
                        />
                    </div>

                    <p className="mt-8 text-center text-zinc-500 text-sm">
                        Already have an account?{' '}
                        <Link href="/login" className="text-purple-400 hover:text-purple-300 transition-colors font-medium hover:underline">
                            Sign In
                        </Link>
                    </p>


                </div>
            </motion.div >
        </div >
    );
}
