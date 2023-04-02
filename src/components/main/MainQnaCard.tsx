import { MainQnaCardType } from 'types/qnaCardTypes';

interface MainQnaCardProps {
  cardData: MainQnaCardType;
}
export default function MainQnaCard({ cardData }: MainQnaCardProps) {
  return (
    <div className='main-qna-card'>
      <p className='title'>{cardData.title}</p>
      <p className='body'>{cardData.content}</p>
      <div className='bottom-section'>
        <span className={`answer-text ${cardData.isSolved ? 'solved' : ''}`}>
          {cardData.isSolved ? '채택 완료' : '채택 대기'}
        </span>
        <span className='writer-text'>{cardData.nickname}</span>
      </div>
    </div>
  );
}
