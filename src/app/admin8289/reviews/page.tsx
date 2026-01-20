'use client';

import { ReviewsTable } from '@/components/admin/ReviewsTable';

export default function ReviewsPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold font-heading">Review Management</h1>
                <p className="text-muted-foreground">Manage user testimonials and reviews.</p>
            </div>

            <ReviewsTable />
        </div>
    );
}
