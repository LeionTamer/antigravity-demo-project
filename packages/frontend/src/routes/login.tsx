import { useState } from 'react';
import { authClient } from '../lib/auth-client';
import { createFileRoute } from '@tanstack/react-router';

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
        <div className="p-4 max-w-md mx-auto">
            <h1 className="text-2xl font-bold mb-4">Login / Sign Up</h1>
            <div className="flex flex-col gap-4">
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border p-2 rounded"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border p-2 rounded"
                />
                {error && <div className="text-red-500">{error}</div>}
                <div className="flex gap-2">
                    <button
                        onClick={signIn}
                        disabled={loading}
                        className="bg-blue-500 text-white p-2 rounded flex-1 hover:bg-blue-600 disabled:opacity-50"
                    >
                        {loading ? 'Processing...' : 'Sign In'}
                    </button>
                    <button
                        onClick={signUp}
                        disabled={loading}
                        className="bg-green-500 text-white p-2 rounded flex-1 hover:bg-green-600 disabled:opacity-50"
                    >
                        {loading ? 'Processing...' : 'Sign Up'}
                    </button>
                </div>
            </div>
        </div>
    );
}
