import useSessionStorageState from 'use-session-storage-state';
import { useQueryState } from 'nuqs';
import { useEffect } from 'react';
import { UseEventFilterProps } from '@/types/event';
import { FILTER_KEYS } from '@/constants/event';

const useEventFilter = ({
  key = 'sort',
  type = 'single',
}: UseEventFilterProps = {}) => {
  const [queryValue, setQueryValue] = useQueryState(key);
  const [storedValue, setStoredValue] = useSessionStorageState(
    `event-filter-${key}`,
    {
      defaultValue: key === 'sort' ? 'latest' : 'all',
    },
  );

  useEffect(() => {
    if (queryValue) {
      setStoredValue(queryValue); // 쿼리값 있으면 -> 쿼리 사용
    } else if (storedValue) {
      setQueryValue(storedValue); // 쿼리값 없으면 -> 세션스토리지 값 사용해 쿼리 설정
    }
  }, [queryValue, setQueryValue, storedValue, setStoredValue]);

  const handleSelect = (newValue: string) => {
    if (type === 'single') {
      setQueryValue(newValue);
      return;
    }

    // 중복 허용 값일때
    if (newValue === 'all') {
      setQueryValue('all');
      return;
    }

    const currentValues = queryValue?.split(',') ?? ['all'];

    if (currentValues.includes('all')) {
      setQueryValue(newValue);
      return;
    }

    // 이미 선택된 값이면 제거
    if (currentValues.includes(newValue)) {
      const newValues = currentValues.filter((v) => v !== newValue);
      // 선택된 값이 없어지면 '전체' 선택
      setQueryValue(newValues.length === 0 ? 'all' : newValues.join(','));
      return;
    }

    // 새로운 값 추가 (기존 값들 유지하며)
    const newValues = [...currentValues, newValue];
    setQueryValue(newValues.join(','));
  };

  const isSelected = (value: string) => {
    if (type === 'single') {
      return value === queryValue;
    }

    return value === 'all'
      ? queryValue === 'all'
      : !!queryValue?.split(',').includes(value);
  };

  // 각 필터에 대한 쿼리 상태 생성
  const [, setSortQuery] = useQueryState('sort');
  const [, setCategoryQuery] = useQueryState('category');
  const [, setDurationQuery] = useQueryState('duration');
  const [, setPriceQuery] = useQueryState('price');
  const [, setLocationQuery] = useQueryState('location');

  const clearFilter = async () => {
    // 세션 스토리지 초기화
    FILTER_KEYS.forEach((filterKey) => {
      const defaultFilterValue = filterKey === 'sort' ? 'latest' : 'all';
      sessionStorage.setItem(
        `event-filter-${filterKey}`,
        JSON.stringify(defaultFilterValue),
      );
    });

    // 쿼리 파라미터 초기화
    await Promise.all([
      setSortQuery('latest'),
      setCategoryQuery('all'),
      setDurationQuery('all'),
      setPriceQuery('all'),
      setLocationQuery('all'),
    ]);
  };

  return {
    storedValue,
    handleSelect,
    isSelected,
    clearFilter,
  };
};

export default useEventFilter;
