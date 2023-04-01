import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { IoMdClose as CloseIcon } from 'react-icons/io';

import {
  Checkbox,
  InputBox,
  InputTitle,
  RadioButton,
  TextArea,
  FooterButton,
  ImageUploader,
} from 'components';

import checkExtensions from 'utils/checkExtensions';

interface Profile {
  imgFile?: File;
  name: string;
  breed: string;
  age: string;
  gender: string;
  isNeutered: boolean;
  weight: string;
  note?: string;
}

export default function PetProfileEditor() {
  const inputRef = useRef<HTMLInputElement>(null);

  const [profileImg, setProfileImg] = useState('');
  const [showImgDeleteText, setShowImgDeleteText] = useState(false);
  const [petProfile, setPetProfile] = useState<Profile>();

  const onChangeImage = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const files = target.files;
    const isValidImageExtensions = checkExtensions(files!);
    if (!isValidImageExtensions)
      return window.alert('.jpg, .jpeg, .png, .gif 확장자만 업로드 할 수 있어요.');

    const url = URL.createObjectURL(files![0]);
    setProfileImg(url);
  };

  const onClickDeleteImg = () => {
    setProfileImg('');
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <>
      <form className='profile-editor-container' action='POST'>
        {profileImg ? (
          <div
            onMouseEnter={() => setShowImgDeleteText(true)}
            onMouseLeave={() => setShowImgDeleteText(false)}
            className='img-container'
          >
            <img className='profile-img' src={profileImg} alt='프로필 사진' />
            {showImgDeleteText && (
              <div onClick={onClickDeleteImg} className='delete-container'>
                <CloseIcon className='delete-icon' />
                <span className='delete-text'>삭제하기</span>
              </div>
            )}
            {/* //TODO: 삭제하기 버튼 누르면 이미지 삭제 */}
          </div>
        ) : (
          <ImageUploader onChangeImage={onChangeImage} />
        )}
        <div className='pet-info-inputs'>
          <InputTitle isRequire>이름</InputTitle>
          <InputBox required width='250px' inputRef={inputRef} placeholder='이름을 입력해주세요.' />

          <InputTitle isRequire>품종</InputTitle>
          <InputBox required width='250px' placeholder='품종을 입력해주세요.' />

          <InputTitle isRequire>나이</InputTitle>
          <InputBox
            min='0'
            max='100'
            required
            type='number'
            width='250px'
            placeholder='나이를 입력해주세요.'
          />

          <InputTitle isRequire>성별</InputTitle>
          <div className='gender-buttons'>
            <RadioButton required name='gender' value='여아'>
              암컷
            </RadioButton>
            <RadioButton required name='gender' value='여아'>
              수컷
            </RadioButton>
          </div>
          <Checkbox text={'중성화 수술을 했어요.'} />

          <InputTitle isRequire>체중</InputTitle>
          <InputBox required type='number' width='250px' placeholder='kg' placeholderAlignRight />

          <InputTitle>특이사항</InputTitle>
          <TextArea placeholder='먹는 사료, 영양제, 간식, 건강상태 등' />
        </div>
      </form>
      <FooterButton>등록하기</FooterButton>
    </>
  );
}
