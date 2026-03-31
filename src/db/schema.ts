export * from "./auth-schema";

import { relations } from "drizzle-orm";
import { pgTable, text, timestamp, uuid, index } from "drizzle-orm/pg-core";
import { user, session, account } from "./auth-schema";

export const trainingSession = pgTable(
  "training_session",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    name: text("name").notNull(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => [index("training_session_userId_idx").on(table.userId)],
);

export const userRelations = relations(user, ({ many }) => ({
  sessions: many(session),
  accounts: many(account),
  trainingSessions: many(trainingSession),
}));

export const exercise = pgTable(
  "exercise",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    name: text("name").notNull(),
    sessionId: uuid("session_id")
      .notNull()
      .references(() => trainingSession.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => [index("exercise_sessionId_idx").on(table.sessionId)],
);

export const trainingSessionRelations = relations(
  trainingSession,
  ({ one, many }) => ({
    user: one(user, {
      fields: [trainingSession.userId],
      references: [user.id],
    }),
    exercises: many(exercise),
  }),
);

export const exerciseRelations = relations(exercise, ({ one }) => ({
  trainingSession: one(trainingSession, {
    fields: [exercise.sessionId],
    references: [trainingSession.id],
  }),
}));
