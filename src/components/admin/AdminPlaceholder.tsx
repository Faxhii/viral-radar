import { Construction } from 'lucide-react';
import Link from 'next/link';

export default function AdminPlaceholder({ title }: { title: string }) {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6">
            <div className="w-24 h-24 rounded-full bg-secondary flex items-center justify-center animate-pulse">
                <Construction className="w-12 h-12 text-muted-foreground" />
            </div>
            <div className="space-y-2">
                <h1 className="text-3xl font-bold font-heading">{title}</h1>
                <p className="text-muted-foreground max-w-md mx-auto">
                    This section is currently under development. check back soon for updates.
                </p>
            </div>
            <Link href="/admin8289" className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
                Back to Dashboard
            </Link>
        </div>
    );
}
