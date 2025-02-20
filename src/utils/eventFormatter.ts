import {
  CategoryIdEnum,
  EventCreateData,
  EventCreateFormValues,
  EventSchedule,
  LocationGroupIdEnum,
  EventCreateFormSchedule,
} from '@/types/event';
import { formatTime, formatTimeToHHMMSSZ } from './timeFormatter';
import {
  formatDate,
  formatDateToMonthDay,
  getDayOfWeek,
} from './dateFormatter';
import {
  format,
  isSameWeek,
  isSameMonth,
  isSameYear,
  parseISO,
} from 'date-fns';
import { ko } from 'date-fns/locale';

// 행정구,자치구 추출
export const getDistrict = (address: string) => {
  return address.match(/(\S+구)/)?.[1] ?? '';
};

// 시작일시, 종료일시 추출
export const getScheduleDateTime = (
  schedule: EventSchedule,
  isEnd: boolean,
) => {
  const { startDate, endDate, startTime, endTime } = schedule;
  if (!startDate || !endDate || !startTime || !endTime) return '';

  const date = isEnd
    ? formatDateToMonthDay(endDate, true)
    : formatDateToMonthDay(startDate, true);
  const time = formatTime(startTime);

  return `${date} ${formatTime(time)} ~ ${formatTime(endTime)}`;
};

// 스케줄 포맷팅
export const formatSchedules = (
  schedules: EventSchedule[],
  applicationEndStart: string,
  applicationEnd: string,
) => {
  if (schedules.length === 0) return '스케줄 정보 없음';

  const firstSchedule = schedules[0];
  const { repeatType, startTime, endTime } = firstSchedule;
  if (!repeatType || !startTime || !endTime) return '';

  // 모든 스케줄의 repeatText가 동일한지 확인
  const allSameRepeatText = schedules.every((s) => s.repeatType === repeatType);

  // startDate, endDate가 전체 기간과 일치하는지 확인
  const allMatchEventPeriod = schedules.every((s) => {
    // 날짜 파싱
    const startDate = parseISO(s.startDate);
    const endDate = parseISO(s.endDate);
    const appStartDate = parseISO(applicationEndStart);
    const appEndDate = parseISO(applicationEnd);

    switch (repeatType) {
      case 'daily':
        return (
          s.startDate === applicationEndStart && s.endDate === applicationEnd
        );
      case 'weekly':
        return (
          isSameWeek(startDate, appStartDate, { weekStartsOn: 1 }) &&
          isSameWeek(endDate, appEndDate, { weekStartsOn: 1 })
        );
      case 'monthly':
        return (
          isSameMonth(startDate, appStartDate) &&
          isSameMonth(endDate, appEndDate)
        );
      case 'yearly':
        return (
          isSameYear(startDate, appStartDate) && isSameYear(endDate, appEndDate)
        );
      default:
        return false;
    }
  });

  // repeatType에 따른 반복 텍스트 설정
  const getRepeatText = (schedule: EventSchedule) => {
    const startDateObj = parseISO(schedule.startDate);

    switch (schedule.repeatType) {
      case 'daily':
        return '매일';
      case 'weekly':
        return `매주 ${format(startDateObj, 'E', { locale: ko })}`; // 화요일
      case 'monthly':
        return `매달 ${format(startDateObj, 'd')}일`; // 15일
      case 'yearly':
        return `매년 ${format(startDateObj, 'M월 d일')}`; // 3월 15일
      case 'custom':
        return schedule.customText ?? '';
      default:
        return '';
    }
  };

  let allDayText = '';
  if (startTime === '00:00:00Z' && endTime === '23:59:59Z') {
    allDayText = '하루 종일';
  }

  // 요일이 여러 개일 경우, 중복 없이 정렬된 형태로 가져오기
  if (repeatType === 'weekly' && allSameRepeatText && allMatchEventPeriod) {
    const uniqueDays = Array.from(
      new Set(schedules.map((s) => getDayOfWeek(s.startDate))),
    ).sort();

    return allDayText
      ? `매주 ${uniqueDays.join(', ')} ${allDayText}`
      : `매주 ${uniqueDays.join(', ')} ${formatTime(startTime)} ~ ${formatTime(
          endTime,
        )}`;
  }

  if (allSameRepeatText && allMatchEventPeriod) {
    return allDayText
      ? `${getRepeatText(firstSchedule)} ${allDayText}`
      : `${getRepeatText(firstSchedule)} ${formatTime(startTime)} ~ ${formatTime(
          endTime,
        )}`;
  }

  // repeatType이 다르거나 기간이 차이나는 경우 날짜도 표시
  return schedules.map((s) =>
    allDayText
      ? `${formatDate(new Date(s.startDate))} ~ ${formatDate(
          new Date(s.endDate),
        )} ${allDayText}`
      : `${formatDate(new Date(s.startDate))} ~ ${formatDate(
          new Date(s.endDate),
        )} ${getRepeatText(s)} ${formatTime(s.startTime)} ~ ${formatTime(
          s.endTime,
        )}`,
  );
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

export const getCategoryId = (categoryName: string) => {
  return CategoryIdEnum[categoryName as keyof typeof CategoryIdEnum];
};

// 폼 데이터 변환
const getLocationGroupId = (address: string): LocationGroupIdEnum => {
  const mapping: { [key: string]: LocationGroupIdEnum } = {
    강남구: LocationGroupIdEnum.강남_서초_양재,
    서초구: LocationGroupIdEnum.강남_서초_양재,

    송파구: LocationGroupIdEnum.잠실_송파_강동,
    강동구: LocationGroupIdEnum.잠실_송파_강동,

    마포구: LocationGroupIdEnum.마포_서대문_은평,
    서대문구: LocationGroupIdEnum.마포_서대문_은평,
    은평구: LocationGroupIdEnum.마포_서대문_은평,

    강서구: LocationGroupIdEnum.강서_금천_양천,
    금천구: LocationGroupIdEnum.강서_금천_양천,
    양천구: LocationGroupIdEnum.강서_금천_양천,

    광진구: LocationGroupIdEnum.광진_성동_중랑_동대문,
    성동구: LocationGroupIdEnum.광진_성동_중랑_동대문,
    중랑구: LocationGroupIdEnum.광진_성동_중랑_동대문,
    동대문구: LocationGroupIdEnum.광진_성동_중랑_동대문,

    동작구: LocationGroupIdEnum.동작_관악_사당,
    관악구: LocationGroupIdEnum.동작_관악_사당,

    종로구: LocationGroupIdEnum.종로_중구_용산,
    중구: LocationGroupIdEnum.종로_중구_용산,
    용산구: LocationGroupIdEnum.종로_중구_용산,

    영등포구: LocationGroupIdEnum.영등포_구로_신도림,
    구로구: LocationGroupIdEnum.영등포_구로_신도림,

    강북구: LocationGroupIdEnum.광진_성동_중랑_동대문,
    도봉구: LocationGroupIdEnum.광진_성동_중랑_동대문,
    노원구: LocationGroupIdEnum.광진_성동_중랑_동대문,
    성북구: LocationGroupIdEnum.광진_성동_중랑_동대문,
  };

  for (const key in mapping) {
    if (getDistrict(address) === key) {
      return mapping[key];
    }
  }

  return LocationGroupIdEnum.강남_서초_양재; // 기본값 설정
};

export const transformFormData = (
  formData: EventCreateFormValues,
): EventCreateData => {
  return {
    title: formData.title,
    content: formData.content ?? '',
    price: formData.priceType === '유료' ? Number(formData.price) : 0,
    categoryId: formData.categoryId as CategoryIdEnum, // enum 값 변환
    eventUrl: formData.eventUrl ?? null, // nullable
    applicationStart: formData.applicationStartDate,
    applicationEnd: formData.applicationEndDate,
    schedules: formData.schedules.map((schedule: EventCreateFormSchedule) => {
      return {
        repeatType: schedule.repeatType,
        repeatEndDate: schedule.repeatEndDate,
        isAllDay: schedule.isAllDay,
        customText: schedule.customText ?? null, // nullable
        startDate: schedule.startDate,
        endDate: schedule.endDate,
        startTime: formatTimeToHHMMSSZ(schedule.startTime),
        endTime: formatTimeToHHMMSSZ(schedule.endTime),
      };
    }),
    location: {
      locationGroupId: getLocationGroupId(formData.location.address),
      address: formData.location.address,
      buildingName: formData.location.buildingName,
    },
  };
};
