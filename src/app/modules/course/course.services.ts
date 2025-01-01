
import QueryBuilder from "../../builder/quearyBuilder";
import { searchAbleFields } from "./course.const";
import { TCourse } from "./course.interface";
import { course } from "./course.model"

const createCourseIntoDb = async(payload:TCourse)=>{
    const result =await course.create(payload);
    return result
}

const getAllCourseFromDb = async(query:Record<string,unknown>)=>{
    const courseQuary = new QueryBuilder(course.find().populate('preRequisiteCourses.course'),query).search(searchAbleFields).filter().sort().paginate().fields()
    const result = await courseQuary.modelQuery
    return result
}

const getSingleCourseFromDb = async(id:string)=>{
    const result = await course.findById(id).populate('preRequisiteCourses.course');
    return result   
}
const deleteCourseFromDb = async(id:string)=>{
  const result = await course.findByIdAndDelete(id,
    {isDeleted:true}
    )
   return result

}
export const courseService = {
    createCourseIntoDb,
    getAllCourseFromDb,
    getSingleCourseFromDb,
    deleteCourseFromDb
}