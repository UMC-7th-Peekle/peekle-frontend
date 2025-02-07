import { useState } from 'react';

export default function usePostCommunity() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [thumbnail, setThumbnail] = useState<string | null>(null);

  const isFormFilled = title.trim() !== '' && content.trim() !== '';

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
      const imageUrls = files.map((file) => URL.createObjectURL(file));
      setSelectedImages((prev) => {
        const newImages = [...prev, ...imageUrls];
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

  const handleSelectThumbnail = (image: string) => {
    setThumbnail(image);
  };

  const onSubmit = () => {
    console.log('게시글 제출:', {
      title,
      content,
      isAnonymous,
      selectedImages,
      thumbnail,
    });
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
