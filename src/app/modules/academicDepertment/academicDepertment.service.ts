import TAcademicDepertment from './academicDepertment.interface';
import { AcademicDepertment } from './academicDepertment.model';


const createAcademicDepertmentIntoDb = async (payload: TAcademicDepertment) => {
  //   const isDepertmentExist = await academicDepertment.findOne({
  //     name: payload.name,
  //   });
  //   if (isDepertmentExist) {
  //     throw new Error('This depertment already exist!');
  //   }

  const result = await AcademicDepertment.create(payload);
  return result;
};
const getAllAcademicDepertmentFromDb = async () => {
  const result = await AcademicDepertment.find().populate('academicFaculties');
  return result;
};
const getSingleAcademicDepertmentFromDb = async (id: string) => {
  const result = await AcademicDepertment
    .findById(id)
    .populate('academicFaculties');
  return result;
};

const updatSingleAcademicDepertmentFromDb = async (
  id: string,
  payload: TAcademicDepertment,
) => {
  const result = await AcademicDepertment.findOneAndUpdate(
    { _id: id },
    payload,
    { new: true },
  );
  return result;
};

export const AcademicDepertmentServices = {
  createAcademicDepertmentIntoDb,
  getAllAcademicDepertmentFromDb,
  getSingleAcademicDepertmentFromDb,
  updatSingleAcademicDepertmentFromDb,
};
