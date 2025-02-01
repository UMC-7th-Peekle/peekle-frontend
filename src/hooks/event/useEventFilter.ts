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
    if (type === 'single') {
      setSearchParams({ ...filters, [key]: newValue });
      return;
    }

    // 중복 허용 값일때
    if (newValue === '전체' || newValue === '0') {
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
