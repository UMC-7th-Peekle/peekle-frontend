import { useState } from 'react';
import * as S from './style';
import { useDelCommunityArticle } from '@/pages/community/hooks/article/useDelCommunityArticle';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';

interface ModalSectionProps {
  type: 'bottomSheet' | 'deleteConfirm' | null;
  onClose: () => void;
  onConfirm?: () => void;
  onDeleteClick?: () => void;
  articleId: number;
  communityId: number;
}

export default function ModalSection({
  type,
  onClose,
  onConfirm,
  onDeleteClick,
  articleId,
  communityId = 1,
}: ModalSectionProps) {
  const [isClosing, setIsClosing] = useState(false);
  const navigate = useNavigate();
  const delCommunityMutation = useDelCommunityArticle();

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
              onClick={() =>
                navigate(ROUTES.COMMUNITY_EDIT, {
                  state: {
                    communityId: String(communityId),
                    articleId: String(articleId),
                  },
                })
              }
            >
              게시글 수정하기
            </S.BottomSheetOption>
            <S.BottomSheetOption
              onClick={() => {
                handleClose();
                if (onDeleteClick) {
                  setTimeout(onDeleteClick, 300);
                }
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
                  // API 요청 실행
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
}
