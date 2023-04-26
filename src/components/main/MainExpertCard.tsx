import { MainExpertCardType } from 'types/mainCardTyeps';
import Community_no_img from 'assets/Community_no_img.svg';

interface ExpertCardProps {
  cardData: MainExpertCardType;
}

export default function MainExpertCard({ cardData }: ExpertCardProps) {
  const isImg = cardData.imagePath !== '' ? cardData.imagePath : '';

  return (
    <div className='main-expert-card'>
      <div className={`main-expert-card-img ${isImg ? 'img' : ''}`}>
        {isImg && <img className='img-tag' src={isImg} />}
      </div>

      <div className='main-expert-card-description'>
        <span className='description-title'>{cardData.username}</span>
        <span className='description-sub'>학력: {cardData.education}</span>
        <span className='description-sub'>경력: {cardData.careerList[0]}</span>
      </div>
    </div>
  );
}
