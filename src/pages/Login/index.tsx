import Logo from 'assets/Logo.svg';
import { Button, InputBox, Message } from 'components/index';
import { Google, Naver, Kakao } from 'assets/login/symbols';

import React, { useRef, useEffect } from 'react';

export default function Login() {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <>
      <form className='login-container'>
        <img src={Logo} className='logo' alt='puddy_logo' />
        <div className='inputs'>
          <Message isWarning={true} message='아이디 또는 비밀번호가 일치하지 않아요.' />
          <InputBox
            inputRef={inputRef}
            required
            width='250px'
            placeholder='아이디를 입력해주세요.'
          />
          <InputBox required width='250px' type='password' placeholder='비밀번호를 입력해주세요.' />
          <Button>로그인</Button>
        </div>
        <div className='find-and-join-container'>
          <span>아이디/비밀번호 찾기</span>
          <span className='vertical-bar'>|</span>
          <span className='join'>회원가입</span>
        </div>
      </form>

      <div className='sns-join-container'>
        <p className='dividing-line'></p>
        <h3>SNS 계정으로 간편하게 시작하기</h3>
        <ul className='sns-logins'>
          <li className='social-login kakao' role='button'>
            <span>카카오</span>
            <img src={Kakao} alt='카카오' />
          </li>
          <li className='social-login naver' role='button'>
            <span>네이버</span>
            <img src={Naver} alt='네이버' />
          </li>
          <li className='social-login google' role='button'>
            <span>구글</span>
            <img src={Google} alt='구글' />
          </li>
        </ul>
      </div>
    </>
  );
}