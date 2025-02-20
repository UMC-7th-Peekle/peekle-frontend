import { Backward, CommunityCard, ErrorFallback } from '@/components';
import { useGetCommunityLike } from '../hooks/community/useGetCommunityLike';
import * as S from './style';
import BodySection from './container/body-section';
import { useInfiniteScroll } from '../hooks/util/useInfiniteScroll';
import { ROUTES } from '@/constants/routes';

export default function CommunityLikePage() {
  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetCommunityLike({ limit: 10 });

  // ✅ 무한 스크롤 커스텀 훅 적용
  const { lastElementRef } = useInfiniteScroll({
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  });

  // 로딩 상태 처리
  if (isLoading) {
    return (
      <S.MainContainer>
        <S.Appbar>
          <Backward size="20px" />
          <S.Title>좋아요</S.Title>
          <S.SizedBox />
        </S.Appbar>
        <BodySection.Skeleton />
      </S.MainContainer>
    );
  }

  if (error || !data?.pages) {
    return <ErrorFallback />;
  }

  const articles = data.pages.flatMap((page) => page.success.articles) ?? [];

  return (
    <S.MainContainer>
      <S.Appbar>
        <Backward size="20px" navigateUrl={ROUTES.COMMUNITY} />
        <S.Title>좋아요</S.Title>
        <S.SizedBox />
      </S.Appbar>

      {/* 게시글이 하나도 없을 때 */}
      {articles.length === 0 && <BodySection.None />}

      {/* 게시글이 하나 이상일 때 */}
      {articles.length > 0 && (
        <BodySection>
          {articles.map((article, index, arr) => (
            <CommunityCard
              key={`${article.communityId}-${article.articleId} - ${index}`}
              articleId={article.articleId}
              communityId={article.communityId}
              title={article.title}
              content={article.content}
              date={article.createdAt}
              articleComments={article.articleComments}
              articleLikes={article.articleLikes}
              thumbnail={article.thumbnail}
              ref={index === arr.length - 1 ? lastElementRef : null}
              isLiked={true}
            />
          ))}
        </BodySection>
      )}

      {/* 추가 데이터 로딩 중이면 표시 */}
      {isFetchingNextPage && <BodySection.Skeleton />}
    </S.MainContainer>
  );
}
