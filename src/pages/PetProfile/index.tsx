import {
  Button,
  Checkbox,
  FooterButton,
  InputBox,
  InputTitle,
  RadioButton,
  TextArea,
} from 'components';

const TEMP_IMAGE_URL =
  'https://blog.kakaocdn.net/dn/GHYFr/btrsSwcSDQV/UQZxkayGyAXrPACyf0MaV1/img.jpg';

export default function PetProfile() {
  return (
    <>
      <div className='container pet-profile-container'>
        <img className='profile-img' src={TEMP_IMAGE_URL} alt='프로필 사진' />
        <div className='pet-info-inputs'>
          <InputTitle>이름</InputTitle>
          <InputBox readonly width='250px' placeholder='유토' />

          <InputTitle>품종</InputTitle>
          <InputBox readonly width='250px' placeholder='알래스칸 말라뮤트' />

          <InputTitle>나이</InputTitle>
          <InputBox readonly width='250px' placeholder='1살' />

          <InputTitle>성별</InputTitle>
          <div className='gender-buttons'>
            {/* //TODO: 선택한 성별 하나만 컬러 변경 */}
            <Button disabled width='120px' outline>
              암컷
            </Button>
            <Button disabled width='120px' outline deactivationStyle>
              수컷
            </Button>
          </div>
          <Checkbox readonly text={'중성화 수술을 했어요.'} />
          {/* //TODO: 중성화 여부에 따라 체크박스 표시 */}

          <InputTitle>체중</InputTitle>
          <InputBox readonly width='250px' placeholder='70 kg' />

          <InputTitle>특이사항</InputTitle>
          <TextArea readonly placeholder='' />
        </div>
      </div>
      <FooterButton>수정하기</FooterButton>
    </>
  );
}
