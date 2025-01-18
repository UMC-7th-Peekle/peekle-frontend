export const formatDate = (date?: Date | null): string => {
  const targetDate = date || new Date();
  const year = targetDate.getFullYear();
  const month = String(targetDate.getMonth() + 1).padStart(2, '0');
  const day = String(targetDate.getDate()).padStart(2, '0');
  const weekDays = ['일', '월', '화', '수', '목', '금', '토'];
  const weekDay = weekDays[targetDate.getDay()];
  return `${year}-${month}-${day} (${weekDay})`;
};
