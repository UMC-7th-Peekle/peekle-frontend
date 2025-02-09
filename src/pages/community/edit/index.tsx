import { Backward } from '@/components';
import * as S from './style';
import BodySection from './container/BodySection';
import BottomSection from './container/BottomSection';
import usePostCommunity from './hook/usePostCommunity';

export default function CommunityEditPage() {
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
  } = usePostCommunity();

  return (
    <S.MainContainer>
      <S.Appbar>
        <Backward />
        <S.Title>글쓰기</S.Title>
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
      />
    </S.MainContainer>
  );
}
