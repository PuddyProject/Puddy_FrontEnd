import { Button, CustomHeader } from 'components';
import { HOME_PATH } from 'constants/routes';
import { useNavigate } from 'react-router-dom';

export default function NotFount() {
  const navigate = useNavigate();
  return (
    <>
      <CustomHeader title='404' hideIcon />
      <div className='not-found-text'>
        <strong>존재하지 않는 페이지</strong>에요. 😢
      </div>
      <Button outline onClick={() => navigate(`${HOME_PATH}`)}>
        메인 페이지로 이동
      </Button>
    </>
  );
}
