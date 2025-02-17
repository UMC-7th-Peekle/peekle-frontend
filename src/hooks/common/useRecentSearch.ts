import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

// 최근 검색을 위한 커스텀 훅
const useRecentSearch = ({ queryKey, localKey }: useRecentSearchProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get(queryKey) ?? '';
  const isSearched = !!query;
  const [recentSearch, setRecentSearch] = useState<string[]>(() =>
    JSON.parse(localStorage.getItem(localKey) ?? '[]'),
  );

  const handleClear = () => {
    localStorage.removeItem(localKey);
    setRecentSearch([]);
  };

  const handleRemoveRecentSearch = (search: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const newSearches = recentSearch.filter((item) => item !== search);
    localStorage.setItem(localKey, JSON.stringify(newSearches));
    setRecentSearch(newSearches);
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
