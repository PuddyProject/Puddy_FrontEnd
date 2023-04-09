import { InputBox, QnaCard } from 'components';
import CommunityCard from 'components/common/CommunityCard';
import WriteButton from 'components/common/WriteButton';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { Link, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { QnaData } from 'types/qnaCardTypes';
import { get } from 'utils';
export default function List() {
  const [listData, setListData] = useState<Array<QnaData>>([]);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const [lastCardRef, inView] = useInView();
  const nav = useNavigate();
  const location = useLocation();
  const isCommunityPage = location.pathname === '/community';

  async function getData() {
    const res = await get({
      endpoint: 'questions',
      params: `?page=${pageNumber}`,
    });

    setListData((prev) => [...prev, ...res.data.data.questionList]);
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
    <div className='list-container'>
      <div className='list-title-section'>
        <div className='list-title'>{isCommunityPage ? '커뮤니티 🐶' : 'Q&A 🐶'}</div>
        <div className='list-sub-title'>
          {isCommunityPage ? (
            <>
              <p className='communinty-title'>
                퍼디 유저와 자유롭게 <span>소통, 정보공유</span>를 해보세요.
              </p>
              <p>부적절한 게시글은 통보없이 삭제될 수 있어요.</p>
            </>
          ) : (
            <>
              내 반려견과 관련한 <span>질문/답변</span>을 작성해 보세요.
            </>
          )}
        </div>
      </div>
      <div className='list-search-section'>
        <InputBox placeholder='검색어를 입력하세요.' width='100%' className='search-box' />
      </div>
      {listData.length === 0 ? (
        <div className='list-zero-data'>
          {isCommunityPage ? '커뮤니티 게시글이 없습니다' : 'Q&A 게시글이 없습니다'}
        </div>
      ) : (
        <div className={`card-list ${isCommunityPage ? 'community' : ''}`}>
          {listData?.map((data) => {
            return (
              <Link key={data.questionId} to={`detail/${data.questionId}`}>
                {isCommunityPage ? (
                  <CommunityCard />
                ) : (
                  <QnaCard key={data.questionId} qnaData={data} />
                )}
              </Link>
            );
          })}
        </div>
      )}
      <div ref={lastCardRef} />
      <WriteButton
        onClick={() => {
          nav('newpost');
        }}
      />
    </div>
  );
}
