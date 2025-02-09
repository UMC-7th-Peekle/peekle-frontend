import { MAP_MARKERS } from '@/constants/event';

// 마커 아이콘 가져오기
const getMarker = (categoryId: number) => {
  return MAP_MARKERS[categoryId as keyof typeof MAP_MARKERS];
};

export default getMarker;
