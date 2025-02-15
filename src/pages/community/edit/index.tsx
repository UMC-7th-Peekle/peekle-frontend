import { Backward } from '@/components';
import * as S from './style';
import BodySection from './container/BodySection';
import BottomSection from './container/BottomSection';
import usePostCommunity from './hook/usePostCommunity';
import { useLocation } from 'react-router-dom';

export default function CommunityEditPage() {
  const location = useLocation();
  const { state } = location;

  const articleId = state?.articleId || null;
  const communityId = state?.communityId || null;

  const isPatch = Boolean(articleId && communityId);

  const {
    title,
    content,
    isAnonymous,
    selectedImages,
    thumbnail,
    isFormFilled,
    handleToggleAnonymous,
    handleTitleChange,
    handleContentChange,
    handleImageUpload,
    handleRemoveImage,
    handleSelectThumbnail,
    onSubmit,
  } = usePostCommunity({ isPatch, communityId, articleId });

  return (
    <S.MainContainer>
      <S.Appbar>
        <Backward navigateUrl={`/community/${communityId}/${articleId}`} />
        <S.Title>{isPatch ? '글 수정' : '글쓰기'}</S.Title>
        <S.SubmitButton as="button" $isActive={isFormFilled} onClick={onSubmit}>
          완료
        </S.SubmitButton>
      </S.Appbar>
      <BodySection
        title={title}
        content={content}
        onTitleChange={handleTitleChange}
        onContentChange={handleContentChange}
        selectedImages={selectedImages}
        thumbnail={thumbnail}
        onRemoveImage={handleRemoveImage}
        onSelectThumbnail={handleSelectThumbnail}
      />
      <BottomSection
        isAnonymous={isAnonymous}
        onToggleAnonymous={handleToggleAnonymous}
        onImageUpload={handleImageUpload}
        selectedImageCount={selectedImages.length}
      />
    </S.MainContainer>
  );
}
