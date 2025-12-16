import { Outlet, createRootRoute, Link } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { Footer } from '../components/Footer'
import { ThemeProvider } from '../components/theme-provider'
import { ModeToggle } from '../components/mode-toggle'
import { Button } from '@/components/ui/button'

import { authClient } from '../lib/auth-client'

export const Route = createRootRoute({
    component: () => (
        <RootComponent />
    ),
})

function RootComponent() {
    const { data: session } = authClient.useSession();

    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <div className="min-h-screen flex flex-col">
                <header className="flex items-center justify-between p-4 border-b">
                    <div className="flex gap-4">
                        <Button variant="link" asChild className="font-bold text-lg px-0">
                            <Link to="/">Home</Link>
                        </Button>
                        <Button variant="link" asChild className="font-bold text-lg px-0">
                            <Link to="/latex-viewer">LaTeX Viewer</Link>
                        </Button>
                    </div>
                    <div className="flex items-center gap-4">
                        {session ? (
                            <div className="flex items-center gap-4">
                                <span className="text-sm text-muted-foreground">{session.user.email}</span>
                                <Button variant="outline" onClick={() => authClient.signOut()}>Sign Out</Button>
                            </div>
                        ) : (
                            <Button asChild variant="outline">
                                <Link to="/login">Sign In</Link>
                            </Button>
                        )}
                        <ModeToggle />
                    </div>
                </header>
                <div className="flex-1">
                    <Outlet />
                </div>
                <Footer />
                <TanStackRouterDevtools />
            </div>
        </ThemeProvider>
    );
}
