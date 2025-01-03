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

const updateSemesterRegistationValidation = z.object({
  body: z.object({

    academicSemester: z.string().optional(),
    status: z.enum([...semesterRegistationStatus as [string,...string[]]]).optional(),
    startDate:z.string().datetime().optional(),
    endDate:z.string().datetime().optional(),
    minCredit:z.number().optional(),
    maxCredit:z.number().optional(),
  }),
});

export const semesterRegistationValidation = {
  createSemesterRegistationValidation,
  updateSemesterRegistationValidation
};
