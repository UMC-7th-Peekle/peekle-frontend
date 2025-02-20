import { useSuspenseQuery } from '@tanstack/react-query';
import { clientAuth } from '@/apis/client';
import { RolesResponseSchema, RolesResponse, RolesQkType } from '@/types/admin';
import { GET_ROLES_QK } from '@/constants/admin';

// api 호출 함수
const getRoles = async (): Promise<RolesResponse> => {
  const response = await clientAuth<RolesResponse>({
    method: 'GET',
    url: `/admin/roles`,
  });

  // 응답 데이터 검증
  const parsedData = RolesResponseSchema.parse(response.data);
  return parsedData;
};

const useGetRoles = () => {
  const { data } = useSuspenseQuery<
    RolesResponse,
    Error,
    RolesResponse,
    RolesQkType
  >({
    queryKey: [GET_ROLES_QK],
    queryFn: () => getRoles(),
  });

  return { data };
};

export default useGetRoles;
