
import { z } from "zod";

const preRequisiteCoursesvalidationSchema = z.object({
    course:z.string(),
    isDeleted:z.boolean().optional()
})


const createCourseValidaion = z.object({
    body:z.object({
        title:z.string().min(3).max(100),   
        prefix:z.string().min(3).max(100),
        code:z.number(),
        credits:z.number(),
        preRequisiteCourses:z.array(preRequisiteCoursesvalidationSchema).optional()
    })
})


export const courseValidation = {
    createCourseValidaion,
}