import { z } from 'zod';
import { Days } from './offeredCourse.constant';

const timeStringSchema = z.string().refine(
  (time) => {
    const regex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;

    return regex.test(time);
  },
  {
    message: "Invalid time format,expected 'HH: MM'",
  },
);

const createOfferedCourseValidation = z.object({
  body: z
    .object({
      semesterRegistration: z.string(),
      academicFaculty: z.string(),
      academicDepertment: z.string(),
      course: z.string(),
      faculty: z.string(),
      section: z.number(),
      maxCapacity: z.number(),
      days: z.array(z.enum([...Days] as [string, ...string[]])),
      startTime: timeStringSchema,
      endTime: timeStringSchema,
    })
    .refine(
      (body) => {
        const start = new Date(`1970-01-01T${body.startTime}:00`);
        const end = new Date(`1970-01-01T${body.endTime}:00`);
        return end > start;
      },
      {
        message: `start time should  be before end time`,
      },
    ),
});

const updateOfferedCourseValidation = z.object({
  body: z
    .object({
      faculty: z.string(),
      maxCapacity: z.number(),
      days: z.array(z.enum([...Days] as [string, ...string[]])),
      startTime: timeStringSchema,
      endTime: timeStringSchema,
    })
    .refine(
      (body) => {
        const start = new Date(`1970-01-01T${body.startTime}:00`);
        const end = new Date(`1970-01-01T${body.endTime}:00`);
        return end > start;
      },
      {
        message: `start time should  be before end time`,
      },
    ),
});

export const offeredCourseValidation = {
  createOfferedCourseValidation,
  updateOfferedCourseValidation,
};
