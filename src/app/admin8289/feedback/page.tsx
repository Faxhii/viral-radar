'use client';

import { FeedbackList } from '@/components/admin/FeedbackList';

export default function FeedbackPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold font-heading">Feedback & Reports</h1>
                <p className="text-muted-foreground">User submitted feedback and bug reports.</p>
            </div>

            <FeedbackList type="feature_request" />
        </div>
    );
}
