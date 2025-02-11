import { useState, useRef, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { alert } from '@/utils';

interface UseTextFieldsProps {
  queryKey: string;
  onQuerySubmit?: (query: string) => void;
  localKey: string;
}

export const useTextFields = ({
  queryKey,
  localKey,
  onQuerySubmit = () => {},
}: UseTextFieldsProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get(queryKey) ?? '';
  const [inputValue, setInputValue] = useState(query ?? '');
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // unmount시 timeoutRef 정리
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // query 변경 시 inputValue 업데이트 - 이전 검색 기록 클릭 대응
  useEffect(() => {
    if (query) setInputValue(query);
  }, [query]);

  // 검색 입력 핸들러
  const handleChange = (value: string) => {
    setInputValue(value);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setSearchParams({ [queryKey]: value });
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
    setSearchParams({ [queryKey]: inputValue }); // 현재 input 값으로 즉시 쿼리 업데이트
    const recentSearch = JSON.parse(localStorage.getItem(localKey) || '[]');
    localStorage.setItem(
      localKey,
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
    setSearchParams({ [queryKey]: '' });
  };

  return { inputValue, handleChange, handleKeyDown, handleSubmit, handleClear };
};
