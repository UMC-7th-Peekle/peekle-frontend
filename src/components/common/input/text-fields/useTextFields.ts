import { useState, useEffect } from 'react';
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

  // ✅ 검색어가 변경되면 inputValue 업데이트 (검색 기록 클릭 시 반영)
  useEffect(() => {
    if (query) setInputValue(query);
  }, [query]);

  // ✅ 입력값 변경 핸들러 (검색 실행 X, 값만 저장)
  const handleChange = (value: string) => {
    setInputValue(value);
  };

  // ✅ Enter 키 또는 돋보기 버튼 클릭 시 검색 실행
  const handleSubmit = () => {
    if (inputValue.length < 2) {
      alert('두 글자 이상 입력해주세요.', 'none', '확인');
      return;
    }
    setSearchParams({ [queryKey]: inputValue });
    const recentSearch = JSON.parse(localStorage.getItem(localKey) || '[]');
    localStorage.setItem(
      localKey,
      JSON.stringify([...new Set([inputValue, ...recentSearch])]),
    );
    onQuerySubmit?.(inputValue);
  };

  // ✅ Enter 키 감지 (스마트폰 키보드 돋보기 버튼 포함)
  const handleKeyDown = (key: string) => {
    if (key === 'Enter') {
      handleSubmit();
    }
  };

  // ✅ 검색어 삭제
  const handleClear = () => {
    setInputValue('');
    setSearchParams({ [queryKey]: '' });
  };

  return { inputValue, handleChange, handleKeyDown, handleSubmit, handleClear };
};
