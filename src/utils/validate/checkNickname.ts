const NICKNAME_REG_EXP = /^(?!퍼디)[가-힣a-zA-Z0-9]{2,10}$/;

export function isValidNickname(nickname: string) {
  return NICKNAME_REG_EXP.test(nickname);
}
