import { CommentCard, CommentInput, CommentReplyCard } from '@/components';
import * as S from './style';
import useComment from './hook/useComment';
import { CommunityDetailArticle } from '@/pages/community/hooks/article/useGetCommunityDetail';
import {
  ArticleComment,
  ArticleComments,
  useGetArticleComments,
} from '@/pages/community/hooks/comment/useGetArticleComments';

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

  if (error?.response?.status === 204 || !data?.success?.comments?.length) {
    return (
      <>
        <S.NoCommentContainer>
          <S.CommentIcon />
          <S.NoCommentText>첫 댓글을 남겨주세요!</S.NoCommentText>
        </S.NoCommentContainer>
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

  const comments: ArticleComments = data.success.comments;

  const commentMap = new Map<
    number,
    ArticleComment & { replies: ArticleComment[] }
  >();

  comments.forEach((comment) => {
    if (comment.parentCommentId === null) {
      commentMap.set(comment.commentId, { ...comment, replies: [] });
    }
  });

  comments.forEach((comment) => {
    if (comment.parentCommentId !== null) {
      const parent = commentMap.get(comment.parentCommentId);
      if (parent) {
        parent.replies.push(comment);
      }
    }
  });

  return (
    <>
      <S.CommentContainer>
        {Array.from(commentMap.values()).map((comment) => (
          <div key={comment.commentId}>
            <CommentCard comment={comment} />
            {comment.replies.length > 0 && (
              <S.ReplyContainer>
                {comment.replies.map((reply) => (
                  <CommentReplyCard
                    key={reply.commentId}
                    parentCommentId={reply.parentCommentId || 0}
                    comment={reply}
                  />
                ))}
              </S.ReplyContainer>
            )}
          </div>
        ))}
      </S.CommentContainer>
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
