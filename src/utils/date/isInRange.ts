export const isInRange = (
  date: Date | null,
  start: Date | null,
  end: Date | null,
): boolean => {
  if (!date || !start || !end) return false;
  return date.getTime() > start.getTime() && date.getTime() < end.getTime();
};
