import '../../styles/qnaCard.scss';

export default function MainQnaCard() {
  return (
    <div className='main-qna-card'>
      <p className='title'>강아지가 분리분안을 격어서 너무 힘들어요</p>
      <p className='body'>아침에 오는데 너무 힘들어서 분리분안을 겪는중이에요</p>
      <div className='bottom-section'>
        <span className='answer-text'>답변 완료</span>
        <span className='writer-text'>작성자</span>
      </div>
    </div>
  );
}
