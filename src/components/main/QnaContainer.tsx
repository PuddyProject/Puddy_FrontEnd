import MainQnaCard from 'components/common/MainQnaCard';
import { Link } from 'react-router-dom';

interface QnaContainerProps {
  title: string;
}

export default function QnaContainer({ title }: QnaContainerProps) {
  return (
    <>
      <div className='qna-title'>{title}</div>
      <div className='main-qna-container'>
        {Array(5)
          .fill(0)
          .map((_, i) => {
            return <MainQnaCard key={i} />;
          })}
        <div className='plus-button'>
          <Link className='main-link' to='/qna'>
            <div className='plus-button-circle'>&gt;</div>
            <div>더보기</div>
          </Link>
        </div>
      </div>
    </>
  );
}
