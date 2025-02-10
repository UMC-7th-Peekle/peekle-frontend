import { CommentCard, CommentInput } from '@/components';
import {
  CommunityDetailArticle,
  CommunityDetailComments,
} from '@/pages/community/hooks/article/useGetCommunityDetail';
import * as S from './style';
import useComment from './hook/useComment';

interface CommentSectionProps {
  article: CommunityDetailArticle;
  comments: CommunityDetailComments;
}

export default function CommentSection({
  article,
  comments,
}: CommentSectionProps) {
  const { isAnonymous, comment, setComment, onToggleAnonymous, onSubmit } =
    useComment({
      communityId: article.communityId,
      articleId: article.articleId,
    });

  return (
    <>
      {/* 댓글 O */}
      {comments.map((comment, index) => (
        <CommentCard key={`${index} + ${comment}`} comment={comment} />
      ))}
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
