# UI Development Guidelines

## Core Concept
We are using **Shadcn UI** as our primary design system. 

## Rules
1.  **Prefer Shadcn Components**: Whenever a new UI element is needed (e.g., buttons, inputs, dialogs, sheets, menus), you **MUST** check if a Shadcn component exists for it.
2.  **Do Not Reinvent the Wheel**: Avoid creating custom CSS or ad-hoc React components if a Shadcn equivalent is available.
3.  **Consistency**: Using the provided components ensures consistent styling, accessibility, and behavior across the application.
4.  **Installation**: If a component is not yet installed, use the CLI to add it:
    ```bash
    bunx --bun shadcn@latest add [component-name]
    ```

## Example
**Don't:**
```tsx
<button className="bg-red-500 text-white p-2 rounded">Delete</button>
```

**Do:**
```tsx
import { Button } from "@/components/ui/button"

<Button variant="destructive">Delete</Button>
```
