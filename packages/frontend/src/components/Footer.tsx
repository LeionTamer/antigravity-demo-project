import { Instagram, Linkedin } from 'lucide-react';

export function Footer() {
    return (
        <footer className="w-full py-6 bg-secondary text-secondary-foreground mt-auto">
            <div className="container mx-auto flex flex-col items-center justify-center gap-4">
                <div className="flex gap-6">
                    <a
                        href="https://www.linkedin.com/in/leoncarbonell/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-primary transition-colors"
                        aria-label="LinkedIn"
                    >
                        <Linkedin className="w-6 h-6" />
                    </a>
                    <a
                        href="https://www.instagram.com/leion.tamer/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-primary transition-colors"
                        aria-label="Instagram"
                    >
                        <Instagram className="w-6 h-6" />
                    </a>
                </div>
                <p className="text-sm text-muted-foreground">
                    © {new Date().getFullYear()} Anti-Gravity. All rights reserved.
                </p>
            </div>
        </footer>
    );
}
