'use client';

import { Bell, Search, User } from 'lucide-react';

export function AdminHeader() {
    return (
        <header className="h-16 border-b border-border/50 glass sticky top-0 z-30 px-6 flex items-center justify-between">
            <div className="relative w-96">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                    type="text"
                    placeholder="Search users, content..."
                    className="w-full h-9 pl-9 pr-4 rounded-lg bg-secondary/50 border border-border/50 focus:border-primary/50 focus:bg-background/80 focus:outline-none transition-all text-sm"
                />
            </div>

            <div className="flex items-center gap-4">
                <button className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-secondary/80 transition-colors relative">
                    <Bell className="w-4 h-4 text-muted-foreground" />
                    <span className="absolute top-2 right-2.5 w-1.5 h-1.5 bg-destructive rounded-full" />
                </button>

                <div className="flex items-center gap-3 pl-4 border-l border-border/50">
                    <div className="text-right hidden sm:block">
                        <p className="text-sm font-medium leading-none">Admin User</p>
                        <p className="text-xs text-muted-foreground mt-1">Super Admin</p>
                    </div>
                    <div className="w-9 h-9 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                        <User className="w-4 h-4" />
                    </div>
                </div>
            </div>
        </header>
    );
}
