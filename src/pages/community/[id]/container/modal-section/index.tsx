import { useState } from 'react';
import * as S from './style';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';
import { ReportInput } from '@/pages/community/[id]/container/modal-section/component/ReportInput';
import { useDelCommunityArticle } from '@/pages/community/hooks/article/useDelCommunityArticle';
import { useCommunityModal } from '@/stores/community/useCommunityModal';

interface ModalSectionProps {
  type: 'bottomSheet' | 'deleteConfirm' | null;
  onClose: () => void;
  onReportClick?: () => void;
  communityId: string;
  articleId: string;
}

export default function ModalSection({
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
              신고하기
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

// 🟢 게시글 수정 & 삭제 모달
ModalSection.Mine = function ModalSectionMine({
  type,
  onClose,
  onConfirm,
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
  const navigate = useNavigate();
  const delCommunityMutation = useDelCommunityArticle();
  const { setActiveModal } = useCommunityModal();

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
          <S.BottomSheet
            $isClosing={isClosing}
            onClick={(e) => e.stopPropagation()}
          >
            <S.BottomSheetOption
              onClick={() => {
                handleClose();
                setTimeout(() => {
                  navigate(ROUTES.COMMUNITY_EDIT, {
                    state: {
                      communityId: String(communityId),
                      articleId: String(articleId),
                    },
                  });
                }, 300);
              }}
            >
              게시글 수정하기
            </S.BottomSheetOption>

            {/* ✅ 삭제 클릭 시 deleteConfirm 모달로 변경 */}
            <S.BottomSheetOption
              onClick={() => {
                setActiveModal(Number(articleId), 'deleteConfirm');
              }}
            >
              게시글 삭제하기
            </S.BottomSheetOption>

            <S.BottomSheetCancel onClick={handleClose}>
              닫기
            </S.BottomSheetCancel>
          </S.BottomSheet>
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
                  delCommunityMutation.mutate(
                    {
                      communityId: communityId || 1,
                      articleId: articleId,
                    },
                    {
                      onSuccess: () => {
                        navigate(ROUTES.COMMUNITY);
                      },
                    },
                  );
                  handleClose();
                  if (onConfirm) {
                    setTimeout(onConfirm, 300);
                  }
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
