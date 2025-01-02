import mongoose, { Schema } from "mongoose";
import { TSemesterRegistation } from "./semesterRegistation.interface";

const semesterRegistationSchema = new Schema<TSemesterRegistation>({

})

export const semesterRegistation = mongoose.model<TSemesterRegistation>('semesterRegistation', semesterRegistationSchema);