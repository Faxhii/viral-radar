import Link from 'next/link';
import Footer from '@/components/landing/Footer';
import { ArrowLeft } from 'lucide-react';

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-black text-white selection:bg-purple-500 selection:text-white flex flex-col">
            {/* Navbar Placeholder / Back Button */}
            <nav className="container mx-auto px-6 py-6 flex justify-between items-center relative z-20">
                <Link href="/" className="flex items-center gap-3">
                    <img src="/logo.jpg" alt="ViralRadar Logo" className="w-8 h-8 rounded-lg" />
                    <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
                        ViralRadar.in
                    </span>
                </Link>
                <Link href="/" className="flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors">
                    <ArrowLeft size={16} /> Back to Home
                </Link>
            </nav>

            <main className="flex-1 container mx-auto px-6 py-12 md:py-20 max-w-4xl relative">
                {/* Background Gradients */}
                <div className="absolute top-[10%] right-[-20%] w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />
                <div className="absolute bottom-[10%] left-[-20%] w-[600px] h-[600px] bg-pink-600/10 rounded-full blur-[100px] pointer-events-none" />

                <div className="relative z-10">
                    <h1 className="text-4xl md:text-6xl font-bold mb-8">About Us</h1>

                    <div className="space-y-8 text-zinc-300 text-lg leading-relaxed">
                        <p>
                            Welcome to <span className="text-white font-semibold">ViralRadar AI</span>. We're on a mission to decode the algorithms that rule our digital lives and put that power back into the hands of creators.
                        </p>

                        <div className="bg-zinc-900/40 p-8 rounded-3xl border border-white/5 backdrop-blur-sm">
                            <h2 className="text-2xl font-bold text-white mb-4">The Story</h2>
                            <p className="mb-6">
                                My name is <strong className="text-white">Muhammed Fadhi</strong>, and like many of you, I've spent countless hours creating content only to watch it get lost in the feed. I realized that going viral isn't just luck—it's science. It's about hooks, pacing, and hitting the right psychological triggers.
                            </p>
                            <p>
                                I built ViralRadar to bridge the gap between creativity and data. By analyzing thousands of viral videos, we've trained an AI that can predict potential hits before you even hit publish.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold text-white mb-4">Our Vision</h2>
                            <p>
                                We believe every creator deserves a fair shot at being seen. Whether you're a solo creator just starting out or an agency managing dozens of accounts, our tools are designed to save you time and skyrocket your reach.
                            </p>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
