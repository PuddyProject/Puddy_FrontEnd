import axios from 'axios';

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

instance.interceptors.request.use((config) => {
  const userToken = sessionStorage.getItem('userToken');

  if (userToken) {
    config.headers.Authorization = userToken;
  }

  return config;
});

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
