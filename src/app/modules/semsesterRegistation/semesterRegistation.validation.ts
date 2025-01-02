import { z } from 'zod';
import { semesterRegistationStatus } from './semesterRegistation.constant';

const createSemesterRegistationValidation = z.object({
  body: z.object({

    academicSemester: z.string(),
    status: z.enum([...semesterRegistationStatus as [string,...string[]]]),
    startDate:z.string().datetime(),
    endDate:z.string().datetime(),
    minCredit:z.number(),
    maxCredit:z.number(),
  }),
});

export const semesterRegistationValidation = {
  createSemesterRegistationValidation,
};
