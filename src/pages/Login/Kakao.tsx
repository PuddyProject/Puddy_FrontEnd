import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

import { REDIRECT_URI, KAKAO_AUTH_URI } from 'constants/kakaoLogin';

export default function Kakao() {
  const location = useLocation();
  const KAKAO_CODE = location.search.split('=').pop();

  const getToken = async () => {
    const body = {
      grant_type: 'authorization_code',
      client_id: process.env.REACT_APP_REST_API_KEY,
      redirect_uri: REDIRECT_URI,
      code: KAKAO_CODE,
    };

    try {
      const res = await axios.post(KAKAO_AUTH_URI, body, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
      });

      console.log(res.data.access_token);
    } catch (err) {
      console.error(err, '카카오 소셜 로그인 에러');
    }
  };

  useEffect(() => {
    if (!KAKAO_CODE) return;

    getToken();
  }, [KAKAO_CODE]);

  return <>카카오 로그인</>;
}
