import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const user_reviews = sqliteTable('user_reviews' , {
    user_email_id: text('user_email_id').notNull(), 
    user_name: text('user_name').notNull(), 
    review: text('review').notNull(), 
    liked: integer('liked').notNull(), 
    area_name: text('area_name').notNull(),
})