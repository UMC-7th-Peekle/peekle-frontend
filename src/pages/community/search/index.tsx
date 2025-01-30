import * as S from './style';
import { Backward, CommunityCard, TextFields } from '@/components';
import * as SS from '../../event/search/style';
import BodySection from '../container/body-section';
import { useRecentSearch } from '@/hooks';
import { useGetCommunity } from '../hooks/query/useGetCommunity';

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

  const { data, error, isLoading } = useGetCommunity({
    limit: 5,
    query: query ?? '',
    communityId: 1,
  });

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
        {error && (
          <BodySection.None
            subTitle={`"${query}"에 관한\n첫 게시글을 작성해보세요!`}
          ></BodySection.None>
        )}
        {isLoading && <BodySection.Skeleton />}
        {isSearched && data?.success?.articles.length && (
          <BodySection>
            {data.success.articles.map((article) => (
              <CommunityCard
                key={`${article.communityId} + ${article.articleId}`}
                communityId={article.communityId}
                articleId={article.articleId}
                title={article.title}
                content={article.content}
                date={article.createdAt}
                articleComments={article.articleComments}
                articleLikes={article.articleLikes}
                thumbnail={article.thumbnail}
              />
            ))}
          </BodySection>
        )}
      </S.MainContainer>
    </>
  );
}
