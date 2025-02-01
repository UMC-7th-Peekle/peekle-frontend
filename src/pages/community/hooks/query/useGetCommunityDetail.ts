import { clientAuth } from '@/apis/client';
import { formatDateCardTime } from '@/utils/dateFormatter';
import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';

// 댓글 요소 스키마
const ArticleCommentSchema = z.object({
  commentId: z.number(),
  articleId: z.number(),
  parentCommentId: z.number().nullable(),
  status: z.enum(['active', 'inactive', 'deleted']),
  authorId: z.number(),
  isAnonymous: z.boolean(),
  content: z.string(),
  createdAt: z.string().transform(formatDateCardTime),
  updatedAt: z.string().transform(formatDateCardTime),
});

// 댓글 목록 스키마
const ArticleCommentsSchema = z.array(ArticleCommentSchema);

// 이미지 요소 스키마
const ArticleImageSchema = z.object({
  imageUrl: z.string().url(),
  sequence: z.number(),
});

// 이미지 배열 스키마
const ArticleImagesSchema = z.array(ArticleImageSchema);

// articlesData 스키마
const ArticleSchema = z.object({
  articleId: z.number(),
  title: z.string(),
  content: z.string(),
  authorId: z.number(),
  isAnonymous: z.boolean(),
  communityId: z.number(),
  createdAt: z.string().transform(formatDateCardTime),
  updatedAt: z.string(),
  articleComments: ArticleCommentsSchema,
  articleImages: ArticleImagesSchema,
});

// 성공 응답 스키마
const SuccessRespSchema = z.object({
  message: z.string(),
  article: ArticleSchema,
});

// 전체 응답 스키마
const CommunityDetailRespSchema = z.object({
  resultType: z.literal('SUCCESS'),
  error: z.null(),
  success: SuccessRespSchema,
});

// 데이터 타입 추출
export type CommunityDetailResp = z.infer<typeof CommunityDetailRespSchema>;
export type CommunityDetailArticle = z.infer<typeof ArticleSchema>;
export type CommunityDetailComments = z.infer<typeof ArticleCommentsSchema>;
export type CommunityDetailComment = z.infer<typeof ArticleCommentSchema>;

// API 호출 함수
const getCommunityDetail = async (
  communityId: string,
  articleId: string,
): Promise<CommunityDetailResp> => {
  const resp = await clientAuth<CommunityDetailResp>({
    method: 'GET',
    url: `/community/${communityId}/articles/${articleId}`,
  });

  // 응답 데이터 검증
  const parsedData = CommunityDetailRespSchema.parse(resp.data);
  return parsedData;
};

// useQuery 훅
export const useGetCommunityDetail = ({
  communityId,
  articleId,
}: useGetCommunityDetailProps) => {
  return useQuery({
    queryKey: ['community-detail', articleId],
    queryFn: () => getCommunityDetail(communityId, articleId),
  });
};

interface useGetCommunityDetailProps {
  communityId: string;
  articleId: string;
}
