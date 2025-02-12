import { clientAuth } from '@/apis/client';
import { formatDateCardTime } from '@/utils/dateFormatter';
import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';

// 커뮤니티 게시판 댓글을 불러오는 API

// 유저 정보 스키마

const AuthorInfoSchema = z.object({
  userId: z.number().int().nullable().optional(),
  nickname: z.string().nullable().optional(),
  profileImage: z.string().nullable().optional(),
});

// 댓글 요소 스키마
const ArticleCommentSchema = z.object({
  authorInfo: AuthorInfoSchema.default({}),
  isLikedByUser: z.boolean(),
  commentLikesCount: z.number().int(),
  content: z.string(),
  isAnonymous: z.number().int(),
  status: z.enum(['active', 'inactive', 'deleted']),
  commentId: z.number(),
  articleId: z.number(),
  parentCommentId: z.number().nullable(),
  authorId: z.number(),
  createdAt: z.string().transform(formatDateCardTime),
  updatedAt: z.string().transform(formatDateCardTime),
});

// 댓글 목록 스키마
const ArticleCommentsSchema = z.array(ArticleCommentSchema);

// 성공 응답 스키마
const SuccessRespSchema = z.object({
  message: z.string(),
  comments: ArticleCommentsSchema,
});

// 전체 응답 스키마
const GetArticleCommentsSchema = z.object({
  resultType: z.literal('SUCCESS'),
  error: z.union([z.null(), z.string().optional()]),
  success: SuccessRespSchema,
});

export type ArticleCommentsResp = z.infer<typeof GetArticleCommentsSchema>;

export type ArticleComment = z.infer<typeof ArticleCommentSchema>;

export type ArticleComments = z.infer<typeof ArticleCommentsSchema>;

// API 호출 함수
const getArticleComments = async ({
  communityId,
  articleId,
}: useGetCommunityDetailProps): Promise<ArticleCommentsResp> => {
  const resp = await clientAuth<ArticleCommentsResp>({
    method: 'GET',
    url: `/community/articles/comments`,
    params: {
      communityId,
      articleId,
    },
  });

  // 응답 데이터 검증
  const parsedData = GetArticleCommentsSchema.parse(resp.data);
  return parsedData;
};

// useQuery 훅
export const useGetArticleComments = ({
  communityId,
  articleId,
}: useGetCommunityDetailProps) => {
  return useQuery<ArticleCommentsResp>({
    queryKey: ['get-community-defail', communityId, articleId],
    queryFn: () => getArticleComments({ communityId, articleId }),
    enabled: Boolean(communityId && articleId),
  });
};

interface useGetCommunityDetailProps {
  communityId: number;
  articleId: number;
}
