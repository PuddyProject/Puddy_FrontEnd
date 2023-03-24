import { QnaCard } from 'components';
export default function Qna() {
  return (
    <div className='qna-container'>
      <div className='qna-title-section'>
        <div className='qna-title'>Q&A 🐶</div>
        <div className='qna-sub-title'>
          내 반려견과 관련한 <span>질문/답변</span>을 작성해 보세요.
        </div>
      </div>
      <QnaCard />
      <QnaCard />
      <QnaCard />
      <QnaCard />
      <QnaCard />
      <QnaCard />
    </div>
  );
}
