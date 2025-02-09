import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePostCommunityArticle } from '../../hooks/mutation/usePostCommunityArticle';

export default function usePostCommunity() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [thumbnail, setThumbnail] = useState<File | null>(null);

  const isFormFilled = title.trim() !== '' && content.trim() !== '';

  const navigate = useNavigate();
  const postCommunityMutation = usePostCommunityArticle();

  const handleToggleAnonymous = () => {
    setIsAnonymous((prev) => !prev);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setContent(event.target.value);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const files = Array.from(event.target.files);
      setSelectedImages((prev) => {
        const newImages = [...prev, ...files];
        if (!thumbnail) setThumbnail(newImages[0]);
        return newImages;
      });
    }
  };

  const handleRemoveImage = (index: number) => {
    setSelectedImages((prev) => {
      const updatedImages = prev.filter((_, i) => i !== index);
      if (thumbnail === prev[index]) {
        setThumbnail(updatedImages[0] || null);
      }
      return updatedImages;
    });
  };

  const handleSelectThumbnail = (image: File) => {
    setThumbnail(image);
  };

  const onSubmit = () => {
    // 폼 조건 검사(제목, 내용)
    if (!isFormFilled) return;

    // 썸네일을 첫번째로 정렬
    const articleImages = thumbnail
      ? [thumbnail, ...selectedImages.filter((image) => image !== thumbnail)]
      : selectedImages;

    // API 요청 실행
    postCommunityMutation.mutate(
      {
        communityId: 1,
        articleImages,
        data: { title, content, isAnonymous },
      },
      {
        onSuccess: () => {
          navigate('/community');
        },
      },
    );
  };

  return {
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
  };
}
