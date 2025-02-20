import { clientAuth } from '@/apis/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { z } from 'zod';

// 요청 데이터 검증을 위한 스키마
const PatchCommunityDataSchema = z.object({
  title: z.string(),
  content: z.string(),
  isAnonymous: z.boolean(),
  existingImageSequence: z.array(z.number()),
  newImageSequence: z.array(z.number()),
});

const PatchCommunityParamsSchema = z.object({
  communityId: z.string(),
  articleId: z.string(),
  article_images: z.array(z.instanceof(File)),
  data: PatchCommunityDataSchema,
});

// 응답 스키마
const SuccessRespSchema = z.object({
  message: z.string().nullable(),
});

const RespSchema = z.object({
  resultType: z.literal('SUCCESS'),
  error: z.null(),
  success: SuccessRespSchema,
});

// 타입으로 정의
export type PatchCommunityResp = z.infer<typeof RespSchema>;
export type PatchCommunityParams = z.infer<typeof PatchCommunityParamsSchema>;

const patchCommunity = async (
  params: PatchCommunityParams,
): Promise<PatchCommunityResp> => {
  // 요청 데이터 검증
  try {
    PatchCommunityParamsSchema.parse(params);
  } catch (err) {
    console.error('❌ PATCH 데이터 검증 실패:', err);
    throw err;
  }

  const { communityId, articleId, article_images, data } = params;
  const formData = new FormData();

  // 이미지 파일 추가
  article_images.forEach((image) => {
    formData.append('article_images', image);
  });

  // JSON 데이터를 문자열로 변환하여 추가
  formData.append('data', JSON.stringify(data));

  try {
    const resp = await clientAuth<PatchCommunityResp>({
      method: 'PATCH',
      url: `/community/${communityId}/articles/${articleId}`,
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return RespSchema.parse(resp.data);
  } catch (error) {
    console.error('❌ PATCH 요청 실패:', error);
    throw error;
  }
};

// useMutation을 활용한 게시글 패치 훅
export const usePatchCommunityArticle = () => {
  const queryClient = useQueryClient();

  return useMutation<PatchCommunityResp, AxiosError, PatchCommunityParams>({
    mutationFn: patchCommunity,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-community'] });
      queryClient.invalidateQueries({ queryKey: ['get-community-like'] });
      queryClient.invalidateQueries({ queryKey: ['get-community-detail'] });
    },
    onError: (error) => {
      console.error('❌ PATCH 실패 (useMutation):', error);
    },
  });
};
