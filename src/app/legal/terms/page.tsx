export default function TermsOfService() {
    return (
        <div className="min-h-screen bg-black text-zinc-300 p-8 md:p-20">
            <div className="max-w-3xl mx-auto space-y-8">
                <h1 className="text-4xl font-bold text-white mb-8">Terms of Service</h1>
                <p className="text-sm text-zinc-500">Last Updated: January 17, 2026</p>

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold text-white">1. Agreement to Terms</h2>
                    <p>
                        By accessing or using ViralRadar AI, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, you may not access the service.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold text-white">2. Services & Credits</h2>
                    <p>
                        ViralRadar AI provides AI-based analysis for videos and scripts.
                    </p>
                    <ul className="list-disc pl-5 space-y-2">
                        <li><strong>Credit System:</strong> Our services operate on a credit basis. Actions such as "Video Analysis" or "Script Analysis" consume specific amounts of credits (e.g., 0.5 to 1+ credits).</li>
                        <li><strong>Monthly Usage:</strong> Credits are allocated based on your subscription plan (Starter, Pro, Agency) and reset monthly. Unused credits do not roll over.</li>
                        <li><strong>No Guarantees:</strong> The "Viral Score" is an AI estimate. We do not guarantee actual viral performance or audience engagement.</li>
                    </ul>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold text-white">3. Payments & Refunds</h2>
                    <p>
                        Payments are processed via Dodo Payments or Razorpay.
                    </p>
                    <ul className="list-disc pl-5 space-y-2">
                        <li><strong>Subscription:</strong> Fees are billed monthly in advance.</li>
                        <li><strong>Refunds:</strong> Generally, payments are non-refundable once credits have been used. If you believe there was a billing error, please contact support within 7 days.</li>
                    </ul>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold text-white">4. User Accounts</h2>
                    <p>
                        You are responsible for safeguarding your account access. You agree that you will not share your login credentials with third parties.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold text-white">5. User Content & Conducting</h2>
                    <p>
                        You retain full ownership of your uploads. By using ViralRadar, you grant us a limited license to process this content solely for analysis.
                    </p>
                    <p>You agree NOT to upload:</p>
                    <ul className="list-disc pl-5 space-y-2">
                        <li>Illegal, violent, or sexually explicit content.</li>
                        <li>Copyrighted material you do not own rights to.</li>
                        <li>Malware or viruses.</li>
                    </ul>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold text-white">6. Limitation of Liability</h2>
                    <p>
                        In no event shall ViralRadar AI, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.
                    </p>
                </section>
            </div>
        </div>
    );
}
