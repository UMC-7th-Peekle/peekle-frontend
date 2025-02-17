import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetCommunityDetail } from '@/pages/community/hooks/article/useGetCommunityDetail';
import { usePostCommunityArticle } from '@/pages/community/hooks/article/usePostCommunityArticle';
import { usePatchCommunityArticle } from '@/pages/community/hooks/article/usePatchCommunityArticle';
import { submitPatch } from '@/pages/community/edit/utils/submitPatch';
import { submitPost } from '@/pages/community/edit/utils/submitPost';

export default function usePostCommunity({
  isPatch,
  communityId,
  articleId,
}: {
  isPatch: boolean;
  communityId: string;
  articleId: string;
}) {
  const navigate = useNavigate();
  const postCommunityMutation = usePostCommunityArticle();
  const patchCommunityMutation = usePatchCommunityArticle();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [thumbnail, setThumbnail] = useState<string | null>(null);

  const { data } = useGetCommunityDetail({
    communityId: isPatch ? communityId : '',
    articleId: isPatch ? articleId : '',
  });

  useEffect(() => {
    if (isPatch && data?.success.article) {
      const resp = data.success.article;
      setTitle(resp.title || '');
      setContent(resp.content || '');
      setIsAnonymous(resp.isAnonymous || false);
      setSelectedImages(
        resp.articleImages?.map((image) => image.imageUrl) || [],
      );
      setThumbnail(resp.articleImages?.[0]?.imageUrl || null);
    }
  }, [isPatch, data]);

  const isFormFilled = title.trim() !== '' && content.trim() !== '';

  const handleToggleAnonymous = () => setIsAnonymous((prev) => !prev);
  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setTitle(event.target.value);
  const handleContentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) =>
    setContent(event.target.value);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const files = Array.from(event.target.files).map((file) =>
        URL.createObjectURL(file),
      );
      setSelectedImages((prev) => [...prev, ...files]);
      if (!thumbnail) setThumbnail(files[0]);
    }
  };

  const handleRemoveImage = (index: number) => {
    setSelectedImages((prev) => {
      const updatedImages = prev.filter((_, i) => i !== index);
      if (thumbnail === prev[index]) setThumbnail(updatedImages[0] || null);
      return updatedImages;
    });
  };

  const handleSelectThumbnail = (imageUrl: string) => setThumbnail(imageUrl);

  const onSubmit = () => {
    if (!isFormFilled) {
      console.error('🚨 제목과 내용이 비어 있습니다.');
      return;
    }

    if (data && isPatch) {
      submitPatch(
        communityId,
        articleId,
        title,
        content,
        isAnonymous,
        selectedImages,
        navigate,
        patchCommunityMutation,
        data, // ✅ 기존 데이터를 함께 넘김
        thumbnail,
      );
    } else {
      submitPost(
        title,
        content,
        isAnonymous,
        selectedImages,
        navigate,
        postCommunityMutation,
      );
    }
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
