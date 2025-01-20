import { useState, useRef, useEffect } from 'react';
import { useQueryState } from 'nuqs';

interface UseTextFieldsProps {
  queryKey: string;
  onQuerySubmit?: (query: string, key: string) => void;
}

export const useTextFields = ({
  queryKey,
  onQuerySubmit = () => {},
}: UseTextFieldsProps) => {
  const [query, setQuery] = useQueryState(queryKey);
  const [inputValue, setInputValue] = useState(query ?? '');
  const timeoutRef = useRef<number | null>(null);

  // 상태 초기화
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

    timeoutRef.current = window.setTimeout(() => {
      setQuery(value);
    }, 300);
  };

  // Enter 키 처리
  const handleKeyDown = (key: string) => {
    if (key === 'Enter') {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      setQuery(inputValue);
      onQuerySubmit(inputValue, queryKey);
    }
  };

  // 검색어 삭제 핸들러
  const handleClear = () => {
    setInputValue('');
    setQuery('');
  };

  return { inputValue, handleChange, handleKeyDown, handleClear };
};
