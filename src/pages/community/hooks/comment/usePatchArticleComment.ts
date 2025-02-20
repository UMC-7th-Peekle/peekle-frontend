import { clientAuth } from '@/apis/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { z } from 'zod';

// 커뮤니티 게시글 댓글 수정정 API

// 요청 데이터 검증을 위한 스키마
const PatchArticleComment = z.object({
  communityId: z.number().int(),
  articleId: z.number().int(),
  commentId: z.number().int(),
  content: z.string(),
  isAnonymous: z.boolean(),
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
export type PostCommentParams = z.infer<typeof PatchArticleComment>;

// 함수
const patchComment = async (
  params: PostCommentParams,
): Promise<PostCommentResp> => {
  // 입력 데이터 검증
  PatchArticleComment.parse(params);

  const { communityId, articleId, commentId, content, isAnonymous } = params;

  const resp = await clientAuth<PostCommentResp>({
    method: 'PATCH',
    url: `/community/articles/comments`,
    data: { communityId, articleId, commentId, content, isAnonymous },
  });

  return RespSchema.parse(resp.data);
};

// 훅
export const usePatchComment = ({
  articleId,
  communityId,
}: usePostCommentsProps) => {
  const queryClient = useQueryClient();

  return useMutation<PostCommentResp, AxiosError, PostCommentParams>({
    mutationFn: patchComment,
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
