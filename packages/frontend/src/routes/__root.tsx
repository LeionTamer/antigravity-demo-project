import { Outlet, createRootRoute, Link } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { Footer } from '../components/Footer'
import { ThemeProvider } from '../components/theme-provider'
import { ModeToggle } from '../components/mode-toggle'
import { Button } from '@/components/ui/button'

export const Route = createRootRoute({
    component: () => (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <div className="min-h-screen flex flex-col">
                <header className="flex items-center justify-between p-4 border-b">
                    <div className="flex gap-4">
                        <Button variant="link" asChild className="font-bold text-lg px-0">
                            <Link to="/">Home</Link>
                        </Button>
                    </div>
                    <ModeToggle />
                </header>
                <div className="flex-1">
                    <Outlet />
                </div>
                <Footer />
                <TanStackRouterDevtools />
            </div>
        </ThemeProvider>
    ),
})
