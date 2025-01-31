// 00:00:00 -> 오전/오후 00시
export const formatTime = (time: string) => {
  const [hour, minute] = time.split(':').map(Number);
  const period = hour < 12 ? '오전' : '오후';
  const formattedHour = hour % 12 || 12;
  return `${period} ${formattedHour}${minute > 0 ? `시 ${minute}분` : '시'}`;
};
