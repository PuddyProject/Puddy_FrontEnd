import MainQnaCard from 'components/main/MainQnaCard';
import PlusButton from 'components/common/PlusButton';

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
        <PlusButton />
      </div>
    </>
  );
}
