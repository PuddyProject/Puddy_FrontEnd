/* eslint-disable indent */
import { FormEvent, useEffect, useState, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { InputBox, QnaCard, CommunityCard, WriteButton } from 'components';
import { FILTER_ITEM } from 'constants/cardList';
import { get } from 'utils';
import { PostDataInfo } from 'types/commentTypes';
import { NO_POST, CARD_ID, LIST_NAME, TITLE, END_POINT } from 'constants/cardList';
import { currentPage } from 'utils/currentPage';

export default function CardList() {
  const [listData, setListData] = useState<Array<PostDataInfo>>([]);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const [currentFilter, setCurrentFilter] = useState('최신순');
  const [isFirst, setIsFirst] = useState(true);
  const [lastCardRef, inView] = useInView();
  const [searchWord, setSearchWord] = useState('');

  const searchRef = useRef<HTMLInputElement>(null);
  const nav = useNavigate();
  const location = useLocation();

  const CURRENT_PAGE = currentPage(location);

  const isCommunityPage = location.pathname.includes('/community');

  const HEAD_LILE = {
    community: (
      <>
        <p className='communinty-title'>
          퍼디 유저와 자유롭게 <span>소통, 정보공유</span>를 해보세요.
        </p>
        <p>부적절한 게시글은 통보없이 삭제될 수 있어요.</p>
      </>
    ),
    qna: (
      <>
        내 반려견과 관련한 <span>질문/답변</span>을 작성해 보세요.
      </>
    ),
  };

  const getData = async (isChangePage: boolean) => {
    const res = await get({
      endpoint: END_POINT[CURRENT_PAGE],
      params: `?page=${isChangePage ? 1 : pageNumber}`,
    });

    if (isChangePage) {
      setListData(res.data.data[LIST_NAME[CURRENT_PAGE]]);
    } else {
      setListData((prev) => [...prev, ...res.data.data[LIST_NAME[CURRENT_PAGE]]]);
    }

    isChangePage && setIsFirst(false);
    setHasNextPage(res.data.data.hasNextPage);
    res.data.data.hasNextPage && setPageNumber((prev) => prev + 1);
  };

  const choieCardComponent = (id: number, data: PostDataInfo) => {
    switch (CURRENT_PAGE) {
      case 'community':
        return <CommunityCard key={id} articleData={data} />;
      case 'qna':
        return <QnaCard key={id} questionData={data} />;
    }
  };

  const onSearchWordChange = (e: FormEvent<HTMLElement>) => {
    const target = e.target as HTMLInputElement;
    setSearchWord(target.value);
  };

  const onSearchBoxKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      nav('search', { state: searchWord });
    }
  };

  useEffect(() => {
    if (hasNextPage && inView && !isFirst) {
      getData(false);
    }
  }, [inView]);

  useEffect(() => {
    getData(true);
    setPageNumber(1);
    searchRef.current!.value = '';
  }, [location.pathname]);

  return (
    <div className='list-container'>
      <div className='list-title-section'>
        <div className='list-title'>{TITLE[CURRENT_PAGE]}</div>
        <div className='list-sub-title'>{HEAD_LILE[CURRENT_PAGE]}</div>
      </div>
      <div className='list-search-section'>
        <InputBox
          placeholder='검색어를 입력하세요.'
          width='100%'
          className='search-box'
          inputRef={searchRef}
          value={searchWord}
          onChange={onSearchWordChange}
          onKeyPress={onSearchBoxKeyDown}
        />
      </div>

      <div className='filter-container'>
        {FILTER_ITEM.map((filter, i) => {
          return (
            <button
              key={i}
              className={`filter-item ${filter === currentFilter ? 'select-filter' : ''}`}
              onClick={() => {
                setCurrentFilter(filter);
              }}
            >
              {filter}
            </button>
          );
        })}
      </div>
      {listData?.length === 0 ? (
        <div className='list-zero-data'>{NO_POST[CURRENT_PAGE]}게시글이 없습니다</div>
      ) : (
        <div className={`card-list ${isCommunityPage ? 'community' : ''}`}>
          {listData?.map((data, i) => {
            const id = data[CARD_ID[CURRENT_PAGE] as 'articleId' | 'questionId'];
            return (
              <Link key={i} to={`detail/${id}`}>
                {choieCardComponent(id!, data)}
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
