import { createTRPCRouter, baseProcedure, protectedProcedure } from "@/trpc/init";
import { db } from "@/db";
import { agents } from "@/db/schema";
import { TRPCError } from "@trpc/server";
import { agentsInsertSchema } from "../schema";
import {z} from 'zod';
import {eq} from 'drizzle-orm';

export const agentsRouter = createTRPCRouter({
    getMany: protectedProcedure.query(async () => {
        const data = await db.select().from(agents);
        // throw new TRPCError({code: "BAD_REQUEST"})
        return data;
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