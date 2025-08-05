import { pgTable, uuid, varchar, text, integer } from 'drizzle-orm/pg-core';
import { users } from './user';

export const address = pgTable('address', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull().references(() => users.id),
  zip: varchar('zip', { length: 9 }).notNull(),
  streetAddress: text('street_address').notNull(),
  number: integer('address_number').notNull(),
  additionalInformation: varchar('additional_information', { length: 255 }),
  reference: varchar('reference', { length: 255 }),
  neighborhood: text('neighborhood').notNull(),
  city: varchar('city', { length: 100 }).notNull(),
  state: varchar('state', { length: 2 }).notNull(),
});
