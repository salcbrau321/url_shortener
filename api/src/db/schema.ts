import { pgTable, serial, text, timestamp, varchar } from 'drizzle-orm/pg-core';

export const links = pgTable('links', {
    id: serial('id').primaryKey(),
    shortCode: varchar('short_code', { length: 10 }).notNull().unique(),
    originalUrl: text('original_url').notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull()
});


