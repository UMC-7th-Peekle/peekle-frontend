import { z } from 'zod';
import { ApiResponseSchema } from './common';
import { GET_PERMISSIONS_QK, GET_ROLES_QK } from '@/constants/admin';

// permissions
export const PermissionsSchema = z.array(
  z.object({
    permissionId: z.number(),
    name: z.string(),
    description: z.string(),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
  }),
);

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

// roles
export const RolesSchema = z.array(
  z.object({
    roleId: z.number(),
    name: z.string(),
    description: z.string(),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
  }),
);

// 데이터 타입 추출
export type RolesData = z.infer<typeof RolesSchema>;
export const RolesResponseSchema = ApiResponseSchema(
  z.object({
    message: z.string(),
    roles: RolesSchema,
  }),
);

// 쿼리 키 타입
export type RolesQkType = [typeof GET_ROLES_QK];

export type RolesResponse = z.infer<typeof RolesResponseSchema>;
