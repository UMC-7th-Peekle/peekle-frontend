// Select
export const SORT_OPTIONS = [
  ['가까운 날짜순', 'latest'],
  ['낮은 금액순', 'lowest_price'],
  ['가까운 거리순', 'shortest_distance'],
];

export const CATEGORY_OPTIONS = [
  ['전체', 'all'],
  ['교육', 'education'],
  ['문화', 'culture'],
  ['활동', 'activity'],
];

export const PRICE_OPTIONS = [
  ['전체', 'all'],
  ['무료', 'free'],
  ['유료', 'paid'],
];

export const LOCATION_OPTIONS = [
  ['전체', 'all'],
  ['강남 / 서초 / 양재', 'gangnam'], // 고유 키 필요
  ['잠실 / 송파 / 강동', 'jamsil'],
  ['동작 / 관악 / 사당', 'dongjak'],
  ['마포 / 서대문 / 은평', 'mapo'],
  ['종로 / 중구 / 용산', 'jongno'],
  ['강서 / 금천 / 양천', 'gangseo'],
  ['영등포 / 구로 / 신도림', 'yeongdeungpo'],
  ['광진 / 성동 / 중랑 / 동대문', 'gwangjin'],
];

export const FILTER_KEYS = [
  'sort',
  'category',
  'duration',
  'price',
  'location',
];

// Chip
export const DURATION_OPTIONS = [
  ['전체', 'all'],
  ['오늘', 'today'],
  ['1주', 'one_week'],
  ['1개월', 'one_month'],
  ['3개월', 'three_month'],
];

export const PREDEFINED_RANGES = {
  today: [new Date(), new Date()], // 오늘이 기준
  one_week: [
    new Date(),
    new Date(new Date().setDate(new Date().getDate() + 7)),
  ],
  one_month: [
    new Date(),
    new Date(new Date().setMonth(new Date().getMonth() + 1)),
  ],
  three_month: [
    new Date(),
    new Date(new Date().setMonth(new Date().getMonth() + 3)),
  ],
};
