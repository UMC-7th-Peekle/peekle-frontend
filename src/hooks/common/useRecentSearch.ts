import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useRecentSearchStore } from '@/stores';

// 최근 검색을 위한 커스텀 훅
const useRecentSearch = ({ queryKey, localKey }: useRecentSearchProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get(queryKey) ?? '';
  const isSearched = !!query;
  const {
    recentSearch,
    setRecentSearch,
    removeRecentSearch,
    clearRecentSearch,
  } = useRecentSearchStore();

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem(localKey) ?? '[]');

    if (Array.isArray(storedData)) {
      // 중첩 배열을 평탄화하고, 문자열만 필터링한 후 중복 제거
      const uniqueData = Array.from(
        new Set(storedData.flat().filter((item) => typeof item === 'string')),
      );

      // 각 문자열을 `setRecentSearch`에 개별적으로 추가
      uniqueData.forEach((search) => setRecentSearch(search));
    }
  }, [localKey, setRecentSearch]);

  useEffect(() => {
    localStorage.setItem(localKey, JSON.stringify(recentSearch));
  }, [recentSearch, localKey]);

  useEffect(() => {
    const storedSearches = JSON.parse(localStorage.getItem(localKey) ?? '[]');
    setRecentSearch(storedSearches);
  }, [query, localKey, setRecentSearch]);

  const handleClear = () => {
    clearRecentSearch();
  };

  const handleRemoveRecentSearch = (search: string, e: React.MouseEvent) => {
    e.stopPropagation();
    removeRecentSearch(search);
  };

  const handleRecentSearchClick = (search: string) => {
    setSearchParams((prev) => {
      prev.set(queryKey, search);
      return prev;
    });
  };

  return {
    query,
    isSearched,
    setQuery: handleRecentSearchClick,
    recentSearch,
    handleClear,
    handleRemoveRecentSearch,
    handleRecentSearchClick,
  };
};

interface useRecentSearchProps {
  queryKey: string;
  localKey: string;
}

export default useRecentSearch;
