import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="border-t border-white/5 bg-black py-12 text-center relative z-10">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="text-left md:w-1/3">
                        <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600 mb-4">
                            ViralVision AI
                        </h3>
                        <p className="text-zinc-400 text-sm mb-6 leading-relaxed">
                            Predict viral potential before you post.
                        </p>

                        <div className="space-y-4">
                            <h4 className="text-white font-semibold flex items-center gap-2">
                                <span className="w-8 h-[1px] bg-zinc-600"></span> About Us
                            </h4>
                            <div className="bg-zinc-900/50 p-4 rounded-xl border border-white/5">
                                <p className="text-zinc-300 text-sm italic mb-3">
                                    "I built ViralVision because I saw too many brilliant creators giving up when their content didn't stick. We're here to change that with data."
                                </p>
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 flex items-center justify-center text-xs font-bold text-white">
                                        MF
                                    </div>
                                    <div>
                                        <div className="text-white text-sm font-semibold">Muhammed Fadhi</div>
                                        <div className="text-zinc-500 text-xs">Entrepreneur & Founder</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-8 text-sm text-zinc-400">
                        <Link href="/legal/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link href="/legal/terms" className="hover:text-white transition-colors">Terms of Service</Link>
                        <Link href="/legal/refund" className="hover:text-white transition-colors">Refund Policy</Link>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-white/5 text-zinc-600 text-sm">
                    © {new Date().getFullYear()} ViralVision AI. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
