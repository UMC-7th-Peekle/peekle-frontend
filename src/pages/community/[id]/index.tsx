import { useState } from 'react';
import { Backward, ErrorFallback } from '@/components';
import { useGetCommunityDetail } from '../hooks/article/useGetCommunityDetail';
import useCommunityId from '@/hooks/community/useCommunityId';
import * as S from './style';
import ThreeDot from '@/components/common/list';
import MainSection from './container/main-section';
import ModalSection from './container/modal-section';
import { ROUTES } from '@/constants/routes';
import CommentSection from '@/pages/community/[id]/container/comment-section';

export default function CommunityDetailPage() {
  const { communityId, articleId } = useCommunityId();
  const { data, error, isLoading } = useGetCommunityDetail({
    communityId: communityId ?? '',
    articleId: articleId ?? '',
  });

  const [modalType, setModalType] = useState<
    'bottomSheet' | 'deleteConfirm' | null
  >(null);

  if (isLoading) {
    return <></>;
  }
  if (error) {
    return <ErrorFallback />;
  }

  const article = data?.success.article;

  return (
    <>
      <S.MainContainer>
        <S.Appbar>
          <Backward navigateUrl={ROUTES.COMMUNITY} />
          <S.Title>게시글 상세</S.Title>
          <ThreeDot size="20px" onClick={() => setModalType('bottomSheet')} />
        </S.Appbar>

        {article && <MainSection article={article} />}
        <S.Boundary />

        {article && <CommentSection article={article} />}
      </S.MainContainer>

      {/* ✅ 모달 추가 */}
      <ModalSection
        communityId={1}
        articleId={Number(articleId)}
        type={modalType}
        onClose={() => setModalType(null)}
        onDeleteClick={() => setModalType('deleteConfirm')}
      />
    </>
  );
}
