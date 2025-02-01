import * as S from './style';
import { EventList } from '@/components';
import { SearchBar } from '@/layouts/search-bar';
import { useRecentSearch } from '@/hooks';

const EventSearchPage = () => {
  const {
    isSearched,
    recentSearch,
    handleClear,
    handleRemoveRecentSearch,
    handleRecentSearchClick,
  } = useRecentSearch({
    queryKey: 'event-search',
    localKey: 'recent-event-search',
  });

  return (
    <S.Container>
      <S.HeaderContainer>
        <SearchBar
          page="event"
          queryKey="event-search"
          localKey="recent-event-search"
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
