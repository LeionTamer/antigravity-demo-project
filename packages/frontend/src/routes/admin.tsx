import { createFileRoute, redirect, Outlet } from '@tanstack/react-router'
import { authClient } from '@/lib/auth-client'

export const Route = createFileRoute('/admin')({
    beforeLoad: async () => {
        const session = await authClient.getSession()

        if (!session.data?.user || (session.data.user as any).role !== 'ADMIN') {
            throw redirect({
                to: '/',
            })
        }
    },
    component: AdminLayout,
})

function AdminLayout() {
    return (
        <div className="p-2">
            <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
            <Outlet />
        </div>
    )
}
