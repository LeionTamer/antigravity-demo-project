import { Moon, Sun, Laptop } from "lucide-react"
import { useTheme } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"
import { useState, useRef, useEffect } from "react"

export function ModeToggle() {
    const { setTheme, theme } = useTheme()
    const [isOpen, setIsOpen] = useState(false)
    const menuRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])

    return (
        <div className="relative" ref={menuRef}>
            <Button
                variant="outline"
                size="icon"
                onClick={() => setIsOpen(!isOpen)}
                title="Toggle theme"
            >
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
            </Button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-36 rounded-md border bg-popover p-1 shadow-md z-50">
                    <div className="flex flex-col gap-1">
                        <button
                            onClick={() => {
                                setTheme("light")
                                setIsOpen(false)
                            }}
                            className={`flex items-center gap-2 px-2 py-1.5 text-sm rounded-sm hover:bg-accent hover:text-accent-foreground ${theme === 'light' ? 'bg-accent text-accent-foreground' : ''}`}
                        >
                            <Sun className="h-4 w-4" />
                            <span>Light</span>
                        </button>
                        <button
                            onClick={() => {
                                setTheme("dark")
                                setIsOpen(false)
                            }}
                            className={`flex items-center gap-2 px-2 py-1.5 text-sm rounded-sm hover:bg-accent hover:text-accent-foreground ${theme === 'dark' ? 'bg-accent text-accent-foreground' : ''}`}
                        >
                            <Moon className="h-4 w-4" />
                            <span>Dark</span>
                        </button>
                        <button
                            onClick={() => {
                                setTheme("system")
                                setIsOpen(false)
                            }}
                            className={`flex items-center gap-2 px-2 py-1.5 text-sm rounded-sm hover:bg-accent hover:text-accent-foreground ${theme === 'system' ? 'bg-accent text-accent-foreground' : ''}`}
                        >
                            <Laptop className="h-4 w-4" />
                            <span>System</span>
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}
