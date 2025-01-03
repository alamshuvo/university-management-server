import { StatusCodes } from "http-status-codes";
import { catchAsync } from "../../../utils/catchAsync";
import sendResponse from "../../../utils/sendResponse";
import { offeredCourseServices } from "./offeredCourse.service";

const createOfferedCourse = catchAsync(async(req,res)=>{
    const result = await offeredCourseServices.createOfferedCourseIntoDb(req.body)
    sendResponse(res,{
        statusCode:StatusCodes.OK,
        sucess:true,
        message:"offered Course is created Sucessfully",
        data:result
    })
})
const getAllOfferedCourse = catchAsync(async(req,res)=>{
    const result = await offeredCourseServices.getAllOfferedCourseFromDb
    sendResponse(res,{
        statusCode:StatusCodes.OK,
        sucess:true,
        message:"offered Course is created Sucessfully",
        data:result
    })
})
const getSingleOfferedCourse = catchAsync(async(req,res)=>{
    //const result 
    // sendResponse(res,{
    //     statusCode:StatusCodes.OK,
    //     sucess:true,
    //     message:"offered Course is created Sucessfully",
    //     data:result
    // })
})
const updateOfferedCourse = catchAsync(async(req,res)=>{
    // const result 
    // sendResponse(res,{
    //     statusCode:StatusCodes.OK,
    //     sucess:true,
    //     message:"offered Course is created Sucessfully",
    //     data:result
    // })
})


export const offeredCourseControler = {
    createOfferedCourse,
    getAllOfferedCourse,
    getSingleOfferedCourse,
    updateOfferedCourse
}