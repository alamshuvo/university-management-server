import { Types } from 'mongoose';
type TAcademicDepertment = {
  name: String;
  academicFaculties: Types.ObjectId;
};
export default TAcademicDepertment;
