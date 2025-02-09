import { clientAuth } from '@/apis/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { z } from 'zod';

// ✅ 요청 데이터 스키마
const PostCommunityParamsSchema = z.object({
  communityId: z.number().int(),
  articleId: z.number().int(),
});

// ✅ 응답 데이터 스키마
const SuccessRespSchema = z.object({
  message: z.string().nullable(),
});

const RespSchema = z.object({
  resultType: z.literal('SUCCESS'),
  error: z.null(),
  success: SuccessRespSchema,
});

// ✅ 타입 정의
export type PostCommunityResp = z.infer<typeof RespSchema>;
export type PostCommunityParams = z.infer<typeof PostCommunityParamsSchema>;

// ✅ 게시글 삭제 API 호출 함수
const delCommunity = async (
  params: PostCommunityParams,
): Promise<PostCommunityResp> => {
  // ✅ 입력 데이터 검증
  PostCommunityParamsSchema.parse(params);

  const { communityId, articleId } = params;

  const resp = await clientAuth<PostCommunityResp>({
    method: 'DELETE',
    url: `/community/articles`,
    data: { communityId, articleId },
  });

  return RespSchema.parse(resp.data);
};

// ✅ 삭제 훅
export const useDelCommunityArticle = () => {
  const queryClient = useQueryClient();

  return useMutation<PostCommunityResp, AxiosError, PostCommunityParams>({
    mutationFn: delCommunity,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-community'] });
      queryClient.invalidateQueries({ queryKey: ['get-community-like'] });
    },
  });
};
