import { QnaCard } from 'components';
import WriteButton from 'components/common/WriteButton';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { QnaData } from 'types/qnaCardTypes';
import { get } from 'utils';
export default function Qna() {
  const [qnaData, setQnaData] = useState<Array<QnaData>>([]);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const [lastCardRef, inView] = useInView();
  const nav = useNavigate();

  async function getData() {
    const res = await get({
      endpoint: 'questions',
      params: `?page=${pageNumber}`,
    });

    setQnaData((prev) => [...prev, ...res.data.data.questionList]);
    setHasNextPage(res.data.data.hasNextPage);
    if (res.data.data.hasNextPage) {
      setPageNumber((prev) => prev + 1);
    }
  }

  useEffect(() => {
    if (hasNextPage && inView) {
      getData();
    }
  }, [inView]);

  return (
    <div className='qna-container'>
      <div className='qna-title-section'>
        <div className='qna-title'>Q&A 🐶</div>
        <div className='qna-sub-title'>
          내 반려견과 관련한 <span>질문/답변</span>을 작성해 보세요.
        </div>
      </div>
      {qnaData?.map((data) => {
        return (
          <Link to={`detail/${data.questionId}`}>
            <QnaCard key={data.questionId} qnaData={data} />
          </Link>
        );
      })}
      <div ref={lastCardRef}></div>
      <WriteButton
        onClick={() => {
          nav('newpost');
        }}
      />
    </div>
  );
}
