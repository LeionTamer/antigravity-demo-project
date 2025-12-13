import { Button } from '@/components/ui/button';
import { Instagram, Linkedin } from 'lucide-react';

export function Footer() {
    return (
        <footer className="w-full py-6 bg-secondary text-secondary-foreground mt-auto">
            <div className="container mx-auto flex flex-col items-center justify-center gap-4">
                <div className="flex gap-2">
                    <Button variant="ghost" size="icon" asChild>
                        <a
                            href="https://www.linkedin.com/in/leoncarbonell/"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="LinkedIn"
                        >
                            <Linkedin className="w-5 h-5" />
                        </a>
                    </Button>
                    <Button variant="ghost" size="icon" asChild>
                        <a
                            href="https://www.instagram.com/leion.tamer/"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Instagram"
                        >
                            <Instagram className="w-5 h-5" />
                        </a>
                    </Button>
                </div>
                <p className="text-sm text-muted-foreground">
                    © {new Date().getFullYear()} Anti-Gravity. All rights reserved.
                </p>
            </div>
        </footer>
    );
}
