import { useState } from 'react';
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

  const [sheetOpen, setSheetOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  if (isLoading) {
    return <></>;
  }
  if (error) {
    return <ErrorFallback />;
  }

  return (
    <>
      <S.MainContainer>
        <S.Appbar>
          <Backward />
          <S.Title>게시글 상세</S.Title>
          <ThreeDot size="20px" onClick={() => setSheetOpen(true)} />
        </S.Appbar>
        {data?.success.article && (
          <MainSection article={data?.success.article} />
        )}
        <S.Boundary />
        {data?.success.article.articleComments && (
          <CommentSection comments={data?.success.article.articleComments} />
        )}
      </S.MainContainer>

      {/* 바텀시트 */}
      {sheetOpen && (
        <S.BottomSheetOverlay onClick={() => setSheetOpen(false)}>
          <S.BottomSheet onClick={(e) => e.stopPropagation()}>
            <S.BottomSheetOption onClick={() => console.log('게시글 수정하기')}>
              게시글 수정하기
            </S.BottomSheetOption>
            <S.BottomSheetOption
              onClick={() => {
                setSheetOpen(false);
                setDeleteModalOpen(true);
              }}
            >
              게시글 삭제하기
            </S.BottomSheetOption>
            <S.BottomSheetCancel onClick={() => setSheetOpen(false)}>
              닫기
            </S.BottomSheetCancel>
          </S.BottomSheet>
        </S.BottomSheetOverlay>
      )}

      {/* 삭제 확인 모달 */}
      {deleteModalOpen && (
        <S.DeleteConfirmOverlay onClick={() => setDeleteModalOpen(false)}>
          <S.DeleteConfirmModal onClick={(e) => e.stopPropagation()}>
            <S.DeleteTitle>삭제하시겠습니까?</S.DeleteTitle>
            <S.DeleteConfirmButtonWrapper>
              <S.CancelButton onClick={() => setDeleteModalOpen(false)}>
                취소
              </S.CancelButton>
              <S.DeleteButton onClick={() => console.log('삭제 실행')}>
                삭제
              </S.DeleteButton>
            </S.DeleteConfirmButtonWrapper>
          </S.DeleteConfirmModal>
        </S.DeleteConfirmOverlay>
      )}
    </>
  );
}
