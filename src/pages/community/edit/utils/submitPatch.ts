import { NavigateFunction } from 'react-router-dom';
import { UseMutationResult } from '@tanstack/react-query';
import {
  PatchCommunityResp,
  PatchCommunityParams,
} from '@/pages/community/hooks/article/usePatchCommunityArticle';
import { CommunityDetailResp } from '@/pages/community/hooks/article/useGetCommunityDetail';

export const submitPatch = async (
  communityId: string,
  articleId: string,
  title: string,
  content: string,
  isAnonymous: boolean,
  selectedImages: string[], // ✅ UI에서 선택된 이미지 목록
  navigate: NavigateFunction,
  patchCommunityMutation: UseMutationResult<
    PatchCommunityResp,
    Error,
    PatchCommunityParams,
    unknown
  >,
  existingData: CommunityDetailResp, // ✅ 기존 데이터 추가
  thumbnail: string | null, // ✅ 썸네일로 설정할 이미지 추가
) => {
  if (!communityId || !articleId) {
    console.error('❌ PATCH 실패: communityId 또는 articleId가 없습니다.');
    return;
  }

  // ✅ 기존 이미지 및 신규 이미지 분리
  const existingImageUrls = selectedImages.filter((img) =>
    img.startsWith('http'),
  );
  const newImages = selectedImages.filter((img) => !img.startsWith('http'));

  // ✅ 원래 저장된 기존 이미지 리스트 (DB 기준)
  const originalImages = existingData.success.article.articleImages.map(
    (image) => image.imageUrl,
  );

  // ✅ 기존 이미지 순서 재배치 (삭제된 이미지는 -1)
  let existingImageSequence = originalImages.map((url) =>
    existingImageUrls.includes(url) ? originalImages.indexOf(url) + 1 : -1,
  );

  // ✅ 기존 이미지의 중복된 순서를 제거하고 오름차순 부여
  let validIndex = 1;
  existingImageSequence = existingImageSequence.map((num) =>
    num === -1 ? -1 : validIndex++,
  );

  // ✅ 신규 이미지 변환 (Blob → File)
  const newFiles = (
    await Promise.all(
      newImages.map(async (imageUrl) => {
        try {
          const res = await fetch(imageUrl);
          const blob = await res.blob();
          return new File([blob], `image-${Date.now()}.jpg`, {
            type: 'image/jpeg',
          });
        } catch (err) {
          console.error('❌ 이미지 변환 실패:', err);
          return null;
        }
      }),
    )
  ).filter((file): file is File => file !== null);

  let newImageSequence = newFiles.map(
    (_, index) => existingImageUrls.length + index + 1, // ✅ 기존 이미지 개수 이후 번호 부여
  );

  // ✅ 썸네일 변경 적용
  if (thumbnail) {
    if (existingImageUrls.includes(thumbnail)) {
      // ✅ 기존 이미지 중 썸네일이 변경된 경우
      const index = existingImageUrls.indexOf(thumbnail);
      existingImageSequence = [
        index + 1,
        ...existingImageSequence.filter((_, i) => i !== index),
      ];
    } else {
      // ✅ 신규 이미지 중 썸네일이 변경된 경우
      const index = newFiles.findIndex((file) => file.name === thumbnail);
      if (index !== -1) {
        newImageSequence = [
          existingImageUrls.length + 1, // ✅ 신규 이미지 중 첫 번째를 가장 앞에 배치
          ...newImageSequence.filter((_, i) => i !== index),
        ];
      }
    }
  }

  // ✅ FormData 생성
  const formData = new FormData();

  // ✅ 신규 이미지 파일 추가
  newFiles.forEach((file) => {
    formData.append('article_images', file);
  });

  formData.append(
    'data',
    JSON.stringify({
      title,
      content,
      isAnonymous,
      existingImageSequence,
      newImageSequence,
    }),
  );

  patchCommunityMutation.mutateAsync({
    communityId,
    articleId,
    article_images: newFiles, // ✅ 신규 이미지 파일만 추가
    data: {
      title,
      content,
      isAnonymous,
      existingImageSequence,
      newImageSequence,
    },
  });

  navigate(`/community/${communityId}/${articleId}`);
};
