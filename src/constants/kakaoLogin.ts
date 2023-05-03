export const REDIRECT_URI = 'https://www.puddy.world/oauth/authorize';
export const KAKAO_LOGIN_URI = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
export const KAKAO_AUTH_URI = 'https://kauth.kakao.com/oauth/token';
