export default function QnaCard() {
  return (
    <div className='qna-card'>
      <p className='title'>
        <span className='title-category'>Q. [카테고리]</span> 강아지가 하루종일 하울링을 해요.
      </p>
      <div className='body'>
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
        been the industry's standard dummy text ever since the 1500s, when an unknown printer took a
        galley of type and scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
        It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum
        passages, and more recently with desktop publishing software like Aldus PageMaker including
        versions of Lorem Ipsum.
      </div>
      <div className='bottom-section'>
        <span className='answer-text'>채택 완료</span>
        <span className='writer-text'>작성자</span>
      </div>
    </div>
  );
}
