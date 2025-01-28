import { clientAuth } from '@/apis/client';
import { formatDateCardTime } from '@/utils/dateFormatter';
import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';

// Zod 스키마 정의
const ArticleSchema = z.object({
  articleId: z.string().transform((value) => value.toString()),
  title: z.string(),
  content: z.string(),
  authorId: z.number().int(),
  isAnonymous: z.boolean().optional(),
  communityId: z.string(),
  createdAt: z.string().transform(formatDateCardTime),
  updatedAt: z.string(),
  articleComments: z.number().int(),
  articleLikes: z.number().int(),
});

const SuccessResponseSchema = z.object({
  message: z.string(),
  articles: z.array(ArticleSchema),
  nextCursor: z.string(),
  hasNextPage: z.boolean(),
});

const CommunityResponseSchema = z.object({
  resultType: z.literal('SUCCESS'),
  error: z.null(),
  success: SuccessResponseSchema,
});

// 데이터 타입 추출
export type CommunityResponse = z.infer<typeof CommunityResponseSchema>;
export type Article = z.infer<typeof ArticleSchema>;

// API 호출 함수
const getCommunityId = async (
  communityId: string,
): Promise<CommunityResponse> => {
  const response = await clientAuth<CommunityResponse>({
    method: 'GET',
    url: `/community/${communityId}`,
  });

  // 응답 데이터 검증
  const parsedData = CommunityResponseSchema.parse(response.data);
  return parsedData;
};

// useQuery 훅 생성
export const useGetCommunityId = ({ communityId }: UseGetCommunityIdProps) => {
  return useQuery({
    queryKey: ['community', communityId],
    queryFn: () => getCommunityId(communityId),
  });
};

interface UseGetCommunityIdProps {
  communityId: string;
}
