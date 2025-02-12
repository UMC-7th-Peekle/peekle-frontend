import { CommentCard, CommentInput } from '@/components';
import * as S from './style';
import useComment from './hook/useComment';
import { CommunityDetailArticle } from '@/pages/community/hooks/article/useGetCommunityDetail';
import { useGetArticleComments } from '@/pages/community/hooks/comment/useGetArticleComments';

interface CommentSectionProps {
  article: CommunityDetailArticle;
}

export default function CommentSection({ article }: CommentSectionProps) {
  const { isAnonymous, comment, setComment, onToggleAnonymous, onSubmit } =
    useComment({
      communityId: article.communityId,
      articleId: article.articleId,
    });

  const { data, error, isLoading } = useGetArticleComments({
    communityId: article.communityId,
    articleId: article.articleId,
  });

  if (isLoading) {
    return <></>;
  }

  if (error) {
    return <></>;
  }

  const comments = data?.success.comments || [];

  return (
    <>
      {/* 댓글 O */}
      <S.CommentContainer>
        {comments.map((comment, index) => (
          <CommentCard key={`${index} + ${comment}`} comment={comment} />
        ))}
      </S.CommentContainer>

      {/* 댓글 X */}
      {comments.length === 0 && (
        <S.NoCommentContainer>
          <S.CommentIcon />
          <S.NoCommentText>첫 댓글을 남겨주세요!</S.NoCommentText>
        </S.NoCommentContainer>
      )}

      <CommentInput
        isAnonymous={isAnonymous}
        onToggleAnonymous={onToggleAnonymous}
        comment={comment}
        setComment={setComment}
        onSubmit={onSubmit}
      />
    </>
  );
}
