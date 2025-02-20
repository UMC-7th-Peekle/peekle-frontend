import * as S from './style';
import LikedCount from './liked-count';
import { ArticleComment } from '@/pages/community/hooks/comment/useGetArticleComments';
import { usePostArticleCommentLike } from '@/pages/community/hooks/like/usePostArticleCommentLike';
import { useCommunityId } from '@/hooks';
import { useDelArticleCommentLike } from '@/pages/community/hooks/like/useDelArticleLikeComment';
import { useCommentReply } from '@/stores/community/useCommentReply';
import { useCommentList } from '@/stores/community/useCommentList';
import { useCommentModalState } from '@/stores/community/useCommentModalState';
import CommentModalSection from '@/pages/community/[id]/container/modal-section/comment-modal';

// 커뮤니티 댓글 컴포넌트
export default function CommentCard({ comment }: CommentCardProps) {
  const { communityId, articleId } = useCommunityId();
  const { replyingTo, setReplyingTo, clearReply } = useCommentReply();
  const { commentAuthors, setCommentAuthor } = useCommentList();
  const { activeCommentModal, setActiveCommentModal, closeCommentModal } =
    useCommentModalState();

  /*mutation*/
  const postArticleCommentLike = usePostArticleCommentLike();
  const deleteArticleCommentLike = useDelArticleCommentLike();

  const isHighlighted = replyingTo?.commentId === comment.commentId;
  const isModalActive = activeCommentModal?.commentId === comment.commentId;

  if (comment.authorInfo === null) {
    return (
      <>
        <S.MainContainer $highlight={isHighlighted}>
          <S.ProfileWrapper>
            <S.ProfileImage image={'/image/peekle-profile.webp'} />
          </S.ProfileWrapper>
          <S.Container>
            <S.TopTextContainer>
              <S.Nickname>-</S.Nickname>
              <S.Date>{comment.createdAt}</S.Date>
            </S.TopTextContainer>
            <S.Content $isDeleted={true}>삭제된 댓글입니다.</S.Content>
            <S.BottomContainer>
              <S.ReplyButton
                onClick={() => {
                  clearReply();
                  setReplyingTo(authorName ?? '', comment.commentId);
                }}
              >
                답글달기
              </S.ReplyButton>
              <S.ListButton
                onClick={() =>
                  setActiveCommentModal(comment.commentId, 'bottomSheet')
                }
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
        </S.MainContainer>
      </>
    );
  }

  const authorName =
    comment.isAnonymous === 0
      ? comment.authorInfo.nickname
      : `익명${comment.isAnonymous}`;

  const profile = comment.authorInfo.profileImage
    ? comment.authorInfo.profileImage
    : '/image/peekle-profile.webp';

  // ✅ 현재 유저가 작성한 댓글인지 확인
  if (commentAuthors[comment.commentId] === undefined) {
    setCommentAuthor(
      comment.commentId,
      comment.authorId === Number(localStorage.getItem('user-id')),
    );
  }

  const isAuthor = commentAuthors[comment.commentId] ?? false;

  return (
    <>
      <S.MainContainer $highlight={isHighlighted}>
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
                clearReply();
                setReplyingTo(authorName ?? '', comment.commentId);
              }}
            >
              답글달기
            </S.ReplyButton>
            <S.ListButton
              onClick={() => {
                setReplyingTo(authorName ?? '', comment.commentId);
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
      </S.MainContainer>

      {/* ✅ 모달 추가 (본인 댓글이면 Mine 모달, 아니면 기본 모달) */}
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
}
