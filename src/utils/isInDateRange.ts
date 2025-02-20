import { isWithinInterval } from 'date-fns';

const isInRange = (
  date: Date | null,
  start: Date | null,
  end: Date | null,
): boolean => {
  if (!date || !start || !end) return false;
  return isWithinInterval(date, { start, end });
};

export default isInRange;
