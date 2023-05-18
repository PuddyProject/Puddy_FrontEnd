import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { HiOutlineStar as OutlineStar, HiStar as Star } from 'react-icons/hi';

import { Button, CustomHeader, FooterButton } from 'components';

import { get } from 'utils/axios/axiosHelper';

import { Profile } from 'types/expertProfileTypes';
import { ApiError } from 'types/errorsTypes';

import { expertApi } from 'constants/apiEndpoint';
import { NOT_FOUND_PATH, getPathModificationExpertProfile } from 'constants/routes';

import { useUser } from 'context/UserContext';

const TEMP_IMAGE_URL =
  'https://blog.kakaocdn.net/dn/GHYFr/btrsSwcSDQV/UQZxkayGyAXrPACyf0MaV1/img.jpg';

export default function ExpertProfile() {
  const location = useLocation();
  const navigate = useNavigate();
  const expertId = location.pathname.split('/').pop();

  const [profile, setProfile] = useState<Profile>();
  const { decodedToken } = useUser();

  /* 현재 전문가 유저가 프로필 작성 여부를 알 수 없으므로 아래 코드 임시 사용중 */
  const isMyProfile = profile?.expertId === decodedToken?.id;

  const onClickModificationExpertProfile = () => {
    navigate(`${getPathModificationExpertProfile(decodedToken?.id.toString())}`);
  };

  useEffect(() => {
    if (!expertId) return;

    const getExpertProfile = async () => {
      try {
        const res = await get({ endpoint: `${expertApi.requestExpertId(expertId)}` });
        setProfile(res.data.data);
      } catch (err) {
        const error = err as ApiError;
        console.error(error.response?.status);
        if (error.response?.status === 404) {
          window.location.href = `${NOT_FOUND_PATH}`;
        }
      }
    };

    getExpertProfile();
  }, [expertId]);

  return (
    <>
      <CustomHeader title={`${profile?.username ? profile.username : ''} 전문가 프로필`} />
      <div className='expert-profile-container'>
        <section className='profile expert'>
          <img
            className='profile-image'
            src={profile?.imagePath || TEMP_IMAGE_URL}
            alt='프로필 이미지'
          />
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
                  {profile?.careerList.map((career, i) => {
                    return (
                      <li key={`${career} ${i}`} className='profile-expert_content'>
                        {career}
                      </li>
                    );
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
      {isMyProfile && (
        <FooterButton onClick={onClickModificationExpertProfile}>수정하기</FooterButton>
      )}
    </>
  );
}
