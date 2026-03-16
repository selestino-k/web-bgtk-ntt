import { relations } from 'drizzle-orm';
import {
  pgTable,
  pgEnum,
  varchar,
  text,
  boolean,
  timestamp,
  json,
  integer,
  uuid,
  index,
  primaryKey,
  bigint,
  bigserial,
} from 'drizzle-orm/pg-core';

// Enums
export const roleEnum = pgEnum('role', ['Admin', 'Operator']);
export const tagTypeEnum = pgEnum('tag_type', ['CATEGORY', 'ANNOUNCEMENT']);

// Tables
export const user = pgTable(
  'user',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    email: varchar('email', { length: 255 }).notNull().unique(),
    name: varchar('name').notNull(),
    password: varchar('password').notNull(),
    role: roleEnum('role').notNull(),
    createdAt: timestamp('created_at', { withTimezone: true, mode: 'date' })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true, mode: 'date' })
      .notNull()
      .$onUpdate(() => new Date()),
  }
);

export const post = pgTable(
  'post',
  {
    id: bigint('id', { mode: 'number' }).primaryKey(),
    title: varchar('title', { length: 500 }).notNull(),
    slug: varchar('slug', { length: 500 }).notNull().unique(),
    content: json('content').notNull(),
    thumbnail: varchar('thumbnail', { length: 500 }),
    document: varchar('document', { length: 500 }),
    published: boolean('published').notNull().default(false),
    createdAt: timestamp('created_at', { withTimezone: true, mode: 'date' })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true, mode: 'date' })
      .notNull()
      .$onUpdate(() => new Date()),
    authorId: uuid('author_id')
      .notNull()
      .references(() => user.id, { onDelete: 'cascade' }),
  },
  (table) => [
    index('post_published_created_at_idx').on(table.published, table.createdAt),
    index('post_slug_idx').on(table.slug),
  ]
);

export const tag = pgTable(
  'tag',
  {
    id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
    name: varchar('name', { length: 100 }).notNull().unique(),
    slug: varchar('slug', { length: 100 }).notNull().unique(),
    type: tagTypeEnum('type').notNull().default('CATEGORY'),
    createdAt: timestamp('created_at', { withTimezone: true, mode: 'date' })
      .notNull()
      .defaultNow(),
  }
);

export const postTag = pgTable(
  'post_tag',
  {
    postId: bigint('post_id', { mode: 'number' })
      .notNull()
      .references(() => post.id, { onDelete: 'cascade' }),
    tagId: integer('tag_id')
      .notNull()
      .references(() => tag.id, { onDelete: 'cascade' }),
    assignedAt: timestamp('assigned_at', { withTimezone: true, mode: 'date' })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    primaryKey({ columns: [table.postId, table.tagId] }),
    index('post_tag_post_id_idx').on(table.postId),
    index('post_tag_tag_id_idx').on(table.tagId),
  ]
);

export const carouselPhoto = pgTable('carousel_photo', {
  id: bigserial('id', { mode: 'number' }).primaryKey(),
  imageUrl: varchar('imageUrl', { length: 500 }).notNull(),
  caption: varchar('caption', { length: 255 }),
  order: integer('order').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true, mode: 'date' }).defaultNow(),
});

export const document = pgTable(
  'document',
  {
    id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
    title: varchar('title', { length: 500 }).notNull(),
    description: text('description'),
    category: varchar('category'),
    fileUrl: varchar('file_url', { length: 500 }).notNull(),
    fileName: varchar('file_name', { length: 255 }).notNull(),
    fileSize: integer('file_size').notNull(),
    fileType: varchar('file_type', { length: 100 }).notNull(),
    createdAt: timestamp('created_at', { withTimezone: true, mode: 'date' })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true, mode: 'date' })
      .notNull()
      .$onUpdate(() => new Date()),
  }
);

// Relations (using Drizzle's relations API)
export const userRelations = relations(user, ({ many }) => ({
  posts: many(post),
}));

export const postRelations = relations(post, ({ one, many }) => ({
  author: one(user, {
    fields: [post.authorId],
    references: [user.id],
  }),
  tags: many(postTag),
}));

export const tagRelations = relations(tag, ({ many }) => ({
  posts: many(postTag),
}));

export const postTagRelations = relations(postTag, ({ one }) => ({
  post: one(post, {
    fields: [postTag.postId],
    references: [post.id],
  }),
  tag: one(tag, {
    fields: [postTag.tagId],
    references: [tag.id],
  }),
}));