import axios from 'axios';

import decodeJWT from './decodeJWT';
import { decryptRefreshToken, encryptRefreshToken } from './cryptoRefreshToken';

import { loginApi } from 'constants/apiEndpoint';
import { LOGIN_PATH, NOT_FOUND_PATH } from 'constants/routes';

const SERVER_URL = `${process.env.REACT_APP_API_URL}`;

interface GET {
  endpoint: string;
  params?: string;
  queryString?: string;
}
interface DELETE {
  endpoint: string;
  params?: string;
  queryString?: string;
}

interface POST {
  endpoint: string;
  body?: object;
  isImage?: boolean;
  isPost?: boolean;
}

interface PATCH {
  endpoint: string;
  body?: object | File;
  isFormData: boolean;
}

interface PUT {
  endpoint: string;
  body?: object | File;
  isFormData: boolean;
}

const ContentTypes = {
  json: 'application/json',
  formData: 'multipart/form-data',
};

const instance = axios.create({
  baseURL: SERVER_URL,
  headers: {
    'Content-Type': ContentTypes.json,
  },
});

const isTokenExpired = (token: string) => {
  const decodedToken = decodeJWT(token);
  return decodedToken && decodedToken.exp > Date.now() / 1000 - 5 * 60;
};

const getNewToken = async () => {
  const oldRefreshToken = sessionStorage.getItem('refreshToken');
  const oldAccessToken = sessionStorage.getItem('accessToken');

  if (!oldRefreshToken) return;
  const encryptRefreshUserToken = encryptRefreshToken(oldRefreshToken);
  try {
    const res = await post({
      endpoint: loginApi.POST_TOKEN_REISSUE,
      body: {
        refreshToken: encryptRefreshUserToken,
        accessToken: oldAccessToken,
      },
    });

    const { accessToken, refreshToken } = res.data;
    sessionStorage.setItem('userToken', accessToken);
    const newDecryptRefreshToken = decryptRefreshToken(refreshToken);
    sessionStorage.setItem('refreshToken', newDecryptRefreshToken);

    return accessToken;
  } catch (err) {
    console.error(err);
  }
};

instance.interceptors.request.use(async (config) => {
  const userToken = sessionStorage.getItem('userToken');

  if (userToken) {
    // * 액세스 토큰 만료 확인 후 응답코드 400인 경우 서버로부터 새 토큰 발급 * //
    if (!isTokenExpired(userToken)) {
      try {
        const newToken = await getNewToken();
        config.headers.Authorization = newToken;
      } catch (err) {
        console.error(err);
      }
    } else {
      // * 액세스 토큰을 헤더에 실어보내용 :9 * //
      config.headers.Authorization = userToken;
    }
  }

  return config;
});

// ! 아래 코드는 테스트가 필요합니당..!
instance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    console.error(err);
    // TODO: 상태코드 400만 가지고 확인하면 안됨
    // if (err.response.status === 400) {
    //   sessionStorage.removeItem('userToken');
    //   window.alert('다시 로그인해주세요.');
    //   window.location.href = `${LOGIN_PATH}`;
    // }

    return Promise.reject(err);
  }
);

export async function get({ endpoint, params = '' }: GET) {
  const URL = `${endpoint}${params}`;
  // console.log(`%cGET 요청 ${SERVER_URL}${URL}`, 'color: #2a60ff;');

  return instance.get(URL);
}

export async function del({ endpoint, params = '' }: DELETE) {
  const URL = `${endpoint}${params}`;
  // console.log(`%cDELETE 요청 ${SERVER_URL}${URL}`, 'color: #2a60ff;');

  return instance.delete(URL);
}

export async function post({ endpoint, body, isImage = false, isPost = true }: POST) {
  const URL = endpoint;
  const bodyData = isImage ? body : JSON.stringify(body);

  // console.log(`%c${isPost ? 'POST' : 'PUT'} 요청:${SERVER_URL}${endpoint}`, 'color: #2a60ff;');
  // console.log(`%c${isPost ? 'POST' : 'PUT'} 요청 데이터: ${bodyData}`, 'color: #2a60ff;');

  const headers = {
    'Content-Type': isImage ? ContentTypes.formData : ContentTypes.json,
  };

  if (isPost) {
    return instance.post(URL, bodyData, { headers });
  } else {
    return instance.put(URL, bodyData, { headers });
  }
}

export async function patch({ endpoint, body, isFormData }: PATCH) {
  const URL = endpoint;
  const headers = {
    'Content-Type': isFormData ? ContentTypes.formData : ContentTypes.json,
  };

  return instance.patch(URL, isFormData ? body : JSON.stringify(body), {
    headers,
  });
}

export async function put({ endpoint, body, isFormData }: PUT) {
  const URL = endpoint;
  const headers = {
    'Content-Type': isFormData ? ContentTypes.formData : ContentTypes.json,
  };

  return instance.put(URL, isFormData ? body : JSON.stringify(body), {
    headers,
  });
}
