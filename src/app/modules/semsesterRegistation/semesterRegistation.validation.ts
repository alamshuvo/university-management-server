import { z } from "zod";

const createSemesterRegistationValidation = z.object({
    body:z.object({})
})


export const semesterRegistationValidation = {
    createSemesterRegistationValidation
}