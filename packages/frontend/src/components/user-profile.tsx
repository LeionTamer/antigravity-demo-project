import { authClient } from '../lib/auth-client';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

export function UserProfile() {
    const { data: session } = authClient.useSession();

    if (!session) {
        return <div className="p-4">Not signed in</div>;
    }

    return (
        <Card className="border shadow-sm">
            <CardContent className="p-4 flex items-center gap-4">
                <Avatar>
                    <AvatarImage src={session.user.image || undefined} alt={session.user.name} />
                    <AvatarFallback>{session.user.name.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium leading-none truncate">{session.user.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{session.user.email}</p>
                </div>
                <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => authClient.signOut()}
                >
                    Sign Out
                </Button>
            </CardContent>
        </Card>
    );
}
