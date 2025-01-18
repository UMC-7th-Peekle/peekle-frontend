// Select
export const SORT_OPTIONS = [
  ['가까운 날짜순', 'latest'],
  ['낮은 금액순', 'lowest_price'],
  ['가까운 거리순', 'shortest_distance'],
] as const;

export const CATEGORY_OPTIONS = [
  ['전체', 'all'],
  ['교육', 'education'],
  ['문화', 'culture'],
  ['활동', 'activity'],
] as const;

export const PRICE_OPTIONS = [
  ['전체', 'all'],
  ['무료', 'free'],
  ['유료', 'paid'],
] as const;

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
] as const;

// Chip
export const DURATION_OPTIONS = [
  ['전체', 'all'],
  ['오늘', 'today'],
  ['1 주', 'one_week'],
  ['1 개월', 'one_month'],
] as const;
