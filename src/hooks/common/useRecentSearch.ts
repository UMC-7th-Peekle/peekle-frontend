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

  // 로컬 스토리지 값 가져오기
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem(localKey) ?? '[]');
    const datas = storedData
      .flat(Infinity)
      .filter(Boolean)
      .filter((item: unknown): item is string => typeof item === 'string');
    if (datas.length > 0) {
      const uniqueData = Array.from(new Set(datas));

      uniqueData.forEach((search) => {
        setRecentSearch(search as string);
      });
    }
  }, [localKey, setRecentSearch]);

  // 로컬 스토리지에 업데이트
  useEffect(() => {
    localStorage.setItem(localKey, JSON.stringify(recentSearch));
  }, [localKey, recentSearch]);

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
