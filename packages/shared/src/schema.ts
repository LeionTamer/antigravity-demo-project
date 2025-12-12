import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const scholars = pgTable('scholars', {
    id: serial('id').primaryKey(),
    created_date: timestamp('created_date').defaultNow().notNull(),
    updated_date: timestamp('updated_date').defaultNow().notNull(),
    name: text('name').notNull(),
    expertise: text('expertise').notNull(), // Markdown content
    writing_style: text('writing_style').notNull(), // Markdown content
});

export type SelectScholar = typeof scholars.$inferSelect;
export type InsertScholar = typeof scholars.$inferInsert;
