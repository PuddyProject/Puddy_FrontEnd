import { useState } from 'react';

import decodeJWT from 'utils/decodeJWT';

export function useAuth() {
  const [userToken, setUserToken] = useState<string | null>(null);

  // * 토큰 설정
  const initSessionStorageUserToken = (token: string) => {
    sessionStorage.setItem('userToken', token);
    setUserToken(token);
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

  return { userToken, initSessionStorageUserToken, removeSessionStorageUserToken, isTokenExpired };
}
