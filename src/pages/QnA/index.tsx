import { QnaCard } from 'components';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';

export default function Qna() {
  const [QnaList, setQnaList] = useState<JSX.Element[]>(Array(6).fill(<QnaCard />));

  const [lastCardRef, inView] = useInView();
  useEffect(() => {
    setQnaList((prev) => [...prev, ...Array(6).fill(<QnaCard />)]);
  }, [inView]);
  return (
    <div className='qna-container'>
      <div className='qna-title-section'>
        <div className='qna-title'>Q&A 🐶</div>
        <div className='qna-sub-title'>
          내 반려견과 관련한 <span>질문/답변</span>을 작성해 보세요.
        </div>
      </div>
      {QnaList.map((qnaItem) => {
        return <Link to='detail'>{qnaItem}</Link>;
      })}
      <div ref={lastCardRef}></div>
    </div>
  );
}
