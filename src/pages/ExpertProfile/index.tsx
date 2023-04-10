import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { HiOutlineStar as OutlineStar, HiStar as Star } from 'react-icons/hi';

import { Button, CustomHeader } from 'components';

import { get } from 'utils/axiosHelper';

import { Profile } from 'types/expertProfileTypes';

const TEMP_IMAGE_URL =
  'https://blog.kakaocdn.net/dn/GHYFr/btrsSwcSDQV/UQZxkayGyAXrPACyf0MaV1/img.jpg';

export default function ExpertProfile() {
  const location = useLocation();
  const expertId = location.pathname.split('/').pop();
  const [profile, setProfile] = useState<Profile>();

  // ! 회원 id를 가지고 전문가를 선별하고 있어서 존재하지 않는 전문가 페이지 진입이 가능함
  useEffect(() => {
    if (!expertId) return;
    get({ endpoint: `experts/${expertId}` })
      .then((res) => {
        setProfile(res.data.data);
      })
      .catch((err) => {
        console.error(err.resultCode);
      });
  }, [expertId]);

  console.log(profile?.careerList);

  return (
    <>
      <CustomHeader title={`${profile?.username ? profile.username : ''} 전문가 프로필`} />
      <div className='expert-profile-container'>
        <section className='profile expert'>
          <img className='profile-image' src={TEMP_IMAGE_URL} alt='프로필 이미지' />
          <div className='profile-expert_header'>
            <h3 className='profile-expert_name'>{profile?.username}</h3>
            <OutlineStar className='outline-star' />
            {/* //TODO: 별 아이콘 클릭 시 색상 채우기 */}
          </div>
          <h4 className='profile-expert_education'>{profile?.education}</h4>
        </section>
        <hr className='dividing-line' />
        <div className='profile-expert-contents-container'>
          <div className='content'>
            <h5>경력 사항</h5>
            <ul className='profile-expert_educations'>
              {profile?.careerList && profile?.careerList.length > 0 && (
                <>
                  {profile?.careerList.map((career) => {
                    return <li className='profile-expert_content'>{career}</li>;
                  })}
                </>
              )}
            </ul>
          </div>
          <div className='content'>
            <h5>소개</h5>
            <p className='profile-expert_content produce'>{profile?.introduce}</p>
          </div>
          <div className='content'>
            <h5>근무지/매장 위치</h5>
            <p className='profile-expert_content'>{profile?.location}</p>
          </div>
        </div>
        <Button secondStyle outline>
          리뷰 보기
        </Button>
      </div>
    </>
  );
}
