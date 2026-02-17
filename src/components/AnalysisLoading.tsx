import { Sparkles } from 'lucide-react';

export default function AnalysisLoading() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-center p-6 bg-background text-foreground transition-colors duration-300">
            <div className="relative mb-8">
                <div className="w-24 h-24 rounded-full border-t-4 border-purple-500 animate-spin absolute inset-0"></div>
                <div className="w-24 h-24 rounded-full border-4 border-muted/20"></div>
                <Sparkles className="w-8 h-8 text-purple-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" />
            </div>
            <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">Analyzing Your Content</h2>
            <p className="text-muted-foreground mt-2">Checking hooks, pacing, and emotional impact...</p>
        </div>
    );
}
