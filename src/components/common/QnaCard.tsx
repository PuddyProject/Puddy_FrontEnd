import { PostDataInfo } from 'types/commentTypes';

interface QnaCardProps {
  questionData: PostDataInfo;
}
export default function QnaCard({ questionData }: QnaCardProps) {
  return (
    <div className='qna-card'>
      <p className='title'>
        <span className='title-category'>Q. [{questionData.category}]</span> {questionData.title}
      </p>
      <div className='body'>{questionData.content}</div>
      <div className='bottom-section'>
        <span className={`answer-text ${!questionData.isSolved ? '' : 'solved'}`}>
          {questionData.isSolved === false ? '채택 대기' : '채택 완료'}
        </span>
        <span className='writer-text'>{questionData.nickname}</span>
      </div>
    </div>
  );
}
