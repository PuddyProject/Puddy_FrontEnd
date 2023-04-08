import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import { IoMdClose as CloseIcon } from 'react-icons/io';

import { Button, FooterButton, ImageUploader, InputBox, InputTitle, Message } from 'components';

import checkExtensions from 'utils/checkExtensions';
import { patch, post } from 'utils/axiosHelper';
import { warningMessage } from 'utils/initialValues/myProfileEditor';
import { isValidNickname } from 'utils';
import { ApiError } from 'types/errorsTypes';
import { useNavigate } from 'react-router-dom';
import { get } from 'utils/axiosHelper';

export default function MyProfileEditor() {
  const inputRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  const [prevProfieImg, setPrevProfileImg] = useState(''); // 변경 전 이미지
  const [profileImg, setProfileImg] = useState('');

  const [prevNickname, setPrevNickname] = useState('');
  const [nickname, setNickname] = useState('');
  const [showImgDeleteText, setShowImgDeleteText] = useState(false);
  const [profileDatas, setProfileDatas] = useState<File | null>();

  const [showWarningMessage, setShowWarningMessage] = useState(false);
  const [showCorrectMessage, setShowCorrectMessage] = useState(false);
  const [initWarningMessage, setInitWarningMessage] = useState('');

  const [isDisabledButton, setIsDisabledButton] = useState(true);

  useEffect(() => {
    get({ endpoint: '/users/me' }).then((res) => {
      const userImage = res.data.data.imagePath;
      const userNickname = res.data.data.nickname;
      setPrevNickname(() => userNickname);
      setNickname(() => userNickname);
      setProfileImg(() => userImage);
      setPrevProfileImg(() => userImage);
    });
  }, []);

  const fileSelectHandler = (files: FileList) => {
    setProfileDatas(files?.[0]);
  };

  const onChangeImage = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    if (!target.files) return;

    const files = target.files;
    fileSelectHandler(files);

    const isValidImageExtensions = checkExtensions(files!);
    if (!isValidImageExtensions)
      return window.alert('.jpg, .jpeg, .png, .gif 확장자만 업로드 할 수 있어요.');

    const url = URL.createObjectURL(files![0]);

    setProfileImg(url);
  };

  const onClickDeleteImg = () => {
    setProfileImg('');
    setProfileDatas(null);
  };
  console.log(prevProfieImg, profileImg, nickname);

  const onSubmitProfile = async () => {
    // 파일이 변경된 경우에만 post요청
    //TODO: 서버에서 payload에 images 키가 없으면 이미지 삭제 시켜주셔야 할듯

    if (prevProfieImg === profileImg && prevNickname === nickname) {
      return window.alert('변경된 사항이 없어요!');
    }

    if (showWarningMessage && !showCorrectMessage) {
      return window.alert('닉네임을 확인해주세요.');
    }

    const formData = new FormData();
    if (profileImg) {
      if (profileDatas) formData.append('images', profileDatas);
    }
    formData.append(
      'request',
      new Blob([JSON.stringify({ nickname })], {
        type: 'application/json',
      })
    );

    try {
      const res = await patch({
        endpoint: 'users/update-profile',
        body: formData,
        isFormData: true,
      });
      if (res.status === 200) {
        window.alert('변경이 완료되었어요.');
        navigate('/mypage');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const onCheckDuplicateNickname = async () => {
    // * 닉네임 중복확인 버튼 클릭
    try {
      const res = await post({
        endpoint: 'users/duplicate-nickname',
        body: {
          nickname,
        },
      });

      if (res.status === 200) {
        setShowCorrectMessage(true);
      }
    } catch (err: unknown) {
      const Error = err as ApiError;
      if (Error.response?.status === 400) {
        console.error('이미 사용중인 닉네임입니다.');

        setInitWarningMessage(() => warningMessage.used);
      }
    }
  };

  console.log(nickname);

  const onChangeInput = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      // * 닉네임 인풋 값 변경 시 Valid 체크
      setShowWarningMessage(() => true);
      setShowCorrectMessage(() => false);

      if (e.target.value.startsWith('퍼디', 0)) {
        setIsDisabledButton(() => true);
        return setInitWarningMessage(() => warningMessage.startsWithPuddy);
      }

      if (!isValidNickname(e.target.value)) {
        setIsDisabledButton(() => true);
        return setInitWarningMessage(() => warningMessage.nickname);
      }

      setInitWarningMessage(() => '');
      setIsDisabledButton(() => false);
      setNickname(() => e.target.value);
    },
    [isValidNickname]
  );

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.value = nickname;
      inputRef.current.focus();
    }
  }, [inputRef.current]);

  return (
    <div className='profile-editor-container'>
      {profileImg ? (
        <div
          onMouseEnter={() => setShowImgDeleteText(true)}
          onMouseLeave={() => setShowImgDeleteText(false)}
          //TODO: 모바일 화면에서도 지원해야함
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
          {/* //TODO: 이미지 수정하기인 경우 이미지 미리보기 필요 */}
        </div>
      ) : (
        <ImageUploader onChangeImage={onChangeImage} />
      )}
      <div className='profile-container'>
        <div className='nickname'>
          <InputTitle>닉네임</InputTitle>
          {showWarningMessage && <Message isWarning>{initWarningMessage}</Message>}
          {showCorrectMessage && <Message>사용 가능한 닉네임이에요.</Message>}
        </div>

        <div className='nickname-duplicate-check-container'>
          <InputBox
            onChange={onChangeInput}
            inputRef={inputRef}
            placeholder='닉네임을 입력해주세요.'
            value={nickname}
          />
          {/*
              //TODO: 닉네임 변경 유무 확인
              - 닉네임이 변경되지 않았을 경우
              - 닉네임이 변경되었을 경우
          */}
          <Button disabled={isDisabledButton} onClick={onCheckDuplicateNickname}>
            중복확인
          </Button>
        </div>
      </div>
      <FooterButton onClick={onSubmitProfile}>변경하기</FooterButton>
    </div>
  );
}
