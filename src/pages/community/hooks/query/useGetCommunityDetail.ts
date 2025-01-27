import { clientAuth } from '@/apis/client';
import { formatDateCardTime } from '@/utils/dateFormatter';
import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';

// articlesData 스키마
const ArticleDataSchema = z.object({
  articleId: z.number(),
  title: z.string(),
  content: z.string(),
  authorId: z.number(),
  isAnonymouse: z.boolean(),
  communityId: z.number(),
  createdAt: z.string().transform(formatDateCardTime),
  updatedAt: z.string(),
});

// 이미지 요소 스키마
const ArticleImageSchema = z.object({
  imageUrl: z.string().url(),
  sequence: z.number(),
});

// 이미지 배열 스키마
const ArticleImagesSchema = z.array(ArticleImageSchema);

// 개별 댓글 객체 스키마
const ArticleCommentSchema = z.object({
  commentId: z.number().int(),
  articleId: z.number().int(),
  parentCommentId: z.number().int().nullable(),
  status: z.enum(['active', 'inactive', 'deleted']),
  authorId: z.number().int(),
  isAnonymous: z.boolean(),
  content: z.string(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

// 댓글 배열 스키마
const ArticleCommentsSchema = z.array(ArticleCommentSchema);

// 성공 응답 스키마
const ArticleSchema = z.object({
  articleData: ArticleDataSchema, // 게시글 데이터
  articleImages: ArticleImagesSchema, // 이미지 배열
  articleComments: ArticleCommentsSchema, // 댓글 배열
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

// API 호출 함수
const getCommunityDetail = async (
  articleId: string,
): Promise<CommunityDetailResp> => {
  const resp = await clientAuth<CommunityDetailResp>({
    method: 'GET',
    url: `/community/1/articles/${articleId}`,
  });

  // 응답 데이터 검증
  const parsedData = CommunityDetailRespSchema.parse(resp.data);
  return parsedData;
};

// useQuery 훅
export const useGetCommunityDetail = ({
  articleId,
}: useGetCommunityDetailProps) => {
  return useQuery({
    queryKey: ['community-detail', articleId],
    queryFn: () => getCommunityDetail(articleId),
  });
};

interface useGetCommunityDetailProps {
  articleId: string;
}
