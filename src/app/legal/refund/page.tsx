export default function RefundPolicy() {
    return (
        <div className="min-h-screen bg-black text-zinc-300 p-8 md:p-20">
            <div className="max-w-3xl mx-auto space-y-8">
                <h1 className="text-4xl font-bold text-white mb-8">Refund Policy</h1>
                <p className="text-sm text-zinc-500">Last Updated: December 4, 2025</p>

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold text-white">1. General Policy</h2>
                    <p>
                        At ViralRadar AI, we strive to provide high-quality AI analysis for your content. However, due to the significant computational costs associated with processing video and audio using advanced AI models, we have a strict refund policy.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold text-white">2. Non-Refundable Services</h2>
                    <p>
                        <strong>All sales are final once an analysis has been performed.</strong>
                        If you have used your credits or subscription to analyze a video, we cannot offer a refund for that usage, as the costs have already been incurred.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold text-white">3. Subscription Refunds</h2>
                    <p>
                        For recurring subscriptions (e.g., Pro Plan):
                    </p>
                    <ul className="list-disc pl-5 space-y-2">
                        <li>You may cancel your subscription at any time. Your access will continue until the end of the current billing period.</li>
                        <li>We do not offer prorated refunds for partial billing periods.</li>
                        <li>If you believe you were charged in error, please contact support immediately.</li>
                    </ul>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold text-white">4. Technical Issues</h2>
                    <p>
                        If the service fails to analyze your video due to a technical error on our end (e.g., system crash, failed processing), we will refund the credit used or provide a complimentary re-analysis.
                        Please contact us with the Analysis ID and details of the error.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold text-white">5. Contact Us</h2>
                    <p>
                        For any billing inquiries or refund requests, please contact us at: <a href="mailto:viralradar.in@gmail.com" className="text-purple-400 hover:underline">viralradar.in@gmail.com</a>
                    </p>
                </section>
            </div>
        </div>
    );
}
