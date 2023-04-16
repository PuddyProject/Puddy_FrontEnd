import { useState } from 'react';

import decodeJWT from 'utils/decodeJWT';

export function useAuth() {
  const [userToken, setUserToken] = useState<string | null>(null);

  // * 액세스 토큰 세션 스토리지에 세팅 * //
  const initSessionStorageUserToken = (token: string | null) => {
    if (!token) return null;

    sessionStorage.setItem('userToken', token);
    setUserToken(token);
  };

  // * 암호화된 리프레시 토큰 세션 스토리지에 세팅 * //
  const initSessionStorageRefeshToken = (encryptRefreshToken: string) => {
    if (!encryptRefreshToken) return;

    sessionStorage.setItem('refreshToken', encryptRefreshToken);
  };

  // * 토큰 삭제
  const removeSessionStorageUserToken = () => {
    sessionStorage.removeItem('userToken');
    setUserToken(null);
  };

  // * 토큰 만료 확인
  const isTokenExpired = () => {
    if (!userToken) return false;

    const decodedToken = decodeJWT(userToken);
    return decodedToken && decodedToken.exp > Date.now() / 1_000;
  };

  return {
    userToken,
    initSessionStorageUserToken,
    initSessionStorageRefeshToken,
    removeSessionStorageUserToken,
    isTokenExpired,
  };
}
