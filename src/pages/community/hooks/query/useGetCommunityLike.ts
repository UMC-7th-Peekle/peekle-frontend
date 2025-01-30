import { clientAuth } from '@/apis/client';
import { formatDateCardTime } from '@/utils/dateFormatter';
import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';

// 사용자가 좋아요 한 게시글을 불러옵니다.

// Zod 스키마 정의
const ArticleSchema = z.object({
  articleId: z.number().int(),
  title: z.string(),
  content: z.string(),
  authorId: z.number().int(),
  isAnonymous: z.boolean().optional(),
  communityId: z.number().int(),
  createdAt: z.string().transform(formatDateCardTime),
  updatedAt: z.string(),
  articleComments: z.number().int(),
  articleLikes: z.number().int(),
  thumbnail: z.string().nullable(),
});

const SuccessResponseSchema = z.object({
  message: z.string(),
  articles: z.array(ArticleSchema),
  nextCursor: z.number().int().nullable(),
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
const getCommunityLike = async ({
  limit,
  cursor,
}: UseGetCommunityIdProps): Promise<CommunityResponse> => {
  const response = await clientAuth<CommunityResponse>({
    method: 'GET',
    url: `/community/article/like`,
    params: {
      limit,
      cursor,
    },
  });

  // 응답 데이터 검증
  const parsedData = CommunityResponseSchema.parse(response.data);
  return parsedData;
};

// useQuery 훅 생성
export const useGetCommunityLike = ({
  limit = 10,
  cursor = null,
}: UseGetCommunityIdProps) => {
  return useQuery({
    queryKey: ['community', limit, cursor],
    queryFn: () => getCommunityLike({ limit, cursor }),
  });
};

interface UseGetCommunityIdProps {
  limit?: number;
  cursor?: number | null;
}
