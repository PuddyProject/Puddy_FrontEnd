import { Link } from 'react-router-dom';

export default function PlusButton() {
  return (
    <div className='plus-button'>
      <Link className='main-link' to='/qna'>
        <div className='plus-button-circle'>&gt;</div>
        <div>더보기</div>
      </Link>
    </div>
  );
}
