import { useEffect, useState } from 'react';
import { UserToken } from 'types/userTokenTypes';

import decodeJWT from 'utils/decodeJWT';

export function useAuth() {
  const [userToken, setUserToken] = useState<string | null>(null);
  const [userDecodedToken, setUserDecodedToken] = useState<UserToken | null>(null);

  useEffect(() => {
    const token = sessionStorage.getItem('userToken');
    setUserToken(() => token);
    if (userToken) {
      decodedUserToken();
    }
  }, [userToken]);

  // * 토큰 디코드
  const decodedUserToken = () => {
    if (!userToken) return null;

    const decodedToken = decodeJWT(userToken);
    setUserDecodedToken(() => decodedToken);
  };

  // * 토큰 설정
  const setToken = (token: string) => {
    sessionStorage.setItem('userToken', token);
    setUserToken(token);
  };

  // * 토큰 삭제
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

  return { userDecodedToken, userToken, setToken, removeToken, isValidToken };
}
