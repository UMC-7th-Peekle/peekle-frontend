// 00:00:00 -> 오전/오후 00시
export const formatTime = (time: string) => {
  const [hour, minute] = time.split(':').map(Number);
  const period = hour < 12 ? '오전' : '오후';
  const formattedHour = hour % 12 || 12;
  return `${period} ${formattedHour}${minute > 0 ? `시 ${minute}분` : '시'}`;
};

// 시간 변환 함수 HH:mm -> HH:mm:ssZ
export const formatTimeToHHMMSSZ = (time: string): string => {
  const [hours, minutes, seconds] = time.split(':');
  const secondsZ = seconds ? `:${seconds}Z` : 'Z';
  return `${hours}:${minutes}${secondsZ}`;
};

// 시간 변환 함수 HH:mm:ssZ -> HH:mm
export const formatTimeFromHHMMSSZ = (time: string): string => {
  const [hours, minutes] = time.split(':');
  return `${hours}:${minutes}`;
};
