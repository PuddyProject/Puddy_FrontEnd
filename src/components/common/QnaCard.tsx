import { QnaData } from 'types/qnaCardTypes';

interface QnaCardProps {
  qnaData: QnaData;
}
export default function QnaCard({ qnaData }: QnaCardProps) {
  return (
    <div className='qna-card'>
      <p className='title'>
        <span className='title-category'>Q. [{qnaData.category}]</span> {qnaData.title}
      </p>
      <div className='body'>{qnaData.content}</div>
      <div className='bottom-section'>
        <span className={`answer-text ${qnaData.isSolved ? 'solved' : ''}`}>
          {qnaData.isSolved === false ? '채택 대기' : '채택 완료'}
        </span>
        <span className='writer-text'>{qnaData.nickname}</span>
      </div>
    </div>
  );
}
