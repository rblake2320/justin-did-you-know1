import { z } from "zod";
import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { getAllFacts, getDailyFact, getFactById, getRandomFact, getFactCount } from "./db";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),

  facts: router({
    /** Returns the deterministic daily fact (changes each calendar day) */
    daily: publicProcedure.query(async () => {
      const fact = await getDailyFact();
      return fact ?? null;
    }),

    /** Returns a random fact, optionally excluding one by id */
    random: publicProcedure
      .input(z.object({ excludeId: z.number().optional() }))
      .query(async ({ input }) => {
        const fact = await getRandomFact(input.excludeId);
        return fact ?? null;
      }),

    /** Returns all facts ordered by displayOrder */
    list: publicProcedure.query(async () => {
      return getAllFacts();
    }),

    /** Returns a single fact by id */
    byId: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        const fact = await getFactById(input.id);
        return fact ?? null;
      }),

    /** Returns total count of facts in the database */
    count: publicProcedure.query(async () => {
      return getFactCount();
    }),
  }),
});

export type AppRouter = typeof appRouter;
