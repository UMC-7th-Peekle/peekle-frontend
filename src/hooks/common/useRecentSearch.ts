import { useQueryState } from 'nuqs';
import { useState } from 'react';

// 최근 검색을 위한 커스텀 훅
const useRecentSearch = ({ queryKey, localKey }: useRecentSearchProps) => {
  const [query, setQuery] = useQueryState(queryKey);
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
    setQuery(search);
  };

  return {
    query,
    isSearched,
    setQuery,
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
