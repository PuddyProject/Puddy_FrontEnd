import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Button,
  Checkbox,
  CustomHeader,
  FooterButton,
  InputBox,
  InputTitle,
  TextArea,
} from 'components';

import { petsApi } from 'constants/apiEndpoint';
import { MY_PAGE_PATH, getPathPetProfile } from 'constants/routes';

import { useUser } from 'context/UserContext';

import { PetInfo } from 'types/petProfileTypes';

import { get } from 'utils';

const TEMP_IMAGE_URL =
  'https://blog.kakaocdn.net/dn/GHYFr/btrsSwcSDQV/UQZxkayGyAXrPACyf0MaV1/img.jpg';

export default function PetProfile() {
  const [myPet, setMyPet] = useState<PetInfo>();

  const { decodedToken } = useUser();

  const navigate = useNavigate();

  useEffect(() => {
    get({
      endpoint: `${petsApi.GET_PET_DETAIL}`,
    }).then((res) => setMyPet(res.data.data));
  }, []);

  const onClickModification = () => {
    if (!decodedToken) return;

    navigate(`${getPathPetProfile(decodedToken?.id.toString())}`);
  };

  console.log(myPet);

  return (
    <>
      <div className='container pet-profile-container'>
        <CustomHeader
          title='펫 프로필'
          onClickLeft={() => {
            navigate(`${MY_PAGE_PATH}`);
          }}
        />
        <img
          className='profile-img'
          src={myPet?.imagePath ? myPet.imagePath : TEMP_IMAGE_URL}
          alt='프로필 사진'
        />
        <div className='pet-info-inputs'>
          <InputTitle>이름</InputTitle>
          <InputBox readonly width='250px' placeholder={myPet?.name} />

          <InputTitle>품종</InputTitle>
          <InputBox readonly width='250px' placeholder={myPet?.breed} />

          <InputTitle>나이</InputTitle>
          <InputBox readonly width='250px' placeholder={`${myPet?.age}살`} />

          <InputTitle>성별</InputTitle>
          <div className='gender-buttons'>
            <Button disabled width='120px' outline deactivationStyle={!myPet?.gender}>
              암컷
            </Button>
            <Button disabled width='120px' outline deactivationStyle={!!myPet?.gender}>
              수컷
            </Button>
          </div>
          <Checkbox checked={myPet?.isNeutered} readonly text={'중성화 수술을 했어요.'} />

          <InputTitle>체중</InputTitle>
          <InputBox readonly width='250px' placeholder={`${myPet?.weight} kg`} />

          <InputTitle>특이사항</InputTitle>
          <TextArea readonly placeholder={`${myPet?.note}`} />
        </div>
      </div>
      <FooterButton onClick={onClickModification}>수정하기</FooterButton>
    </>
  );
}
