import { z } from 'zod';
import { ApiResponseSchema } from './common';
import { GET_PERMISSIONS_QK } from '@/constants/admin';

// permissions
export const PermissionsSchema = z.object({
  permissions: z.array(
    z.object({
      permissionId: z.number(),
      name: z.string(),
      description: z.string(),
      createdAt: z.string().datetime(),
      updatedAt: z.string().datetime(),
    }),
  ),
});

// 데이터 타입 추출
export type PermissionsData = z.infer<typeof PermissionsSchema>;
export const PermissionsResponseSchema = ApiResponseSchema(
  z.object({
    message: z.string(),
    permissions: PermissionsSchema,
  }),
);

// 쿼리 키 타입
export type PermissionsQkType = [typeof GET_PERMISSIONS_QK];

export type PermissionsResponse = z.infer<typeof PermissionsResponseSchema>;
