import { clientAuth } from '@/apis/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { z } from 'zod';

// 요청 데이터 검증을 위한 스키마
const PostCommunityDataSchema = z.object({
  title: z.string(),
  content: z.string(),
  isAnonymous: z.boolean(),
});

const PostCommunityParamsSchema = z.object({
  communityId: z.number(),
  articleImages: z.array(z.instanceof(File)), // 이미지 파일 배열
  data: PostCommunityDataSchema, // 제목, 내용, 익명 여부
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
export type PostCommunityResp = z.infer<typeof RespSchema>;
export type PostCommunityParams = z.infer<typeof PostCommunityParamsSchema>;

// 함수
const postCommunity = async (
  params: PostCommunityParams,
): Promise<PostCommunityResp> => {
  // 입력 데이터 검증
  PostCommunityParamsSchema.parse(params);

  const { communityId, articleImages, data } = params;
  const formData = new FormData();

  // 이미지 파일 추가
  articleImages.forEach((image) => {
    formData.append('article_images', image);
  });

  // JSON 데이터를 문자열로 변환하여 추가
  formData.append('data', JSON.stringify(data));

  const resp = await clientAuth<PostCommunityResp>({
    method: 'POST',
    url: `/community/${communityId}/articles`,
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return RespSchema.parse(resp.data);
};

// useMutation을 활용한 게시글 업로드 훅
export const usePostCommunityArticle = () => {
  const queryClient = useQueryClient();

  return useMutation<PostCommunityResp, AxiosError, PostCommunityParams>({
    mutationFn: postCommunity,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-community'] });
      queryClient.invalidateQueries({ queryKey: ['get-community-like'] });
    },
  });
};
