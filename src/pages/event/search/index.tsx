import * as S from './style';
import { useState } from 'react';
import { useQueryState } from 'nuqs';
import { EventList } from '@/components';
import { SearchBar } from '@/layouts/search-bar';

const EventSearchPage = () => {
  // 쿼리 파람으로 검색 여부 확인
  const [query, setQuery] = useQueryState('event-search');
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

  console.log('recentSearches', recentSearch);

  return (
    <S.Container>
      <S.HeaderContainer>
        <SearchBar
          page="event"
          queryKey="event-search"
          placeholder="관심있는 활동 검색"
        />
      </S.HeaderContainer>
      {!isSearched &&
        (recentSearch.length > 0 ? (
          <S.RecentSearchContainer>
            <S.RecentSearchRow>
              <S.RecentSearchTitle>최근 검색</S.RecentSearchTitle>
              <S.ClearButton onClick={handleClear}>전체 삭제</S.ClearButton>
            </S.RecentSearchRow>
            <S.RecentSearchTextContainer>
              {recentSearch.map((search: string, index: number) => (
                <S.RecentSearchRow
                  key={`${search}-${index}`}
                  onClick={() => handleRecentSearchClick(search)}
                >
                  <S.Left>
                    <S.RecentIcon />
                    <S.RecentSearchText>{search}</S.RecentSearchText>
                  </S.Left>
                  <S.XIcon
                    onClick={(e) => handleRemoveRecentSearch(search, e)}
                  />
                </S.RecentSearchRow>
              ))}
            </S.RecentSearchTextContainer>
          </S.RecentSearchContainer>
        ) : (
          <S.NoRecentSearch />
        ))}
      {isSearched && <EventList page={'search'} />}
    </S.Container>
  );
};

export default EventSearchPage;
