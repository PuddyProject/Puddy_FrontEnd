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
      <div className={`main-qna-container ${cardDataList.length === 0 ? 'zero-data' : ''}`}>
        {cardDataList.length === 0 ? (
          <div className='list-zero-data'>데이터가 없습니다.</div>
        ) : (
          <>
            {cardDataList.map((cardData) => {
              return (
                <Link key={cardData.questionId} to={`qna/detail/${cardData.questionId}`}>
                  <MainQnaCard key={cardData.questionId} cardData={cardData} />
                </Link>
              );
            })}
            <PlusButton
              padding='15px 0px 0px 10px'
              onClick={() => {
                nav('qna');
              }}
            />
          </>
        )}
      </div>
    </>
  );
}
