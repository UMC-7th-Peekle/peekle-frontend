// ✅ RefreshToken 가져오기 함수
export const getRefreshTokenFromCookie = (): string | null => {
  const cookies = document.cookie.split('; ');
  const refreshTokenCookie = cookies.find((cookie) =>
    cookie.startsWith('PEEKLE_RT='),
  );
  return refreshTokenCookie
    ? decodeURIComponent(refreshTokenCookie.split('=')[1])
    : null;
};
