import * as S from './style';
import { useNavigate } from 'react-router-dom';
import { useGetCommunity } from './hooks/community/useGetCommunity';
import BodySection from '@/pages/community/container/body-section';
import CommunityCard from '@/components/community/community-card';
import { EditButton, ErrorFallback } from '@/components';
import { useInfiniteScroll } from './hooks/util/useInfiniteScroll';
import Header from '@/layouts/header';
import { ROUTES } from '@/constants/routes';

export default function CommunityPage() {
  const navigate = useNavigate();
  const {
    data,
    error,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetCommunity({ limit: 5 });

  const { lastElementRef } = useInfiniteScroll({
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  });

  // ✅ 로딩 중인 경우
  if (isLoading) {
    return (
      <S.MainContainer>
        <Header page={'community'} />
        <BodySection.Skeleton />
      </S.MainContainer>
    );
  }

  // ✅ 에러 발생 시
  if (error) return <ErrorFallback />;

  const articles =
    data?.pages.flatMap((page) => page?.success.articles ?? []) ?? [];

  return (
    <S.MainContainer>
      {/* 상단 앱바 */}
      <Header page={'community'} />

      {/* 게시글 목록 */}
      {articles.length > 0 ? (
        <BodySection>
          {articles.map((article, index, arr) => (
            <CommunityCard
              key={`${article.communityId}-${article.articleId}-${index}`}
              communityId={article.communityId}
              articleId={article.articleId}
              title={article.title}
              content={article.content}
              date={article.createdAt}
              articleComments={article.articleComments}
              articleLikes={article.articleLikes}
              isLiked={article.isLikedByUser}
              thumbnail={article.thumbnail}
              ref={index === arr.length - 1 ? lastElementRef : null}
            />
          ))}
        </BodySection>
      ) : (
        // 게시글이 없는 경우 메시지 출력
        <BodySection.None subTitle={'첫 번째 게시글을\n작성해보세요!'} />
      )}

      {/* 글 작성 버튼 */}
      {articles.length > 0 && (
        <S.EditButtonWrapper>
          <EditButton onClick={() => navigate(ROUTES.COMMUNITY_EDIT)} />
        </S.EditButtonWrapper>
      )}
    </S.MainContainer>
  );
}
