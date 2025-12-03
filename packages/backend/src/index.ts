import { Elysia } from 'elysia';
import { cors } from '@elysiajs/cors';
import postgres from 'postgres';

const sql = postgres(process.env.DATABASE_URL!);

const app = new Elysia()
  .use(cors())
  .get('/', () => 'Hello Elysia')
  .get('/api/hello', () => ({ message: 'Hello from Backend!' }))
  .get('/api/db-check', async () => {
    try {
      const result = await sql`SELECT NOW()`;
      return { message: 'Database connected!', time: result[0].now };
    } catch (error) {
      return { message: 'Database connection failed', error: String(error) };
    }
  })
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
