import MainQnaCard from 'components/main/MainQnaCard';
import PlusButton from 'components/common/PlusButton';
import { useNavigate } from 'react-router-dom';
interface QnaContainerProps {
  title: string;
}

export default function QnaContainer({ title }: QnaContainerProps) {
  const nav = useNavigate();
  return (
    <>
      <div className='qna-title'>{title}</div>
      <div className='main-qna-container'>
        {Array(5)
          .fill(0)
          .map((_, i) => {
            return <MainQnaCard key={i} />;
          })}
        <PlusButton
          onClick={() => {
            nav('qna');
          }}
        />
      </div>
    </>
  );
}
