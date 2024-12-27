import { TAcademicSemester } from "./academicSemester.interface";
import { academicSemesterModel } from "./academicSemester.model";

const createAcademicSemesterintoDb =async(payload:TAcademicSemester)=>{
    const result =await academicSemesterModel.create(payload);
    return result
}

export const academicSemesterServices = {
    createAcademicSemesterintoDb
}