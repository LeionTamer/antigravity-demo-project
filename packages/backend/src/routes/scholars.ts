import { Elysia, t } from 'elysia';
import { db } from '../db';
import { scholars } from 'shared';
import { eq } from 'drizzle-orm';

export const scholarsRouter = new Elysia({ prefix: '/api/scholars' })
    .get('/', async () => {
        const allScholars = await db.select().from(scholars);
        return allScholars;
    })
    .get('/:id', async ({ params: { id } }) => {
        const result = await db.select().from(scholars).where(eq(scholars.id, parseInt(id)));
        if (result.length === 0) {
            throw new Error('Scholar not found');
        }
        return result[0];
    }, {
        params: t.Object({
            id: t.String()
        })
    })
    .post('/', async ({ body }) => {
        const [newScholar] = await db.insert(scholars).values({
            name: body.name,
            expertise: body.expertise,
            writing_style: body.writing_style,
        }).returning();
        return newScholar;
    }, {
        body: t.Object({
            name: t.String(),
            expertise: t.String(),
            writing_style: t.String(),
        })
    })
    .put('/:id', async ({ params: { id }, body }) => {
        const [updatedScholar] = await db.update(scholars)
            .set({
                name: body.name,
                expertise: body.expertise,
                writing_style: body.writing_style,
                updated_date: new Date()
            })
            .where(eq(scholars.id, parseInt(id)))
            .returning();
        return updatedScholar;
    }, {
        params: t.Object({
            id: t.String()
        }),
        body: t.Object({
            name: t.String(),
            expertise: t.String(),
            writing_style: t.String(),
        })
    })
    .delete('/:id', async ({ params: { id } }) => {
        await db.delete(scholars).where(eq(scholars.id, parseInt(id)));
        return { success: true };
    }, {
        params: t.Object({
            id: t.String()
        })
    });
