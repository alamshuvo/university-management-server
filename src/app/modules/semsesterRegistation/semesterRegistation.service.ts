import { StatusCodes } from "http-status-codes"
import AppError from "../../errors/AppError"
import { academicSemesterModel } from "../academicSemester/academicSemester.model"
import { TSemesterRegistation } from "./semesterRegistation.interface"
import { semesterRegistation } from "./semesterRegistation.model"
import QueryBuilder from "../../builder/quearyBuilder"
import { searchAbleFeilds } from "./semesterRegistation.constant"

const createSemesterRegistataionIntoDb = async(payload:TSemesterRegistation)=>{
  // check if the semester is exist
  const academicSemester= payload?.academicSemester


  // check if there any registerd semester that is already "UPCOMING" or "ONGOING"
  const isThereAnyUpcomingOrOngoingSemester = await semesterRegistation.findOne({$or:[{status:'UPCOMING'},{status:'ONGOING'}]})

  if(isThereAnyUpcomingOrOngoingSemester){
    throw new AppError(StatusCodes.BAD_REQUEST,`There is already a semester that is ${isThereAnyUpcomingOrOngoingSemester.status}`);
  }


  const isAcademicSemesterExist = await academicSemesterModel.findById(academicSemester) 
  if(!isAcademicSemesterExist){
   throw new AppError(StatusCodes.NOT_FOUND,'Academic Semester not found');
  }


  const isSemesterRegestationExist =  await semesterRegistation.findOne({academicSemester})

  
 if(isSemesterRegestationExist){
    throw new AppError(StatusCodes.CONFLICT,'Semester Registation is already exist');
 }

  const result = await semesterRegistation.create(payload);
  return result
}

const getAllSemsesterRegistation = async(payload:Record<string,unknown>)=>{
 const semesterRegistationQuery = new QueryBuilder(semesterRegistation.find().populate('academicSemester'),payload).search(searchAbleFeilds).filter().sort().paginate().fields();
 const result = await semesterRegistationQuery.modelQuery;
 return result
}

const getSingleSemsesterRegistation = async(id:string)=>{
   
    const result = await semesterRegistation.findById(id).populate('academicSemester');
    return result
   }


const updateSemesterRegistation = async(id:string,payload:Partial<TSemesterRegistation>)=>{
//check if the requested semester is exist
const isSemesterRegestationExist = await semesterRegistation.findById(id);
if(!isSemesterRegestationExist){
  throw new AppError(StatusCodes.NOT_FOUND,'Semester is  not found');
}



 // j data k update korte cai sei data jodi endend hoyea jai tahole se data k update korte dibo na 
 const requestedSemesterStatus =isSemesterRegestationExist.status
 if (requestedSemesterStatus==='ENDED'){
   throw new AppError(StatusCodes.BAD_REQUEST,`Semester is already ended ${requestedSemesterStatus}`);  
 }

}

export const SemesterRegistationService ={
    createSemesterRegistataionIntoDb,
    getAllSemsesterRegistation,
    getSingleSemsesterRegistation,
    updateSemesterRegistation,
}