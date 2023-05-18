import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

import { REDIRECT_URI, KAKAO_AUTH_URI } from 'constants/kakaoLogin';
import { socialLoginApi } from 'constants/apiEndpoint';
import { HOME_PATH } from 'constants/routes';
import { encryptRefreshToken } from 'utils/cryptoRefreshToken';
import { useAuth } from 'hooks/useAuth';

interface ErrorResponse {
  response: {
    data: {
      resultCode: string;
      data: null | object;
    };
  };
}

const SERVER_URL = `${process.env.REACT_APP_API_URL}`;

export default function Kakao() {
  const { initSessionStorageUserToken, initSessionStorageRefeshToken } = useAuth();

  const location = useLocation();
  const KAKAO_CODE = location.search.split('=').pop();

  const navigate = useNavigate();

  const getToken = async () => {
    if (!KAKAO_CODE) {
      navigate(`${HOME_PATH}`);
      return;
    }

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

      tryLogin(res.data.access_token);
    } catch (err) {
      console.error(err, '카카오 인가코드 발급 에러');
      return navigate(`${HOME_PATH}`);
    }
  };

  // * 카카오 인가 코드로 액세스 토큰 획득 후
  // * 백엔드 서버로 카카오 토큰 전달
  const tryLogin = async (kakaoAccessToken: string) => {
    const socialLoginUrl = socialLoginApi.POST_SOCIAL_LOGIN_KAKAO;

    try {
      const res = await axios.post(
        `${SERVER_URL}/${socialLoginUrl}`,
        {},
        {
          headers: {
            Authorization: `${kakaoAccessToken}`,
          },
        }
      );

      if (res.status === 200) {
        const accessToken = res.data.data.accessToken;
        const refreshToken = res.data.data.refreshToken;

        const encryptedRefreshToken = encryptRefreshToken(refreshToken);

        initSessionStorageUserToken(accessToken);
        initSessionStorageRefeshToken(encryptedRefreshToken);

        navigate(`${HOME_PATH}`);
        return;
      }
    } catch (err) {
      console.error(err, '카카오 로그인 시도 실패');
      const error = err as ErrorResponse;
      const resultCode = error.response.data.resultCode;
      if (resultCode === 'NEED_MORE_INFO') {
        await joinKakao(kakaoAccessToken);
      }
    }
  };

  // * 서버로부터 400 응답을 받은 경우 비회원 유저이므로
  // * /auth/join 경로로 회원가입 요청
  /**
   * * {
   * *   "isNotificated" : true,
   * *   "provider" : "KAKAO"
   * * }
   *
   * * 위 정보를 body에 담아 실어보내야 함.
   */

  const joinKakao = async (kakaoAccessToken: string) => {
    const body = {
      isNotificated: true,
      provider: 'KAKAO',
    };

    try {
      const res = await axios.post(`${SERVER_URL}/${socialLoginApi.POST_SOCIAL_JOIN_KAKAO}`, body, {
        headers: {
          Authorization: kakaoAccessToken,
        },
      });

      if (res.data.resultCode === 'SUCCESS') {
        const accessToken = res.data.data.accessToken;
        const refreshToken = res.data.data.refreshToken;
        const encryptedRefreshToken = encryptRefreshToken(refreshToken);

        initSessionStorageUserToken(accessToken);
        initSessionStorageRefeshToken(encryptedRefreshToken);
      }
    } catch (err) {
      console.error('카카오 회원가입 에러', err);
    }
  };

  useEffect(() => {
    if (!location.search && !KAKAO_CODE) return;

    const authKakao = async () => {
      await getToken();
    };

    authKakao();
  }, [location]);

  return <></>;
}
