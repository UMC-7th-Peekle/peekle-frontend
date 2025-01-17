import defaultProfile from '@/assets/img/profile/default_profile.svg?react';

// 기본 프로필 사진
export const DEFAULT_PROFILE = defaultProfile;

// filter
export const SORT_OPTIONS = [
  { value: 'latest', label: '가까운 날짜순' },
  { value: 'latest', label: '낮은 금액순' },
  { value: 'latest', label: '가까운 거리순' },
];

export const CATEGORY_OPTIONS = [
  { value: 'all', label: '카테고리' },
  { value: 'latest', label: '교육' },
  { value: 'korean', label: '문화' },
  { value: 'chinese', label: '중식' },
];
