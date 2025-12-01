import { Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { Footer } from '../components/Footer'
import { ThemeProvider } from '../components/theme-provider'
import { ModeToggle } from '../components/mode-toggle'

export const Route = createRootRoute({
    component: () => (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <div className="min-h-screen flex flex-col">
                <div style={{ padding: '10px', display: 'flex', gap: '10px', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <a href="/" style={{ fontWeight: 'bold' }}>
                            Home
                        </a>
                    </div>
                    <ModeToggle />
                </div>
                <hr />
                <div className="flex-1">
                    <Outlet />
                </div>
                <Footer />
                <TanStackRouterDevtools />
            </div>
        </ThemeProvider>
    ),
})
