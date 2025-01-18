// Date 객체를 YYYY-MM-DD 형식으로 변환
export const formatDate = (date: Date | null) => {
  return date?.toISOString().split('T')[0] ?? null;
};

// YYYY-MM-DD 형식 문자열을 MM월 DD일 형식으로 변환
export const formatDateToMonthDay = (date: string) => {
  const formattedDate = date.slice(0, 10); // 날짜까지
  const [, month, day] = formattedDate.split('-');
  return `${parseInt(month, 10)}월 ${parseInt(day, 10)}일`;
};

// YYYY-MM-DD 형식 문자열을 YYYY-MM-DD (요일) 형식으로 변환
export const formatDateWithDayOfWeek = (date: Date | null) => {
  if (!date) return null;
  const days = ['일', '월', '화', '수', '목', '금', '토'];
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const dayOfWeek = days[date.getDay()];

  return `${year}-${month}-${day} (${dayOfWeek})`;
};
