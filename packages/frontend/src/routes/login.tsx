import { useState } from 'react';
import { authClient } from '../lib/auth-client';
import { createFileRoute } from '@tanstack/react-router';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

export const Route = createFileRoute('/login')({
    component: Login,
});

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const signUp = async () => {
        setLoading(true);
        setError(null);
        await authClient.signUp.email({
            email,
            password,
            name: email.split('@')[0],
        }, {
            onSuccess: (ctx) => {
                console.log("Sign up success", ctx);
                setLoading(false);
            },
            onError: (ctx) => {
                console.log("Sign up error", ctx);
                setError(ctx.error.message);
                setLoading(false);
            }
        });
    };

    const signIn = async () => {
        setLoading(true);
        setError(null);
        await authClient.signIn.email({
            email,
            password,
        }, {
            onSuccess: (ctx) => {
                console.log("Sign in success", ctx);
                setLoading(false);
            },
            onError: (ctx) => {
                console.log("Sign in error", ctx);
                setError(ctx.error.message);
                setLoading(false);
            }
        });
    };

    return (
        <div className="flex items-center justify-center p-4 min-h-[50vh]">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle>Login / Sign Up</CardTitle>
                    <CardDescription>Enter your email and password to continue.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="m@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    {error && <div className="text-red-500 text-sm">{error}</div>}
                </CardContent>
                <CardFooter className="flex gap-2">
                    <Button
                        className="flex-1"
                        onClick={signIn}
                        disabled={loading}
                    >
                        {loading ? 'Processing...' : 'Sign In'}
                    </Button>
                    <Button
                        variant="outline"
                        className="flex-1"
                        onClick={signUp}
                        disabled={loading}
                    >
                        {loading ? 'Processing...' : 'Sign Up'}
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}
