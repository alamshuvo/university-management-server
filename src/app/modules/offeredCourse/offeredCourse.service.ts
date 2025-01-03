import { StatusCodes } from "http-status-codes";
import AppError from "../../errors/AppError";
import { semesterRegistation } from "../semsesterRegistation/semesterRegistation.model";
import { TOfferedCourse } from "./offeredCourse.interface";
import { offeredCourse } from "./offeredCourse.model";
import { AcademicFaculty } from "../academicFaculty/academicFaculty.model";
import { AcademicDepertment } from "../academicDepertment/academicDepertment.model";
import { courseFaculty } from "../course/course.model";
import { Faculty } from "../faculty/faculty.model";


const createOfferedCourseIntoDb = async(payload:TOfferedCourse)=>{
// check if the semester registation is exist
const{semesterRegistration,academicFaculty,academicDepertment,course,faculty}=payload
const isSemesterRegistationExist = await semesterRegistation.findById(semesterRegistration);
if (!isSemesterRegistationExist) {
    throw new AppError(StatusCodes.NOT_FOUND,"Semester Registation not found ")
}

const academicSemester = isSemesterRegistationExist.academicSemester;
const isacademicFacultyExist = await AcademicFaculty.findById(academicFaculty);

if (!isacademicFacultyExist) {
    throw new AppError(StatusCodes.NOT_FOUND,"academicFaculty not found ")
}

const isacademicDepertmentExist = await AcademicDepertment.findById(academicDepertment);
if (!isacademicDepertmentExist) {
    throw new AppError(StatusCodes.NOT_FOUND,"academicDepertment not found ")
}
const iscourseExist = await courseFaculty.findById(course);
if (!iscourseExist) {
    throw new AppError(StatusCodes.NOT_FOUND,"course not found ")
}

const isfacultyExist = await Faculty.findById(faculty);
if (!isfacultyExist) {
    throw new AppError(StatusCodes.NOT_FOUND,"Faculty not found ")
}

// check if the depertment is belong to the faculty 

const isDepertmentBelongToFaclty = await AcademicDepertment.findOne({
      _id : academicDepertment,
      academicFaculties:academicFaculty
    }
);


if (!isDepertmentBelongToFaclty) {
    throw new AppError(StatusCodes.NOT_FOUND,`This ${isacademicDepertmentExist.name} is not belong to this ${isacademicFacultyExist.name} `)
}

//check if the same course same section in some registered semester exists 
const isSameOfferedCourseExistsWithSameRegisteredSemesterWithSameSeciton = await offeredCourse.findOne({semesterRegistration,course,section:payload.section});

if (isSameOfferedCourseExistsWithSameRegisteredSemesterWithSameSeciton) {
    throw new AppError(StatusCodes.CONFLICT,`This course ${(iscourseExist as any).title} with section ${payload.section} is already exists in this semester registation`)
}
const result  = await offeredCourse.create({...payload,academicSemester});
return result
}

const getAllOfferedCourseFromDb = async(query:Record<string,unknown>)=>{

}

const getSingleOfferedCourseFromDb = async(id:string)=>{

}

const updateOfferedCourseIntoDb = async(id:string,payload:Partial<TOfferedCourse>)=>{

}

export const offeredCourseServices = {
    createOfferedCourseIntoDb,
    getAllOfferedCourseFromDb,
    getSingleOfferedCourseFromDb,
    updateOfferedCourseIntoDb
}