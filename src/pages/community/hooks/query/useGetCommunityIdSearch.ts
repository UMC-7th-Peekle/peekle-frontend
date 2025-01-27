import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';
import { clientAuth } from '@/apis/client';
import { formatDateCardTime } from '@/utils/dateFormatter';

// zod 스키마
const ArticleSchema = z.object({
  articleId: z.number().transform((value) => value.toString()),
  title: z.string(),
  content: z.string(),
  authorId: z.number(),
  isAnonymous: z.boolean().optional(),
  communityId: z.number(),
  createdAt: z.string().transform(formatDateCardTime),
  updatedAt: z.string(),
});

const SuccessResponseSchema = z.object({
  message: z.string(),
  articles: z.array(ArticleSchema),
  nextCursor: z.number(),
  hasNextPage: z.boolean(),
});

const CommunitySearchResponseSchema = z.object({
  resultType: z.literal('SUCCESS'),
  error: z.null(),
  success: SuccessResponseSchema,
});

export type CommunitySearchResponse = z.infer<
  typeof CommunitySearchResponseSchema
>;
export type Article = z.infer<typeof ArticleSchema>;

// API 호출 함수
const getCommunityIdSearch = async (
  communityId: number,
  query?: string,
): Promise<CommunitySearchResponse> => {
  const resp = await clientAuth<CommunitySearchResponse>({
    method: 'GET',
    url: `/community/${communityId}/search?query=${query}`,
  });
  const parsedData = CommunitySearchResponseSchema.parse(resp.data);
  return parsedData;
};

// useQuery 훅
export const useGetCommunityIdSearch = ({
  communityId,
  query = '',
}: useGetCommunityIdSearchProps) => {
  const isQueryValid = query.length >= 2;

  return useQuery({
    queryKey: ['community', communityId, query],
    queryFn: () => getCommunityIdSearch(communityId, query),
    enabled: isQueryValid,
  });
};

interface useGetCommunityIdSearchProps {
  communityId: number;
  query?: string;
}
