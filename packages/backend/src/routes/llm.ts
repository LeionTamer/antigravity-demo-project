import { Elysia } from 'elysia';
import { basic_llm } from '../lib/gemini';

export const llmRoute = new Elysia({ prefix: '/api/llm' })
    .post('/test', async ({ body }) => {
        const { system_prompt, user_prompt, model } = body as { system_prompt: string, user_prompt: string, model?: any };

        try {
            const result = await basic_llm(system_prompt || "You are a helpful assistant.", user_prompt, model);
            return { text: result };
        } catch (error) {
            console.error("LLM Error:", error);
            return { error: String(error) };
        }
    });
