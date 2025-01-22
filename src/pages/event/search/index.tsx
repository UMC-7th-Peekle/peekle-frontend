import * as S from './style';
import { useEffect, useRef, useState } from 'react';
import { useQueryState } from 'nuqs';
import { EventList, FilterChips } from '@/components';
import { useFilteredEventStore } from '@/stores';
import { alert } from '@/utils';
import { EventData } from '@/types/event';

// 임시 검색
export interface SearchProps {
  queryKey: string;
  placeholder?: string;
}

const Search = () => {
  const [query, setQuery] = useQueryState('q');
  const [inputValue, setInputValue] = useState(query ?? '');
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const { filteredEvent, setFilteredEvent } = useFilteredEventStore();

  // query 변경 시 inputValue 업데이트 - 검색 기록 클릭 대응
  useEffect(() => {
    setInputValue(query ?? '');
  }, [query]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value); // input 값은 즉시 업데이트

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setQuery(value);
    }, 300);
  };

  const handleSearch = () => {
    if (inputValue.length < 2) {
      alert('두 글자 이상 입력해주세요.');
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
  };

  return (
    <S.SearchContainer role="search" aria-label="검색">
      <input
        id="search-input"
        type="search"
        value={inputValue}
        onChange={handleChange}
        placeholder="관심있는 활동 검색"
        aria-label="검색어 입력"
        autoComplete="off"
      />
      <button onClick={handleSearch}>검색</button>
    </S.SearchContainer>
  );
};

const EventSearchPage = () => {
  // 쿼리 파람으로 검색 여부 확인
  const [query, setQuery] = useQueryState('q');
  const isSearched = !!query;
  const [recentSearch, setRecentSearch] = useState<string[]>(() =>
    JSON.parse(localStorage.getItem('recent-search') ?? '[]'),
  );

  const handleClear = () => {
    localStorage.removeItem('recent-search');
    setRecentSearch([]);
  };

  const handleRemoveRecentSearch = (search: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const newSearches = recentSearch.filter((item) => item !== search);
    localStorage.setItem('recent-search', JSON.stringify(newSearches));
    setRecentSearch(newSearches);
  };

  const handleRecentSearchClick = (search: string) => {
    setQuery(search);
  };

  return (
    <S.Container>
      <Search />
      <FilterChips />
      {!isSearched &&
        (recentSearch.length > 0 ? (
          <S.RecentSearchContainer>
            <S.RecentSearchRow>
              <S.RecentSearchTitle>최근 검색</S.RecentSearchTitle>
              <S.ClearButton onClick={handleClear}>전체 삭제</S.ClearButton>
            </S.RecentSearchRow>
            <S.RecentSearchTextContainer>
              {recentSearch.map((search: string) => (
                <S.RecentSearchRow
                  key={`${search}-${new Date().getTime()}`}
                  onClick={() => handleRecentSearchClick(search)}
                >
                  <S.RecentSearchText>{search}</S.RecentSearchText>
                  <S.XIcon
                    onClick={(e) => handleRemoveRecentSearch(search, e)}
                  />
                </S.RecentSearchRow>
              ))}
            </S.RecentSearchTextContainer>
          </S.RecentSearchContainer>
        ) : (
          <S.EmptyText>최근 검색 내역이 없습니다.</S.EmptyText>
        ))}
      {isSearched && <EventList isSearchPage={true} />}
    </S.Container>
  );
};

export default EventSearchPage;
