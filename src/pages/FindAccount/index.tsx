import { useNavigate } from 'react-router-dom';

import { Button, CustomHeader } from 'components';

import { FIND_ID_PATH, FIND_PW_PATH } from 'constants/routes';

export default function FindAccount() {
  const navigate = useNavigate();

  const onClickFindId = () => {
    navigate(`${FIND_ID_PATH}`);
  };

  const onClickFindPw = () => {
    navigate(`${FIND_PW_PATH}`);
  };

  return (
    <div>
      <CustomHeader title='아이디/비밀번호 찾기' hideIcon />
      <div className='find-account-container'>
        <Button outline onClick={onClickFindId}>
          아이디 찾기
        </Button>
        <Button outline onClick={onClickFindPw}>
          비밀번호 찾기
        </Button>
      </div>
    </div>
  );
}
