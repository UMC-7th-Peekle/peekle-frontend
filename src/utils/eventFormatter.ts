import {
  CategoryIdEnum,
  EventCreateData,
  EventCreateFormValues,
  EventSchedule,
  LocationGroupIdEnum,
  EventCreateFormSchedule,
} from '@/types/event';
import { formatTime, formatTimeToHHMMSSZ } from './timeFormatter';
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
    content: formData.content,
    price: formData.priceType === '유료' ? Number(formData.price) : 0,
    categoryId: formData.categoryId as CategoryIdEnum, // enum 값 변환
    eventUrl: formData.eventUrl ?? null, // nullable
    applicationStart: formData.applicationStartDate,
    applicationEnd: formData.applicationEndDate,
    schedules: formData.schedules.map((schedule: EventCreateFormSchedule) => {
      return {
        repeatType: schedule.repeatType,
        repeatEndDate: schedule.endDate,
        isAllDay: schedule.isAllDay,
        customText: schedule.customText ?? null, // nullable
        startDate: schedule.startDate,
        endDate: schedule.endDate,
        startTime: formatTimeToHHMMSSZ(schedule.startTime),
        endTime: formatTimeToHHMMSSZ(schedule.endTime),
      };
    }),
    locations: {
      locationGroupId: getLocationGroupId(formData.location.address),
      address: formData.location.address,
      buildingName: formData.location.buildingName,
    },
  };
};
