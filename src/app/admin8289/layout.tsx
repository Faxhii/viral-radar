import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminHeader } from "@/components/admin/AdminHeader";

// Check authentication status here if needed, or rely on API middleware
// For now, layout just provides the structure

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-background">
            <AdminSidebar />
            <div className="pl-64 flex flex-col min-h-screen">
                <AdminHeader />
                <main className="flex-1 p-6 overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}
