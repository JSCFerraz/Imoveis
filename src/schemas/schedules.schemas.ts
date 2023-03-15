import { z } from "zod";

const scheduleSchema = z.object({
  date: z.string(),
  hour: z.string(),
  realEstateId: z.number().int().positive(),
});

const scheduleCreateSchema = scheduleSchema.extend({
  userId: z.number(),
});

const scheduleReturnSchema = scheduleCreateSchema.extend({
  id: z.number(),
});

const returnMultipleScheduleSchema = scheduleReturnSchema.array();

export {
  scheduleSchema,
  scheduleCreateSchema,
  scheduleReturnSchema,
  returnMultipleScheduleSchema,
};
