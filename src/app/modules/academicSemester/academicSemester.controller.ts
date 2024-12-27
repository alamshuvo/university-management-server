import { StatusCodes } from "http-status-codes";
import { catchAsync } from "../../../utils/catchAsync";
import sendResponse from "../../../utils/sendResponse";
import { academicSemesterServices } from "./academicSemester.service";

const createAcademicSemester = catchAsync(async(req,res)=>{

const result = await academicSemesterServices.createAcademicSemesterintoDb(req.body)


    sendResponse(res,{
        statusCode:StatusCodes.OK,
        sucess:true,
        message:"academic Semester created Sucessfully",
        data:result
    })
})

export const academicSemesterController = {
    createAcademicSemester
}