"use client";

import Link from 'next/link';
import { LayoutDashboard, Video, Settings, LogOut, Zap, CreditCard } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

import { Menu, X } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';
import api from '@/lib/api';
import { ThemeToggle } from '@/components/ThemeToggle';

function CreditsDisplay() {
    const [credits, setCredits] = useState<number | null>(null);

    useEffect(() => {
        const fetchCredits = async () => {
            try {
                const response = await api.get('/auth/me');
                setCredits(response.data.credits);
            } catch (error) {
                console.error("Failed to fetch credits", error);
            }
        };
        fetchCredits();

        // Poll for updates every 10 seconds
        const interval = setInterval(fetchCredits, 10000);
        return () => clearInterval(interval);
    }, []);

    if (credits === null) return null;

    return (
        <div className="mb-6 px-4">
            <div className="bg-gradient-to-r from-purple-900/40 to-pink-900/40 border border-white/10 rounded-2xl p-4 backdrop-blur-sm">
                <div className="text-xs text-muted-foreground mb-1 font-medium uppercase tracking-wider">Available Credits</div>
                <div className="flex items-end gap-2">
                    <span className="text-3xl font-bold text-foreground tracking-tight">{credits}</span>
                    <span className="text-sm text-muted-foreground mb-1.5">credits</span>
                </div>
                <div className="mt-3 w-full bg-white/5 rounded-full h-1.5 overflow-hidden">
                    <div
                        className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                        style={{ width: `${Math.min((credits / 100) * 100, 100)}%` }} // Visual progress
                    />
                </div>
            </div>
        </div>
    );
}

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const pathname = usePathname();
    const [mounted, setMounted] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        setMounted(true);
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/login');
            return;
        }

        // Check onboarding status
        const checkOnboarding = async () => {
            try {
                const res = await api.get('/auth/me');
                if (!res.data.onboarding_completed) {
                    router.push('/onboarding');
                }
            } catch (err) {
                console.error(err);
            }
        };
        checkOnboarding();
    }, [router]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        router.push('/login');
    };

    if (!mounted) return null;

    const isActive = (path: string) => pathname === path;

    const navItems = [
        { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
        { path: '/dashboard/videos', icon: Video, label: 'My Library' },
        { path: '/dashboard/pricing', icon: CreditCard, label: 'Pricing' },
        { path: '/dashboard/settings', icon: Settings, label: 'Settings' },
    ];

    return (
        <div className="flex h-screen bg-background text-foreground overflow-hidden selection:bg-purple-500/30 transition-colors duration-300">
            {/* Mobile Header */}
            <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border p-4 flex justify-between items-center transition-colors">
                <div className="flex items-center gap-3">
                    <img src="/logo.jpg" alt="ViralRadar Logo" className="w-8 h-8 rounded-lg" />
                    <span className="text-lg font-bold">ViralRadar</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="scale-75"><ThemeToggle /></div>
                    <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-muted-foreground hover:text-foreground">
                        {isMobileMenuOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="md:hidden fixed inset-0 z-40 bg-background pt-20 px-6 pb-6"
                    >
                        <nav className="space-y-4">
                            <div className="mb-6">
                                <CreditsDisplay />
                            </div>
                            {navItems.map((item) => (
                                <Link
                                    key={item.path}
                                    href={item.path}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className={`flex items-center gap-4 p-4 rounded-xl text-lg font-medium transition-colors ${isActive(item.path) ? 'bg-secondary text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                                >
                                    <item.icon className="w-6 h-6" />
                                    {item.label}
                                </Link>
                            ))}
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-4 p-4 rounded-xl text-lg font-medium text-red-500 hover:bg-red-500/10 w-full transition-colors"
                            >
                                <LogOut className="w-6 h-6" />
                                Sign Out
                            </button>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Sidebar */}
            <aside className="w-72 border-r border-border p-6 hidden md:flex flex-col bg-card/30 backdrop-blur-xl relative z-10 transition-colors">
                <div className="flex items-center justify-between mb-10 px-2">
                    <div className="flex items-center gap-3">
                        <img src="/logo.jpg" alt="ViralRadar Logo" className="w-10 h-10 rounded-xl shadow-lg shadow-purple-500/20" />
                        <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/60">
                            ViralRadar
                        </span>
                    </div>
                </div>

                {/* Credits Display */}
                <CreditsDisplay />

                <nav className="space-y-2 flex-1">
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            href={item.path}
                            className={`group flex items-center gap-3 px-4 py-3.5 rounded-xl font-medium transition-all duration-300 relative overflow-hidden ${isActive(item.path)
                                ? 'text-primary-foreground'
                                : 'text-muted-foreground hover:text-foreground'
                                }`}
                        >
                            {isActive(item.path) && (
                                <motion.div
                                    layoutId="activeNav"
                                    className="absolute inset-0 bg-primary rounded-xl"
                                    initial={false}
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                />
                            )}
                            <item.icon className={`w-5 h-5 relative z-10 transition-colors ${isActive(item.path) ? 'text-primary-foreground' : 'group-hover:text-primary'
                                }`} />
                            <span className="relative z-10">{item.label}</span>
                        </Link>
                    ))}
                </nav>

                <div className="mt-auto space-y-4 pt-6 border-t border-border">
                    <div className="px-4 flex items-center justify-between">
                        <span className="text-sm font-medium text-muted-foreground">Theme</span>
                        <ThemeToggle />
                    </div>
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-3.5 text-muted-foreground hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all w-full group"
                    >
                        <LogOut className="w-5 h-5 transition-colors" />
                        Sign Out
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto relative pt-20 md:pt-0 bg-background transition-colors duration-300">
                {/* Background Gradients - Opacity adjusted for light mode */}
                <div className="fixed inset-0 pointer-events-none opacity-20 dark:opacity-100 transition-opacity duration-500">
                    <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px]" />
                    <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] bg-pink-600/10 rounded-full blur-[120px]" />
                </div>

                <div className="relative z-10 p-4 md:p-12 max-w-7xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}
