import { Elysia } from 'elysia';
import { db } from '../db';
import { instructions } from 'shared';
import { eq } from 'drizzle-orm';

export const instructionsRoute = new Elysia({ prefix: '/api/instructions' })
    .get('/', async () => {
        return await db.select().from(instructions);
    })
    .post('/', async ({ body, set }) => {
        const { name, content } = body as { name: string, content: string };
        if (name.length > 20) {
            set.status = 400;
            return "Name must be 20 characters or less";
        }
        return await db.insert(instructions).values({
            name,
            content,
        }).returning();
    })
    .put('/:id', async ({ params: { id }, body, set }) => {
        const { name, content } = body as { name: string, content: string };
        if (name.length > 20) {
            set.status = 400;
            return "Name must be 20 characters or less";
        }
        return await db.update(instructions).set({
            name,
            content,
            updatedAt: new Date(),
        }).where(eq(instructions.id, id)).returning();
    })
    .delete('/:id', async ({ params: { id } }) => {
        return await db.delete(instructions).where(eq(instructions.id, id)).returning();
    });
