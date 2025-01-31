// Date 객체를 YYYY-MM-DD 형식으로 변환
export const formatDate = (date: Date | null) => {
  if (!date) return null;
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// YYYY-MM-DD 형식 문자열을 MM월 DD일 (요일)-선택 형식으로 변환
export const formatDateToMonthDay = (
  dateString: string,
  withDayOfWeek?: boolean,
) => {
  const formattedDate = dateString.slice(0, 10); // 날짜까지
  const [, month, day] = formattedDate.split('-');
  if (withDayOfWeek) {
    const date = new Date(formattedDate); // 'YYYY-MM-DD' 형식을 Date 객체로 변환
    const dayOfWeek = date.toLocaleString('ko-KR', { weekday: 'short' }); // 요일 추출
    return `${parseInt(month, 10)}월 ${parseInt(day, 10)}일 (${dayOfWeek})`;
  }

  return `${parseInt(month, 10)}월 ${parseInt(day, 10)}일`;
};

// Date 객체를 YYYY-MM-DD (요일) 형식으로 변환
export const formatDateWithDayOfWeek = (date: Date | null) => {
  if (!date) return null;
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const dayOfWeek = date.toLocaleString('ko-KR', { weekday: 'short' });

  return `${year}-${month}-${day} (${dayOfWeek})`;
};

// YYYY-MM-DD 형식 문자열을 MM.DD 형식으로 변환
export const formatDateToShort = (dateString: string) => {
  const date = new Date(dateString);
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${month}.${day}`;
};
