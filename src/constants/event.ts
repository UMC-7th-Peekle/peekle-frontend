export const SORT_OPTIONS = [
  '가까운 날짜순',
  '낮은 금액순',
  '가까운 거리순',
] as const;

export const CATEGORY_OPTIONS = [
  ['전체', '전체'], // 서버에 아무값도 안 넘김
  ['교육', '1'],
  ['문화', '2'],
  ['활동', '3'],
  ['기타', '4'],
] as const;
export const PRICE_OPTIONS = ['전체', '무료', '유료'] as const;
export const LOCATION_OPTIONS = [
  ['전체', '전체'],
  ['잠실 / 송파 / 강동', '1'],
  ['마포 / 서대문 / 은평', '2'],
  ['강서 / 금천 / 양천', '3'],
  ['강남 / 서초 / 양재', '5'],
  ['동작 / 관악 / 사당', '6'],
  ['종로 / 중구 / 용산', '7'],
  ['영등포 / 구로 / 신도림', '8'],
  ['광진 / 성동 / 중랑 / 동대문', '4'],
] as const;

export const CATEGORY_OPTIONS_WITHOUT_ALL = [
  ['교육', '1'],
  ['문화', '2'],
  ['활동', '3'],
] as const;
export const CATEGORY_IDS_WITHOUT_ALL = CATEGORY_OPTIONS_WITHOUT_ALL.map(
  (option) => option[1],
);
export const PRICE_OPTIONS_WITHOUT_ALL = ['무료', '유료'] as const;
export const LOCATION_OPTIONS_WITHOUT_ALL = [
  ['잠실 / 송파 / 강동', '1'],
  ['마포 / 서대문 / 은평', '2'],
  ['강서 / 금천 / 양천', '3'],
  ['강남 / 서초 / 양재', '5'],
  ['동작 / 관악 / 사당', '6'],
  ['종로 / 중구 / 용산', '7'],
  ['영등포 / 구로 / 신도림', '8'],
  ['광진 / 성동 / 중랑 / 동대문', '4'],
] as const;
export const LOCATION_GROUP_IDS_WITHOUT_ALL = LOCATION_OPTIONS_WITHOUT_ALL.map(
  (option) => option[1],
);

// 기본 필터값
export const DEFAULT_FILTERS = {
  정렬: '가까운 날짜순',
  카테고리: '전체',
  기간: '전체',
  가격: '전체',
  지역: '전체',
} as const;

// BottomSheet
export const BOTTOM_SHEET_ID_EVENT_FILTER = 'event-filter';
export const BOTTOM_SHEET_ID_EVENT_SORT = 'event-sort';
export const BOTTOM_SHEET_ID_EVENT_INFO = 'event-info'; // map에서 사용
export const BOTTOM_SHEET_ID_EVENT_SHARE = 'event-share';

// Duration에서 쓰는 Chip
export const DURATION_OPTIONS = [
  '전체',
  '직접 입력',
  '오늘',
  '1주',
  '1개월',
  '3개월',
] as const;

export const PREDEFINED_RANGES = {
  전체: [new Date(), new Date(new Date().setFullYear(2999))],
  오늘: [new Date(), new Date()], // 오늘이 기준
  '1주': [new Date(), new Date(new Date().setDate(new Date().getDate() + 7))],
  '1개월': [
    new Date(),
    new Date(new Date().setMonth(new Date().getMonth() + 1)),
  ],
  '3개월': [
    new Date(),
    new Date(new Date().setMonth(new Date().getMonth() + 3)),
  ],
} as const;

// Marker
export const MAP_MARKERS = {
  0: `
    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="none" viewBox="0 0 36 36"><circle cx="18" cy="18" r="18" fill="#1855DA" opacity=".3"/><circle cx="18" cy="18" r="7.5" fill="#1855DA" stroke="#fff" stroke-width="3"/></svg>`,
  1: `
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" viewBox="0 0 32 32"><path fill="#FF6E83" stroke="#000" stroke-width="1.5" d="M28.91 3.217C27.192 1.498 25.23.673 24.53 1.373L19.8 6.105l6.222 6.223 4.733-4.733c.7-.7-.126-2.66-1.844-4.378Z"/><path fill="#BFBCAF" stroke="#000" stroke-width="1.5" d="M25.91 6.217c-1.96-1.96-4.197-2.903-4.995-2.104l-4.847 4.846 7.1 7.1 4.846-4.847c.798-.798-.143-3.035-2.104-4.995Z"/><path fill="#2B2622" stroke="#000" stroke-width="1.5" d="M7.222 28.124 2.953 29.98a.613.613 0 0 1-.807-.807l1.857-4.268a2.446 2.446 0 1 1 3.219 3.219Z"/><path fill="#FFD469" stroke="#000" stroke-width="1.5" d="M25.213 13.997a.43.43 0 0 0 .014-.02c.615-.882-.327-3.006-2.2-4.879-1.873-1.873-3.996-2.815-4.879-2.199a.803.803 0 0 0-.02.013l-.023.018a.643.643 0 0 0-.063.054l-.01.01L6.779 18.247s-3.186 7.884-1.985 9.085c1.2 1.2 9.085-1.986 9.085-1.986L25.14 14.084a.633.633 0 0 0 .055-.063l.017-.024Z"/><path fill="#E5AA6E" stroke="#000" stroke-width="1.5" d="m6.78 18.247-.25 1.559a.34.34 0 0 0 .39.39l1.118-.183a.34.34 0 0 1 .393.37l-.124 1.26a.34.34 0 0 0 .39.37l1.13-.175a.34.34 0 0 1 .387.396l-.193 1.08a.34.34 0 0 0 .369.399l1.27-.128a.34.34 0 0 1 .373.373l-.13 1.282a.34.34 0 0 0 .387.37l1.617-.236-9.113 3.813c.727-.727-1.155-2.61-1.882-1.882l3.868-9.058Z"/><path fill="#FFB636" d="M9.119 18.66a.425.425 0 0 1-.3-.725l9.397-9.398a.424.424 0 0 1 .6.6l-9.397 9.398a.422.422 0 0 1-.3.124Zm2.7 2.275 9.398-9.397a.425.425 0 1 0-.6-.6l-9.398 9.397a.424.424 0 0 0 .6.6Zm2.401 2.401 9.397-9.397a.425.425 0 1 0-.6-.6l-9.397 9.397a.424.424 0 0 0 .6.6Z"/></svg>`,
  2: `
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" viewBox="0 0 32 32"><path fill="#FBB8AB" stroke="#000" stroke-width="1.5" d="M21.993 5.854c-6.707-3.42-14.656-2.1-18.279 3.883C.091 15.72 2.398 23.68 8.87 27.517c3.18 1.886 8.312 3.81 10.398 1.244 2.044-2.516-.972-4.11-.268-5.502 1.133-2.24 6.2.699 9.515-2.922 3.734-4.082.01-11.151-6.522-14.483ZM24 19c-1.745 0-3-1.273-3-3s1.255-3 3-3 3 1.273 3 3-1.255 3-3 3Z"/><path fill="#8D65C5" d="M14.25 11a2.249 2.249 0 1 0 0-4.498 2.249 2.249 0 0 0 0 4.498Z"/><path fill="#F70A8D" d="M8.25 15a2.25 2.25 0 1 0 0-4.5 2.25 2.25 0 0 0 0 4.5Z"/><path fill="#00D26A" d="M8.25 22a2.25 2.25 0 1 0 0-4.5 2.25 2.25 0 0 0 0 4.5Z"/><path fill="#3F5FFF" d="M13.75 26.5a2.25 2.25 0 1 0 0-4.5 2.25 2.25 0 0 0 0 4.5Z"/></svg>`,
  3: `
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" viewBox="0 0 32 32"><path fill="#9B9B9B" fill-rule="evenodd" stroke="#000" stroke-width="1.5" d="M6.71 1.333c.325 0 .636.106.865.295.229.189.358.444.358.711v27.322a.854.854 0 0 1-.093.385 1.018 1.018 0 0 1-.265.326 1.268 1.268 0 0 1-.397.218 1.455 1.455 0 0 1-.935 0 1.268 1.268 0 0 1-.397-.218 1.018 1.018 0 0 1-.265-.326.853.853 0 0 1-.093-.385V2.34c0-.132.032-.263.093-.385.062-.122.152-.233.265-.326.114-.093.248-.167.397-.218.148-.05.307-.077.467-.077Z" clip-rule="evenodd"/><path fill="#FA4141" stroke="#000" stroke-width="1.5" d="M9.441 4.495a9.348 9.348 0 0 0-2.81-.491.612.612 0 0 0-.631.62v11.98c.002.134.062.26.166.355a.595.595 0 0 0 .392.148c2.51.048 3.085.893 5.954.893 3.07 0 6.512-1.873 9.482-1.873 2.013 0 4.2.673 5.437 1.177.261.106.569-.063.569-.323V4.862a.677.677 0 0 0-.125-.39.783.783 0 0 0-.336-.268c-5.524-2.296-8.237-.76-11.62.105-2.158.553-4.081.813-6.478.185Z"/></svg>`,
} as const;

// 쿼리 키
export const GET_EVENTS_QK = 'events';
export const GET_EVENT_DETAIL_QK = 'event-detail';
export const GET_EVENTS_SCRAPPED_QK = 'event-scrapped';
export const TOGGLE_SCRAP_EVENT_QK = 'event-toggle-scrap';
