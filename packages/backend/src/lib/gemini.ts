import { chat } from "@tanstack/ai"
import { geminiText, GeminiTextModel } from "@tanstack/ai-gemini";

export function basic_llm(system_prompt: string, user_prompt: string, model: GeminiTextModel = "gemini-2.5-flash-lite") {
    const stream = chat({
        adapter: geminiText(model),
        messages: [
            {
                role: "user",
                content: user_prompt
            }
        ],
        systemPrompts: [system_prompt],
        stream: false
    })
    return stream
}