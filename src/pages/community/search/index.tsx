import * as S from './style';
import {
  Backward,
  CommunityCard,
  ErrorFallback,
  TextFields,
} from '@/components';
import BodySection from '../container/body-section';
import { useRecentSearch } from '@/hooks';
import { useGetCommunity } from '../hooks/community/useGetCommunity';
import { useInfiniteScroll } from '../hooks/util/useInfiniteScroll';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';

export default function CommunitySearchPage() {
  const {
    query,
    isSearched,
    recentSearch,
    handleClear,
    handleRemoveRecentSearch,
    handleRecentSearchClick,
  } = useRecentSearch({
    queryKey: 'community-search',
    localKey: 'recent-community-search',
  });

  const {
    data,
    error,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetCommunity({
    limit: 5,
    query: query ?? '',
    communityId: 1,
  });

  const navigate = useNavigate();

  const { lastElementRef } = useInfiniteScroll({
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  });

  if (isLoading) {
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
          <BodySection.Skeleton />
        </S.MainContainer>
      </>
    );
  }

  if (error) {
    return <ErrorFallback />;
  }

  const articles =
    data?.pages.flatMap((page) => page?.success.articles ?? []) ?? [];

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

        {/* 최근 검색어 목록 */}
        {!isSearched &&
          (recentSearch.length > 0 ? (
            <S.RecentSearchContainer>
              <S.RecentSearchRow>
                <S.RecentSearchTitle>최근 검색</S.RecentSearchTitle>
                <S.ClearButton onClick={handleClear}>전체 삭제</S.ClearButton>
              </S.RecentSearchRow>
              <S.RecentSearchTextContainer>
                {recentSearch.map((search) => (
                  <S.RecentSearchRow
                    key={search}
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
            <S.NoRecentSearch />
          ))}

        {/* 검색어가 없을때 */}
        {articles.length === 0 && query && isSearched && (
          <BodySection.None
            onClick={() => navigate(ROUTES.COMMUNITY_EDIT)}
            subTitle={`"${query}"에 관한\n첫 게시글을 작성해보세요!`}
          ></BodySection.None>
        )}

        {/* 검색된 게시글 리스트 */}
        {isSearched && articles.length > 0 && (
          <BodySection>
            {articles.map((article, index, arr) => (
              <CommunityCard
                key={`${article.communityId}, ${article.articleId}, ${index}`}
                communityId={article.communityId}
                articleId={article.articleId}
                title={article.title}
                content={article.content}
                date={article.createdAt}
                articleComments={article.articleComments}
                articleLikes={article.articleLikes}
                thumbnail={article.thumbnail}
                ref={index === arr.length - 1 ? lastElementRef : null}
              />
            ))}
          </BodySection>
        )}

        {/* 추가 로딩 중이면 표시 */}
        {isFetchingNextPage && <BodySection.Skeleton />}
      </S.MainContainer>
    </>
  );
}
