import { StatusCodes } from "http-status-codes";
import { catchAsync } from "../../../utils/catchAsync";
import sendResponse from "../../../utils/sendResponse";
import { AcademicFacultyServices } from "./academicFaculty.services";

const createAcademicFaculty = catchAsync(async(req,res)=>{ 
const result =await AcademicFacultyServices.createAcademicFacultyIntoDb(req.body);
sendResponse(res,{
    statusCode:StatusCodes.OK,
    sucess:true,
    message:"academic faculty created Sucessfully",
    data:result
})
})

const getAllAcademicFaculty = catchAsync(async(req,res)=>{
    const result = await AcademicFacultyServices.getAllAcademicFacultiesFromDb();
    sendResponse(res,{
        statusCode:StatusCodes.OK,
        sucess:true,
        message:"academic faculty retrived sucessfully",
        data:result
    })
})

const getSingleAcademicFaculty = catchAsync(async(req,res)=>{
    const {id}=req.params
    const result = await AcademicFacultyServices.getSingleAcademicFacultyFromDb(id)
    sendResponse(res,{
        statusCode:StatusCodes.OK,
        sucess:true,
        message:"single academic faculty retrived sucessfully",
        data:result
    })
})

const updateAcademicFaculty = catchAsync(async(req,res)=>{
    const {id}=req.params;
    const payload = req.body;
    const result = await AcademicFacultyServices.updatSingleAcademicFacultyFromDb(id,payload)
    sendResponse(res,{
        statusCode:StatusCodes.OK,
        sucess:true,
        message:"update single academic faculty ",
        data:result,
    })
})
export const academicFacultyController ={
    createAcademicFaculty,
    getAllAcademicFaculty,
    getSingleAcademicFaculty,
    updateAcademicFaculty
}