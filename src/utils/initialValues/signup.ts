/**
 * 회원가입 페이지
 * 초기화 변수 정의
 */

import { Membership } from 'types/signupTypes';

export const initMembershipValues = {
  account: '',
  password: '',
  reEnterPassword: '',
  username: '',
  email: '',
  isNotificated: true,
};

export const initWarningMessage: Membership = {
  account: '아이디를 입력해주세요.',
  password: '비밀번호를 입력해주세요.',
  reEnterPassword: '비밀번호를 다시 입력해주세요.',
  username: '이름을 입력해주세요.',
  email: '이메일을 입력해주세요.',
};
