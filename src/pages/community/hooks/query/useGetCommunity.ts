import { clientAuth } from '@/apis/client';
import { formatDateCardTime } from '@/utils/dateFormatter';
import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';

const AuthorInfoSchema = z.object({
  nickname: z.string(),
  profileImage: z.string(),
  authorId: z.number().int(),
});

// Zod 스키마 정의
const ArticleSchema = z.object({
  articleId: z.number().int(),
  title: z.string(),
  content: z.string(),
  isAnonymous: z.boolean().optional(),
  communityId: z.number(),
  createdAt: z.string().transform(formatDateCardTime),
  updatedAt: z.string(),
  articleComments: z.number().int(),
  articleLikes: z.number().int(),
  thumbnail: z.string().nullable(),
  authorInfo: AuthorInfoSchema,
});

const SuccessResponseSchema = z.object({
  message: z.string(),
  articles: z.array(ArticleSchema),
  nextCursor: z.number().nullable(),
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
const getCommunity = async ({
  limit,
  cursor,
  communityId,
}: UseGetCommunityIdProps): Promise<CommunityResponse> => {
  const response = await clientAuth<CommunityResponse>({
    method: 'GET',
    url: `/community`,
    params: {
      limit,
      cursor,
      communityId,
    },
  });

  // 응답 데이터 검증
  const parsedData = CommunityResponseSchema.parse(response.data);
  return parsedData;
};

// useQuery 훅 생성
export const useGetCommunity = ({
  limit = 10,
  cursor = null,
  query = '',
  communityId,
}: UseGetCommunityIdProps) => {
  return useQuery({
    queryKey: ['community', communityId, limit, cursor, query],
    queryFn: () => getCommunity({ limit, cursor, query, communityId }),
  });
};

interface UseGetCommunityIdProps {
  limit?: number;
  cursor?: number | null;
  query?: string | null;
  communityId?: number | null;
}
