import { clientAuth } from '@/apis/client';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { z } from 'zod';

// 유저 정보를 불러오는 api 함수, 훅입니다.

// articlesData 스키마
const UserInfoSchema = z.object({
  userId: z.number(),
  name: z.string(),
  nickname: z.string(),
  birthdate: z.string(),
  gender: z.string(),
  phone: z.string(),
  lastNicknameChangeDate: z.string().nullable(),
  profileImage: z.string(),
  status: z.string(),
  lastActivityDate: z.string(),
  dormantDate: z.string().nullable(),
  terminationDate: z.string().nullable(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

// 성공 응답 스키마
const SuccessRespSchema = z.object({
  message: z.string(),
  data: UserInfoSchema,
});

// 전체 응답 스키마
const CommunityDetailRespSchema = z.object({
  resultType: z.literal('SUCCESS'),
  error: z.union([z.null(), z.string().optional()]),
  success: SuccessRespSchema,
});

// 데이터 타입 추출
export type UsersMeResp = z.infer<typeof CommunityDetailRespSchema>;
export type UserInfoType = z.infer<typeof UserInfoSchema>;

// API 호출 함수
const getUsersMe = async (): Promise<UsersMeResp> => {
  const resp = await clientAuth<UsersMeResp>({
    method: 'GET',
    url: '/users/me',
  });

  // 응답 데이터 검증
  const parsedData = CommunityDetailRespSchema.parse(resp.data);
  return parsedData;
};

// useQuery 훅
export const useGetUsersMe = () => {
  return useQuery<UsersMeResp, AxiosError>({
    queryKey: ['get-users-me'],
    queryFn: () => getUsersMe(),
  });
};
