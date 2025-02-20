import { Backward, ErrorFallback } from '@/components';
import { useGetCommunityDetail } from '../hooks/article/useGetCommunityDetail';
import useCommunityId from '@/hooks/community/useCommunityId';
import * as S from './style';
import ThreeDot from '@/components/common/list';
import MainSection from './container/main-section';
import ModalSection from './container/modal-section';
import CommentSection from '@/pages/community/[id]/container/comment-section';
import { useCommunityModal } from '@/stores/community/useCommunityModal';

export default function CommunityDetailPage() {
  const { communityId, articleId } = useCommunityId();
  const { data, error, isLoading } = useGetCommunityDetail({
    communityId: communityId ?? '',
    articleId: articleId ?? '',
  });

  const { activeModal, setActiveModal, closeModal } = useCommunityModal();

  if (isLoading) {
    return <></>;
  }
  if (error || !communityId || !articleId) {
    return <ErrorFallback />;
  }

  const article = data?.success.article;

  // 자신의 게시글인지 여부
  const isMyArticle = Boolean(
    article?.authorId === Number(localStorage.getItem('user-id')),
  );

  return (
    <>
      <S.MainContainer>
        <S.Appbar>
          <Backward />
          <S.Title>게시글 상세</S.Title>
          <ThreeDot
            size="20px"
            onClick={() => setActiveModal(Number(articleId), 'bottomSheet')}
          />
        </S.Appbar>

        {article && <MainSection article={article} />}
        <S.Boundary />

        {article && <CommentSection article={article} />}
      </S.MainContainer>

      {/* ✅ 모달 추가 */}
      {activeModal?.articleId === Number(articleId) &&
        (isMyArticle ? (
          <ModalSection.Mine
            communityId={1}
            articleId={Number(articleId)}
            type={activeModal.type}
            onClose={closeModal}
            onDeleteClick={() =>
              setActiveModal(Number(articleId), 'deleteConfirm')
            }
          />
        ) : (
          <ModalSection
            type={activeModal.type}
            onClose={closeModal}
            onReportClick={() =>
              setActiveModal(Number(articleId), 'deleteConfirm')
            }
            communityId={communityId}
            articleId={articleId}
          />
        ))}
    </>
  );
}
