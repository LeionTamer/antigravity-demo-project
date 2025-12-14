
async function main() {
    try {
        console.log('Checking /api/debug-config...');
        const configReq = await fetch('http://localhost:3000/api/debug-config');
        if (configReq.ok) {
            console.log('Config:', await configReq.json());
        } else {
            console.log('Config request failed:', configReq.status);
        }

        console.log('Checking /api/db-check...');
        const dbReq = await fetch('http://localhost:3000/api/db-check');
        if (dbReq.ok) {
            console.log('DB Check:', await dbReq.json());
        } else {
            console.log('DB Check request failed:', dbReq.status);
        }

    } catch (e) {
        console.error('Network error:', e);
    }
}

main();
