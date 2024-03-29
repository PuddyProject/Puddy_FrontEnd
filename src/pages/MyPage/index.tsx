import { FiSettings as SettingIcon } from 'react-icons/fi';
import { AiOutlineQuestionCircle as QuestionIcon } from 'react-icons/ai';

import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Modal from 'components/common/Modal';
import { Button } from 'components';

import { Tier, myPageList, MypageListItem, Role } from 'constants/myPageList';
import { get } from 'utils';

import { usePet } from 'context/PetContext';
import { useUser } from 'context/UserContext';
import { myPageApi } from 'constants/apiEndpoint';
import { MY_PAGE_PET_PATH, MY_PAGE_PROFILE_PATH, PROFILE_PET_PATH } from 'constants/routes';

const TEMP_IMAGE_URL =
  'https://blog.kakaocdn.net/dn/GHYFr/btrsSwcSDQV/UQZxkayGyAXrPACyf0MaV1/img.jpg';

export default function MyPage() {
  const { hasPet, setHasPet } = usePet();
  const { decodedToken } = useUser();
  const [role, setRole] = useState('ROLE_EXPERT');

  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);

  const [user, setUser] = useState({
    nickname: '',
    imagePath: null,
    hasPet: false,
  });

  const onClickQuestionIcon = () => {
    setShowModal(true);
  };

  const onClickSetting = () => {
    navigate(`${MY_PAGE_PROFILE_PATH}`);
  };

  const onClickMyPetInfo = () => {
    // 펫 등록된 유저:  /mypage/pets
    if (hasPet) {
      return navigate(`${MY_PAGE_PET_PATH}`);
    }
    // 미등록 유저 : /profile/pets
    return navigate(`${PROFILE_PET_PATH}`);
  };

  useEffect(() => {
    get({ endpoint: `${myPageApi.GET_MY_PAGE_INFO}` }).then((res) => {
      setUser(res.data.data);
      setHasPet(() => res.data.data.hasPet);
    });
  }, []);

  return (
    <>
      <div className='container'>
        <section className='profile'>
          <img
            className='profile-image'
            src={user.imagePath ? user.imagePath : TEMP_IMAGE_URL}
            alt='프로필 이미지'
          />
          <div className='setting' onClick={onClickSetting}>
            <ProfileSettingButton />
          </div>
          <h3 className='nickname'>{user.nickname}</h3>
          <Button onClick={onClickMyPetInfo} outline width='200px' height='35px'>
            {user.hasPet ? '내 펫 정보' : '내 펫 등록'}
          </Button>
        </section>
        <hr className='dividing-line' />
        <section className='setting-menus'>
          <ul>{createMenuItems({ list: myPageList, role, onClick: onClickQuestionIcon })}</ul>
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

export interface MenuProps {
  role: string;
  list: Array<MypageListItem>;
  onClick: () => void;
}

export const createMenuItems = ({ role, list, onClick }: MenuProps) => {
  // TODO: 유저 role에 따라 메뉴 다르게 보여주기
  const onlyUserMenu = list.filter((menu) => {
    return menu.role === Role.USER;
  });

  const onlyExpertMenu = list.filter((menu) => {
    return menu.role === Role.EXPERT;
  });

  return list.map((item, i) => {
    const isTitle = item.tier === Tier.TITLE;
    const isExpert = item.role === Role.EXPERT;

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
