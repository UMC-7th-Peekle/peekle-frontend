import { clientAuth } from '@/apis/client';
import { formatDateCardTime } from '@/utils/dateFormatter';
import { useInfiniteQuery } from '@tanstack/react-query';
import { z } from 'zod';

// 커뮤니티 게시글 목록 API

const AuthorInfoSchema = z.object({
  nickname: z.string().nullable(),
  profileImage: z.string().nullable(),
  authorId: z.number().int().nullable(),
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
  message: z.string().nullable(),
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

// ✅ 무한 스크롤을 위한 API 호출 함수
const getCommunity = async ({
  pageParam,
  limit = 5,
  communityId = 1,
  query,
}: {
  pageParam?: number;
  limit: number;
  communityId: number;
  query: string | null;
}): Promise<CommunityResponse> => {
  const response = await clientAuth<CommunityResponse>({
    method: 'GET',
    url: `/community`,
    params: {
      limit,
      cursor: pageParam, // 커서 기반 페이지네이션
      communityId,
      query,
    },
  });

  // 응답 데이터 검증
  const parsedData = CommunityResponseSchema.parse(response.data);
  return parsedData;
};

// ✅ useInfiniteQuery 훅 생성
export const useGetCommunity = ({
  limit = 5,
  communityId = 1,
  query = null,
}: {
  limit?: number;
  communityId?: number;
  query?: string | null;
}) => {
  return useInfiniteQuery<CommunityResponse, Error>({
    queryKey: ['community', communityId],
    queryFn: ({ pageParam }) =>
      getCommunity({
        pageParam: pageParam as number | undefined,
        limit,
        communityId,
        query,
      }),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => lastPage.success.nextCursor ?? undefined,
  });
};
