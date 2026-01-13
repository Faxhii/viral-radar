"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Features', href: '#features' },
        { name: 'Pricing', href: '#pricing' },
        { name: 'Reviews', href: '#reviews' },
        { name: 'FAQ', href: '#faq' },
    ];

    return (
        <>
            <motion.nav
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className={`fixed top-8 left-0 right-0 z-50 transition-all duration-300 px-4 md:px-0`}
            >
                <div className={`mx-auto max-w-5xl rounded-full border border-white/10 backdrop-blur-xl transition-all duration-300 ${scrolled ? 'bg-[#0a0a0b]/80 shadow-[0_8px_32px_rgba(0,0,0,0.5)]' : 'bg-white/5'
                    }`}>
                    <div className="flex items-center justify-between px-6 py-4">
                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-2 group">
                            <div className="relative w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500 to-cyan-400 p-[1px]">
                                <div className="absolute inset-0 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center">
                                    <div className="w-4 h-4 rounded-full bg-white/90 shadow-[0_0_10px_rgba(255,255,255,0.5)] group-hover:scale-110 transition-transform duration-300" />
                                </div>
                            </div>
                            <span className="text-xl font-bold tracking-tight text-white font-heading">
                                Viral<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">Radar</span>
                            </span>
                        </Link>

                        {/* Desktop Links */}
                        <div className="hidden md:flex items-center gap-8">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="text-sm font-medium text-gray-300 hover:text-white transition-colors relative group"
                                >
                                    {link.name}
                                    <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gradient-to-r from-purple-500 to-cyan-500 transition-all duration-300 group-hover:w-full" />
                                </Link>
                            ))}
                        </div>

                        {/* CTA Button */}
                        <div className="hidden md:flex items-center">
                            <Link
                                href="/login"
                                className="relative px-6 py-2 rounded-full overflow-hidden group bg-white/10 hover:bg-white/20 transition-all duration-300 border border-white/10"
                            >
                                <span className="relative z-10 flex items-center gap-2 text-sm font-semibold text-white">
                                    Get Started
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </span>
                                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/50 to-cyan-600/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl" />
                            </Link>
                        </div>

                        {/* Mobile Menu Toggle */}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="md:hidden text-white p-2"
                        >
                            {mobileMenuOpen ? <X /> : <Menu />}
                        </button>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="fixed inset-0 z-40 bg-black/95 backdrop-blur-2xl flex flex-col justify-center items-center md:hidden"
                    >
                        <div className="flex flex-col items-center gap-8">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="text-2xl font-bold text-white hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-purple-400 hover:to-cyan-400 transition-all"
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <Link
                                href="/login"
                                onClick={() => setMobileMenuOpen(false)}
                                className="mt-8 px-8 py-3 rounded-full bg-gradient-to-r from-purple-600 to-cyan-600 font-bold text-white shadow-lg shadow-purple-500/20"
                            >
                                Get Started Now
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
