export const ROUTES = {
  HOME: '/',
  ALERT: '/alert',
  MY_COMMENT: '/comment',
  MY_FOLLOWING: '/following',
  MY_LIKE: '/like',
  MY_SUBSCRIBE: '/subscribe',
  MY_INFO_EDIT: '/edit',
  PLAY_LIST_EDIT: '/play-list/:playListId/edit',
  PLAY_LIST: '/play-list/:playListId',
  SEARCH: '/search',
  SIGN_IN: '/auth/sign-in',
  SIGN_UP: '/auth/sign-up',
  AUTH_CALLBACK: '/auth/callback',
  USER_FOLLOW: '/:nickname/follow',
  EVENT: '/event',
  COMMUNITY: '/community',
  COMMUNITY_SEARCH: '/community/search',
  USER: '/user',
  NOT_FOUND: '*',
};

export const PUBLIC_PATHS = [
  ROUTES.AUTH_CALLBACK,
  ROUTES.SIGN_IN,
  ROUTES.SIGN_UP,
  ROUTES.SEARCH,
  ROUTES.HOME,
] as const;
