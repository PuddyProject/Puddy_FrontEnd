import { CustomHeader } from 'components';

export default function Account() {
  return (
    <>
      <CustomHeader title='계정' />
      <div className='setting-menus'>
        <ul className='account-menus'>
          <li role='button'>비밀번호 변경</li>
          <li role='button'>로그아웃</li>
          <li role='button'>회원탈퇴</li>
        </ul>
      </div>
    </>
  );
}
