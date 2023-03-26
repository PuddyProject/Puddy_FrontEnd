const ID_REG_EXP = /^[a-zA-Z][a-zA-Z0-9]{3,9}$/;
const PW_REG_EXP = /^(?=.*[a-zA-Z])(?=.*[!@#$%^&*()])(?=.*[0-9])[a-zA-Z!@#$%^&*()0-9 ]{6,}$/;
const NAME_REG_EXP = /^[가-힣]{2,4}$/;
const EMAIL_REG_EXP = /^[a-zA-Z_-][a-zA-Z0-9._-]+@[a-zA-Z][a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export function isValidId(account: string) {
  return ID_REG_EXP.test(account);
}

export function isValidPw(password: string) {
  return PW_REG_EXP.test(password);
}

export function isValidName(name: string) {
  return NAME_REG_EXP.test(name);
}

export function isValidEmail(email: string) {
  return EMAIL_REG_EXP.test(email);
}
