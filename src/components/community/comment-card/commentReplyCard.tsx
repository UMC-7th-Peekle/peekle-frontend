import * as S from './style';
import LikedCount from './liked-count';
import { ArticleComment } from '@/pages/community/hooks/comment/useGetArticleComments';
import Reply from '@/assets/images/community/reply.svg?react';
import { useCommunityId } from '@/hooks';
import { usePostArticleCommentLike } from '@/pages/community/hooks/like/usePostArticleCommentLike';
import { useDelArticleCommentLike } from '@/pages/community/hooks/like/useDelArticleLikeComment';
import { useCommentReply } from '@/stores/community/useCommentReply';

// 커뮤니티 대댓글 컴포넌트
export default function CommentReplyCard({ comment }: CommentCardProps) {
  const { communityId, articleId } = useCommunityId();
  const { replyingTo, setReplyingTo } = useCommentReply();

  /*mutation*/
  const postArticleCommentLike = usePostArticleCommentLike();
  const deleteArticleCommentLike = useDelArticleCommentLike();

  const authorName =
    comment.isAnonymous === 0
      ? comment.authorInfo.nickname
      : `익명${comment.isAnonymous}`;

  const profile = comment.authorInfo.profileImage
    ? comment.authorInfo.profileImage
    : '/image/peekle-profile.webp';

  // ✅ 현재 commentId가 reply 대상과 일치하면 primary100 배경 적용
  const isHighlighted = replyingTo?.commentId === comment.commentId;

  return (
    <S.ReplyContainer $highlight={isHighlighted}>
      <S.ReplyWrapper>
        <Reply />
      </S.ReplyWrapper>
      <S.ProfileWrapper>
        <S.ProfileImage image={profile} />
      </S.ProfileWrapper>
      <S.Container>
        <S.TopTextContainer>
          <S.Nickname>{authorName}</S.Nickname>
          <S.Date>{comment.createdAt}</S.Date>
        </S.TopTextContainer>
        <S.Content>{comment.content}</S.Content>
        <S.BottomContainer>
          <S.ReplyButton
            onClick={() => {
              if (!authorName || !comment.commentId) {
                return;
              }
              setReplyingTo(authorName, comment.commentId);
            }}
          >
            답글달기
          </S.ReplyButton>
          <S.ListButton />
        </S.BottomContainer>
      </S.Container>
      <S.LeftContainer>
        <LikedCount
          count={comment.commentLikesCount}
          isLiked={comment.isLikedByUser}
          onClick={() => {
            if (comment.isLikedByUser) {
              deleteArticleCommentLike.mutate({
                communityId: Number(communityId) || 0,
                articleId: Number(articleId) || 0,
                commentId: comment.commentId,
              });
            } else {
              postArticleCommentLike.mutate({
                communityId: Number(communityId) || 0,
                articleId: Number(articleId) || 0,
                commentId: comment.commentId,
              });
            }
          }}
        />
      </S.LeftContainer>
    </S.ReplyContainer>
  );
}

interface CommentCardProps {
  comment: ArticleComment;
}
