import { clientAuth } from '@/apis/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { z } from 'zod';

// 커뮤니티 게시글 좋아요를 위한 API

// 요청 데이터 검증을 위한 스키마
const PostArticleLikeSchema = z.object({
  communityId: z.number().int(),
  articleId: z.number().int(),
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
export type PostArticleLikeResp = z.infer<typeof RespSchema>;
export type PostArticleLikeParams = z.infer<typeof PostArticleLikeSchema>;

// 함수
const postCommunity = async (
  params: PostArticleLikeParams,
): Promise<PostArticleLikeResp> => {
  // 입력 데이터 검증
  PostArticleLikeSchema.parse(params);

  const { communityId, articleId } = params;

  const resp = await clientAuth<PostArticleLikeResp>({
    method: 'POST',
    url: `/community/articles/like`,
    data: { communityId, articleId },
  });

  return RespSchema.parse(resp.data);
};

// 훅
export const usePostArticleLike = () => {
  const queryClient = useQueryClient();

  return useMutation<PostArticleLikeResp, AxiosError, PostArticleLikeParams>({
    mutationFn: postCommunity,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-community'] });
      queryClient.invalidateQueries({ queryKey: ['get-community-like'] });
      queryClient.invalidateQueries({
        queryKey: ['get-community-detail'],
      });
    },
  });
};
