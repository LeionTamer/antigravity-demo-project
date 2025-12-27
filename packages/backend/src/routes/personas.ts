import { Elysia } from 'elysia';
import { db } from '../db';
import { persona } from 'shared';

import { eq } from 'drizzle-orm';

export const personasRoute = new Elysia({ prefix: '/api/personas' })
    .get('/', async () => {
        return await db.select().from(persona);
    })
    .post('/', async ({ body }) => {
        const { name, writingStyle, expertise } = body as { name: string, writingStyle: string, expertise: string };
        return await db.insert(persona).values({
            name,
            writingStyle,
            expertise,
        }).returning();
    })
    .put('/:id', async ({ params: { id }, body }) => {
        const { name, writingStyle, expertise } = body as { name: string, writingStyle: string, expertise: string };
        return await db.update(persona).set({
            name,
            writingStyle,
            expertise,
            updatedAt: new Date(),
        }).where(eq(persona.id, id)).returning();
    })
    .delete('/:id', async ({ params: { id } }) => {
        return await db.delete(persona).where(eq(persona.id, id)).returning();
    });
