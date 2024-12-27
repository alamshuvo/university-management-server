import {  z } from "zod";
import { academicSemesterCode, academicSemesterName, months } from "./academicSemester.const";

const createAcademicSemestarValidationSchema = z.object({
  body:z.object({
    name:z.enum([...academicSemesterName]as [string,...string[]]),
    year:z.string(),
    code:z.enum([...academicSemesterCode]as [string,...string[]]),
    startMonth:z.enum([...months]as[string,...string[]]),
    endMonth:z.enum([...months]as [string,...string[]])

  })
})
export const AcademicsemesterValidation = {
    createAcademicSemestarValidationSchema
}