import {
  PostCommunityParams,
  PostCommunityResp,
} from '@/pages/community/hooks/article/usePostCommunityArticle';
import { UseMutationResult } from '@tanstack/react-query';
import { NavigateFunction } from 'react-router-dom';

export const submitPost = async (
  title: string,
  content: string,
  isAnonymous: boolean,
  selectedImages: string[],
  navigate: NavigateFunction,
  postCommunityMutation: UseMutationResult<
    PostCommunityResp,
    Error,
    PostCommunityParams,
    unknown
  >, // ✅ 타입 명확화
) => {
  const newFiles = await Promise.all(
    selectedImages.map(async (imageUrl) => {
      try {
        const res = await fetch(imageUrl);
        const blob = await res.blob();
        return new File([blob], `image-${Date.now()}.jpg`, {
          type: 'image/jpeg',
        });
      } catch (err) {
        console.error(err);
        return null;
      }
    }),
  );

  const articleImages: File[] = newFiles.filter(
    (file): file is File => file !== null,
  );

  postCommunityMutation.mutate(
    {
      communityId: '1',
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
