import Community_no_img from 'assets/Community_no_img.svg';
import { ExpertInfo } from 'types/commentTypes';

interface CommunityCardProps {
  expertData: ExpertInfo;
}
export default function ExpertCard({ expertData }: CommunityCardProps) {
  return (
    <div className='commuinty-card'>
      <div className={'card-img-container no-img'}>
        <img className={'card-img no-img'} alt='' src={Community_no_img} />
      </div>

      <div className='card-text-container'>
        <div className='card-title'>전문가 이름 또한 처리 되어 있습니다.</div>
        <div className='card-sub-title'>서울대 수의학과 탑 수석 졸업 했습니다.</div>
        <div className='card-info'>리뷰 1,000 개</div>
      </div>
    </div>
  );
}
