import { FiSettings as SettingIcon } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import { Button } from 'components';

import { Tier, myPageList, MypageListItem } from 'constants/myPageList';

const TEMP_IMAGE_URL =
  'https://blog.kakaocdn.net/dn/GHYFr/btrsSwcSDQV/UQZxkayGyAXrPACyf0MaV1/img.jpg';

const ProfileSettingButton = () => {
  return (
    <button className='circle-button'>
      <SettingIcon />
    </button>
  );
};

const MenuItems = (list: Array<MypageListItem>) => {
  return list.map((item, i) => {
    const isTitle = item.tier === Tier.TITLE;

    return (
      <li key={`${item.title} ${i}`} role='button'>
        {isTitle ? (
          <h2 className='menu-title'>{item.title}</h2>
        ) : (
          <Link to={item.url ? item.url : ''}>
            <p className='menu-content' tabIndex={0} role='button'>
              {item.title}
            </p>
            {/* // TODO: '?' 아이콘 추가 후 클릭 시 모달 띄우기
            {item.icon && <button className='qu estion-mark-icon'>전문가가 무엇인가요?</button>} */}
          </Link>
        )}
      </li>
    );
  });
};

export default function MyPage() {
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
          <ul>{MenuItems(myPageList)}</ul>
        </section>
      </div>
    </>
  );
}
