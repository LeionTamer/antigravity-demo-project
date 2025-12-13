import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "../db";
import * as schema from "shared";


export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "pg",
        schema: schema,
    }),
    user: {
        additionalFields: {
            role: {
                type: "string",
                required: false,
                defaultValue: "USER",
                input: false
            },
            firstName: {
                type: "string",
                required: true
            },
            lastName: {
                type: "string",
                required: true
            }
        },
        changeEmail: {
            enabled: true,
        },
    },
    emailAndPassword: {
        enabled: true
    },
    trustedOrigins: ["http://localhost:5173", "http://localhost:3000"]
});

