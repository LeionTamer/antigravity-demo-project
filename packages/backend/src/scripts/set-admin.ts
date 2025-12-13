
import { db } from "../db";
import { user } from "shared";
import { eq } from "drizzle-orm";

const email = process.argv[2] || "leoncarbonell@gmail.com";

async function setAdmin() {
    console.log(`Setting role to ADMIN for user with email: ${email}`);

    const result = await db.update(user)
        .set({ role: "ADMIN" })
        .where(eq(user.email, email))
        .returning();

    if (result.length > 0) {
        console.log("Success! Updated user:", result[0]);
    } else {
        console.log("User not found.");
    }
    process.exit(0);
}

setAdmin().catch((err) => {
    console.error(err);
    process.exit(1);
});
