import { TSchedule } from './offeredCourse.interface';

export const hasTimeConflict = (
  assignedSchedulues: TSchedule[],
  newSchedule: TSchedule,
) => {
  for (let i = 0; i < assignedSchedulues.length; i++) {
    const schedule = assignedSchedulues[i];

    const existingStartTime = new Date(`1970-01-01T${schedule.startTime}`);
    const existingEndTime = new Date(`1970-01-01T${schedule.endTime}`);
    const newStartingTime = new Date(`1970-01-01T${newSchedule.startTime}`);
    const newEndTime = new Date(`1970-01-01T${newSchedule.endTime}`);

    if (newStartingTime < existingEndTime && newEndTime > existingStartTime) {
      return true;
    }
  }
  return false;
};
