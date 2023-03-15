import { Repository } from "typeorm";
import { z } from "zod";
import { Schedule } from "../entities";
import {
  returnMultipleScheduleSchema,
  scheduleSchema,
  scheduleReturnSchema,
  scheduleCreateSchema,
} from "../schemas/schedules.schemas";

type TSchedule = z.infer<typeof scheduleSchema>;
type TScheduleCreate = z.infer<typeof scheduleCreateSchema>;
type TScheduleReturn = z.infer<typeof scheduleReturnSchema>;
type TScheduleRepo = Repository<Schedule>;
type TAllSchedulesReturn = z.infer<typeof returnMultipleScheduleSchema>;

export {
  TSchedule,
  TScheduleCreate,
  TScheduleReturn,
  TScheduleRepo,
  TAllSchedulesReturn,
};
