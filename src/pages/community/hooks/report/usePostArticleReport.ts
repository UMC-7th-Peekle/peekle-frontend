import { clientAuth } from '@/apis/client';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { z } from 'zod';

// 커뮤니티 게시글 신고

// 요청 데이터 검증을 위한 스키마
const PostArticleReportSchema = z.object({
  communityId: z.number().int(),
  articleId: z.number().int(),
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
export type PostArticleReportResp = z.infer<typeof RespSchema>;
export type PostArticleReportParams = z.infer<typeof PostArticleReportSchema>;

// 함수
const postArticleReport = async (
  params: PostArticleReportParams,
): Promise<PostArticleReportResp> => {
  // 입력 데이터 검증
  PostArticleReportSchema.parse(params);

  const { communityId, articleId, reason } = params;

  const resp = await clientAuth<PostArticleReportResp>({
    method: 'POST',
    url: `/community/articles/report`,
    data: { communityId, articleId, reason },
  });

  return RespSchema.parse(resp.data);
};

// 훅
export const usePostArticleReport = () => {
  return useMutation<
    PostArticleReportResp,
    AxiosError,
    PostArticleReportParams
  >({
    mutationFn: postArticleReport,
  });
};
