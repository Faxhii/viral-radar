export default function TermsOfService() {
    return (
        <div className="min-h-screen bg-black text-zinc-300 p-8 md:p-20">
            <div className="max-w-3xl mx-auto space-y-8">
                <h1 className="text-4xl font-bold text-white mb-8">Terms of Service</h1>
                <p className="text-sm text-zinc-500">Last Updated: December 4, 2025</p>

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold text-white">1. Agreement to Terms</h2>
                    <p>
                        By accessing or using ViralVision AI, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, you may not access the service.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold text-white">2. Description of Service</h2>
                    <p>
                        ViralVision AI provides artificial intelligence-based analysis of video content to estimate "viral potential."
                        <strong>Disclaimer:</strong> The "Viral Score" and insights are estimates based on AI analysis. We do not guarantee that your content will go viral or achieve specific performance metrics.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold text-white">3. User Accounts</h2>
                    <p>
                        You are responsible for safeguarding the password that you use to access the service and for any activities or actions under your password.
                        You agree not to disclose your password to any third party.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold text-white">4. User Content</h2>
                    <p>
                        You retain all rights to the content you upload. By uploading content, you grant us a license to use, process, and analyze the content solely for the purpose of providing the service to you.
                        You represent and warrant that you own or have the necessary rights to the content you upload and that it does not violate any third-party rights or laws.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold text-white">5. Prohibited Uses</h2>
                    <p>You may not use the service to:</p>
                    <ul className="list-disc pl-5 space-y-2">
                        <li>Upload illegal, harmful, threatening, or sexually explicit content.</li>
                        <li>Reverse engineer or attempt to extract the source code of the service.</li>
                        <li>Use the service for any purpose that is illegal or prohibited by these Terms.</li>
                    </ul>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold text-white">6. Limitation of Liability</h2>
                    <p>
                        In no event shall ViralVision AI, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.
                    </p>
                </section>
            </div>
        </div>
    );
}
