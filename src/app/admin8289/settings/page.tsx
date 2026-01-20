'use client';

import { useState } from 'react';
import { User, Lock, Mail, Save } from 'lucide-react';
import { toast } from 'sonner';

export default function SettingsPage() {
    const [loading, setLoading] = useState(false);

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        toast.success('Settings saved successfully');
        setLoading(false);
    };

    return (
        <div className="space-y-6 max-w-2xl">
            <div>
                <h1 className="text-2xl font-bold font-heading">Admin Settings</h1>
                <p className="text-muted-foreground">Manage your admin preferences and profile.</p>
            </div>

            <div className="bg-card/50 border border-border/50 rounded-xl p-6 backdrop-blur-sm">
                <form onSubmit={handleSave} className="space-y-6">
                    <div className="space-y-4">
                        <h3 className="font-medium text-lg flex items-center gap-2">
                            <User className="w-5 h-5" />
                            Profile Information
                        </h3>

                        <div className="grid gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Display Name</label>
                                <input
                                    type="text"
                                    defaultValue="Super Admin"
                                    className="w-full px-4 py-2 rounded-lg bg-secondary/50 border border-border focus:border-primary/50 outline-none"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Email Address</label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                    <input
                                        type="email"
                                        value="viralradar.in@gmail.com"
                                        disabled
                                        className="w-full pl-10 pr-4 py-2 rounded-lg bg-secondary/20 border border-border text-muted-foreground cursor-not-allowed"
                                    />
                                </div>
                                <p className="text-xs text-muted-foreground">Email cannot be changed.</p>
                            </div>
                        </div>
                    </div>

                    <div className="pt-4 border-t border-border/50 space-y-4">
                        <h3 className="font-medium text-lg flex items-center gap-2">
                            <Lock className="w-5 h-5" />
                            Security
                        </h3>
                        <div className="grid gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Current Password</label>
                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    className="w-full px-4 py-2 rounded-lg bg-secondary/50 border border-border focus:border-primary/50 outline-none"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">New Password</label>
                                    <input
                                        type="password"
                                        placeholder="••••••••"
                                        className="w-full px-4 py-2 rounded-lg bg-secondary/50 border border-border focus:border-primary/50 outline-none"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Confirm New Password</label>
                                    <input
                                        type="password"
                                        placeholder="••••••••"
                                        className="w-full px-4 py-2 rounded-lg bg-secondary/50 border border-border focus:border-primary/50 outline-none"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="pt-4 flex justify-end">
                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-primary text-primary-foreground px-6 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center gap-2 disabled:opacity-50"
                        >
                            {loading ? (
                                'Saving...'
                            ) : (
                                <>
                                    <Save className="w-4 h-4" />
                                    Save Changes
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
