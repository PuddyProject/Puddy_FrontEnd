import { useRef, useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { GrFormPrevious as PrevIcon } from 'react-icons/gr';
import { Link, useNavigate } from 'react-router-dom';

import { Button, InputBox, Message } from 'components/index';

import { ApiError } from 'types/errorsTypes';

import { KAKAO_LOGIN_URI } from 'constants/kakaoLogin';
import { loginApi } from 'constants/apiEndpoint';
import { FIND_ID_PW_PATH, HOME_PATH } from 'constants/routes';

import { Google, Naver, Kakao } from 'assets/login/symbols';
import Logo from 'assets/Logo.svg';

import { post } from 'utils';
import { encryptRefreshToken } from 'utils/cryptoRefreshToken';

import { useUser } from 'context/UserContext';
import { useAuth } from 'hooks/useAuth';

const snsLoginItems = [
  { name: '카카오 로그인', imgSrc: Kakao, className: 'kakao', link: KAKAO_LOGIN_URI },
  { name: '네이버 로그인', imgSrc: Naver, className: 'naver' },
  { name: '구글 로그인', imgSrc: Google, className: 'google' },
];

export default function Login() {
  const navigate = useNavigate();

  const { initSessionStorageUserToken, initSessionStorageRefeshToken } = useAuth();
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
        endpoint: `${loginApi.POST_LOGIN}`,
        body: loginInputValues,
      };
      const res = await post(payload);

      if (res.status === 200) {
        const resData = res.data.data;
        const accessToken = resData.accessToken;
        const refreshToken = encryptRefreshToken(resData.refreshToken);

        initSessionStorageUserToken(accessToken);
        initSessionStorageRefeshToken(refreshToken);

        setToken(accessToken);
        navigate(`${HOME_PATH}`);
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

  const onClickFindIdPw = () => {
    navigate(`${FIND_ID_PW_PATH}`);
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <>
      <form className='login-container' onSubmit={onSubmitForm}>
        <PrevIcon
          className='prev-icon'
          onClick={() => {
            navigate(`${HOME_PATH}`);
          }}
        />
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
          <span tabIndex={0} onClick={onClickFindIdPw}>
            아이디/비밀번호 찾기
          </span>
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
          {snsLoginItems.map((sns) =>
            sns.link ? (
              <Link to={sns.link}>
                <li className={sns.className} role='button' tabIndex={0}>
                  <span>{sns.name}</span>
                  <img src={sns.imgSrc} alt={sns.name} />
                </li>
              </Link>
            ) : (
              <li className={sns.className} role='button' tabIndex={0}>
                <span>{sns.name}</span>
                <img src={sns.imgSrc} alt={sns.name} />
              </li>
            )
          )}
        </ul>
      </div>
    </>
  );
}
