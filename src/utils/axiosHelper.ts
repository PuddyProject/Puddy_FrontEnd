import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import decodeJWT from './decodeJWT';

const SERVER_URL = `${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/`;

interface GET {
  endpoint: string;
  params?: string;
  queryString?: string;
}

interface POST {
  endpoint: string;
  body?: object;
  isImage?: boolean;
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
  return decodedToken && decodedToken.exp > Date.now() / 1000;
};

instance.interceptors.request.use((config) => {
  const userToken = sessionStorage.getItem('userToken');

  if (userToken) {
    if (userToken && isTokenExpired(userToken)) {
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
    const originalRequest = err.config;
    const navigate = useNavigate();
    const userToken = sessionStorage.getItem('userToken');
    if (userToken) {
      if (err.response.status === 401 && !originalRequest._retry && isTokenExpired(userToken)) {
        originalRequest._retry = true;

        try {
          const getNewAccessToken = () => {
            get({ endpoint: 'users/login/reissue' });
          };

          const newAccessToken = await getNewAccessToken();
          originalRequest.headers.Authorization = newAccessToken;
          return axios(originalRequest);
        } catch (err) {
          // * 리프레시 토큰 만료, 기타 에러
          console.error(err);
          window.alert('로그인 시간이 만료되었어요.');
          navigate('/auth/login');
        }
      }
    }

    return Promise.reject(err);
  }
);

export async function get({ endpoint, params = '' }: GET) {
  const URL = `${endpoint}${params}`;
  console.log(`%cGET 요청 ${SERVER_URL}${URL}`, 'color: #2a60ff;');

  return instance.get(URL);
}

export async function post({ endpoint, body, isImage = false }: POST) {
  const URL = endpoint;
  const bodyData = isImage ? body : JSON.stringify(body);

  console.log(`%cPOST 요청:${SERVER_URL}${endpoint}`, 'color: #2a60ff;');
  console.log(`%cPOST 요청 데이터: ${bodyData}`, 'color: #2a60ff;');

  const headers = {
    'Content-Type': isImage ? ContentTypes.formData : ContentTypes.json,
  };

  return instance.post(URL, bodyData, { headers });
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
