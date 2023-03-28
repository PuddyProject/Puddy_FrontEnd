import { FiSettings as SettingIcon } from 'react-icons/fi';
import { AiOutlineQuestionCircle as QuestionIcon } from 'react-icons/ai';

import { Link } from 'react-router-dom';

import { Button } from 'components';

import { Tier, myPageList, MypageListItem } from 'constants/myPageList';
import Modal from 'components/common/Modal';
import { useState } from 'react';

const TEMP_IMAGE_URL =
  'https://blog.kakaocdn.net/dn/GHYFr/btrsSwcSDQV/UQZxkayGyAXrPACyf0MaV1/img.jpg';

export default function MyPage() {
  const [showModal, setShowModal] = useState(false);

  const onClickQuestionIcon = () => {
    setShowModal(true);
  };

  return (
    <>
      <div className='container'>
        <section className='profile'>
          <img className='profile-image' src={TEMP_IMAGE_URL} alt='프로필 이미지' />
          <div className='setting'>
            <ProfileSettingButton />
          </div>
          <h3 className='nickname'>닉네임</h3>
          <Button outline width='200px' height='35px'>
            내 펫 정보
          </Button>
        </section>
        <hr className='dividing-line' />
        <section className='setting-menus'>
          <ul>{MenuItems(myPageList, onClickQuestionIcon)}</ul>
        </section>
        {showModal && (
          <Modal closeModal={() => setShowModal(false)}>
            <h2>
              <strong>전문가 인증</strong>이 무엇인가요?
            </h2>
            <p>
              수의사/훈련사 자격증 또는 기타 반려견 관련 전문가를 증빙할 수 있는 서류를 제출하면
              관리자 검토 후<strong> 전문가 인증 마크 및 전용 혜택을 제공</strong>
              해드리고 있어요.
            </p>
          </Modal>
        )}
      </div>
    </>
  );
}

const ProfileSettingButton = () => {
  return (
    <button className='circle-button'>
      <SettingIcon />
    </button>
  );
};

const MenuItems = (list: Array<MypageListItem>, onClick: () => void) => {
  return list.map((item, i) => {
    const isTitle = item.tier === Tier.TITLE;

    return (
      <li key={`${item.title} ${i}`} role='button'>
        {isTitle ? (
          <h2 className='menu-title'>{item.title}</h2>
        ) : (
          <div className='expert-only-menu'>
            <Link to={item.url ? item.url : ''}>
              <p className='menu-content' tabIndex={0} role='button'>
                {item.title}
              </p>
            </Link>
            {item.icon && (
              <QuestionIcon onClick={onClick} role='button' className='question-mark-icon' />
            )}
          </div>
        )}
      </li>
    );
  });
};
