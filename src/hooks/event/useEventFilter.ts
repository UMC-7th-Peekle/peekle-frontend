import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useMyLocationStore } from '@/stores';
import {
  UseEventFilterProps,
  EventFilterKeys,
  EventFilterType,
} from '@/types/event';
import { DEFAULT_FILTERS } from '@/constants/event';
import { calculateDistance } from '@/utils';
import { events } from '@/sample-data/event';
import { useQueryState } from 'nuqs';

const useEventFilter = ({
  key = '정렬',
  type = 'single',
}: UseEventFilterProps = {}) => {
  const { myLocation } = useMyLocationStore();
  const [searchQuery] = useQueryState('event-search');
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
        if (!categories.includes(event.category)) return false;
      }

      // 기간 필터
      if (filters.기간 !== '전체') {
        const [startFilter, endFilter] = filters.기간
          .split(',')
          .map((date) => new Date(date));
        const eventStart = new Date(event.startDate);
        const eventEnd = new Date(event.endDate);

        if (eventStart < startFilter || eventEnd > endFilter) return false;
      }

      // 가격 필터
      if (filters.가격 !== '전체') {
        if (filters.가격 === 'free') {
          if (event.price !== 'free') return false;
        } else {
          if (Number(event.price) <= 0) return false;
        }
      }

      // 위치 필터
      if (filters.지역 !== '전체') {
        const locations = filters.지역.split(',');
        if (!locations.includes(event.location)) return false;
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
      if (filters.정렬 === 'latest') {
        const startDateDiff =
          new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
        if (startDateDiff !== 0) return startDateDiff;
        const endDateDiff =
          new Date(a.endDate).getTime() - new Date(b.endDate).getTime();
        return endDateDiff;
      }

      if (filters.정렬 === 'lowest_price') {
        const priceDiff = Number(a.price) - Number(b.price);
        if (priceDiff !== 0) return priceDiff;
        const startDateDiff =
          new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
        return startDateDiff;
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
        return distanceA - distanceB;
      }

      return 0;
    });
  }, [filteredEvents, filters.정렬, myLocation]);

  // 필터값 변경
  const handleSelect = (newValue: string) => {
    if (type === 'single') {
      setSearchParams({ ...filters, [key]: newValue });
      return;
    }

    // 중복 허용 값일때
    if (newValue === '전체') {
      setSearchParams({ ...filters, [key]: '전체' });
      return;
    }

    const currentValues = filters[key as EventFilterKeys]?.split(',') ?? [
      '전체',
    ];

    if (currentValues.includes('전체')) {
      setSearchParams({
        ...filters,
        [key]: newValue,
      });
      return;
    }

    // 이미 선택된 값이면 제거
    if (currentValues.includes(newValue)) {
      const newValues = currentValues.filter((v) => v !== newValue);
      setSearchParams({
        ...filters,
        [key]: newValues.length === 0 ? '전체' : newValues.join(','),
      });
      return;
    }

    // 새로운 값 추가 (기존 값들 유지하며)
    const newValues = [...currentValues, newValue];
    setSearchParams({
      ...filters,
      [key]: newValues.join(','),
    });
  };

  // 선택 됐는지 여부
  const isSelected = (value: string) => {
    if ((type as EventFilterType) === 'single') {
      return value === filters[key as EventFilterKeys];
    }

    return value === '전체'
      ? filters[key as EventFilterKeys] === '전체'
      : !!filters[key as EventFilterKeys]?.split(',').includes(value);
  };

  const clearFilter = () => {
    setSearchParams(DEFAULT_FILTERS);
  };

  return {
    storedValue: filters[key as EventFilterKeys],
    handleSelect,
    filteredEvents,
    sortedEvents,
    isSelected,
    clearFilter,
  };
};

export default useEventFilter;
