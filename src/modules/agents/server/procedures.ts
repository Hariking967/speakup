import { createTRPCRouter, baseProcedure, protectedProcedure } from "@/trpc/init";
import { db } from "@/db";
import { agents } from "@/db/schema";
import { TRPCError } from "@trpc/server";
import { agentsInsertSchema } from "../schema";
import {z} from 'zod';
import { eq, and, ilike, sql, getTableColumns, desc, count } from 'drizzle-orm';
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE, MAX_PAGE_SIZE, MIN_PAGE_SIZE } from "@/constants";

export const agentsRouter = createTRPCRouter({
    getMany: protectedProcedure
        .input(z.object({
            page: z.number()
                .default(DEFAULT_PAGE),
            pageSize: z.number()
                .min(MIN_PAGE_SIZE)
                .max(MAX_PAGE_SIZE)
                .default(DEFAULT_PAGE_SIZE),
            search: z.string()
                .nullish()
        }))
        .query(async ({ctx, input}) => {
            const { search, page, pageSize } = input;
            const data = await db.select({
                                    meetingCount: sql<number>`5`,
                                    ...getTableColumns(agents)
                                        })
                                    .from(agents)
                                .where(
                                    and(
                                        eq(agents.userId, ctx.auth.user.id),
                                        search ? ilike(agents.name, `%${search}%`): undefined)
                                )
                                .orderBy(desc(agents.createdAt), desc(agents.id))
                                .limit(pageSize)
                                .offset((page - 1)*pageSize);
            
            const [total] = await db
                                .select({count: count()})
                                .from(agents)
                                .where(
                                    and(
                                        eq(agents.userId, ctx.auth.user.id),
                                        search ? ilike(agents.name, `%${search}%`): undefined)
                                );
            const totalPages = Math.ceil(total.count / pageSize);

            // throw new TRPCError({code: "BAD_REQUEST"})
            return {
                items: data,
                total: total.count,
                totalPages: totalPages
            };
    }),
    getOne: protectedProcedure.input(z.object({id: z.string()})).query(async ({input}) => {
        const [thisAgent] = await db.select().from(agents).where(eq(agents.id, input.id));
        // throw new TRPCError({code: "BAD_REQUEST"})
        return thisAgent;
    }),
    create: protectedProcedure
        .input(agentsInsertSchema)
        .mutation( async ({input, ctx}) => {
            const [newAgent] = await db.insert(agents).values({...input, userId: ctx.auth.user.id}).returning();
            return newAgent;
        })
});