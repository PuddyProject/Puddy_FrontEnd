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
  cardType: string;
  cardDataList: MainCommunityCardType[] | MainQnaCardType[] | MainExpertCardType[];
}

export default function MainCardContainer({ title, cardDataList, cardType }: QnaContainerProps) {
  const nav = useNavigate();

  const choiceCard = (cardData: MainCommunityCardType | MainQnaCardType | MainExpertCardType) => {
    switch (cardType) {
      case 'community':
        cardData = cardData as MainCommunityCardType;
        return (
          <div className='main-community-card'>
            <Link key={cardData.articleId} to={`community/detail/${cardData.articleId}`}>
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
            <MainExpertCard key={cardData.expertId} />
          </Link>
        );
    }
  };

  return (
    <>
      <div className='qna-title'>{title}</div>
      <div
        className={`main-qna-container ${cardDataList.length === 0 ? 'zero-data' : ''} ${
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
    </>
  );
}
