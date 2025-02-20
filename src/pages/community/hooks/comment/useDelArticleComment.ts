import { clientAuth } from '@/apis/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { z } from 'zod';

// 커뮤니티 게시글 댓글 삭제 API

// 요청 데이터 검증을 위한 스키마
const DelArticleCommentSchema = z.object({
  communityId: z.number().int(),
  articleId: z.number().int(),
  commentId: z.number().int(),
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
export type PostCommentResp = z.infer<typeof RespSchema>;
export type PostCommentParams = z.infer<typeof DelArticleCommentSchema>;

// 함수
const delComment = async (
  params: PostCommentParams,
): Promise<PostCommentResp> => {
  // 입력 데이터 검증
  DelArticleCommentSchema.parse(params);

  const { communityId, articleId, commentId } = params;

  const resp = await clientAuth<PostCommentResp>({
    method: 'DELETE',
    url: `/community/articles/comments`,
    data: { communityId, articleId, commentId },
  });

  return RespSchema.parse(resp.data);
};

// 훅
export const useDelComment = ({
  articleId,
  communityId,
}: usePostCommentsProps) => {
  const queryClient = useQueryClient();

  return useMutation<PostCommentResp, AxiosError, PostCommentParams>({
    mutationFn: delComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-community'] });
      queryClient.invalidateQueries({ queryKey: ['get-community-like'] });
      queryClient.invalidateQueries({
        queryKey: ['get-article-detail'],
      });
      queryClient.invalidateQueries({
        queryKey: ['get-article-comments', communityId, articleId],
      });
    },
  });
};

interface usePostCommentsProps {
  articleId: number;
  communityId: number;
}
