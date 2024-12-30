import { academicSemesterNameCodeMapper } from './academicSemester.const';
import { TAcademicSemester } from './academicSemester.interface';
import { academicSemesterModel } from './academicSemester.model';

const createAcademicSemesterintoDb = async (payload: TAcademicSemester) => {
  // semester name --> semester code

  if (academicSemesterNameCodeMapper[payload.name] !== payload.code) {
    throw new Error('your semester name and code dosent matched');
  }

  const result = await academicSemesterModel.create(payload);
  return result;
};
const getAcademicSemesterIntoDb = async () => {
  const result = await academicSemesterModel.find();
  return result;
};

const getSingleAcademicSemesterIntoDb = async (id: string) => {
  const result = await academicSemesterModel.findById(id);
  return result;
};

const updateSingleAcademicSemesterIntoDb = async (
  id: string,
  payload: Partial<TAcademicSemester>,
) => {
  if (
    payload.name &&
    payload.code &&
    academicSemesterNameCodeMapper[payload.name] !== payload.code
  ) {
    throw new Error('invalid semester code');
  }
  const result = await academicSemesterModel.findByIdAndUpdate(
    { _id: id },
    payload,
    { new: true },
  );
  return result;
};
export const academicSemesterServices = {
  createAcademicSemesterintoDb,
  getAcademicSemesterIntoDb,
  getSingleAcademicSemesterIntoDb,
  updateSingleAcademicSemesterIntoDb,
};
