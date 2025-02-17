import { EventSchedule } from '@/types/event';
import { formatTime } from './timeFormatter';
import { formatDateToMonthDay } from './dateFormatter';

// 행정구,자치구 추출
export const getDistrict = (address: string) => {
  return address.match(/(\S+)구/)?.[1] ?? '';
};

// 시작일시 추출
export const getStartDateTime = (schedule: EventSchedule) => {
  const { startDate, startTime } = schedule;

  const date = formatDateToMonthDay(startDate, true);
  const time = formatTime(startTime);

  return `${date} ${formatTime(time)}`;
};

// 스케줄 포맷팅
export const formatSchedules = (schedule: EventSchedule) => {
  const { repeatType, customText, startTime, endTime } = schedule;

  const repeatText =
    {
      none: `${customText} `,
      daily: '매일 ',
      weekly: '매주 ',
      monthly: '매달 ',
      yearly: '매년 ',
      custom: `${customText} `,
    }[repeatType] ?? '';

  return `${repeatText} ${formatTime(startTime)} ~ ${formatTime(endTime)}`;
};

// 지도 발풍선용 이벤트 제목 자르기
export const formatEventTitleForSB = (title: string, length: number) => {
  let count = 0;
  let result = '';

  for (const char of title) {
    result += char;
    if (char.trim() !== '') count++; // 공백 제외하고 글자만 카운트
    if (count >= length) return result + '...';
  }

  return result;
};
