import { Backward, ErrorFallback } from '@/components';
import { useGetCommunityDetail } from '../hooks/query/useGetCommunityDetail';
import useCommunityId from '@/hooks/community/useCommunityId';
import * as S from './style';
import ThreeDot from '@/components/common/list';
import MainSection from './container/main-section';
import CommentSection from './container/comment-section';

export default function CommunityDetailPage() {
  const { communityId, articleId } = useCommunityId();
  const { data, error, isLoading } = useGetCommunityDetail({
    communityId: communityId ?? '',
    articleId: articleId ?? '',
  });

  if (isLoading) {
    return <></>;
  }
  if (error) {
    return <ErrorFallback />;
  }

  return (
    <S.MainContainer>
      <S.Appbar>
        <Backward />
        <S.Title>게시글 상세</S.Title>
        <ThreeDot size="20px" />
      </S.Appbar>
      {data?.success.article && <MainSection article={data?.success.article} />}
      <S.Boundary />
      {data?.success.article.articleComments && (
        <CommentSection comments={data?.success.article.articleComments} />
      )}
    </S.MainContainer>
  );
}
