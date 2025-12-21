import { Outlet, createRootRoute, Link } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { Footer } from '../components/Footer'
import { ThemeProvider } from '../components/theme-provider'
import { ModeToggle } from '../components/mode-toggle'
import { Button } from '@/components/ui/button'
import {
    Sheet,
    SheetContent,
    SheetTrigger,
    SheetTitle,
    SheetDescription,
} from "@/components/ui/sheet"
import { Menu } from "lucide-react"

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
                    {/* Mobile Menu (Sheet) */}
                    <div className="md:hidden flex items-center gap-4">
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon">
                                    <Menu className="h-6 w-6" />
                                    <span className="sr-only">Open menu</span>
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="left">
                                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                                <SheetDescription className="sr-only">
                                    Main navigation menu for accessing pages and user settings.
                                </SheetDescription>
                                <nav className="flex flex-col gap-4 mt-8">
                                    <Link to="/" className="text-lg font-bold" onClick={() => document.body.click()}>
                                        Home
                                    </Link>
                                    <Link to="/latex-viewer" className="text-lg font-bold" onClick={() => document.body.click()}>
                                        LaTeX Viewer
                                    </Link>
                                    <div className="my-4 border-t" />
                                    {session ? (
                                        <>
                                            <span className="text-sm text-muted-foreground">{session.user.email}</span>
                                            <Button variant="outline" onClick={() => authClient.signOut()} className="justify-start">
                                                Sign Out
                                            </Button>
                                        </>
                                    ) : (
                                        <Button asChild variant="outline" className="justify-start">
                                            <Link to="/login" onClick={() => document.body.click()}>Sign In</Link>
                                        </Button>
                                    )}
                                    <div className="flex items-center justify-between">
                                        <span>Theme</span>
                                        <ModeToggle />
                                    </div>
                                </nav>
                            </SheetContent>
                        </Sheet>
                        <Button variant="link" asChild className="font-bold text-lg px-0">
                            <Link to="/">Leon Of Adelaide</Link>
                        </Button>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex gap-4">
                        <Button variant="link" asChild className="font-bold text-lg px-0">
                            <Link to="/">Home</Link>
                        </Button>
                        <Button variant="link" asChild className="font-bold text-lg px-0">
                            <Link to="/latex-viewer">LaTeX Viewer</Link>
                        </Button>
                    </div>
                    <div className="hidden md:flex items-center gap-4">
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
