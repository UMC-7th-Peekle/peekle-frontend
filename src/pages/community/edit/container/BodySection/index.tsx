import * as S from './style';
import DeletePhoto from '@/assets/images/community/delete-photo.svg?react';

interface BodySectionProps {
  title: string;
  content: string;
  onTitleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onContentChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  selectedImages: string[];
  thumbnail: string | null;
  onRemoveImage: (index: number) => void;
  onSelectThumbnail: (imageUrl: string) => void;
}

export default function BodySection({
  title,
  content,
  onTitleChange,
  onContentChange,
  selectedImages,
  thumbnail,
  onRemoveImage,
  onSelectThumbnail,
}: BodySectionProps) {
  return (
    <S.ContentContainer>
      <S.TitleField
        type="text"
        placeholder="제목을 입력해주세요."
        value={title}
        onChange={onTitleChange}
      />
      <S.ContentField
        placeholder="자유롭게 내용을 입력해주세요."
        value={content}
        onChange={onContentChange}
      />
      {selectedImages.length > 0 && (
        <S.ImagePreviewContainer>
          {selectedImages.map((imageUrl, index) => (
            <S.ImageWrapper key={index}>
              <S.PreviewImage
                src={imageUrl}
                alt={`Uploaded ${index}`}
                onClick={() => onSelectThumbnail(imageUrl)}
              />
              {thumbnail === imageUrl && (
                <S.MainImageLabel>대표 사진</S.MainImageLabel>
              )}
              <S.DeleteButton onClick={() => onRemoveImage(index)}>
                <DeletePhoto />
              </S.DeleteButton>
            </S.ImageWrapper>
          ))}
        </S.ImagePreviewContainer>
      )}
    </S.ContentContainer>
  );
}
