import { EventData } from '@/types/event';

export const events: EventData[] = [
  {
    eventId: 1000n,
    title: '3-1000 이벤트',
    price: 77505,
    categoryId: 3,
    createdUserId: 23n,
    category: {
      name: '활동',
      description: '스포츠, 야외 활동, 봉사 및 커뮤니티 모임',
    },
    eventImages: [],
    eventSchedules: [
      {
        repeatType: 'none',
        repeatEndDate: null,
        isAllDay: false,
        customText: '야호',
        startDate: '2025-02-21',
        endDate: '2025-02-21',
        startTime: '13:44:00',
        endTime: '19:44:00',
      },
    ],
    eventLocation: {
      coordinates: [127.057687, 37.542615],
      locationGroupId: 8,
      roadAddress: '서울특별시 영등포구 영중로 321',
      jibunAddress: '서울특별시 영등포구 영등포동 88-6',
      buildingCode: 'B1007',
      buildingName: '건물 8',
      sido: '서울특별시',
      sigungu: '영등포구',
      sigunguCode: '11107',
      roadnameCode: '27',
      zoneCode: '03307',
      detail: '44동 557호',
    },
  },
  {
    eventId: 999n,
    title: '2-999 이벤트',
    price: 60131,
    categoryId: 2,
    createdUserId: null,
    category: {
      name: '문화',
      description: '전시회, 공연, 영화 상영 및 예술 관련 행사',
    },
    eventImages: [],
    eventSchedules: [
      {
        repeatType: 'monthly',
        repeatEndDate: '2025-04-04',
        isAllDay: false,
        customText: '야호',
        startDate: '2024-10-04',
        endDate: '2025-04-11',
        startTime: '10:09:00',
        endTime: '16:09:00',
      },
    ],
    eventLocation: {
      coordinates: [126.83542, 37.483317],
      locationGroupId: 3,
      roadAddress: '서울특별시 강서구 공항대로 123',
      jibunAddress: '서울특별시 강서구 화곡동 135-8',
      buildingCode: 'B1002',
      buildingName: '건물 3',
      sido: '서울특별시',
      sigungu: '강서구',
      sigunguCode: '11102',
      roadnameCode: '22',
      zoneCode: '03302',
      detail: '478동 848호',
    },
  },
  {
    eventId: 998n,
    title: '2-998 이벤트',
    price: 28890,
    categoryId: 2,
    createdUserId: 5n,
    category: {
      name: '문화',
      description: '전시회, 공연, 영화 상영 및 예술 관련 행사',
    },
    eventImages: [
      {
        imageUrl:
          'https://test2.shop:41021/uploads/events/image_7c6d0a3a-fe87-4f38-b62c-8a0b6ad64299.webp',
        sequence: 1,
      },
    ],
    eventSchedules: [
      {
        repeatType: 'none',
        repeatEndDate: null,
        isAllDay: false,
        customText: '야호',
        startDate: '2024-06-18',
        endDate: '2024-06-18',
        startTime: '12:40:00',
        endTime: '18:40:00',
      },
    ],
    eventLocation: {
      coordinates: [127.14278, 37.469028],
      locationGroupId: 6,
      roadAddress: '서울특별시 관악구 남부순환로 789',
      jibunAddress: '서울특별시 관악구 봉천동 503-7',
      buildingCode: 'B1005',
      buildingName: '건물 6',
      sido: '서울특별시',
      sigungu: '관악구',
      sigunguCode: '11105',
      roadnameCode: '25',
      zoneCode: '03305',
      detail: '63동 853호',
    },
  },
];
