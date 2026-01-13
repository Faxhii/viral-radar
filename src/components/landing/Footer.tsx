import Link from 'next/link';
import { Twitter, Instagram, Linkedin, Github } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="relative border-t border-white/5 bg-[#030014] pt-20 pb-10 overflow-hidden">
            {/* Background Glow */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-purple-900/20 blur-[120px] pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid md:grid-cols-4 gap-12 mb-16">
                    <div className="col-span-1 md:col-span-2">
                        <Link href="/" className="inline-block mb-6">
                            <span className="text-2xl font-bold font-heading text-white">
                                Viral<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">Radar</span>
                            </span>
                        </Link>
                        <p className="text-gray-400 max-w-sm mb-6 leading-relaxed">
                            The advanced AI platform that predicts viral potential before you post.
                            Stop guessing and start dominating the algorithm.
                        </p>
                        <div className="flex gap-4">
                            {[
                                { icon: Twitter, href: "#" },
                                { icon: Instagram, href: "https://instagram.com/viralradar.in" },
                                { icon: Linkedin, href: "#" }
                            ].map((social, i) => (
                                <a
                                    key={i}
                                    href={social.href}
                                    className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 hover:border-purple-500/50 transition-all duration-300"
                                >
                                    <social.icon size={18} />
                                </a>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h4 className="font-bold text-white mb-6 font-heading">Product</h4>
                        <ul className="space-y-4 text-gray-400">
                            <li><Link href="#features" className="hover:text-purple-400 transition-colors">Features</Link></li>
                            <li><Link href="#pricing" className="hover:text-purple-400 transition-colors">Pricing</Link></li>
                            <li><Link href="#reviews" className="hover:text-purple-400 transition-colors">Success Stories</Link></li>
                            <li><Link href="/login" className="hover:text-purple-400 transition-colors">Login</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-white mb-6 font-heading">Legal</h4>
                        <ul className="space-y-4 text-gray-400">
                            <li><Link href="/legal/privacy" className="hover:text-purple-400 transition-colors">Privacy Policy</Link></li>
                            <li><Link href="/legal/terms" className="hover:text-purple-400 transition-colors">Terms of Service</Link></li>
                            <li><Link href="/legal/refund" className="hover:text-purple-400 transition-colors">Refund Policy</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
                    <p>© {new Date().getFullYear()} ViralRadar AI. All rights reserved.</p>
                    <p>Designed for the future of content creation.</p>
                </div>
            </div>
        </footer>
    );
}
