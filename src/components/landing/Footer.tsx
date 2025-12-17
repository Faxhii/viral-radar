import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="border-t border-white/5 bg-black py-12 text-center relative z-10">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="text-left md:w-1/3">
                        <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600 mb-4">
                            ViralRadar AI
                        </h3>
                        <p className="text-zinc-400 text-sm mb-6 leading-relaxed">
                            Predict viral potential before you post.
                        </p>


                    </div>

                    <div className="flex gap-8 text-sm text-zinc-400 items-center">
                        <Link href="/about" className="hover:text-white transition-colors">About Us</Link>
                        <Link href="/legal/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link href="/legal/terms" className="hover:text-white transition-colors">Terms of Service</Link>
                        <Link href="/legal/refund" className="hover:text-white transition-colors">Refund Policy</Link>
                        <a href="https://instagram.com/viralradar.in" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500 transition-colors flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
                            <span className="hidden md:inline">Instagram</span>
                        </a>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-white/5 text-zinc-600 text-sm">
                    © {new Date().getFullYear()} ViralRadar AI. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
