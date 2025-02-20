import { clientAuth } from '@/apis/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { z } from 'zod';

// 커뮤니티 게시글 대댓글 등록 API

// 요청 데이터 검증을 위한 스키마
const PostArticleComment = z.object({
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
export type PostCommentParams = z.infer<typeof PostArticleComment>;

// 함수
const postCommentReply = async (
  params: PostCommentParams,
): Promise<PostCommentResp> => {
  // 입력 데이터 검증
  PostArticleComment.parse(params);

  const { communityId, articleId, content, commentId, isAnonymous } = params;

  const resp = await clientAuth<PostCommentResp>({
    method: 'POST',
    url: `/community/articles/comments/reply`,
    data: { communityId, articleId, commentId, content, isAnonymous },
  });

  return RespSchema.parse(resp.data);
};

// 훅
export const usePostCommentReply = ({
  articleId,
  communityId,
}: usePostCommentsProps) => {
  const queryClient = useQueryClient();

  return useMutation<PostCommentResp, AxiosError, PostCommentParams>({
    mutationFn: postCommentReply,
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
