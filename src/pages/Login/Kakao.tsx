import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios, { AxiosError } from 'axios';

import { REDIRECT_URI, KAKAO_AUTH_URI } from 'constants/kakaoLogin';
import { socialLoginApi } from 'constants/apiEndpoint';
import { HOME_PATH } from 'constants/routes';
import { encryptRefreshToken } from 'utils/cryptoRefreshToken';

interface ErrorResponse {
  resultCode: string;
  data: null | object;
}

const SERVER_URL = `${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/`;

export default function Kakao() {
  const location = useLocation();
  const KAKAO_CODE = location.search.split('=').pop();

  const [kakaoAccessToken, setKakaoAccessToken] = useState('');

  const navigate = useNavigate();

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
      await tryLogin(res.data.access_token);
    } catch (err) {
      console.error(err, '카카오 에러');
    }
  };

  const tryLogin = async (token: string) => {
    try {
      const socialLoginUrl = socialLoginApi.POST_SOCIAL_LOGIN_KAKAO;
      const res = await axios.post(
        `${SERVER_URL}${socialLoginUrl}`,
        {},
        {
          headers: { Authorization: `${token}` },
        }
      );

      // 상태코드 200 반환 시 세션 스토리지 저장
      // TODO: 마이페이지에서 닉네임 변경 시 리프레시 토큰이 없으므로 에러 발생할듯
      if (res.status === 200) {
        const accessToken = res.data.data.accessToken;
        const refreshToken = res.data.data.refreshToken;

        console.log(res);

        if (accessToken) {
          sessionStorage.setItem('userToken', accessToken);
          // 리프레시 토큰 암호화
          const encryptRefreshUserToken = encryptRefreshToken(refreshToken);
          sessionStorage.setItem('refreshToken', encryptRefreshUserToken);

          navigate(`${HOME_PATH}`);
        }
      }
    } catch (err) {
      const error = err as AxiosError;
      const errorData = error.response?.data as ErrorResponse;
      console.error(errorData.resultCode, 'error');
      if (errorData.resultCode === 'NEED_MORE_INFO') {
        await getUser(token);
      }
    }
  };

  const getUser = async (kakaoToken: string) => {
    const body = {
      isNotificated: true,
      provider: 'KAKAO',
    };

    try {
      const socialJoinUrl = socialLoginApi.POST_SOCIAL_JOIN_KAKAO;
      const res = await axios.post(`${SERVER_URL}${socialJoinUrl}`, body, {
        headers: { Authorization: `${kakaoToken}` },
      });

      console.log(res);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (!location.search && !KAKAO_CODE) return;

    const authKakao = async () => {
      await getToken();
    };

    authKakao();
  }, [location]);

  useEffect(() => {
    if (!kakaoAccessToken) return;
  }, []);

  return <></>;
}
