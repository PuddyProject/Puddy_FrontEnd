import { MainQnaCardType } from 'types/mainCardTypes';

interface MainQnaCardProps {
  cardData: MainQnaCardType;
}
export default function MainQnaCard({ cardData }: MainQnaCardProps) {
  const createDate = new Date(cardData.createdDate);
  const [year, month, day] = createDate.toLocaleDateString().split('.');

  return (
    <div className='main-qna-card'>
      <p className='card-date'>{`${year}.${month}.${day}`}</p>

      <p className='card-title'>{cardData.title}</p>
      <p className='card-content'>{cardData.content}</p>

      <div className='bottom-section'>
        <div className={`answer-text ${cardData.isSolved ? 'solved' : ''}`}>
          {cardData.isSolved ? '채택 완료' : '채택 대기'}
        </div>
        <div className='writer-text'>{cardData.nickname}</div>
      </div>
    </div>
  );
}
