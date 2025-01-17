// 월 일 형식으로 변환
export const formatDate = (date: string) => {
  const formattedDate = date.slice(0, 10); // 날짜까지
  const [, month, day] = formattedDate.split('-');
  return `${month}월 ${day}일`;
};
