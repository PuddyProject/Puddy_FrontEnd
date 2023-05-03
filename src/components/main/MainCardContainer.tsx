/* eslint-disable indent */
import MainQnaCard from 'components/main/MainQnaCard';
import PlusButton from 'components/common/PlusButton';
import { useNavigate } from 'react-router-dom';
import { MainCommunityCardType, MainQnaCardType, MainExpertCardType } from 'types/mainCardTyeps';
import { Link } from 'react-router-dom';
import CommunityCard from 'components/common/CommunityCard';
import MainExpertCard from './MainExpertCard';

interface QnaContainerProps {
  title: string;
  subTitle?: string;
  cardType: string;
  cardDataList: MainCommunityCardType[] | MainQnaCardType[] | MainExpertCardType[];
  createdDate?: string;
}

export default function MainCardContainer({
  title,
  subTitle,
  cardDataList,
  cardType,
}: QnaContainerProps) {
  const nav = useNavigate();

  const choiceCard = (cardData: MainCommunityCardType | MainQnaCardType | MainExpertCardType) => {
    switch (cardType) {
      case 'community':
        cardData = cardData as MainCommunityCardType;
        return (
          <div key={cardData.articleId} className='main-community-card'>
            <Link to={`community/detail/${cardData.articleId}`}>
              <CommunityCard key={cardData.articleId} articleData={cardData} />
            </Link>
          </div>
        );
      case 'qna':
        cardData = cardData as MainQnaCardType;
        return (
          <Link key={cardData.questionId} to={`qna/detail/${cardData.questionId}`}>
            <MainQnaCard key={cardData.questionId} cardData={cardData} />
          </Link>
        );
      case 'experts':
        cardData = cardData as MainExpertCardType;
        return (
          <Link key={cardData.expertId} to={`experts/${cardData.expertId}`}>
            <MainExpertCard key={cardData.expertId} cardData={cardData} />
          </Link>
        );
    }
  };

  return (
    <section className='main-contents'>
      <div className='main-content-title'>{title}</div>
      {subTitle ? <p className='main-content-sub-title'>{subTitle}</p> : <></>}
      <div
        className={`main-contents-container ${cardDataList.length === 0 ? 'zero-data' : ''} ${
          cardType === 'community' ? 'community-card' : ''
        }`}
      >
        {cardDataList.length === 0 ? (
          <div className='list-zero-data'>데이터가 없습니다.</div>
        ) : (
          <>
            {cardDataList.map((cardData) => {
              return choiceCard(cardData);
            })}
            <PlusButton
              padding='15px 0px 0px 0px'
              onClick={() => {
                nav(cardType);
              }}
            />
          </>
        )}
      </div>
    </section>
  );
}
