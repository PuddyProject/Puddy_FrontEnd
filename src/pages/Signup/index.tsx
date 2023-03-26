import { ChangeEvent, useEffect, useRef, useState } from 'react';

import { Button, Checkbox, InputBox, InputTitle, FooterButton, Message } from 'components';

import { isValidId, isValidName, isValidPw } from 'utils';
import { isValidEmail } from 'utils/validate/checkSignup';

type FieldName = 'account' | 'password' | 'reEnterPassword' | 'userName' | 'email';

interface MemberShip {
  account: string;
  password: string;
  reEnterPassword: string;
  userName: string;
  email: string;
  isNotificated?: boolean;
}

const initMembershipValues: MemberShip = {
  account: '',
  password: '',
  reEnterPassword: '',
  userName: '',
  email: '',
  isNotificated: true,
};

const initWarningMessage: MemberShip = {
  account: '아이디를 입력해주세요.',
  password: '비밀번호를 입력해주세요.',
  reEnterPassword: '비밀번호를 다시 입력해주세요.',
  userName: '이름을 입력해주세요.',
  email: '이메일을 입력해주세요.',
};

const validateAccount = (value: string) => {
  if (isValidId(value)) return '중복확인을 해주세요.';
  return '영문으로 시작하며 4~10글자 영문/숫자여야 해요.';
};

const validatePassword = (value: string) => {
  if (isValidPw(value)) return '';
  return '6글자 이상 영어, 숫자, 특수문자를 포함해주세요.';
};

const validateReEnterPassword = (password: string, reEnterPassword: string) => {
  if (password === reEnterPassword) return '';
  return '비밀번호가 일치하지 않아요.';
};

const validateUserName = (value: string) => {
  if (isValidName(value)) return '';
  return '2~4글자 한글만 입력할 수 있어요.';
};

const validateEmail = (value: string) => {
  if (isValidEmail(value)) return '';
  return '올바른 이메일 형식을 입력해주세요.';
};

export default function Signup() {
  const [registrationMembership, setRegistrationMembership] = useState(initMembershipValues);
  const [warningMessage, setWarningMessage] = useState(initWarningMessage);

  const inputRef = useRef<HTMLInputElement>(null);

  const onChangeInput = (target: FieldName) => (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setRegistrationMembership((prev) => {
      return { ...prev, [target]: value };
    });

    setWarningMessage((prev) => {
      if (target === 'account') {
        return { ...prev, [target]: validateAccount(value) };
      }

      if (target === 'password') {
        return { ...prev, [target]: validatePassword(value) };
      }

      if (target === 'reEnterPassword') {
        const password = registrationMembership.password;
        const reEnterPassword = value;

        return { ...prev, [target]: validateReEnterPassword(password, reEnterPassword) };
      }

      if (target === 'userName') {
        return { ...prev, [target]: validateUserName(value) };
      }

      if (target === 'email') {
        return { ...prev, [target]: validateEmail(value) };
      }

      return { ...prev, [target]: '' };
    });
  };

  const onChangeCheckbox = (isChecked: boolean) => {
    setRegistrationMembership((prev) => {
      return { ...prev, isNotificated: isChecked };
    });
  };

  const onClickCheckDuplicate = (target: string) => async (e: React.MouseEvent) => {
    //TODO: API 문서 답변 오면 수정할 부분
    // 중복확인 버튼을 눌렀을 때 중복 아이디인 경우 '이미 존재하는 아이디입니다.'
    // 중복 아이디가 아닌 경우 '사용가능한 아이디입니다'
  };

  /**
   * 예외처리 목록 (id)
   * 1. 빈 값일 때
   * ✅ : 아이디를 입력해주세요.
   * 2. 아이디가 영문자로 시작하지 않을 때
   * 3. 4~10자가 아닐 때
   * 4. 영문/숫자가 포함되어 있지 않을 때
   * ✅: 영문자로 시작하는 4~10자 영문/숫자를 입력해주세요.
   * TODO: 5. 중복확인 버튼을 누르지 않았을 때
   *
   * (password)
   * 1. 빈 값일 때
   * ✅: 비밀번호를 입력해주세요.
   * 2. 6글자 이하일 때
   * 3. 영어, 숫자, 특수문자가 포함되지 않았을 때
   * ✅: 6글자 이상 영어, 숫자, 특수문자를 포함해주세요.
   *
   * (re-password)
   * 1. 빈 값일 때
   * ✅: 비밀번호를 다시 입력해주세요.
   * 2. password와 일치하지 않을 때
   * ✅: 비밀번호와 일치하지 않아요.
   *
   * (name)
   * 1. 빈 값일 때
   * ✅ : 이름을 입력해주세요.
   * 2. 한글이 아닐 때
   * ✅: 한글만 입력할 수 있어요.
   *
   * (email)
   * 1. 빈 값일 때
   * ✅: 이메일을 입력해주세요.
   * 2. a@b.c 와 같은 형태가 아닐 때
   * 3. 영문, 숫자, '@', '.'를 제외한 다른 문자가 있을 때
   * ✅ : 이메일 형식이 올바르지 않아요.
   * TODO: 4. 중복확인 안했을 때
   * :
   */

  console.log(registrationMembership);

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, []);

  useEffect(() => {
    if (registrationMembership.password !== registrationMembership.reEnterPassword) {
      setWarningMessage((prev) => {
        return { ...prev, reEnterPassword: '비밀번호가 일치하지 않아요.' };
      });
    } else
      setWarningMessage((prev) => {
        return { ...prev, reEnterPassword: '' };
      });
  }, [registrationMembership.password]);

  return (
    <div className='signup-container'>
      <h2 className='signup-title'>
        PUDDY 서비스는
        <br />
        <strong className='bold'>회원가입 후 이용</strong>하실 수 있어요. 😊
      </h2>
      <div className='signup-datas'>
        <div className='title-message'>
          <InputTitle isRequire>아이디</InputTitle>
          <Message isWarning alignRight>
            {registrationMembership.account === ''
              ? initWarningMessage.account
              : warningMessage.account}
          </Message>
        </div>
        <div className='duplicate-check-container'>
          <InputBox
            onChange={onChangeInput('account')}
            inputRef={inputRef}
            required
            width='100%'
            placeholder='아이디를 입력해주세요.'
          />
          <Button onClick={onClickCheckDuplicate('email')}>중복 확인</Button>
        </div>

        <div className='title-message'>
          <InputTitle isRequire>비밀번호</InputTitle>
          <Message isWarning alignRight>
            {registrationMembership.password === ''
              ? initWarningMessage.password
              : warningMessage.password}
          </Message>
        </div>
        <InputBox
          onChange={onChangeInput('password')}
          required
          width='100%'
          type='password'
          placeholder='비밀번호를 입력해주세요.'
        />

        <div className='title-message'>
          <InputTitle isRequire>비밀번호 확인</InputTitle>
          <Message isWarning alignRight>
            {registrationMembership.reEnterPassword === ''
              ? initWarningMessage.reEnterPassword
              : warningMessage.reEnterPassword}
          </Message>
        </div>
        <InputBox
          onChange={onChangeInput('reEnterPassword')}
          required
          width='100%'
          type='password'
          placeholder='비밀번호를 다시 입력해주세요.'
        />

        <div className='title-message'>
          <InputTitle isRequire>이름</InputTitle>
          <Message isWarning alignRight>
            {registrationMembership.userName === ''
              ? initWarningMessage.userName
              : warningMessage.userName}
          </Message>
        </div>
        <InputBox
          onChange={onChangeInput('userName')}
          required
          width='100%'
          placeholder='이름을 입력해주세요.'
        />

        <div className='title-message'>
          <InputTitle isRequire>이메일</InputTitle>
          <Message isWarning alignRight>
            {registrationMembership.email === '' ? initWarningMessage.email : warningMessage.email}
          </Message>
        </div>

        <div className='duplicate-check-container'>
          <InputBox
            onChange={onChangeInput('email')}
            required
            width='100%'
            type='email'
            placeholder='이메일을 입력해주세요.'
          />
          <Button>중복 확인</Button>
        </div>

        <div className='notification'>
          <Checkbox
            requestOnChange={onChangeCheckbox}
            checked={initMembershipValues.isNotificated}
            text='알림 수신 여부 동의'
          />
        </div>
        <span className='notification-message'>
          수신에 동의하면 퍼디의 다양한 소식을 받아보실 수 있어요.
        </span>
      </div>
      <FooterButton>회원가입</FooterButton>
    </div>
  );
}
