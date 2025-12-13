
import { db } from "../db";
import { user, session, account } from "shared";

async function clear() {
    console.log("Clearing sessions...");
    await db.delete(session);
    console.log("Clearing accounts...");
    await db.delete(account);
    console.log("Clearing users...");
    await db.delete(user);
    console.log("Done!");
    process.exit(0);
}

clear().catch((err) => {
    console.error(err);
    process.exit(1);
});
