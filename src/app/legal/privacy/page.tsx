export default function PrivacyPolicy() {
    return (
        <div className="min-h-screen bg-black text-zinc-300 p-8 md:p-20">
            <div className="max-w-3xl mx-auto space-y-8">
                <h1 className="text-4xl font-bold text-white mb-8">Privacy Policy</h1>
                <p className="text-sm text-zinc-500">Last Updated: January 17, 2026</p>

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold text-white">1. Introduction</h2>
                    <p>
                        Welcome to ViralRadar AI ("we," "our," or "us"). We are committed to protecting your personal information and your right to privacy.
                        This Privacy Policy explains how we collect, use, disclosure, and safeguard your information when you use our website and services.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold text-white">2. Information We Collect</h2>
                    <ul className="list-disc pl-5 space-y-2">
                        <li><strong>Personal Information:</strong> Name, email address, profile picture (via Google Auth), and payment history.</li>
                        <li><strong>User Content:</strong> Videos, audio files, scripts, text inputs, and links you upload for analysis.</li>
                        <li><strong>Usage Data:</strong> Information about your interactions, credit usage, and analysis history.</li>
                    </ul>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold text-white">3. How We Use Your Information</h2>
                    <p>We use your information to:</p>
                    <ul className="list-disc pl-5 space-y-2">
                        <li>Provide, operate, and maintain our AI analysis service.</li>
                        <li>Process your content using third-party AI providers (Google Gemini) to generate viral insights.</li>
                        <li>Manage your account, credits, and subscription payments.</li>
                        <li>Send administrative information, such as security alerts, updates, and analysis reports.</li>
                    </ul>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold text-white">4. Third-Party Services</h2>
                    <ul className="list-disc pl-5 space-y-2">
                        <li><strong>Google Gemini AI:</strong> We use Google's advanced AI models to analyze your video and script content. By using our service, you acknowledge that your content will be processed by Google in accordance with their privacy standards.</li>
                        <li><strong>Payment Processors:</strong> We use <strong>Dodo Payments</strong> and <strong>Razorpay</strong> for secure financial transactions. We do not store your credit card details on our servers.</li>
                        <li><strong>Google OAuth:</strong> We use Google Sign-In for authentication. We access basic profile info (email, name, picture) solely for account creation.</li>
                    </ul>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold text-white">5. Data Retention</h2>
                    <p>
                        We retain your personal information only for as long as is necessary for the purposes set out in this Privacy Policy.
                        <strong>Uploaded Videos:</strong> To protect your privacy, uploaded video files are temporary and typically deleted from our processing servers within 48 hours after analysis is complete.
                        <strong>Analysis Reports:</strong> The generated text/JSON reports are stored in your dashboard history for your future reference.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold text-white">6. Contact Us</h2>
                    <p>
                        If you have questions about this Privacy Policy, please contact us at: <a href="mailto:viralradar.in@gmail.com" className="text-purple-400 hover:underline">viralradar.in@gmail.com</a>
                    </p>
                </section>
            </div>
        </div>
    );
}
