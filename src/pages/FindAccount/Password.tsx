import { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { CustomHeader, FooterButton, InputBox } from 'components';
import InputTilte from 'components/common/InputTitle';

import { post } from 'utils';

import { findIdPwApi } from 'constants/apiEndpoint';
import { LOGIN_PATH } from 'constants/routes';

export default function Password() {
  const [userInfo, setUserInfo] = useState({
    username: '',
    account: '',
    email: '',
  });

  const navigate = useNavigate();

  const onClickChangePassword = async () => {
    // 비밀번호 변경 요청
    try {
      const res = await post({
        endpoint: `${findIdPwApi.POST_FIND_PW}`,
        body: {
          ...userInfo,
        },
      });

      if (res.data.resultCode === 'SUCCESS') {
        window.alert('임시 비밀번호 발급이 완료되었습니다.');
        navigate(`${LOGIN_PATH}`);
      }
    } catch (err) {
      console.error(err);
      window.alert('해당 유저 정보가 존재하지 않아요.');
    }
  };

  const onChangeInput =
    (target: 'username' | 'account' | 'email') => (e: ChangeEvent<HTMLInputElement>) => {
      setUserInfo((prev) => {
        return {
          ...prev,
          [target]: e.target.value,
        };
      });
    };

  return (
    <>
      <CustomHeader title='비밀번호 찾기' hideIcon />
      <div className='password-container'>
        <div>
          <InputTilte isRequire>이름</InputTilte>
          <InputBox
            onChange={onChangeInput('username')}
            value={userInfo.username}
            placeholder='이름을 입력하세요.'
          />
        </div>

        <div>
          <InputTilte isRequire>아이디</InputTilte>
          <InputBox
            onChange={onChangeInput('account')}
            value={userInfo.account}
            placeholder='아이디를 입력하세요.'
          />
        </div>

        <div>
          <InputTilte isRequire>이메일</InputTilte>
          <InputBox
            onChange={onChangeInput('email')}
            value={userInfo.email}
            placeholder='이메일을 입력하세요.'
          />
        </div>
        <p className='message'>
          회원가입시 작성한 이메일로
          <br />
          <strong>임시 비밀번호</strong>가 발급됩니다.
        </p>
        <FooterButton onClick={onClickChangePassword}>확인</FooterButton>
      </div>
    </>
  );
}
