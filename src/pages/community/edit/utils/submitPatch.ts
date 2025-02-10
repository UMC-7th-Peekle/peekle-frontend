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
  selectedImages: string[],
  thumbnail: string | null,
  navigate: NavigateFunction,
  patchCommunityMutation: UseMutationResult<
    PatchCommunityResp,
    Error,
    PatchCommunityParams,
    unknown
  >,
  existingData: CommunityDetailResp,
) => {
  if (!communityId || !articleId) {
    console.error('❌ PATCH 실패: communityId 또는 articleId가 없습니다.');
    return;
  }

  // ✅ 기존 이미지와 새 이미지 분리
  const existingImageUrls = selectedImages.filter((img) =>
    img.startsWith('http'),
  );
  const newImages = selectedImages.filter((img) => !img.startsWith('http'));

  // ✅ 기존 이미지 시퀀스 설정 (삭제된 이미지는 -1)
  const originalImages = existingData.success.article.articleImages.map(
    (image) => image.imageUrl,
  );

  const existingImageSequence = originalImages.map((url, index) =>
    existingImageUrls.includes(url) ? index + 1 : -1,
  );

  // ✅ 새 이미지 변환 (Blob → File)
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

  // ✅ 새 이미지 시퀀스 설정
  const newImageSequence = newFiles.map((_, index) => index + 1);

  // ✅ 썸네일 변환 (기존 URL이면 유지)
  let thumbnailFile: File | null = null;
  if (thumbnail && !thumbnail.startsWith('http')) {
    try {
      const res = await fetch(thumbnail);
      const blob = await res.blob();
      thumbnailFile = new File([blob], `thumbnail-${Date.now()}.jpg`, {
        type: 'image/jpeg',
      });
    } catch (err) {
      console.error('❌ 썸네일 변환 실패:', err);
    }
  }

  // ✅ 최종 이미지 배열 구성
  const articleImages: File[] = [
    ...(thumbnailFile ? [thumbnailFile] : []),
    ...newFiles,
  ];

  console.log('📤 PATCH 요청 전 최종 이미지:', articleImages);

  // ✅ **1차 PATCH 요청 (본문 + 이미지 변경)**
  console.log('📤 1차 PATCH 요청 (본문 변경 포함):', {
    title,
    content,
    isAnonymous,
    existingImageSequence,
    newImageSequence,
  });

  try {
    const response = await patchCommunityMutation.mutateAsync({
      communityId,
      articleId,
      articleImages,
      data: {
        title,
        content,
        isAnonymous,
        existingImageSequence,
        newImageSequence,
      },
    });

    console.log('✅ 1차 PATCH 성공:', response);
  } catch (error) {
    console.error('❌ 1차 PATCH 요청 실패:', error);
    return;
  }

  // ✅ 기존 이미지 순서 변경이 필요한지 확인
  let needsReorder = false;
  let reorderedSequence = [...existingImageSequence];

  if (thumbnail && !thumbnail.startsWith('http')) {
    const thumbnailIndex = newFiles.findIndex(
      (file) => file.name === thumbnailFile?.name,
    );
    if (thumbnailIndex !== -1) {
      reorderedSequence = [
        ...newImageSequence.slice(thumbnailIndex, thumbnailIndex + 1),
        ...existingImageSequence.filter((num): num is number => num !== -1),
        ...newImageSequence.filter((_, idx) => idx !== thumbnailIndex),
      ];

      console.log('🔹 썸네일이 새 이미지일 때 순서 변경:', reorderedSequence);
      needsReorder = true;
    }
  }

  // ✅ 기존 이미지 순서가 변경되었는지 확인
  if (
    JSON.stringify(reorderedSequence) !== JSON.stringify(existingImageSequence)
  ) {
    needsReorder = true;
    existingImageSequence.length = 0;
    existingImageSequence.push(...reorderedSequence);
  }

  // ✅ **2차 PATCH 요청 (이미지 순서 변경)**
  if (needsReorder) {
    console.log('📤 2차 PATCH 요청 (이미지 순서 변경):', {
      title,
      content,
      isAnonymous,
      existingImageSequence,
      newImageSequence: [],
    });

    try {
      const response = await patchCommunityMutation.mutateAsync({
        communityId,
        articleId,
        articleImages: [],
        data: {
          title,
          content,
          isAnonymous,
          existingImageSequence,
          newImageSequence: [],
        },
      });

      console.log('✅ 2차 PATCH 성공:', response);
    } catch (error) {
      console.error('❌ 2차 PATCH 요청 실패:', error);
      return;
    }
  } else {
    console.log('🚀 2차 PATCH 요청 생략 (이미지 순서 변경 필요 없음)');
  }

  console.log('🎉 PATCH 완료, 페이지 이동');
  navigate(`/community/${communityId}/${articleId}`);
};
