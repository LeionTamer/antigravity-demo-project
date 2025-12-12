import { db } from '../db';
import { scholars } from 'shared';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import { eq } from 'drizzle-orm';
// Note: We are using 'push' based workflow for now by running 'drizzle-kit push' before this, 
// or we can just try to insert and see if it works if the table exists.
// For this verification, we will assume the user (or we) runs `bun run drizzle-kit push` first.

async function verify() {
    console.log('Verifying Drizzle setup...');

    try {
        const newScholar = {
            name: 'Test Scholar',
            expertise: '# Markdown Expertise',
            writing_style: '# Markdown Style',
        };

        console.log('Inserting scholar...');
        const result = await db.insert(scholars).values(newScholar).returning();
        const insertedId = result[0].id; // Capture ID
        console.log('Inserted:', result);

        console.log('Querying scholars...');
        const allScholars = await db.select().from(scholars);
        console.log('All Scholars:', allScholars);

        console.log('Deleting scholar...');
        await db.delete(scholars).where(eq(scholars.id, insertedId));
        console.log('Deleted scholar with ID:', insertedId);

        console.log('Verifying deletion...');
        const afterDelete = await db.select().from(scholars).where(eq(scholars.id, insertedId));
        console.log('Scholars found after delete (should be 0):', afterDelete.length);

        process.exit(0);
    } catch (error) {
        console.error('Verification failed:', error);
        process.exit(1);
    }
}

verify();
