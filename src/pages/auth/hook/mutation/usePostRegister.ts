import { client } from '@/apis/client';
import { ROUTES } from '@/constants/routes';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';

// ✅ 약관 동의 항목 스키마
const TermsSchema = z.object({
  termId: z.number().int(),
  isAgreed: z.boolean(),
});

// ✅ 공통 회원가입 스키마 (로컬 및 OAuth 공통 필드)
const BaseAuthRegisterSchema = z.object({
  name: z.string().min(1, '이름을 입력해주세요.'),
  nickname: z.string().min(2, '닉네임은 2자 이상이어야 합니다.'),
  birthdate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'YYYY-MM-DD 형식이 아닙니다.'),
  gender: z.enum(['male', 'female']),
  phone: z
    .string()
    .transform((val) => val.replace(/-/g, '')) // ✅ '-' 제거
    .refine((val) => /^\d{10,11}$/.test(val), {
      message: '올바른 휴대폰 번호를 입력해주세요.',
    }),
  phoneVerificationSessionId: z.string(),
  terms: z.array(TermsSchema),
});

// ✅ 로컬 회원가입 스키마
export const PostAuthRegisterSchema = BaseAuthRegisterSchema;

// ✅ OAuth 회원가입 스키마 (BaseAuthRegisterSchema + OAuth 정보 추가)
export const PostAuthRegisterKakaoSchema = BaseAuthRegisterSchema.extend({
  oauthId: z.number().int(),
  oauthType: z.enum(['kakao']),
  email: z.string().email('유효한 이메일을 입력해주세요.'),
});

// ✅ 응답 스키마
const SuccessRespSchema = z.object({
  message: z.string().nullable(),
});

const RespSchema = z.object({
  resultType: z.literal('SUCCESS'),
  error: z.null(),
  success: SuccessRespSchema,
});

// ✅ 타입 변환
export type PostAuthRegisterParams = z.infer<typeof BaseAuthRegisterSchema>;
export type PostAuthRegisterKakaoParams = z.infer<
  typeof PostAuthRegisterKakaoSchema
>;
export type PostAuthRegisterResp = z.infer<typeof RespSchema>;
export type TermsType = z.infer<typeof TermsSchema>;

// ✅ Raw Data 방식으로 요청 함수 정의
const postAuthRegister = async (
  params: PostAuthRegisterParams | PostAuthRegisterKakaoParams,
  url: string,
): Promise<PostAuthRegisterResp> => {
  // ✅ 요청 데이터 검증
  const validatedData = url.includes('oauth')
    ? PostAuthRegisterKakaoSchema.parse(params)
    : PostAuthRegisterSchema.parse(params);

  // ✅ Raw JSON 데이터로 요청
  const resp = await client<PostAuthRegisterResp>({
    method: 'POST',
    url,
    headers: {
      'Content-Type': 'application/json',
    },
    data: JSON.stringify(validatedData),
  });

  // ✅ 응답 데이터 검증
  return RespSchema.parse(resp.data);
};

// ✅ `useMutation`을 활용한 공통 회원가입 API 훅
export const usePostAuthRegister = (isOAuth: boolean) => {
  const navigate = useNavigate();

  return useMutation<
    PostAuthRegisterResp,
    AxiosError,
    PostAuthRegisterParams | PostAuthRegisterKakaoParams
  >({
    mutationFn: (params) =>
      postAuthRegister(
        params,
        isOAuth ? '/auth/register/oauth' : '/auth/register/local',
      ),
    onSuccess: () => {
      navigate(ROUTES.EVENT); // ✅ 성공 시 이동
    },
    onError: (error) => {
      console.error('회원가입 실패:', error.response?.data || error.message);
    },
  });
};
