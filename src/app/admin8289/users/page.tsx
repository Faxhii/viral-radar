import { UsersTable } from "@/components/admin/UsersTable";

export default function UsersPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold font-heading">Users</h1>
                <p className="text-muted-foreground">Manage user accounts, plans, and credits.</p>
            </div>

            <UsersTable />
        </div>
    );
}
