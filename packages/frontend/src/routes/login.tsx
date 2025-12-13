import { useState } from 'react';
import { authClient } from '../lib/auth-client';
import { createFileRoute } from '@tanstack/react-router';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export const Route = createFileRoute('/login')({
    component: Login,
});

function Login() {
    const { data: session } = authClient.useSession();

    // Sign In State
    const [signInEmail, setSignInEmail] = useState('');
    const [signInPassword, setSignInPassword] = useState('');

    // Sign Up State
    const [signUpEmail, setSignUpEmail] = useState('');
    const [signUpPassword, setSignUpPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const signUp = async () => {
        setLoading(true);
        setError(null);
        await authClient.signUp.email({
            email: signUpEmail,
            password: signUpPassword,
            name: `${firstName} ${lastName}`,
            firstName,
            lastName,
        } as any, {
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
            email: signInEmail,
            password: signInPassword,
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

    if (session) {
        return (
            <div className="flex items-center justify-center p-4 min-h-[50vh]">
                <Card className="w-full max-w-md">
                    <CardHeader>
                        <CardTitle>Welcome back!</CardTitle>
                        <CardDescription>
                            You are logged in as {session.user.email}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button variant="outline" onClick={() => authClient.signOut()}>Sign Out</Button>
                    </CardContent>
                </Card>
            </div>
        )
    }

    return (
        <div className="flex items-center justify-center p-4 min-h-[50vh]">
            <Tabs defaultValue="signin" className="w-full max-w-md">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="signin">Sign In</TabsTrigger>
                    <TabsTrigger value="signup">Sign Up</TabsTrigger>
                </TabsList>

                <TabsContent value="signin">
                    <Card>
                        <CardHeader>
                            <CardTitle>Sign In</CardTitle>
                            <CardDescription>
                                Enter your email and password to access your account.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="signin-email">Email</Label>
                                <Input
                                    id="signin-email"
                                    type="email"
                                    placeholder="m@example.com"
                                    value={signInEmail}
                                    onChange={(e) => setSignInEmail(e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="signin-password">Password</Label>
                                <Input
                                    id="signin-password"
                                    type="password"
                                    value={signInPassword}
                                    onChange={(e) => setSignInPassword(e.target.value)}
                                />
                            </div>
                            {error && <div className="text-red-500 text-sm">{error}</div>}
                        </CardContent>
                        <CardFooter>
                            <Button className="w-full" onClick={signIn} disabled={loading}>
                                {loading ? 'Processing...' : 'Sign In'}
                            </Button>
                        </CardFooter>
                    </Card>
                </TabsContent>

                <TabsContent value="signup">
                    <Card>
                        <CardHeader>
                            <CardTitle>Sign Up</CardTitle>
                            <CardDescription>
                                Create a new account to get started.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="firstName">First Name</Label>
                                    <Input
                                        id="firstName"
                                        placeholder="John"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="lastName">Last Name</Label>
                                    <Input
                                        id="lastName"
                                        placeholder="Doe"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="signup-email">Email</Label>
                                <Input
                                    id="signup-email"
                                    type="email"
                                    placeholder="m@example.com"
                                    value={signUpEmail}
                                    onChange={(e) => setSignUpEmail(e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="signup-password">Password</Label>
                                <Input
                                    id="signup-password"
                                    type="password"
                                    value={signUpPassword}
                                    onChange={(e) => setSignUpPassword(e.target.value)}
                                />
                            </div>
                            {error && <div className="text-red-500 text-sm">{error}</div>}
                        </CardContent>
                        <CardFooter>
                            <Button className="w-full" onClick={signUp} disabled={loading}>
                                {loading ? 'Processing...' : 'Sign Up'}
                            </Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
