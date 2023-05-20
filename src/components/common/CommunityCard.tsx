import { GrView } from 'react-icons/gr';
import { AiOutlineHeart } from 'react-icons/ai';
import Community_no_img from 'assets/Community_no_img.svg';
import { PostDataInfo } from 'types/commentTypes';

interface CommunityCardProps {
  articleData: PostDataInfo;
}
export default function CommunityCard({ articleData }: CommunityCardProps) {
  const isImg = articleData.imagePath !== '';

  return (
    <div className='commuinty-card'>
      <div className={`card-img-container  ${isImg ? 'img' : 'no-img'}`}>
        <img
          loading='lazy'
          className={`card-img  ${isImg ? 'img' : 'no-img'}`}
          alt='카드 이미지'
          src={isImg ? articleData.imagePath : Community_no_img}
        />
      </div>

      <div className='card-text-container'>
        <div className='card-title'>{articleData.title}</div>
        <div className='card-sub-title'>{articleData.content}</div>
        <div className='card-info'>
          <div>{articleData.nickname}</div>
          <div className='card-info-right'>
            <span className='view-count'>
              <GrView className='info-icon' />
              <span>{articleData.viewCount}</span>
            </span>
            <span className='like-count'>
              <AiOutlineHeart className='info-icon' />
              <span>{articleData.likeCount}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
