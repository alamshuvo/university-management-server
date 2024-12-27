import { model, Schema } from "mongoose";
import {  TAcademicSemester } from "./academicSemester.interface";
import { academicSemesterCode, academicSemesterName, months } from "./academicSemester.const";

  
 
  
const academicSemestarSchema = new Schema<TAcademicSemester>({
    name:{
        type:String,
        enum:academicSemesterName,
        required:true
    },
    year:{
        type:String,
        required:true
    },
    code:{
        type:String,
        enum:academicSemesterCode,
        required:true,
    },
    startMonth:{
        type:String,
        required:true,
        enum: months
    },
    endMonth:{
        type:String,
        required:true,
        enum:months
    }
})

academicSemestarSchema.pre("save",async function (next) {
    const isSemesterExist = await academicSemesterModel.findOne({
        name:this.name,
        year:this.year,
    })
    if (isSemesterExist) {
   throw new Error("Semester is already exist")        
    }
    next()
})



export const academicSemesterModel = model<TAcademicSemester>('AcademicSemester',academicSemestarSchema)
