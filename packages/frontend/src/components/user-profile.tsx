import { authClient } from '../lib/auth-client';

export function UserProfile() {
    const { data: session } = authClient.useSession();

    if (!session) {
        return <div className="p-4">Not signed in</div>;
    }

    return (
        <div className="p-4 border rounded shadow-sm">
            <div className="flex items-center gap-4">
                {session.user.image && (
                    <img src={session.user.image} alt={session.user.name} className="w-10 h-10 rounded-full" />
                )}
                <div>
                    <p className="font-semibold">{session.user.name}</p>
                    <p className="text-sm text-gray-500">{session.user.email}</p>
                </div>
                <button
                    onClick={() => authClient.signOut()}
                    className="ml-auto bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                    Sign Out
                </button>
            </div>
        </div>
    );
}
