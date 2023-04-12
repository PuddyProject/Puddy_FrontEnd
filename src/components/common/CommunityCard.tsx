import { GrView } from 'react-icons/gr';
import { AiOutlineHeart } from 'react-icons/ai';
import Community_no_img from 'assets/Community_no_img.svg';
export default function CommunityCard() {
  const isImg = false;

  return (
    <div className='commuinty-card'>
      <div className={`card-img-container  ${isImg ? '' : 'no-img'}`}>
        <img className={`card-img  ${isImg ? '' : 'no-img'}`} alt='' src={Community_no_img} />
      </div>

      <div className='card-text-container'>
        <p className='card-title'>제목입니다. 제목입니다. 제목</p>
        <p className='card-sub-title'>내용입니다. 내용입니다. 내용입니다</p>
        <p className='card-info'>
          <p>유토</p>
          <p className='card-info-right'>
            <span className='view-count'>
              <GrView className='info-icon' />
              356
            </span>
            <span className='like-count'>
              <AiOutlineHeart className='info-icon' />
              15
            </span>
          </p>
        </p>
      </div>
    </div>
  );
}
