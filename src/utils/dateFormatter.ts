import {
  format,
  differenceInMinutes,
  differenceInHours,
  differenceInDays,
  isSameYear,
} from 'date-fns';

// Date 객체를 YYYY-MM-DD 형식으로 변환
export const formatDate = (date: Date | null) => {
  if (!date) return null;
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// YYYY-MM-DD 형식 문자열을 MM월 DD일 형식으로 변환
export const formatDateToMonthDay = (dateString: string) => {
  const formattedDate = dateString.slice(0, 10); // 날짜까지
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
