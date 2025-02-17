import { clientAuth } from '@/apis/client';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { z } from 'zod';

// 커뮤니티 게시글 댓글 신고

// 요청 데이터 검증을 위한 스키마
const PostArticleCommentReportSchema = z.object({
  communityId: z.number().int(),
  articleId: z.number().int(),
  commentId: z.number().int(),
  reason: z.string().min(1),
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
export type PostArticleCommentReportResp = z.infer<typeof RespSchema>;
export type PostArticleCommentReportParams = z.infer<
  typeof PostArticleCommentReportSchema
>;

// 함수
const postArticleCommentReport = async (
  params: PostArticleCommentReportParams,
): Promise<PostArticleCommentReportResp> => {
  // 입력 데이터 검증
  PostArticleCommentReportSchema.parse(params);

  const { communityId, articleId, commentId, reason } = params;

  const resp = await clientAuth<PostArticleCommentReportResp>({
    method: 'POST',
    url: `/community/articles/comments/report`,
    data: { communityId, articleId, commentId, reason },
  });

  return RespSchema.parse(resp.data);
};

// 훅
export const usePostArticleCommentReport = () => {
  return useMutation<
    PostArticleCommentReportResp,
    AxiosError,
    PostArticleCommentReportParams
  >({
    mutationFn: postArticleCommentReport,
  });
};
