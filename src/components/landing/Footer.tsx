import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="border-t border-white/5 bg-black py-12 text-center relative z-10">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="text-left">
                        <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600 mb-2">
                            ViralVision AI
                        </h3>
                        <p className="text-zinc-500 text-sm">
                            Predict viral potential before you post.
                        </p>
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
