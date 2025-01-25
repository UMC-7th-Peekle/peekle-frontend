import { useState, useRef, useEffect } from 'react';
import { useQueryState } from 'nuqs';
import { useFilteredEventStore } from '@/stores';
import { alert } from '@/utils';
import { EventData } from '@/types/event';

interface UseTextFieldsProps {
  queryKey: string;
  onQuerySubmit?: (query: string) => void;
}

export const useTextFields = ({
  queryKey,
  onQuerySubmit = () => {},
}: UseTextFieldsProps) => {
  const [query, setQuery] = useQueryState(queryKey);
  const [inputValue, setInputValue] = useState(query ?? '');
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const { filteredEvent, setFilteredEvent } = useFilteredEventStore();

  // query 변경 시 inputValue 업데이트 - 검색 기록 클릭 대응
  useEffect(() => {
    setInputValue(query ?? '');
  }, [query]);

  // timeoutRef 정리
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // 검색 입력 핸들러
  const handleChange = (value: string) => {
    setInputValue(value);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setQuery(value);
    }, 300);
  };

  const handleSubmit = () => {
    if (inputValue.length < 2) {
      alert('두 글자 이상 입력해주세요.', 'none', '확인');
      return;
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setQuery(inputValue); // 현재 input 값으로 즉시 쿼리 업데이트
    const searchResult = filteredEvent.filter((event: EventData) =>
      event.title.includes(inputValue),
    );
    setFilteredEvent(searchResult);
    const recentSearch = JSON.parse(
      localStorage.getItem('recent-search') || '[]',
    );
    localStorage.setItem(
      'recent-search',
      JSON.stringify([...new Set([inputValue, ...recentSearch])]),
    );
    onQuerySubmit?.(inputValue);
  };

  // Enter 키 처리
  const handleKeyDown = (key: string) => {
    if (key === 'Enter') {
      handleSubmit();
    }
  };

  // 검색어 삭제 핸들러
  const handleClear = () => {
    setInputValue('');
    setQuery('');
  };

  return { inputValue, handleChange, handleKeyDown, handleSubmit, handleClear };
};
