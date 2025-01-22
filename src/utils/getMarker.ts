import { MAP_MARKERS } from '@/constants/event';

// 마커 아이콘 가져오기
const getMarker = (category: string) => {
  return MAP_MARKERS[category as keyof typeof MAP_MARKERS];
};

export default getMarker;
