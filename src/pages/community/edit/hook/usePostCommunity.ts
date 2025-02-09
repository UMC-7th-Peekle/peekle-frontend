import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePostCommunityArticle } from '../../hooks/mutation/usePostCommunityArticle';
import { ROUTES } from '@/constants/routes';
import { useGetCommunityDetail } from '@/pages/community/hooks/query/useGetCommunityDetail';
import { usePatchCommunityArticle } from '@/pages/community/hooks/mutation/usePatchCommunityArticle';

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

  // 🔹 상태 값
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [thumbnail, setThumbnail] = useState<string | null>(null);

  // 🔹 isPatch가 true일 때만 API 호출
  const { data } = useGetCommunityDetail({
    communityId: isPatch ? communityId : '',
    articleId: isPatch ? articleId : '',
  });

  // 🔹 API 응답 값을 상태 값에 반영 (isPatch가 true일 때만 실행)
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

  // 🔹 폼 채워짐 여부 확인
  const isFormFilled = title.trim() !== '' && content.trim() !== '';

  // 🔹 핸들러 함수들
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

  // 🔹 제출 함수
  const onSubmit = async () => {
    if (!isFormFilled) return;

    const files = await Promise.all(
      selectedImages.map((imageUrl) =>
        fetch(imageUrl)
          .then((res) => res.blob())
          .then(
            (blob) => new File([blob], 'image.jpg', { type: 'image/jpeg' }),
          ),
      ),
    );

    const thumbnailFile = thumbnail
      ? await fetch(thumbnail)
          .then((res) => res.blob())
          .then(
            (blob) => new File([blob], 'thumbnail.jpg', { type: 'image/jpeg' }),
          )
      : null;

    const articleImages = thumbnailFile
      ? [thumbnailFile, ...files.filter((file) => file !== thumbnailFile)]
      : files;

    // PATCH
    if (isPatch) {
      patchCommunityMutation.mutate(
        {
          communityId: '1',
          articleId,
          articleImages,
          data: { title, content, isAnonymous },
        },
        {
          onSuccess: () => {
            navigate(`/community/${communityId}/${articleId}`);
          },
        },
      );
    } else {
      // POST
      postCommunityMutation.mutate(
        {
          communityId: '1',
          articleImages,
          data: { title, content, isAnonymous },
        },
        {
          onSuccess: () => {
            navigate(ROUTES.COMMUNITY);
          },
        },
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
