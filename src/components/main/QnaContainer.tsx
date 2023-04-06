import MainQnaCard from 'components/main/MainQnaCard';
import PlusButton from 'components/common/PlusButton';
import { useNavigate } from 'react-router-dom';
import { MainQnaCardType } from 'types/qnaCardTypes';
import { Link } from 'react-router-dom';

interface QnaContainerProps {
  title: string;
  cardDataList: MainQnaCardType[];
}

export default function QnaContainer({ title, cardDataList }: QnaContainerProps) {
  const nav = useNavigate();
  return (
    <>
      <div className='qna-title'>{title}</div>
      <div className='main-qna-container'>
        {cardDataList.map((cardData) => {
          return (
            <Link key={cardData.questionId} to={`qna/detail/${cardData.questionId}`}>
              <MainQnaCard key={cardData.questionId} cardData={cardData} />
            </Link>
          );
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
