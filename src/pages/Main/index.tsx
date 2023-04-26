import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { MainQnaCardType, MainCommunityCardType, MainExpertCardType } from 'types/mainCardTyeps';
import { MainCardContainer, Button, Loading } from 'components';
import { get } from 'utils';
import dragEvent from 'utils/dragEvent';
import useLoading from 'hooks/useLoading';

import { homeApi } from 'constants/apiEndpoint';
import { PROFILE_PET_PATH, QNA_WRITE_POST_PATH } from 'constants/routes';

import banner from 'assets/banner.png';
import banner2 from 'assets/banner2.png';

// const COLOR = Array(5).fill('lightGray');
const BANNER_IMGS = [banner, banner2];
const MAX_INDEX = BANNER_IMGS.length - 1;

interface MainQnaList {
  popularQuestions: MainQnaCardType[];
  recentQuestions: MainQnaCardType[];
  recentArticles: MainCommunityCardType[];
  popularArticles: MainCommunityCardType[];
  recentExperts: MainExpertCardType[];
}

export default function Main() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [transX, setTransX] = useState(0);
  const [mainQnaList, setMainQnaList] = useState<MainQnaList>();
  const nav = useNavigate();

  const { isLoading, hideLoading, showLoading } = useLoading();

  const getMainData = async () => {
    showLoading();

    try {
      const res = await get({ endpoint: `${homeApi.GET_HOME}` });
      setMainQnaList(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      hideLoading();
    }
  };

  const buttonOnClick = (path: string) => {
    nav(path);
  };

  useEffect(() => {
    getMainData();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className='main-container'>
      {mainQnaList && (
        <>
          <div className='carousel-div'>
            <div
              className='carousel-container'
              style={{
                transform: `translateX(${-currentIndex * 335 + transX}px)`,
                transition: `transform ${transX ? 0 : 300}ms ease-in-out 0s`,
              }}
              {...dragEvent({
                onDragChange: (deltaX) => {
                  setTransX(deltaX);
                },
                onDragEnd: (deltaX) => {
                  if (deltaX < -100)
                    setCurrentIndex(currentIndex === MAX_INDEX ? MAX_INDEX : currentIndex + 1);
                  if (deltaX > 100) setCurrentIndex(currentIndex === 0 ? 0 : currentIndex - 1);
                  setTransX(0);
                },
              })}
            >
              {BANNER_IMGS.map((banner, i) => (
                <div key={i} className='carousel-item'>
                  <img src={banner} alt={`banner ${i}`} />
                </div>
              ))}
            </div>
          </div>

          <div className='circle-container'>
            {Array(MAX_INDEX + 1)
              .fill(0)
              .map((_, i) => {
                return (
                  <div
                    key={i}
                    className='circle-item'
                    style={{
                      backgroundColor: currentIndex === i ? '#A9A9A9' : '#D9D9D9',
                    }}
                  ></div>
                );
              })}
          </div>

          <div className='button-container'>
            <Button onClick={() => buttonOnClick(`${QNA_WRITE_POST_PATH}`)} width='160px'>
              Q&A 질문하기
            </Button>
            <Button onClick={() => buttonOnClick(`${PROFILE_PET_PATH}`)} outline width='160px'>
              내 펫 등록하기
            </Button>
          </div>
          <MainCardContainer
            title={'인기 Q&A'}
            cardDataList={mainQnaList.popularQuestions}
            cardType='qna'
          />
          <MainCardContainer
            title={'최근 Q&A'}
            cardDataList={mainQnaList.recentQuestions}
            cardType='qna'
          />
          <MainCardContainer
            title={'퍼디 신규 등록 전문가'}
            cardDataList={mainQnaList.recentExperts}
            cardType='experts'
          />
          <MainCardContainer
            title={'커뮤니티 HOT'}
            cardDataList={mainQnaList.popularArticles}
            cardType='community'
          />
          <MainCardContainer
            title={'커뮤니티 NEW'}
            cardDataList={mainQnaList.recentArticles}
            cardType='community'
          />
        </>
      )}
    </div>
  );
}
