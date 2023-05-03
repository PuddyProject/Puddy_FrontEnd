import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { MainQnaCardType, MainCommunityCardType, MainExpertCardType } from 'types/mainCardTypes';
import { MainCardContainer, Button, Loading } from 'components';

import { get } from 'utils';
import useLoading from 'hooks/useLoading';

import { homeApi } from 'constants/apiEndpoint';
import { PROFILE_PET_PATH, QNA_WRITE_POST_PATH } from 'constants/routes';

import banner from 'assets/banner.png';
import banner2 from 'assets/banner2.png';

const BANNER_IMGS = [banner, banner2];

interface MainQnaList {
  popularQuestions: MainQnaCardType[];
  recentQuestions: MainQnaCardType[];
  recentArticles: MainCommunityCardType[];
  popularArticles: MainCommunityCardType[];
  recentExperts: MainExpertCardType[];
}

export default function Main() {
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

  console.log(mainQnaList);

  return (
    <>
      <div className='main-container'>
        <section className='carousel-container'>
          <Carousel items={BANNER_IMGS} />
        </section>
        {mainQnaList && (
          <>
            <div className='button-container'>
              <Button onClick={() => buttonOnClick(`${QNA_WRITE_POST_PATH}`)}>Q&A 질문하기</Button>
              <Button onClick={() => buttonOnClick(`${PROFILE_PET_PATH}`)} outline>
                내 펫 등록하기
              </Button>
            </div>
            <MainCardContainer
              title={'인기 Q&A 🔥'}
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
              subTitle='새로 등록된 전문가를 확인해보세요.'
              cardDataList={mainQnaList.recentExperts}
              cardType='experts'
            />
            <MainCardContainer
              title={'커뮤니티 HOT 🔥'}
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
    </>
  );
}

function Carousel({ items }: { items: string[] }) {
  const settings = {
    centerMode: true,
    centerPadding: '0px',
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2500,
    slidesToShow: 1,
    slidesToScroll: 2,
  };

  return (
    <Slider className='slider' {...settings}>
      {items.map((item, index) => (
        <div key={index}>
          <img src={item} alt='캐러셀 이미지' />
        </div>
      ))}
    </Slider>
  );
}
