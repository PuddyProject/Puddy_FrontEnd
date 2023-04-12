import { useRef, useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { Button, InputBox, Message } from 'components/index';

import { ApiError } from 'types/errorsTypes';
import { KAKAO_LOGIN_URI } from 'constants/kakaoLogin';

import { Google, Naver, Kakao } from 'assets/login/symbols';
import Logo from 'assets/Logo.svg';

import { post } from 'utils';
import { useUser } from 'context/UserContext';
import { useAuth } from 'hooks/useAuth';

export default function Login() {
  const navigate = useNavigate();

  const { initSessionStorageUserToken } = useAuth();
  const { setToken } = useUser();

  const inputRef = useRef<HTMLInputElement>(null);

  const [showWarningMessage, setShowWarningMessage] = useState(false);
  const [loginInputValues, setLoginInputValues] = useState({
    account: '',
    password: '',
  });

  const onChangeLoginForm =
    (target: 'account' | 'password') => (e: ChangeEvent<HTMLInputElement>) => {
      setShowWarningMessage(() => false);

      setLoginInputValues((prev) => {
        return {
          ...prev,
          [target]: e.target.value,
        };
      });
    };

  const onSubmitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const payload = {
        endpoint: 'users/login',
        body: loginInputValues,
      };
      const res = await post(payload);

      if (res.status === 200) {
        const accessToken = res.data.data.accessToken;
        initSessionStorageUserToken(accessToken);
        setToken(accessToken);
        alert('로그인 성공!');
        navigate('/');
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error(err.message);
      }

      const error = err as ApiError;
      console.log(error);
      if (error.response && error.response?.status >= 400) {
        setShowWarningMessage(true);
      }
    }
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <>
      <form className='login-container' onSubmit={onSubmitForm}>
        <img src={Logo} className='logo' alt='puddy_logo' />
        <div className='inputs'>
          {showWarningMessage && (
            <Message isWarning>아이디 또는 비밀번호가 일치하지 않아요.</Message>
          )}
          <InputBox
            onChange={onChangeLoginForm('account')}
            inputRef={inputRef}
            required
            width='250px'
            placeholder='아이디를 입력해주세요.'
          />
          <InputBox
            onChange={onChangeLoginForm('password')}
            required
            width='250px'
            type='password'
            placeholder='비밀번호를 입력해주세요.'
          />
          <Button>로그인</Button>
        </div>
        <div className='find-and-join-container'>
          <span tabIndex={0}>아이디/비밀번호 찾기</span>
          <span className='vertical-bar'>|</span>
          <span className='join' tabIndex={0}>
            <Link to='/auth/signup'>회원가입</Link>
          </span>
        </div>
      </form>

      <div className='sns-join-container'>
        <hr className='dividing-line' />
        <h3>SNS 계정으로 간편하게 시작하기</h3>
        <ul className='sns-logins'>
          <Link to={KAKAO_LOGIN_URI}>
            <li className='social-login kakao' role='button' tabIndex={0}>
              <span>카카오 로그인</span>
              <img src={Kakao} alt='카카오' />
            </li>
          </Link>
          <li className='social-login naver' role='button' tabIndex={0}>
            <span>네이버 로그인</span>
            <img src={Naver} alt='네이버' />
          </li>
          <li className='social-login google' role='button' tabIndex={0}>
            <span>구글 로그인</span>
            <img src={Google} alt='구글' />
          </li>
        </ul>
      </div>
    </>
  );
}
