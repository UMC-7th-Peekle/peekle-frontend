import { useState } from 'react';
import * as S from './style';
import { ReportInput } from '@/pages/community/[id]/container/modal-section/component/ReportInput';
import { useDelComment } from '@/pages/community/hooks/comment/useDelArticleComment';
import { useCommentModalState } from '@/stores/community/useCommentModalState';

interface ModalSectionProps {
  type: 'bottomSheet' | 'deleteConfirm' | null;
  onClose: () => void;
  onReportClick?: () => void;
  communityId: string;
  articleId: string;
}

export default function CommentModalSection({
  type,
  onClose,
  onReportClick,
  communityId,
  articleId,
}: ModalSectionProps) {
  const [isClosing, setIsClosing] = useState(false);

  if (!type) return null;

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, 300);
  };

  return (
    <>
      {type === 'bottomSheet' && (
        <S.BottomSheetOverlay onClick={handleClose}>
          <S.ReportBottomSheet
            $isClosing={isClosing}
            onClick={(e) => e.stopPropagation()}
          >
            <S.BottomSheetOption
              onClick={() => {
                handleClose();
                if (onReportClick) {
                  setTimeout(onReportClick, 300);
                }
              }}
            >
              댓글 신고하기
            </S.BottomSheetOption>
            <S.BottomSheetCancel onClick={handleClose}>
              닫기
            </S.BottomSheetCancel>
          </S.ReportBottomSheet>
        </S.BottomSheetOverlay>
      )}

      {type === 'deleteConfirm' && (
        <S.BottomSheetOverlay onClick={handleClose}>
          <ReportInput
            onClose={handleClose}
            communityId={communityId}
            articleId={articleId}
          />
        </S.BottomSheetOverlay>
      )}
    </>
  );
}

// 🟢 댓글 수정 & 삭제 모달
CommentModalSection.Mine = function CommentModalSectionMine({
  type,
  onClose,
  onConfirm,
  onDeleteClick,
  articleId,
  communityId = 1,
}: {
  type: 'bottomSheet' | 'deleteConfirm' | null;
  onClose: () => void;
  onConfirm?: () => void;
  onDeleteClick?: () => void;
  articleId: number;
  communityId: number;
}) {
  const [isClosing, setIsClosing] = useState(false);
  const { activeCommentModal } = useCommentModalState();
  const commentId = activeCommentModal?.commentId; // 현재 활성화된 commentId 가져오기
  const delCommentMutation = useDelComment({ articleId, communityId });

  if (!type || !commentId) return null; // commentId가 없으면 렌더링 안 함

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, 300);
  };

  return (
    <>
      {type === 'bottomSheet' && (
        <S.BottomSheetOverlay onClick={handleClose}>
          <S.ReplyBottomSheet
            $isClosing={isClosing}
            onClick={(e) => e.stopPropagation()}
          >
            <S.BottomSheetOption
              onClick={() => {
                handleClose();
                if (onDeleteClick) {
                  setTimeout(onDeleteClick, 300);
                }
              }}
            >
              댓글 삭제하기
            </S.BottomSheetOption>
            <S.BottomSheetCancel onClick={handleClose}>
              닫기
            </S.BottomSheetCancel>
          </S.ReplyBottomSheet>
        </S.BottomSheetOverlay>
      )}

      {type === 'deleteConfirm' && (
        <S.DeleteConfirmOverlay onClick={handleClose}>
          <S.DeleteConfirmModal
            $isClosing={isClosing}
            onClick={(e) => e.stopPropagation()}
          >
            <S.DeleteTitle>삭제하시겠습니까?</S.DeleteTitle>
            <S.DeleteConfirmButtonWrapper>
              <S.CancelButton onClick={handleClose}>취소</S.CancelButton>
              <S.DeleteButton
                onClick={() => {
                  delCommentMutation.mutate(
                    {
                      communityId: communityId || 1,
                      articleId: articleId,
                      commentId: commentId,
                    },
                    {
                      onSuccess: () => {
                        handleClose();
                        if (onConfirm) {
                          setTimeout(onConfirm, 300);
                        }
                      },
                    },
                  );
                }}
              >
                삭제
              </S.DeleteButton>
            </S.DeleteConfirmButtonWrapper>
          </S.DeleteConfirmModal>
        </S.DeleteConfirmOverlay>
      )}
    </>
  );
};
