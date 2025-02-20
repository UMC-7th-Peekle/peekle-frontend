import * as S from './style';
import LikedCount from './liked-count';
import { ArticleComment } from '@/pages/community/hooks/comment/useGetArticleComments';
import Reply from '@/assets/images/community/reply.svg?react';
import { useCommunityId } from '@/hooks';
import { usePostArticleCommentLike } from '@/pages/community/hooks/like/usePostArticleCommentLike';
import { useDelArticleCommentLike } from '@/pages/community/hooks/like/useDelArticleLikeComment';
import { useCommentReply } from '@/stores/community/useCommentReply';
import { useCommentList } from '@/stores/community/useCommentList';
import { useCommentModalState } from '@/stores/community/useCommentModalState';
import CommentModalSection from '@/pages/community/[id]/container/modal-section/comment-modal';

// 커뮤니티 대댓글 컴포넌트
export default function CommentReplyCard({
  comment,
  parentCommentId,
}: CommentCardProps) {
  const { communityId, articleId } = useCommunityId();
  const { reReplyingTo, setReReplyingTo, clearReply } = useCommentReply();
  const { commentAuthors, setCommentAuthor } = useCommentList();
  const { activeCommentModal, setActiveCommentModal, closeCommentModal } =
    useCommentModalState();

  /*mutation*/
  const postArticleCommentLike = usePostArticleCommentLike();
  const deleteArticleCommentLike = useDelArticleCommentLike();

  const isHighlighted = reReplyingTo?.commentId === comment.commentId;
  const isModalActive = activeCommentModal?.commentId === comment.commentId;

  if (comment.authorInfo === null) {
    return;
  }

  const authorName =
    comment.isAnonymous === 0
      ? comment.authorInfo.nickname
      : `익명${comment.isAnonymous}`;

  const profile = comment.authorInfo.profileImage
    ? comment.authorInfo.profileImage
    : '/image/peekle-profile.webp';

  // ✅ 현재 commentId가 reply 대상과 일치하면 primary100 배경 적용

  if (commentAuthors[comment.commentId] === undefined) {
    setCommentAuthor(
      comment.commentId,
      comment.authorId === Number(localStorage.getItem('user-id')),
    );
  }

  const isAuthor = commentAuthors[comment.commentId] ?? false;

  return (
    <>
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
          <S.Content $isDeleted={false}>{comment.content}</S.Content>
          <S.BottomContainer>
            <S.ReplyButton
              onClick={() => {
                if (!authorName || !comment.commentId) {
                  return;
                }
                clearReply();
                setReReplyingTo(authorName, comment.commentId, parentCommentId);
              }}
            >
              답글달기
            </S.ReplyButton>
            <S.ListButton
              onClick={() => {
                setReReplyingTo(
                  authorName ?? '',
                  comment.commentId,
                  parentCommentId,
                );
                setActiveCommentModal(comment.commentId, 'bottomSheet');
              }}
            />
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
      {isModalActive &&
        (isAuthor ? (
          <CommentModalSection.Mine
            communityId={Number(communityId)}
            articleId={Number(articleId)}
            type={activeCommentModal?.type}
            onClose={closeCommentModal}
            onDeleteClick={() =>
              setActiveCommentModal(comment.commentId, 'deleteConfirm')
            }
          />
        ) : (
          <CommentModalSection
            type={activeCommentModal?.type}
            onClose={closeCommentModal}
            communityId={communityId ?? ''}
            articleId={articleId ?? ''}
            onReportClick={() =>
              setActiveCommentModal(comment.commentId, 'deleteConfirm')
            }
          />
        ))}
    </>
  );
}

interface CommentCardProps {
  comment: ArticleComment;
  parentCommentId: number;
}
