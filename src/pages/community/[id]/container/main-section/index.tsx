import { CommunityDetailArticle } from '@/pages/community/hooks/article/useGetCommunityDetail';
import * as S from './style';
import { CommentCountCard, LikeCard } from '@/components';
import useImageScroll from '@/pages/community/hooks/util/useImageScroll';
import { usePostArticleLike } from '@/pages/community/hooks/like/usePostArticleLike';
import { useDelArticleLike } from '@/pages/community/hooks/like/useDelArticleLike';

interface MainSectionProps {
  article: CommunityDetailArticle;
}

export default function MainSection({ article }: MainSectionProps) {
  const {
    setSelectedImageIndex,
    setCurrentIndex,
    selectedImageIndex,
    handleTouchEnd,
    handleTouchStart,
    currentIndex,
    touchEndX,
  } = useImageScroll({ article });

  const postArticleLikeMutation = usePostArticleLike();
  const delArticleLikeMutation = useDelArticleLike();

  return (
    <S.MainContainer>
      {/* 프로필 정보 */}
      <S.Profile>
        <S.ProfileImage
          image={
            article.authorInfo.profileImage
              ? `${article.authorInfo.profileImage}`
              : '/image/peekle-profile.webp'
          }
        />
        <S.ProfileTextContainer>
          <S.ProfileName>
            {article.isAnonymous ? '익명' : `${article.authorInfo.nickname}`}
          </S.ProfileName>
          <S.ProfileDate>{article.createdAt}</S.ProfileDate>
        </S.ProfileTextContainer>
      </S.Profile>

      {/* 제목 및 내용 */}
      <S.Title>{article.title}</S.Title>
      <S.Content>{article.content}</S.Content>

      {/* 이미지 목록 */}
      {article.articleImages.length > 0 && (
        <S.ImageWrapper>
          {article.articleImages.map((image, index) => (
            <S.ImageItem
              key={index}
              src={image.imageUrl}
              alt={`게시글 이미지 ${index + 1}`}
              onClick={() => {
                setSelectedImageIndex(index);
                setCurrentIndex(index);
              }}
            />
          ))}
        </S.ImageWrapper>
      )}

      {/* 좋아요 및 댓글 수 */}
      <S.CountWrapper>
        <LikeCard
          isLiked={article.isLikedByUser}
          count={article.articleLikesCount}
          onClick={() => {
            if (article.isLikedByUser) {
              // 좋아요가 이미 눌린 상태라면 좋아요 삭제 요청
              delArticleLikeMutation.mutate({
                communityId: article.communityId,
                articleId: article.articleId,
              });
            } else {
              // 좋아요가 눌리지 않은 상태라면 좋아요 요청
              postArticleLikeMutation.mutate({
                communityId: article.communityId,
                articleId: article.articleId,
              });
            }
          }}
        />
        <CommentCountCard count={article.commentsCount} />
      </S.CountWrapper>

      {/* 이미지 클릭 시 확대 모달 (슬라이드 가능) */}
      {selectedImageIndex !== null && (
        <S.ModalOverlay onClick={() => setSelectedImageIndex(null)}>
          <S.ModalContent
            onTouchStart={handleTouchStart}
            onTouchMove={(e) => (touchEndX.current = e.touches[0].clientX)}
            onTouchEnd={handleTouchEnd}
          >
            <S.ModalSlider $currentIndex={currentIndex}>
              {article.articleImages.map((image, index) => (
                <S.ModalImage
                  key={index}
                  src={image.imageUrl}
                  alt="확대된 이미지"
                />
              ))}
            </S.ModalSlider>
          </S.ModalContent>
        </S.ModalOverlay>
      )}
    </S.MainContainer>
  );
}
