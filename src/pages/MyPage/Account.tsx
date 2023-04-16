import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { CustomHeader } from 'components';
import ButtonModal from 'components/common/ButtonModal';

import { del } from 'utils';

import { myPageApi } from 'constants/apiEndpoint';
import { HOME_PATH, MY_PAGE_WITHDRAWAL_PATH } from 'constants/routes';

const initLogoutModalText = {
  cancleText: '취소하기',
  confirmText: '로그아웃',
  text: '로그아웃',
  subText: '현재 계정을 로그아웃할까요?',
};

const modalTargets = {
  logout: '로그아웃',
};

export default function Account() {
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [logoutModalText, setLogoutModalText] = useState(initLogoutModalText);

  const onClickMenuItem = (target: string) => () => {
    if (target) setShowModal(() => true);
  };

  const onConfirmLogout = async () => {
    try {
      const res = await del({ endpoint: myPageApi.DELETE_LOGOUT });
      if (res.status === 200) {
        sessionStorage.removeItem('userToken');
        navigate(`${HOME_PATH}`);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const onClickWithdrawal = () => {
    navigate(`${MY_PAGE_WITHDRAWAL_PATH}`);
  };

  return (
    <>
      {showModal && (
        <ButtonModal
          cancleText={logoutModalText.cancleText}
          confirmText={logoutModalText.confirmText}
          text={logoutModalText.text}
          subText={logoutModalText.subText}
          closeModal={() => {
            setShowModal(false);
          }}
          onCancle={() => {
            setShowModal(false);
          }}
          onConfirm={onConfirmLogout}
        />
      )}
      <CustomHeader title='계정' />
      <div className='setting-menus'>
        <ul className='account-menus'>
          <li role='button'>비밀번호 변경</li>
          <li onClick={onClickMenuItem(modalTargets.logout)} role='button'>
            로그아웃
          </li>
          <li role='button' onClick={onClickWithdrawal}>
            회원탈퇴
          </li>
        </ul>
      </div>
    </>
  );
}
