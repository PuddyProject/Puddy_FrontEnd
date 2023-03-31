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

/**
 * 유효성 검사 함수
 */
export const validateAccount = (value: string) => {
  if (isValidId(value)) {
    return {
      state: true,
      msg: '중복 확인을 해주세요.',
    };
  }

  return {
    state: false,
    msg: '영문으로 시작하며 4~10글자 영문/숫자여야 해요.',
  };
};

export const validatePassword = (value: string) => {
  if (isValidPw(value)) {
    return {
      state: true,
      msg: '',
    };
  }

  return { state: false, msg: '6글자 이상 영어, 숫자, 특수문자를 포함해주세요.' };
};

export const validateReEnterPassword = (password: string, reEnterPassword: string) => {
  if (password === reEnterPassword) {
    return {
      state: true,
      msg: '',
    };
  }

  return {
    state: false,
    msg: '비밀번호가 일치하지 않아요.',
  };
};

export const validateusername = (value: string) => {
  if (isValidName(value)) {
    return {
      state: true,
      msg: '',
    };
  }

  return {
    state: false,
    msg: '2~4글자 한글만 입력할 수 있어요.',
  };
};

export const validateEmail = (value: string) => {
  if (isValidEmail(value)) {
    return {
      state: true,
      msg: '중복 확인을 해주세요.',
    };
  }

  return {
    state: false,
    msg: '올바른 이메일 형식을 입력해주세요.',
  };
};
