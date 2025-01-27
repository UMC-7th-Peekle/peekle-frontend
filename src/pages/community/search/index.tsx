import * as S from './style';
import { useGetCommunityId } from '@/pages/community/hooks/query/useGetCommunityId';
import { Backward, TextFields } from '@/components';
import { useQueryState } from 'nuqs';
import { useState } from 'react';
import * as SS from '../../event/search/style';

export default function CommunitySearchPage() {
  const communityId = 1; // 임시로 설정
  const { data, error, isLoading } = useGetCommunityId(communityId);

  console.log(data);

  // 쿼리 파람으로 검색 여부 확인
  const [query, setQuery] = useQueryState('community-search');
  const isSearched = !!query;
  const [recentSearch, setRecentSearch] = useState<string[]>(() =>
    JSON.parse(localStorage.getItem('recent-community-search') ?? '[]'),
  );

  const handleClear = () => {
    localStorage.removeItem('recent-community-search');
    setRecentSearch([]);
  };

  const handleRemoveRecentSearch = (search: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const newSearches = recentSearch.filter((item) => item !== search);
    localStorage.setItem(
      'recent-community-search',
      JSON.stringify(newSearches),
    );
    setRecentSearch(newSearches);
  };

  const handleRecentSearchClick = (search: string) => {
    setQuery(search);
  };

  // 로딩 상태 처리
  if (isLoading)
    return (
      <>
        <S.MainContainer>
          <S.Appbar>
            <Backward size={'28px'} />
          </S.Appbar>
        </S.MainContainer>
      </>
    );

  // 에러 상태 처리
  if (error) return <></>;

  return (
    <>
      <S.MainContainer>
        <S.Appbar>
          <Backward size={'28px'} />
          <TextFields
            queryKey="community-search"
            localKey="recent-community-search"
            placeholder="글 제목, 내용을 검색해보세요"
            min_width={333}
            max_width={333}
          />
        </S.Appbar>
        {!isSearched &&
          (recentSearch.length > 0 ? (
            <SS.RecentSearchContainer>
              <SS.RecentSearchRow>
                <SS.RecentSearchTitle>최근 검색</SS.RecentSearchTitle>
                <SS.ClearButton onClick={handleClear}>전체 삭제</SS.ClearButton>
              </SS.RecentSearchRow>
              <SS.RecentSearchTextContainer>
                {recentSearch.map((search: string) => (
                  <SS.RecentSearchRow
                    key={`${search}-${new Date().getTime()}`}
                    onClick={() => handleRecentSearchClick(search)}
                  >
                    <SS.RecentSearchText>{search}</SS.RecentSearchText>
                    <SS.XIcon
                      onClick={(e) => handleRemoveRecentSearch(search, e)}
                    />
                  </SS.RecentSearchRow>
                ))}
              </SS.RecentSearchTextContainer>
            </SS.RecentSearchContainer>
          ) : (
            <SS.EmptyText>최근 검색 내역이 없습니다.</SS.EmptyText>
          ))}
      </S.MainContainer>
    </>
  );
}
