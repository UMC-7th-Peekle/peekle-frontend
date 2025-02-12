export const ROUTES = {
  ONBOARDING: '/onboarding',
  AUTH_PHONE_NUMBER: '/auth/phone-number',
  AUTH_GENDER: '/auth/gender',
  AUTH_PERSONAL_DATA: '/auth/personal-data',
  EVENT: '/event',
  EVENT_MAP: '/event/map',
  EVENT_SEARCH: '/event/search',
  EVENT_SCRAP: '/event/scrap',
  EVENT_DETAIL: '/event/:id',
  COMMUNITY: '/community',
  COMMUNITY_SEARCH: '/community/search',
  COMMUNITY_LIKE: '/community/like',
  COMMUNITY_DETAIL: '/community/:communityId/:articleId',
  COMMUNITY_EDIT: '/community/edit',
  USER: '/user',
  NOT_FOUND: '*',
};

export const PUBLIC_PATHS = [
  ROUTES.EVENT,
  ROUTES.EVENT_SEARCH,
  ROUTES.EVENT_DETAIL,
] as const;
