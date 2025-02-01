import { Backward, CommunityCard, ErrorFallback } from '@/components';
import { useGetCommunityLike } from '../hooks/query/useGetCommunityLike';
import * as S from './style';
import BodySection from './container/body-section';

export default function CommunityLikePage() {
  const { data, isLoading, error } = useGetCommunityLike({
    limit: 10,
    cursor: 47,
  });

  if (isLoading) {
    return (
      <>
        <S.MainContainer>
          <S.Appbar>
            <Backward size="20px" />
            <S.Title>좋아요</S.Title>
            <S.SizedBox />
          </S.Appbar>
          <BodySection.Skeleton />
        </S.MainContainer>
      </>
    );
  }

  if (error || !data?.success) {
    return <ErrorFallback />;
  }

  return (
    <>
      <S.MainContainer>
        <S.Appbar>
          <Backward size="20px" />
          <S.Title>좋아요</S.Title>
          <S.SizedBox />
        </S.Appbar>
        {/* 게시글이 하나도 없을 때 */}
        {data?.success.articles.length === 0 && <BodySection.None />}
        {/* 게시글이 하나 이상일 때 */}
        {data?.success.articles.length > 0 && (
          <BodySection>
            {data.success.articles.map((article) => (
              <CommunityCard
                key={`${article.communityId} + ${article.articleId}`}
                articleId={article.articleId}
                communityId={article.communityId}
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
