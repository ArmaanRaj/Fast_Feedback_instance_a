import {sqliteTable, text } from "drizzle-orm/sqlite-core";
export const user_areas = sqliteTable('user_areas', {
    site_name:text('site_name').primaryKey(),
    site_url:text('site_url').notNull(), 
    user_name:text('user_name').notNull(), 
    user_id:text('user_id').notNull(),
    q1:text('q1').notNull(), 
    q2:text('q2').notNull(), 
    q3:text('q3').notNull(),
})