import { Checkbox, InputBox, InputTitle, RadioButton, TextArea } from 'components';
import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { HiPlus as PlusIcon } from 'react-icons/hi';
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
  const labelRef = useRef<HTMLLabelElement>(null);

  const [profileImg, setProfileImg] = useState('');
  const [petProfile, setPetProfile] = useState<Profile>();

  const onKeyDown = () => (e: React.KeyboardEvent<HTMLLabelElement>) => {
    const isEnter = e.key === 'Enter';
    if (!isEnter) return;
    if (labelRef.current) labelRef.current.click();
  };

  const onChangeImage = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const files = target.files;
    const isValidImageExtensions = checkExtensions(files!);
    if (!isValidImageExtensions)
      return window.alert('.jpg, .jpeg, .png, .gif 확장자만 업로드 할 수 있어요.');

    const url = URL.createObjectURL(files![0]);
    setProfileImg(url);
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <>
      <form className='profile-editor-container' action='POST'>
        {profileImg ? (
          <img className='profile-img' src={profileImg} alt='프로필 사진' />
        ) : (
          <label ref={labelRef} tabIndex={0} htmlFor='image-file-uploader' onKeyDown={onKeyDown()}>
            <div className='image-uploader'>
              <PlusIcon />
              <span className='image-uploader-text'>이미지 등록</span>
            </div>
          </label>
        )}
        <input
          accept='image/*'
          onChange={onChangeImage}
          className='uploader-input'
          type='file'
          id='image-file-uploader'
        />
        <div className='pet-info-inputs'>
          <InputTitle isRequire>이름</InputTitle>
          <InputBox required width='250px' inputRef={inputRef} placeholder='이름을 입력해주세요.' />

          <InputTitle isRequire>품종</InputTitle>
          <InputBox required width='250px' placeholder='품종을 입력해주세요.' />

          <InputTitle isRequire>나이</InputTitle>
          <InputBox required type='number' width='250px' placeholder='나이를 입력해주세요.' />

          <InputTitle isRequire>성별</InputTitle>
          <div className='gender-buttons'>
            <RadioButton required name='gender' value='여아'>
              여아
            </RadioButton>
            <RadioButton required name='gender' value='여아'>
              남아
            </RadioButton>
          </div>
          <Checkbox text={'중성화 수술을 했어요.'} />

          <InputTitle isRequire>체중</InputTitle>
          <InputBox required type='number' width='250px' placeholder='kg' placeholderAlignRight />

          <InputTitle>특이사항</InputTitle>
          <TextArea placeholder='먹는 사료, 영양제, 간식, 건강상태 등' />
        </div>
      </form>
    </>
  );
}
