import { useEffect, useRef, useState } from 'react';
import { IoMdClose as CloseIcon } from 'react-icons/io';

import { Button, FooterButton, ImageUploader, InputBox, InputTitle, Message } from 'components';

import checkExtensions from 'utils/checkExtensions';

export default function MyProfileEditor() {
  const inputRef = useRef<HTMLInputElement>(null);

  const [profileImg, setProfileImg] = useState('');
  const [showImgDeleteText, setShowImgDeleteText] = useState(false);

  const onChangeImage = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
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
    if (inputRef.current) inputRef.current.focus();
  }, []);

  return (
    <div className='profile-editor-container'>
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
      <div className='profile-container'>
        <div className='nickname'>
          <InputTitle>닉네임</InputTitle>
          <Message isWarning>2~20자 영어, 한글, 숫자만 사용할 수 있어요.</Message>
          {/* //TODO: 정규식확인
           */}
        </div>
        <div className='nickname-duplicate-check-container'>
          <InputBox inputRef={inputRef} placeholder='닉네임을 입력해주세요.' value='Reason' />
          {/* //TODO: value 닉네임 동적 바인딩
              - 회원가입 시 임의로 지정되는 닉네임 or 이미 닉네임을 지정한 유저
              //TODO: 닉네임 변경 유무 확인
              - 닉네임이 변경되지 않았을 경우
              - 닉네임이 변경되었을 경우
          */}
          <Button>중복확인</Button>
        </div>
      </div>
      <FooterButton>변경하기</FooterButton>
    </div>
  );
}
