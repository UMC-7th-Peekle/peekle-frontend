// Select
export const SORT_OPTIONS = {
  '가까운 날짜순': 'latest',
  '낮은 금액순': 'lowest_price',
  '가까운 거리순': 'shortest_distance',
} as const;

export const CATEGORY_OPTIONS = {
  전체: 'all',
  교육: 'education',
  문화: 'culture',
  활동: 'activity',
} as const;

export const PRICE_OPTIONS = {
  전체: 'all',
  무료: 'free',
  유료: 'paid',
} as const;

// Chip
export const DURATION_OPTIONS = {
  전체: 'all',
  오늘: 'today',
  '1 주': 'one_week',
  '1 개월': 'one_month',
  '3 개월': 'three_months',
} as const;
