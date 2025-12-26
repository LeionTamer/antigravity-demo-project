import { Elysia } from 'elysia';
import { cors } from '@elysiajs/cors';
import { queryClient as sql } from './db';

import { auth } from './lib/auth';


const app = new Elysia()
  .use(cors())
  .all("/api/auth/*", (ctx) => auth.handler(ctx.request))

  .get('/', () => 'Hello Elysia')
  .get('/api/hello', () => ({ message: 'Hello from Backend!' }))
  .get('/api/debug-config', () => ({ dbUrl: process.env.DATABASE_URL }))
  .get('/api/db-check', async () => {
    try {
      const result = await sql`SELECT NOW()`;
      return { message: 'Database connected!', time: result[0].now };
    } catch (error) {
      return { message: 'Database connection failed', error: String(error) };
    }
  })

  .listen(process.env.PORT || 3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
