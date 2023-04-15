/* eslint-disable indent */
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import { ExpertCard } from 'components';
import { get } from 'utils';
import { ExpertInfo } from 'types/commentTypes';

export default function ExpertCardList() {
  const [listData, setListData] = useState<Array<ExpertInfo>>([]);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const [lastCardRef, inView] = useInView();

  async function getData() {
    const res = await get({
      endpoint: 'experts',
      params: `?page=${pageNumber}`,
    });

    setListData((prev) => [...prev, ...res.data.data.expertList]);
    setHasNextPage(res.data.data.hasNextPage);
    res.data.data.hasNextPage && setPageNumber((prev) => prev + 1);
  }

  useEffect(() => {
    if (hasNextPage && inView) {
      getData();
    }
  }, [inView]);

  return (
    <div className='list-container'>
      <div className='list-title-section'>
        <div className='list-title'>전문가 💪</div>
        <div className='list-sub-title'>퍼디와 함께하는 전문가를 확인해보세요.</div>
      </div>

      {listData?.length === 0 ? (
        <div className='list-zero-data'>등록된 전문가가 없습니다</div>
      ) : (
        <div className={'card-list community'}>
          {listData?.map((data, i) => {
            return (
              <Link key={i} to={`detail/${1}`}>
                <ExpertCard key={i} expertData={data} />
              </Link>
            );
          })}
        </div>
      )}
      <div ref={lastCardRef} />
    </div>
  );
}
