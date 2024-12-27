import { TAcademicSemester } from "../academicSemester/academicSemester.interface"
import { userModel } from "./user.model"

const findLastStudentId = async ()=>{
    const lastStudent = await userModel.findOne({
        role:'student'
    },{
        id:1,
        _id:0
    }).sort({
        createdAt:-1
    }).lean()

    return lastStudent?.id ? lastStudent.id.substring(6) : undefined
}





export const generateStudentId =async (payload:TAcademicSemester)=>{
 const curentId = await findLastStudentId() || (0).toString()
console.log(curentId);

let incrementId = (Number(curentId)+1).toString().padStart(4,"0");
incrementId = `${payload.year}${payload.code}${incrementId}`;
return incrementId


}