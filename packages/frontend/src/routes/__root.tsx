import { Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'

export const Route = createRootRoute({
    component: () => (
        <>
            <div style={{ padding: '10px', display: 'flex', gap: '10px' }}>
                <a href="/" style={{ fontWeight: 'bold' }}>
                    Home
                </a>
            </div>
            <hr />
            <Outlet />
            <TanStackRouterDevtools />
        </>
    ),
})
