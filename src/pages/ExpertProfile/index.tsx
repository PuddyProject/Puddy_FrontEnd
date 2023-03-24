import { HiOutlineStar as OutlineStar, HiStar as Star } from 'react-icons/hi';
import { Button } from 'components';

const TEMP_IMAGE_URL =
  'https://blog.kakaocdn.net/dn/GHYFr/btrsSwcSDQV/UQZxkayGyAXrPACyf0MaV1/img.jpg';

export default function ExpertProfile() {
  return (
    <>
      <div className='container'>
        <section className='profile expert'>
          <img className='profile-image' src={TEMP_IMAGE_URL} alt='프로필 이미지' />
          <div className='profile-expert_header'>
            <h3 className='profile-expert_name'>김철수</h3>
            <OutlineStar className='outline-star' />
            {/* //TODO: 별 아이콘 클릭 시 색상 채우기 */}
          </div>
          <h4 className='profile-expert_education'>서울대학교 수의학</h4>
        </section>
        <hr className='dividing-line' />
        <div className='profile-expert-contents-container'>
          <div className='content'>
            <h5>경력 사항</h5>
            <ul className='profile-expert_educations'>
              <li className='profile-expert_content'>서울대학교 수의과대학 졸업</li>
              <li className='profile-expert_content'>서울대학교 수의과대학 임상 로테이션 수료</li>
            </ul>
          </div>
          <div className='content'>
            <h5>소개</h5>
            <p className='profile-expert_content produce'>
              서울 K동물병원에서 부원장으로 근무하고 있습니다. 우리 아이와 만남부터 이별까지, 사람과
              동물의 동행이 아름다울 수 있도록 든든한 주치의가 되고 싶습니다.
            </p>
          </div>
          <div className='content'>
            <h5>근무지/매장 위치</h5>
            <p className='profile-expert_content'>서울특별시 금천구 시흥대로 251 산호시티빌</p>
          </div>
        </div>
        <Button secondStyle outline>
          리뷰 보기
        </Button>
      </div>
    </>
  );
}
