import { isSameDay as isSameDayFn } from 'date-fns';

const isSameDay = (date1: Date | null, date2: Date | null): boolean => {
  if (!date1 || !date2) return false;
  return isSameDayFn(date1, date2);
};

export default isSameDay;
