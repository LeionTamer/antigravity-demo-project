import { createFileRoute } from '@tanstack/react-router'


export const Route = createFileRoute('/admin/')({
    component: AdminDashboard,
})

function AdminDashboard() {
    return (
        <div className="space-y-4">
            <h2 className="text-xl font-semibold">Admin Dashboard</h2>
            <p>Welcome to the admin area.</p>
        </div>
    )
}
