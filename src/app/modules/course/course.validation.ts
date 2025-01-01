import { z } from 'zod';

const preRequisiteCoursesvalidationSchema = z.object({
  course: z.string(),
  isDeleted: z.boolean().optional(),
});

const createCourseValidaion = z.object({
  body: z.object({
    title: z.string().min(2).max(100),
    prefix: z.string().min(2).max(100),
    code: z.number(),
    credits: z.number(),
    preRequisiteCourses: z
      .array(preRequisiteCoursesvalidationSchema)
      .optional(),
    isDeleted: z.boolean().optional(),
  }),
});
const updatePreRequisiteCoursesvalidationSchema = z.object({
  course: z.string(),
  isDeleted: z.boolean().optional(),
});

const updateCourseValidation = z.object({
  body: z.object({
    title: z.string().min(2).max(100).optional(),
    prefix: z.string().min(2).max(100).optional(),
    code: z.number().optional(),
    credits: z.number().optional(),
    preRequisiteCourses: z
      .array(updatePreRequisiteCoursesvalidationSchema)
      .optional(),
    isDeleted: z.boolean().optional(),
  }),
});


const assignFacultiesValidation = z.object({
    body: z.object({
        faculties:z.array(z.string())
    })
    
})


const FacultieswithCourseValidation = z.object({
    body: z.object({
        faculties:z.array(z.string())
    })
    
})
//const updateCourseValidation = createCourseValidaion.partial()
export const courseValidation = {
  createCourseValidaion,
  updateCourseValidation,
  assignFacultiesValidation,
  FacultieswithCourseValidation
};
