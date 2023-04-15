import { useState } from 'react';

import { Button, CustomHeader } from 'components';
import ButtonModal from 'components/common/ButtonModal';

export default function Withdrawal() {
  const [showModal, setShowModal] = useState(false);
  const [withdrawalModalText, setWithdrawalModalText] = useState({
    cancleText: '취소하기',
    confirmText: '확인하기',
    text: '회원 탈퇴',
    subText: '확인을 누르면 탈퇴가 완료돼요.',
  });

  const onClickWithdrawal = async () => {
    try {
      // TODO: 서버 API 코드추가
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      {showModal && (
        <ButtonModal
          cancleText={withdrawalModalText.cancleText}
          confirmText={withdrawalModalText.confirmText}
          text={withdrawalModalText.text}
          subText={withdrawalModalText.subText}
          closeModal={() => {
            setShowModal(false);
          }}
          onCancle={() => {
            setShowModal(false);
          }}
          onConfirm={onClickWithdrawal}
        />
      )}
      <CustomHeader title='회원탈퇴' hideIcon />
      <div className='withdrawal-container'>
        <h2 className='withdrawal-title'>
          <strong>PUDDY</strong> 를 정말 탈퇴하시겠어요? 😭
        </h2>
        <p className='withdrawal-content'>
          탈퇴가 완료되면 퍼디에서 이용한
          <br />
          <strong>모든 활동 내역이 삭제</strong>되며 복구할 수 없어요.
        </p>
        <Button outline onClick={() => setShowModal(true)}>
          회원 탈퇴
        </Button>
      </div>
    </>
  );
}
