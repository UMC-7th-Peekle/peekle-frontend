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
  if (seconds && seconds.endsWith('Z')) {
    return `${hours}:${minutes}:${seconds}`;
  }
  const secondsZ = seconds ? `${seconds}Z` : '00Z';
  return `${hours}:${minutes}:${secondsZ}`;
};
