import {
  format,
  differenceInMinutes,
  differenceInHours,
  differenceInDays,
  isSameYear,
  parseISO,
} from 'date-fns';
import { ko } from 'date-fns/locale';

// Date 객체를 YYYY-MM-DD 형식으로 변환
export const formatDate = (date: Date | null) => {
  if (!date) return null;
  return format(date, 'yyyy-MM-dd');
};

// 요일 추출
export const getDayOfWeek = (date: string) => {
  const dateObj = parseISO(date);
  return format(dateObj, 'E', { locale: ko });
};

// YYYY-MM-DD 형식 문자열을 (YYYY년)-선택 MM월 DD일 (요일)-선택 형식으로 변환
export const formatDateToMonthDay = (
  dateString: string,
  withDayOfWeek?: boolean,
  withYear?: boolean,
) => {
  const dateObj = parseISO(dateString); // 'YYYY-MM-DD' 형식을 Date 객체로 변환
  const year = dateObj.getFullYear();
  const month = dateObj.getMonth() + 1;
  const day = dateObj.getDate();

  if (withDayOfWeek && withYear) {
    const dayOfWeek = getDayOfWeek(dateString);
    return `${year}년 ${month}월 ${day}일 (${dayOfWeek})`;
  }

  if (withDayOfWeek) {
    const dayOfWeek = getDayOfWeek(dateString);
    return `${month}월 ${day}일 (${dayOfWeek})`;
  }

  if (withYear) {
    return `${year}년 ${month}월 ${day}일`;
  }

  return `${month}월 ${day}일`;
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

// 커뮤니티 게시판 카드용 시간 변환 함수
export const formatDateCardTime = (createdAt: string): string => {
  const now = new Date();
  const date = new Date(createdAt);

  const minutesDiff = differenceInMinutes(now, date);
  const hoursDiff = differenceInHours(now, date);
  const daysDiff = differenceInDays(now, date);

  if (minutesDiff < 60) {
    return `${minutesDiff}분 전`;
  } else if (hoursDiff < 24) {
    return `${hoursDiff}시간 전`;
  } else if (daysDiff === 1) {
    return `어제 ${format(date, 'HH:mm')}`;
  } else if (daysDiff <= 3) {
    return `${daysDiff}일 전 ${format(date, 'HH:mm')}`;
  } else if (isSameYear(now, date)) {
    return `${format(date, 'MM/dd HH:mm')}`;
  } else {
    return `${format(date, 'yyyy/MM/dd HH:mm')}`;
  }
};
// YYYY-MM-DD 형식 문자열을 MM.DD 형식으로 변환
export const formatDateToShort = (dateString: string) => {
  const date = new Date(dateString);
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${month}.${day}`;
};
