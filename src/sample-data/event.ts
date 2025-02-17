import { EventData } from '@/types/event';

export const events: EventData[] = [
  {
    eventId: 1000n,
    title: '3-1000 이벤트',
    price: '77505',
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
      coordinates: [37.49887944, 126.9516345],
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
    price: '60131',
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
      coordinates: [37.495188, 127.0332163],
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
    price: '28890',
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
      coordinates: [37.512952, 126.941571],
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
  {
    eventId: 984n,
    title: '1-984 이벤트',
    price: '28860',
    categoryId: 1,
    createdUserId: 16n,
    category: {
      name: '교육',
      description: '세미나, 워크숍, 강연 및 학습 관련 이벤트',
    },
    eventImages: [
      {
        imageUrl:
          'https://test2.shop:41021/uploads/events/image_3b03c780-f019-4978-8324-ac17aa75e6ad.jpeg',
        sequence: 1,
      },
      {
        imageUrl:
          'https://test2.shop:41021/uploads/events/image_6d93abc1-fc81-483b-ae42-8cfd7a42f7a8.bmp',
        sequence: 2,
      },
      {
        imageUrl:
          'https://test2.shop:41021/uploads/events/image_1499b33e-c7c9-48fd-b1cd-d069154d45c3.jpg',
        sequence: 3,
      },
    ],
    eventSchedules: [
      {
        repeatType: 'daily',
        repeatEndDate: '2025-05-21',
        isAllDay: false,
        customText: '야호',
        startDate: '2024-10-21',
        endDate: '2025-05-28',
        startTime: '13:07:00',
        endTime: '19:07:00',
      },
    ],
    eventLocation: {
      coordinates: [37.4832767, 126.9715006],
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
  {
    eventId: 983n,
    title: '1-983 이벤트',
    price: '71730',
    categoryId: 1,
    createdUserId: null,
    category: {
      name: '교육',
      description: '세미나, 워크숍, 강연 및 학습 관련 이벤트',
    },
    eventImages: [
      {
        imageUrl:
          'https://test2.shop:41021/uploads/events/image_5f75ffea-b660-4e81-8f3e-4926f6c8141f.jpg',
        sequence: 1,
      },
      {
        imageUrl:
          'https://test2.shop:41021/uploads/events/image_2bfeb70c-cde7-461b-91b8-cf32791a9726.webp',
        sequence: 2,
      },
      {
        imageUrl:
          'https://test2.shop:41021/uploads/events/image_0521d4d8-e4f6-40cc-bf02-90a4bf9b1297.png',
        sequence: 3,
      },
    ],
    eventSchedules: [
      {
        repeatType: 'none',
        repeatEndDate: null,
        isAllDay: false,
        customText: '야호',
        startDate: '2025-04-18',
        endDate: '2025-04-18',
        startTime: '13:19:00',
        endTime: '19:19:00',
      },
    ],
    eventLocation: {
      coordinates: [37.4840674, 126.9673849],
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
  {
    eventId: 982n,
    title: '1-982 이벤트',
    price: '65931',
    categoryId: 1,
    createdUserId: 5n,
    category: {
      name: '교육',
      description: '세미나, 워크숍, 강연 및 학습 관련 이벤트',
    },
    eventImages: [
      {
        imageUrl:
          'https://test2.shop:41021/uploads/events/image_32bf98de-6e54-46d8-a63c-fa1b2ea86ce7.png',
        sequence: 1,
      },
      {
        imageUrl:
          'https://test2.shop:41021/uploads/events/image_9c8168d2-a363-4cdf-a615-8b76beec5cde.bmp',
        sequence: 2,
      },
      {
        imageUrl:
          'https://test2.shop:41021/uploads/events/image_b221f865-e59b-436e-b074-63b321fa77f2.jpeg',
        sequence: 3,
      },
      {
        imageUrl:
          'https://test2.shop:41021/uploads/events/image_afade554-cebc-449e-b5bd-014f692b5aec.png',
        sequence: 4,
      },
    ],
    eventSchedules: [
      {
        repeatType: 'monthly',
        repeatEndDate: '2026-04-04',
        isAllDay: true,
        customText: '야호',
        startDate: '2025-10-04',
        endDate: '2026-04-11',
        startTime: '17:44:00',
        endTime: '23:44:00',
      },
    ],
    eventLocation: {
      coordinates: [37.4809275, 126.9715979],
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
