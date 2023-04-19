import Community_no_img from 'assets/Community_no_img.svg';
import { ExpertInfo } from 'types/commentTypes';

interface CommunityCardProps {
  expertData: ExpertInfo;
}
export default function ExpertCard({ expertData }: CommunityCardProps) {
  const isImg = expertData.imagePath !== '';

  return (
    <div className='commuinty-card'>
      <div className={`card-img-container  ${isImg ? 'img' : 'no-img'}`}>
        <img
          className={`card-img  ${isImg ? 'expert-img' : 'no-img'}`}
          alt=''
          src={isImg ? expertData.imagePath : Community_no_img}
        />
      </div>

      <div className='card-text-container'>
        <div className='card-title'>{expertData.username}</div>
        <div className='card-sub-title'>{expertData.education}</div>
        <div className='card-info'>리뷰 1,000 개</div>
      </div>
    </div>
  );
}
