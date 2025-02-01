import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useMyLocationStore } from '@/stores';
import {
  UseEventFilterProps,
  EventFilterKeys,
  EventFilterType,
} from '@/types/event';
import {
  DEFAULT_FILTERS,
  CATEGORY_OPTIONS_WITHOUT_ALL,
  LOCATION_GROUP_IDS_WITHOUT_ALL,
} from '@/constants/event';
import { calculateDistance } from '@/utils';
import { events } from '@/sample-data/event';
import { useQueryState } from 'nuqs';

const useEventFilter = ({
  key = '정렬',
  type = 'single',
}: UseEventFilterProps = {}) => {
  const { myLocation } = useMyLocationStore();
  const [searchQuery] = useQueryState('event-search', { defaultValue: '' });
  const [searchParams, setSearchParams] = useSearchParams();

  // 현재 필터 상태 가져오기
  const filters = useMemo(() => {
    const currentFilters: Record<EventFilterKeys, string> = {
      ...DEFAULT_FILTERS,
    };
    Object.keys(DEFAULT_FILTERS).forEach((key) => {
      const value = searchParams.get(key);
      if (value) {
        currentFilters[key as EventFilterKeys] = value;
      }
    });
    return currentFilters;
  }, [searchParams]);

  // 이벤트 필터링
  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      // 카테고리 필터
      if (filters.카테고리 !== '전체') {
        const categories = filters.카테고리.split(',');
        if (!categories.includes(event.category.name)) return false;
      }

      // 기간 필터
      if (filters.기간 !== '전체') {
        const [startFilter, endFilter] = filters.기간
          .split(',')
          .map((date) => new Date(date));
        const eventStart = new Date(event.eventSchedules[0].startDate);
        const eventEnd = new Date(event.eventSchedules[0].endDate);

        if (eventStart < startFilter || eventEnd > endFilter) return false;
      }

      // 가격 필터
      if (filters.가격 !== '전체') {
        if (filters.가격 === '무료') {
          if (event.price !== 0) return false;
        } else {
          if (Number(event.price) <= 0) return false;
        }
      }

      // 지역 필터
      if (filters.지역 !== '전체') {
        const locations = filters.지역;
        if (Number(locations) !== event.locationGroupId) return false;
      }

      // 검색 필터
      if (searchQuery) {
        if (searchQuery.length < 2) {
          return false;
        } else {
          if (!event.title.includes(searchQuery)) return false;
        }
      }

      return true;
    });
  }, [filters, searchQuery]);

  const sortedEvents = useMemo(() => {
    return [...filteredEvents].sort((a, b) => {
      const eventScheduleA = a.eventSchedules[0];
      const eventScheduleB = b.eventSchedules[0];

      if (filters.정렬 === 'latest') {
        const startDateDiff =
          new Date(eventScheduleA.startDate).getTime() -
          new Date(eventScheduleB.startDate).getTime();
        if (startDateDiff !== 0) return startDateDiff;
        const endDateDiff =
          new Date(eventScheduleA.endDate).getTime() -
          new Date(eventScheduleB.endDate).getTime();
        if (endDateDiff !== 0) return endDateDiff;
        return a.title.localeCompare(b.title, 'ko');
      }

      if (filters.정렬 === 'lowest_price') {
        const priceDiff = Number(a.price) - Number(b.price);
        if (priceDiff !== 0) return priceDiff;
        const startDateDiff =
          new Date(eventScheduleA.startDate).getTime() -
          new Date(eventScheduleB.startDate).getTime();
        if (startDateDiff !== 0) return startDateDiff;
        return a.title.localeCompare(b.title, 'ko');
      }

      if (filters.정렬 === 'shortest_distance' && myLocation) {
        const distanceA = calculateDistance(
          myLocation.lat(),
          myLocation.lng(),
          a.latitude,
          a.longitude,
        );
        const distanceB = calculateDistance(
          myLocation.lat(),
          myLocation.lng(),
          b.latitude,
          b.longitude,
        );
        const distanceDiff = distanceA - distanceB;
        if (distanceDiff !== 0) return distanceDiff;
        const startDateDiff =
          new Date(eventScheduleA.startDate).getTime() -
          new Date(eventScheduleB.startDate).getTime();
        if (startDateDiff !== 0) return startDateDiff;
        const endDateDiff =
          new Date(eventScheduleA.endDate).getTime() -
          new Date(eventScheduleB.endDate).getTime();
        if (endDateDiff !== 0) return endDateDiff;
        return a.title.localeCompare(b.title, 'ko');
      }

      return 0;
    });
  }, [filteredEvents, filters.정렬, myLocation]);

  // 필터값 변경
  const handleSelect = (newValue: string) => {
    const updatedParams = new URLSearchParams(searchParams); // 기존 쿼리 파라미터 복사

    if (type === 'single') {
      updatedParams.set(key, newValue);
    } else {
      // 중복 허용 값일 때
      const allOptions =
        key === '카테고리'
          ? CATEGORY_OPTIONS_WITHOUT_ALL
          : LOCATION_GROUP_IDS_WITHOUT_ALL;

      let currentValues = filters[key as EventFilterKeys]?.split(',') ?? [
        '전체',
      ];

      // '전체'가 포함되어 있으면 제거
      currentValues = currentValues.filter((v) => v !== '전체');

      if (newValue === '전체' || newValue === '0') {
        updatedParams.set(key, '전체'); // 지역도 기본값으르 '전체'로
      } else if (currentValues.includes(newValue)) {
        // 이미 선택된 값이면 제거
        const newValues = currentValues.filter((v) => v !== newValue);
        // 제거 후 남은 값이 전체 옵션보다 1개 부족하면 '전체' 선택
        if (newValues.length === allOptions.length - 1) {
          updatedParams.set(key, '전체');
        } else {
          updatedParams.set(
            key,
            newValues.length === 0 ? '전체' : newValues.join(','),
          );
        }
      } else {
        // 새로운 값 추가
        const newValues = [...currentValues, newValue];
        // 추가 후 모든 옵션이 선택되면 '전체'로 변경
        if (newValues.length === allOptions.length) {
          updatedParams.set(key, '전체');
        } else {
          updatedParams.set(key, newValues.join(','));
        }
      }
    }

    // 기존 event-search 값 유지
    if (searchParams.has('event-search')) {
      updatedParams.set('event-search', searchParams.get('event-search')!);
    }

    // URL 업데이트 실행
    setSearchParams(updatedParams);
  };

  // 선택 됐는지 여부
  const isSelected = (value: string) => {
    const filterValue = filters[key as EventFilterKeys];

    if ((type as EventFilterType) === 'single') {
      return value === filterValue;
    }

    if (value === '전체' || value === '0') {
      return filterValue === '전체';
    }
    return filterValue ? filterValue.split(',').includes(value) : false;
  };

  const clearFilter = () => {
    setSearchParams(DEFAULT_FILTERS);
  };

  const activeFilterCount = useMemo(() => {
    return Object.keys(filters).reduce((count, key) => {
      if ((key as EventFilterKeys) === '정렬') return count; // 정렬 필터 제외
      if ((key as EventFilterKeys) === '기간') {
        return filters[key as EventFilterKeys] !==
          DEFAULT_FILTERS[key as EventFilterKeys]
          ? count + 1 // 기간 필터는 하나로 취급
          : count;
      }
      if (
        filters[key as EventFilterKeys] !==
        DEFAULT_FILTERS[key as EventFilterKeys]
      ) {
        return count + filters[key as EventFilterKeys].split(',').length;
      }

      return count;
    }, 0);
  }, [filters]);

  return {
    storedValue: filters[key as EventFilterKeys],
    handleSelect,
    filteredEvents,
    sortedEvents,
    isSelected,
    clearFilter,
    activeFilterCount,
  };
};

export default useEventFilter;
