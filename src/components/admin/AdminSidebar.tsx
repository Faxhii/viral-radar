'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    Users,
    Video,
    ShieldCheck,
    LogOut,
    MessageSquare,
    LifeBuoy,
    Settings,
    Mail
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

const sidebarItems = [
    { label: 'Dashboard', icon: LayoutDashboard, href: '/admin8289' },
    { label: 'Users', icon: Users, href: '/admin8289/users' },
    { label: 'Content', icon: Video, href: '/admin8289/content' },
    { label: 'Reviews', icon: ShieldCheck, href: '/admin8289/reviews' },
    { label: 'Feedback', icon: MessageSquare, href: '/admin8289/feedback' },
    { label: 'Support', icon: LifeBuoy, href: '/admin8289/support' },
    { label: 'Email Logs', icon: Mail, href: '/admin8289/email-logs' },
    { label: 'Settings', icon: Settings, href: '/admin8289/settings' },
];

export function AdminSidebar() {
    const pathname = usePathname();

    return (
        <aside className="fixed left-0 top-0 h-full w-64 bg-card border-r border-border z-40 hidden md:block">
            <div className="flex h-16 items-center gap-2 px-6 border-b border-border">
                <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                    <span className="font-bold text-primary-foreground">N</span>
                </div>
                <span className="font-bold text-lg">ViralRadar</span>
            </div>

            <nav className="p-4 space-y-2">
                {sidebarItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group",
                                isActive
                                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                            )}
                        >
                            <item.icon className={cn("w-5 h-5", isActive ? "text-primary-foreground" : "text-muted-foreground group-hover:text-foreground")} />
                            <span className="font-medium">{item.label}</span>
                        </Link>
                    );
                })}
            </nav>

            {/* Logout Button */}
            <div className="absolute bottom-4 left-0 w-full px-4">
                <button
                    onClick={() => {
                        localStorage.removeItem('token');
                        window.location.href = '/login';
                    }}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-muted-foreground hover:bg-red-500/10 hover:text-red-500 transition-all duration-200 w-full"
                >
                    <LogOut className="w-5 h-5" />
                    <span className="font-medium">Logout</span>
                </button>
            </div>
        </aside>
    );
}
