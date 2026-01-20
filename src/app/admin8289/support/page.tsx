'use client';

import { FeedbackList } from '@/components/admin/FeedbackList';

export default function SupportPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold font-heading">Support Tickets</h1>
                <p className="text-muted-foreground">User submitted bugs and support requests.</p>
            </div>

            <FeedbackList type="bug_report" />
        </div>
    );
}
