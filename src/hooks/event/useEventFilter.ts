import useSessionStorageState from 'use-session-storage-state';
import { useMemo } from 'react';
import { useQueryState } from 'nuqs';
import { useMyLocationStore } from '@/stores';
import {
  UseEventFilterProps,
  EventFilterKeys,
  EventFilterType,
} from '@/types/event';
import { calculateDistance } from '@/utils';
import { events } from '@/sample-data/event';

const useEventFilter = ({
  key = 'sort',
  type = 'single',
}: UseEventFilterProps = {}) => {
  const { myLocation } = useMyLocationStore();
  const [searchQuery] = useQueryState('event-search');

  const [storedFilters, setStoredFilters] = useSessionStorageState<
    Record<EventFilterKeys, string>
  >('event-filters', {
    defaultValue: {
      sort: 'latest',
      category: 'all',
      duration: 'all',
      price: 'all',
      location: 'all',
    },
  });

  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      // 카테고리 필터
      if (storedFilters && storedFilters.category !== 'all') {
        const categories = storedFilters.category.split(',');
        if (!categories.includes(event.category)) return false;
      }

      // 기간 필터
      if (storedFilters && storedFilters.duration !== 'all') {
        const [startFilter, endFilter] = storedFilters.duration
          .split(',')
          .map((date) => new Date(date));
        const eventStart = new Date(event.startDate);
        const eventEnd = new Date(event.endDate);

        if (eventStart < startFilter || eventEnd > endFilter) return false;
      }

      // 가격 필터
      if (storedFilters && storedFilters.price !== 'all') {
        if (storedFilters.price === 'free') {
          if (event.price !== 'free') return false;
        } else {
          if (Number(event.price) <= 0) return false;
        }
      }

      // 위치 필터
      if (storedFilters && storedFilters.location !== 'all') {
        const locations = storedFilters.location.split(',');
        if (!locations.includes(event.location)) return false;
      }

      // 검색 필터
      if (searchQuery && searchQuery.length >= 2) {
        if (!event.title.includes(searchQuery)) return false;
      }

      return true;
    });
  }, [storedFilters, searchQuery]);

  const sortedEvents = useMemo(() => {
    return [...filteredEvents].sort((a, b) => {
      if (storedFilters && storedFilters.sort === 'latest') {
        const startDateDiff =
          new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
        if (startDateDiff !== 0) return startDateDiff;
        const endDateDiff =
          new Date(a.endDate).getTime() - new Date(b.endDate).getTime();
        return endDateDiff;
      }

      if (storedFilters && storedFilters.sort === 'lowest_price') {
        const priceDiff = Number(a.price) - Number(b.price);
        if (priceDiff !== 0) return priceDiff;
        const startDateDiff =
          new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
        return startDateDiff;
      }

      if (
        storedFilters &&
        storedFilters.sort === 'shortest_distance' &&
        myLocation
      ) {
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
  }, [filteredEvents, myLocation, storedFilters]);

  const handleSelect = (newValue: string) => {
    if (type === 'single') {
      setStoredFilters({
        ...storedFilters,
        [key]: newValue,
      });
      return;
    }

    // 중복 허용 값일때
    if (newValue === 'all') {
      setStoredFilters({
        ...storedFilters,
        [key]: 'all',
      });
      return;
    }

    const currentValues = storedFilters[key as EventFilterKeys]?.split(',') ?? [
      'all',
    ];

    if (currentValues.includes('all')) {
      setStoredFilters({
        ...storedFilters,
        [key]: newValue,
      });
      return;
    }

    // 이미 선택된 값이면 제거
    if (currentValues.includes(newValue)) {
      const newValues = currentValues.filter((v) => v !== newValue);
      setStoredFilters({
        ...storedFilters,
        [key]: newValues.length === 0 ? 'all' : newValues.join(','),
      });
      return;
    }

    // 새로운 값 추가 (기존 값들 유지하며)
    const newValues = [...currentValues, newValue];
    setStoredFilters({
      ...storedFilters,
      [key]: newValues.join(','),
    });
  };

  const isSelected = (value: string) => {
    if ((type as EventFilterType) === 'single') {
      return value === storedFilters[key as EventFilterKeys];
    }

    return value === 'all'
      ? storedFilters[key as EventFilterKeys] === 'all'
      : !!storedFilters[key as EventFilterKeys]?.split(',').includes(value);
  };

  const clearFilter = () => {
    // 세션 스토리지 초기화
    setStoredFilters({
      sort: 'latest',
      category: 'all',
      duration: 'all',
      price: 'all',
      location: 'all',
    });
  };

  return {
    storedValue: storedFilters[key as EventFilterKeys],
    handleSelect,
    filteredEvents,
    sortedEvents,
    isSelected,
    clearFilter,
  };
};

export default useEventFilter;
