/* eslint-disable indent */
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { Link, useLocation } from 'react-router-dom';
import { QnaCard, CommunityCard, CustomHeader } from 'components';
import { get } from 'utils';
import { PostDataInfo } from 'types/commentTypes';
import { PAGE_LIST, NO_POST, CARD_ID, LIST_NAME, END_POINT } from 'constants/cardList';

export default function CardSearch() {
  const [listData, setListData] = useState<Array<PostDataInfo>>([]);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const [lastCardRef, inView] = useInView();

  const location = useLocation();
  const CURRENT_PAGE = PAGE_LIST.map((v) => {
    if (location.pathname.includes(v)) return v;
  }).filter((v) => v !== undefined)[0]! as keyof typeof END_POINT;

  const isCommunityPage = location.pathname.includes('/community');
  const SEARCH_WORD = location.state.searchWord;
  const SEARCH_CARD = location.state.search_card;

  const getData = async (isChangePage: boolean) => {
    const res = await get({
      endpoint: END_POINT[CURRENT_PAGE],
      params: `?page=${pageNumber}&keyword=${SEARCH_WORD}`,
    });

    isChangePage
      ? setListData(res.data.data[LIST_NAME[CURRENT_PAGE]])
      : setListData((prev) => [...prev, ...res.data.data[LIST_NAME[CURRENT_PAGE]]]);

    setHasNextPage(res.data.data.hasNextPage);
    if (res.data.data.hasNextPage && isChangePage) {
      setPageNumber(() => 2);
    } else {
      setPageNumber((prev) => prev + 1);
    }
  };

  const choieCardComponent = (id: number, data: PostDataInfo) => {
    switch (CURRENT_PAGE) {
      case 'community':
        return <CommunityCard key={id} articleData={data} />;
      case 'qna':
        return <QnaCard key={id} questionData={data} />;
    }
  };

  useEffect(() => {
    if (hasNextPage && inView) {
      getData(false);
    }
  }, [inView]);

  return (
    <>
      <CustomHeader title={` ${isCommunityPage ? '커뮤니티' : 'Q&A'} 검색 페이지`} />
      <div className='search-container'>
        <div className='search-title-section'>
          <p className='search-title'>
            검색어 <span>"{SEARCH_WORD}"</span> 가 포함된
            {SEARCH_CARD === 'community' ? '커뮤니티' : 'Q&A'}
          </p>
          {/* 
          TODO: 상준님이랑 의논을 해보아야함. 몇 개의 글이 있는지 프론트에서 알 수가 없음.
          <p className='search-sub-title'>
            총 <span>10건</span>의 게시글이 존재해요
          </p> */}
        </div>

        {listData?.length === 0 ? (
          <div className='list-zero-data'>{NO_POST[CURRENT_PAGE]}게시글이 없습니다</div>
        ) : (
          <div className={`card-list ${isCommunityPage ? 'community' : ''}`}>
            {listData?.map((data, i) => {
              const id = data[CARD_ID[CURRENT_PAGE] as 'articleId' | 'questionId'];
              return (
                <Link key={i} to={`/${CURRENT_PAGE}/detail/${id}`}>
                  {choieCardComponent(id!, data)}
                </Link>
              );
            })}
          </div>
        )}
        <div ref={lastCardRef} />
      </div>
    </>
  );
}
