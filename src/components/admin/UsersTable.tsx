'use client';

import { useState, useEffect } from 'react';
import {
    getUsers,
    updateUser,
    deleteUser,
    adjustCredits,
    AdminUser
} from '@/lib/api/admin';
import {
    MoreHorizontal,
    Edit,
    CreditCard,
    Trash2,
    Search,
    Check,
    X,
    ChevronLeft,
    ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';

export function UsersTable() {
    const [users, setUsers] = useState<AdminUser[]>([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [search, setSearch] = useState('');
    const [activeMenu, setActiveMenu] = useState<number | null>(null);

    // Modals
    const [editingUser, setEditingUser] = useState<AdminUser | null>(null);
    const [creditUser, setCreditUser] = useState<AdminUser | null>(null);
    const [deleteId, setDeleteId] = useState<number | null>(null);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const res = await getUsers(page, 10, search);
            setUsers(res.data);
            setTotalPages(Math.ceil(res.total / res.limit));
        } catch (err) {
            toast.error('Failed to load users');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const timeout = setTimeout(fetchUsers, 300);
        return () => clearTimeout(timeout);
    }, [page, search]);

    const handleEditSave = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingUser) return;
        try {
            await updateUser(editingUser.id, {
                plan: editingUser.plan,
                is_superuser: editingUser.is_superuser
            });
            toast.success('User updated');
            setEditingUser(null);
            fetchUsers();
        } catch (err) {
            toast.error('Failed to update user');
        }
    };

    const handleCreditSave = async (amount: number) => {
        if (!creditUser) return;
        try {
            await adjustCredits(creditUser.id, amount);
            toast.success('Credits updated');
            setCreditUser(null);
            fetchUsers();
        } catch (err) {
            toast.error('Failed to adjust credits');
        }
    };

    const handleDelete = async () => {
        if (!deleteId) return;
        try {
            await deleteUser(deleteId);
            toast.success('User deleted');
            setDeleteId(null);
            fetchUsers();
        } catch (err) {
            toast.error('Failed to delete user');
        }
    };

    return (
        <div className="space-y-4">
            {/* Filters */}
            <div className="flex items-center justify-between gap-4 bg-background/50 p-4 rounded-xl border border-border/50 backdrop-blur-sm">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search by email..."
                        className="w-full pl-9 pr-4 h-10 rounded-lg bg-secondary/50 border border-border/50 focus:border-primary/50 outline-none transition-all text-sm"
                    />
                </div>
            </div>

            {/* Table */}
            <div className="glass-card overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-secondary/50 text-muted-foreground uppercase text-xs font-semibold">
                            <tr>
                                <th className="px-6 py-4">User</th>
                                <th className="px-6 py-4">Plan</th>
                                <th className="px-6 py-4">Credits</th>
                                <th className="px-6 py-4">Role</th>
                                <th className="px-6 py-4">Joined</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border/50">
                            {loading ? (
                                [...Array(5)].map((_, i) => (
                                    <tr key={i} className="animate-pulse">
                                        <td className="px-6 py-4"><div className="h-4 bg-secondary rounded w-32"></div></td>
                                        <td className="px-6 py-4"><div className="h-4 bg-secondary rounded w-16"></div></td>
                                        <td className="px-6 py-4"><div className="h-4 bg-secondary rounded w-12"></div></td>
                                        <td className="px-6 py-4"><div className="h-4 bg-secondary rounded w-16"></div></td>
                                        <td className="px-6 py-4"><div className="h-4 bg-secondary rounded w-24"></div></td>
                                        <td className="px-6 py-4"></td>
                                    </tr>
                                ))
                            ) : users.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-12 text-center text-muted-foreground">No users found.</td>
                                </tr>
                            ) : (
                                users.map((user) => (
                                    <tr key={user.id} className="hover:bg-secondary/30 transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-xs">
                                                    {user.email.substring(0, 2).toUpperCase()}
                                                </div>
                                                <div>
                                                    <p className="font-medium">{user.full_name || 'No Name'}</p>
                                                    <p className="text-xs text-muted-foreground">{user.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                        ${user.plan === 'pro' ? 'bg-purple-500/10 text-purple-500 border border-purple-500/20' :
                                                    user.plan === 'agency' ? 'bg-orange-500/10 text-orange-500 border border-orange-500/20' :
                                                        'bg-zinc-500/10 text-zinc-500 border border-zinc-500/20'
                                                }`}>
                                                {user.plan}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 font-mono">{user.credits.toFixed(1)}</td>
                                        <td className="px-6 py-4">
                                            {user.is_superuser ? (
                                                <span className="text-xs font-bold text-primary flex items-center gap-1">
                                                    <Check className="w-3 h-3" /> Admin
                                                </span>
                                            ) : <span className="text-muted-foreground">User</span>}
                                        </td>
                                        <td className="px-6 py-4 text-muted-foreground">
                                            {new Date(user.created_at).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 text-right relative">
                                            <button
                                                onClick={() => setActiveMenu(activeMenu === user.id ? null : user.id)}
                                                className="p-2 rounded-lg hover:bg-secondary transition-colors"
                                            >
                                                <MoreHorizontal className="w-4 h-4" />
                                            </button>

                                            {activeMenu === user.id && (
                                                <div className="absolute right-8 top-8 w-48 bg-card border border-border shadow-xl rounded-xl z-50 overflow-hidden text-left animate-in fade-in zoom-in-95 duration-200">
                                                    <button onClick={() => { setEditingUser(user); setActiveMenu(null); }} className="w-full px-4 py-2.5 hover:bg-secondary flex items-center gap-2 text-sm">
                                                        <Edit className="w-4 h-4 text-blue-500" /> Edit Details
                                                    </button>
                                                    <button onClick={() => { setCreditUser(user); setActiveMenu(null); }} className="w-full px-4 py-2.5 hover:bg-secondary flex items-center gap-2 text-sm">
                                                        <CreditCard className="w-4 h-4 text-green-500" /> Adjust Credits
                                                    </button>
                                                    <hr className="border-border/50" />
                                                    <button onClick={() => { setDeleteId(user.id); setActiveMenu(null); }} className="w-full px-4 py-2.5 hover:bg-red-500/10 text-red-500 flex items-center gap-2 text-sm">
                                                        <Trash2 className="w-4 h-4" /> Delete User
                                                    </button>
                                                </div>
                                            )}

                                            {/* Click outside closer helper */}
                                            {activeMenu === user.id && (
                                                <div className="fixed inset-0 z-40" onClick={() => setActiveMenu(null)} />
                                            )}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="p-4 border-t border-border/50 flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Page {page} of {totalPages}</span>
                    <div className="flex gap-2">
                        <button
                            disabled={page <= 1}
                            onClick={() => setPage(p => p - 1)}
                            className="p-2 rounded-lg border border-border hover:bg-secondary disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button
                            disabled={page >= totalPages}
                            onClick={() => setPage(p => p + 1)}
                            className="p-2 rounded-lg border border-border hover:bg-secondary disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Edit Modal */}
            <AnimatePresence>
                {editingUser && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
                    >
                        <div className="bg-card w-full max-w-md p-6 rounded-2xl border border-border shadow-2xl space-y-4">
                            <h3 className="text-lg font-bold font-heading">Edit User</h3>
                            <div className="space-y-3">
                                <div>
                                    <label className="text-xs font-medium text-muted-foreground">Plan</label>
                                    <select
                                        value={editingUser.plan}
                                        onChange={e => setEditingUser({ ...editingUser, plan: e.target.value })}
                                        className="w-full mt-1 bg-secondary rounded-lg border border-border px-3 py-2 text-sm"
                                    >
                                        <option value="free">Free</option>
                                        <option value="starter">Starter</option>
                                        <option value="pro">Pro</option>
                                        <option value="agency">Agency</option>
                                    </select>
                                </div>
                                <div className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        checked={editingUser.is_superuser}
                                        onChange={e => setEditingUser({ ...editingUser, is_superuser: e.target.checked })}
                                        id="is_super"
                                        className="rounded border-border bg-secondary"
                                    />
                                    <label htmlFor="is_super" className="text-sm">Is Superuser</label>
                                </div>
                            </div>
                            <div className="flex justify-end gap-2 mt-4">
                                <button onClick={() => setEditingUser(null)} className="px-4 py-2 text-sm hover:bg-secondary rounded-lg">Cancel</button>
                                <button onClick={handleEditSave} className="px-4 py-2 text-sm bg-primary text-primary-foreground rounded-lg">Save Changes</button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Credit Modal */}
            <AnimatePresence>
                {creditUser && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
                    >
                        <div className="bg-card w-full max-w-md p-6 rounded-2xl border border-border shadow-2xl space-y-4">
                            <h3 className="text-lg font-bold font-heading">Adjust Credits</h3>
                            <p className="text-sm text-muted-foreground">Current Balance: <span className="font-mono text-foreground">{creditUser.credits}</span></p>
                            <div className="grid grid-cols-3 gap-2">
                                <button onClick={() => handleCreditSave(10)} className="px-3 py-2 text-sm bg-green-500/10 text-green-500 border border-green-500/20 rounded-lg hover:bg-green-500/20">+10</button>
                                <button onClick={() => handleCreditSave(50)} className="px-3 py-2 text-sm bg-green-500/10 text-green-500 border border-green-500/20 rounded-lg hover:bg-green-500/20">+50</button>
                                <button onClick={() => handleCreditSave(-10)} className="px-3 py-2 text-sm bg-red-500/10 text-red-500 border border-red-500/20 rounded-lg hover:bg-red-500/20">-10</button>
                            </div>
                            <div className="flex justify-end gap-2 mt-4">
                                <button onClick={() => setCreditUser(null)} className="px-4 py-2 text-sm hover:bg-secondary rounded-lg">Close</button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Delete Confirmation */}
            <AnimatePresence>
                {deleteId && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
                    >
                        <div className="bg-card w-full max-w-md p-6 rounded-2xl border border-border shadow-2xl space-y-4">
                            <h3 className="text-lg font-bold font-heading text-destructive flex items-center gap-2">
                                <Trash2 className="w-5 h-5" /> Confirm Delete
                            </h3>
                            <p className="text-sm text-muted-foreground">Are you sure you want to delete this user? This action cannot be undone.</p>
                            <div className="flex justify-end gap-2 mt-4">
                                <button onClick={() => setDeleteId(null)} className="px-4 py-2 text-sm hover:bg-secondary rounded-lg">Cancel</button>
                                <button onClick={handleDelete} className="px-4 py-2 text-sm bg-destructive text-destructive-foreground rounded-lg">Delete User</button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
