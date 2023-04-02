import jwtDecode from 'jwt-decode';

import { UserToken } from 'types/userTokenTypes';

export default function decodeJWT(token: string) {
  try {
    const decodeToken = jwtDecode<UserToken>(token);
    return decodeToken as UserToken;
  } catch (err) {
    console.error('토큰 디코드 실패', err);
    return null;
  }
}
