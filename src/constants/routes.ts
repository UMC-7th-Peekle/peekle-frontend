export const ROUTES = {
  ADMIN: '/admin',
  ONBOARDING: '/onboarding',
  AUTH_PHONE_NUMBER: '/auth/phone-number',
  AUTH_GENDER: '/auth/gender',
  AUTH_PERSONAL_DATA: '/auth/personal-data',
  AUTH_LOCAL_LOGIN: '/auth/login/local',
  EVENT: '/event',
  EVENT_MAP: '/event/map',
  EVENT_SEARCH: '/event/search',
  EVENT_SCRAP: '/event/scrap',
  EVENT_DETAIL: '/event/:id',
  EVENT_CREATE: '/admin/event/create',
  EVENT_EDIT: '/admin/event/edit',
  COMMUNITY: '/community',
  COMMUNITY_SEARCH: '/community/search',
  COMMUNITY_LIKE: '/community/like',
  COMMUNITY_DETAIL: '/community/:communityId/:articleId',
  COMMUNITY_EDIT: '/community/edit',
  USER: '/user',
  ADMIN_SEARCH: '/admin/search',
  CREATE_ROLE: '/admin/authority/create-role',
  AUTHORIZE_ROLE: '/admin/authority/authorize-role',
  UNAUTHORIZE_ROLE: '/admin/authority/unauthorize-role',
  NOT_FOUND: '*',
};

// 여기에 관리자 path를 추가해주세요
export const ADMIN_PATHS = [
  ROUTES.ADMIN,
  ROUTES.EVENT_CREATE,
  ROUTES.EVENT_EDIT,
  ROUTES.ADMIN_SEARCH,
] as const;
