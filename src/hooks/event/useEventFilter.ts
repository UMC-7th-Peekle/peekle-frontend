import { useCallback, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useMyLocationStore } from '@/stores';
import {
  UseEventFilterProps,
  EventFilterKeys,
  EventFilterType,
  PriceOption,
} from '@/types/event';
import {
  DEFAULT_FILTERS,
  CATEGORY_IDS_WITHOUT_ALL,
  LOCATION_GROUP_IDS_WITHOUT_ALL,
} from '@/constants/event';
import { calculateDistance } from '@/utils';
import useGetEvents from '@/pages/event/hooks/query/useGetEvents';

const useEventFilter = ({
  key = '정렬',
  type = 'single',
}: UseEventFilterProps = {}) => {
  const { myLocation } = useMyLocationStore();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get('event-search') ?? '';

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

  // 필터 정리
  const categories =
    filters.카테고리 === '전체'
      ? undefined
      : filters.카테고리.split(',').map((category) => Number(category));
  const [startDate, endDate] =
    filters.기간 === '전체'
      ? [undefined, undefined]
      : filters.기간.split(',').map((date) => date.trim());

  const price = filters.가격 as PriceOption;
  const locations =
    filters.지역 === '전체'
      ? undefined
      : filters.지역.split(',').map((loc) => Number(loc));
  const query = searchQuery.length < 2 ? undefined : searchQuery;

  const { data, fetchNextPage, hasNextPage, isFetching } = useGetEvents({
    limit: 10,
    cursor: undefined,
    categories,
    locations,
    price,
    startDate,
    endDate,
    query,
  });

  // 스크롤 이벤트 핸들러
  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight - 100
    ) {
      if (hasNextPage && !isFetching) {
        fetchNextPage();
      }
    }
  }, [hasNextPage, isFetching, fetchNextPage]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [hasNextPage, isFetching, handleScroll]);

  useEffect(() => {
    if (isFetching) {
      fetchNextPage();
    }
  }, [isFetching, fetchNextPage]);

  const sortedEvents = useMemo(() => {
    const filteredEvents = data.pages[0].success.events ?? [];
    console.log('filteredEvents', filteredEvents);
    return [...filteredEvents].sort((a, b) => {
      const eventScheduleA = a.eventSchedules[0];
      const eventScheduleB = b.eventSchedules[0];

      if (filters.정렬 === '가까운 날짜순') {
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

      if (filters.정렬 === '낮은 금액순') {
        const priceDiff = Number(a.price) - Number(b.price);
        if (priceDiff !== 0) return priceDiff;
        const startDateDiff =
          new Date(eventScheduleA.startDate).getTime() -
          new Date(eventScheduleB.startDate).getTime();
        if (startDateDiff !== 0) return startDateDiff;
        return a.title.localeCompare(b.title, 'ko');
      }

      if (filters.정렬 === '가까운 거리순' && myLocation) {
        const distanceA = calculateDistance(
          myLocation.y,
          myLocation.x,
          a.latitude,
          a.longitude,
        );
        const distanceB = calculateDistance(
          myLocation.y,
          myLocation.x,
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
  }, [filters.정렬, myLocation, data]);

  // 필터값 변경
  const handleSelect = (newValue: string) => {
    const updatedParams = new URLSearchParams(searchParams); // 기존 쿼리 파라미터 복사
    if (type === 'single') {
      updatedParams.set(key, newValue);
    } else {
      // 중복 허용 값일 때 - 카테고리, 지역
      const allOptions =
        key === '카테고리'
          ? CATEGORY_IDS_WITHOUT_ALL
          : LOCATION_GROUP_IDS_WITHOUT_ALL;

      let currentValues = filters[key as EventFilterKeys]?.split(',') ?? [
        '전체',
      ];

      // '전체' 포함되어 있으면 제거
      currentValues = currentValues.filter((v) => v !== '전체');

      if (newValue === '전체') {
        updatedParams.set(key, '전체');
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
    const updatedParams = new URLSearchParams(DEFAULT_FILTERS);
    // 기존 event-search 값 유지
    if (searchParams.has('event-search')) {
      updatedParams.set('event-search', searchParams.get('event-search')!);
    }
    setSearchParams(updatedParams);
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
    sortedEvents,
    isSelected,
    clearFilter,
    activeFilterCount,
  };
};

export default useEventFilter;
