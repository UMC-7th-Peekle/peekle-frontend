import { AxiosError, AxiosRequestConfig } from 'axios';
import { UndefinedInitialDataOptions } from '@tanstack/react-query';
import z, { ZodError, ZodSchema, ZodTypeDef } from 'zod';
import { ApiError, usePeekleQuery } from '@/hooks/usePeekleQuery';

/**
 * API 응답 타입 정의
 */
export interface GetCommunityIdResponse<T> {
  resultType: 'SUCCESS' | 'FAILURE';
  error: string | null;
  success?: {
    message: string;
    articles: T[];
    nextCursor: number | null;
    hasNextPage: boolean;
  };
}

/**
 * 게시글 타입 정의
 */
export interface Article {
  articleId: number;
  title: string;
  content: string;
  authorId: number;
  isAnonymous: boolean;
  communityId: number;
  createdAt: string;
  updatedAt: string;
}

/**
 * 훅의 옵션 타입
 */
export interface GetCommunityIdOptions<
  TRaw,
  TData = TRaw,
  TZodTypeDef extends ZodTypeDef = ZodTypeDef,
> {
  communityId: string;
  cursor?: number;
  take?: number;
  zodSchema?: ZodSchema<TData, TZodTypeDef, TRaw>;
  queryOptions?: Omit<
    UndefinedInitialDataOptions<
      GetCommunityIdResponse<TRaw>,
      AxiosError | ApiError | ZodError,
      GetCommunityIdResponse<TData>
    >,
    'queryKey' | 'queryFn'
  >;
}

/**
 * 커뮤니티 게시글 조회 훅
 */
export function useGetCommunityId<TRaw, TData = TRaw>({
  communityId,
  cursor,
  take,
  zodSchema,
  queryOptions,
}: GetCommunityIdOptions<TRaw, TData>) {
  const queryKey = ['useGetCommunityId', communityId, cursor, take];
  const config: AxiosRequestConfig = {
    url: `/community/${communityId}`,
    method: 'get',
    params: {
      cursor,
      take: take ?? 15, // 기본 페이지 크기
    },
  };

  return usePeekleQuery<
    GetCommunityIdResponse<TRaw>,
    GetCommunityIdResponse<TData>,
    AxiosError | ApiError | ZodError
  >(
    queryKey,
    config, // AxiosRequestConfig를 그대로 전달
    {
      select: (response) => {
        // 성공 데이터 확인
        if (!response.success) {
          throw new Error(response.error ?? 'Unknown error occurred');
        }

        const { articles, nextCursor, hasNextPage } = response.success;

        // Zod 스키마가 없으면 원본 데이터를 반환
        if (!zodSchema) {
          return {
            resultType: response.resultType,
            error: response.error,
            success: {
              articles,
              nextCursor,
              hasNextPage,
              message: response.success.message,
            },
          } as GetCommunityIdResponse<unknown> as GetCommunityIdResponse<TData>;
        }

        // Zod 스키마를 사용해 데이터 검증
        const schemaArray = z.array(zodSchema);
        const validatedArticles = schemaArray.parse(articles);

        return {
          resultType: response.resultType,
          error: response.error,
          success: {
            articles: validatedArticles,
            nextCursor,
            hasNextPage,
            message: response.success.message,
          },
        };
      },
      ...queryOptions,
    },
  );
}
