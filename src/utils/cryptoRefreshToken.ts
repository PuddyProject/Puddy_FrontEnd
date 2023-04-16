import CryptoJS from 'crypto-js';

const SECRET_KEY = `${process.env.TOKEN_SECRET_KEY}`;

// * 리프레시 토큰 암호화 * //
export const encryptRefreshToken = (refreshToken: string) => {
  const ciphertext = CryptoJS.AES.encrypt(JSON.stringify(refreshToken), SECRET_KEY).toString();

  return ciphertext;
};

// * 리프레시 토큰 복호화 * //
export const decryptRefreshToken = (ciphertext: string) => {
  const bytes = CryptoJS.AES.decrypt(ciphertext, SECRET_KEY);
  const decryptData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

  return decryptData;
};
