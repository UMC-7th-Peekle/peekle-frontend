import { clientAuth } from '@/apis/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { z } from 'zod';

// 요청 데이터 검증을 위한 스키마
const PatchCommunityDataSchema = z.object({
  title: z.string(),
  content: z.string(),
  isAnonymous: z.boolean(),
});

const PatchCommunityParamsSchema = z.object({
  communityId: z.string(),
  articleId: z.string(),
  articleImages: z.array(z.instanceof(File)),
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
  PatchCommunityParamsSchema.parse(params);

  const { communityId, articleId, articleImages, data } = params;
  const formData = new FormData();

  // 이미지 파일 추가
  articleImages.forEach((image) => {
    formData.append('article_images', image);
  });

  formData.append('data', JSON.stringify(data));

  try {
    const resp = await clientAuth<PatchCommunityResp>({
      method: 'PATCH',
      url: `/community/${communityId}/articles/${articleId}`,
      data: formData,
    });

    return RespSchema.parse(resp.data);
  } catch (error) {
    console.error('❌ PATCH 실패:', error);
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
      queryClient.invalidateQueries({ queryKey: ['get-community-defailt'] });
    },
  });
};
