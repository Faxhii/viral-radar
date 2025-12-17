export default function PrivacyPolicy() {
    return (
        <div className="min-h-screen bg-black text-zinc-300 p-8 md:p-20">
            <div className="max-w-3xl mx-auto space-y-8">
                <h1 className="text-4xl font-bold text-white mb-8">Privacy Policy</h1>
                <p className="text-sm text-zinc-500">Last Updated: December 4, 2025</p>

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
                        <li><strong>Personal Information:</strong> Name, email address, and password when you register.</li>
                        <li><strong>Content:</strong> Videos, scripts, and links you upload for analysis.</li>
                        <li><strong>Usage Data:</strong> Information about how you use our website (e.g., pages visited, time spent).</li>
                    </ul>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold text-white">3. How We Use Your Information</h2>
                    <p>We use your information to:</p>
                    <ul className="list-disc pl-5 space-y-2">
                        <li>Provide and maintain our AI analysis service.</li>
                        <li>Process your video content using third-party AI providers (Google Gemini).</li>
                        <li>Send you administrative information, such as updates and security alerts.</li>
                    </ul>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold text-white">4. Third-Party Services</h2>
                    <p>
                        We use <strong>Google Gemini</strong> to analyze your video content. By using our service, you acknowledge that your content will be processed by Google's AI models in accordance with their privacy policy.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold text-white">5. Data Retention</h2>
                    <p>
                        We retain your personal information only for as long as is necessary for the purposes set out in this Privacy Policy.
                        Uploaded videos may be temporarily stored for processing and are typically deleted within 48 hours.
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
