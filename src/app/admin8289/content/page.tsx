'use client';

import { VideosTable } from '@/components/admin/VideosTable';

export default function ContentPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold font-heading">Content Management</h1>
                <p className="text-muted-foreground">View and manage user uploaded videos.</p>
            </div>

            <VideosTable />
        </div>
    );
}
