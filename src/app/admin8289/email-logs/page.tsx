import { EmailLogsTable } from "@/components/admin/EmailLogsTable";

export default function EmailLogsPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold font-heading">Email Logs</h1>
                <p className="text-muted-foreground">Monitor system emails and delivery status.</p>
            </div>

            <EmailLogsTable />
        </div>
    );
}
