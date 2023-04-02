import { useState } from 'react';

import decodeJWT from 'utils/decodeJWT';

export function useAuth() {
  const [userToken, setUserToken] = useState<string | null>(sessionStorage.getItem('userToken'));

  const decodedUserToken = () => {
    if (!userToken) return null;

    const decodedToken = decodeJWT(userToken);
    return decodedToken;
  };

  const setToken = (token: string) => {
    sessionStorage.setItem('userToken', token);
    setUserToken(token);
  };

  const removeToken = () => {
    sessionStorage.removeItem('userToken');
    setUserToken(null);
  };

  // * 토큰 만료 확인
  const isValidToken = () => {
    if (!userToken) return false;

    const decodedToken = decodeJWT(userToken);
    return decodedToken && decodedToken.exp > Date.now() / 1_000;
  };

  return { decodedUserToken, userToken, setToken, removeToken, isValidToken };
}
