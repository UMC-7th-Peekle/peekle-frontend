import { useSuspenseQuery } from '@tanstack/react-query';
import { clientAuth } from '@/apis/client';
import {
  PermissionsResponseSchema,
  PermissionsResponse,
  PermissionsQkType,
} from '@/types/admin';
import { GET_PERMISSIONS_QK } from '@/constants/admin';

// api 호출 함수
const getPermission = async (): Promise<PermissionsResponse> => {
  const response = await clientAuth<PermissionsResponse>({
    method: 'GET',
    url: `/admin/permissions`,
  });

  // 응답 데이터 검증
  const parsedData = PermissionsResponseSchema.parse(response.data);
  return parsedData;
};

const useGetPermissions = () => {
  const { data } = useSuspenseQuery<
    PermissionsResponse,
    Error,
    PermissionsResponse,
    PermissionsQkType
  >({
    queryKey: [GET_PERMISSIONS_QK],
    queryFn: () => getPermission(),
  });

  return { data };
};

export default useGetPermissions;
