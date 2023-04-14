import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoMdClose as CloseIcon } from 'react-icons/io';

import {
  Button,
  CustomHeader,
  FooterButton,
  ImageUploader,
  InputBox,
  InputTitle,
  Message,
} from 'components';

import checkExtensions from 'utils/checkExtensions';
import { patch, post } from 'utils/axiosHelper';
import { warningMessage } from 'utils/initialValues/myProfileEditor';
import { isValidNickname } from 'utils';
import { get } from 'utils/axiosHelper';

import { ApiError } from 'types/errorsTypes';

import { joinApi, myPageApi } from 'constants/apiEndpoint';
import { MY_PAGE_PATH } from 'constants/routes';
import { convertImgToFile } from 'utils/convertImageToFile';

export default function MyProfileEditor() {
  const inputRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  const [userProfile, setUserProfile] = useState({
    img: '',
    prevImg: '',
    nickname: '',
    prevNickName: '',
  });

  const [showImgDeleteText, setShowImgDeleteText] = useState(false);

  const [profileImgFile, setProfileImgFile] = useState<File | null>();

  const [showWarningMessage, setShowWarningMessage] = useState(false);
  const [showCorrectMessage, setShowCorrectMessage] = useState(false);
  const [initWarningMessage, setInitWarningMessage] = useState('');

  const [isDisabledButton, setIsDisabledButton] = useState(true);

  console.log(userProfile);

  const fetchUserDatas = async () => {
    const res = await get({ endpoint: `${myPageApi.GET_MY_PAGE_INFO}` });
    const resData = res.data.data;
    const img = resData.imagePath;
    const nickname = resData.nickname;

    setUserProfile((prev) => {
      return {
        ...prev,
        img,
        prevImg: img,
        nickname,
        prevNickName: nickname,
      };
    });
  };

  useEffect(() => {
    fetchUserDatas();
  }, []);

  useEffect(() => {
    const convertImg = async () => {
      if (userProfile.img) {
        const imgFile = await convertImgToFile(userProfile.img);
        setProfileImgFile(() => imgFile);
      }
    };

    convertImg();
  }, [userProfile.img]);

  const fileSelectHandler = (files: FileList) => {
    setProfileImgFile(files?.[0]);
  };

  const onChangeImage = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    if (!target.files) return;

    const files = target.files;
    fileSelectHandler(files);

    const isValidImageExtensions = checkExtensions(files!);
    if (!isValidImageExtensions)
      return window.alert('.jpg, .jpeg, .png, .gif 확장자만 업로드 할 수 있어요.');

    const url = URL.createObjectURL(files![0]);
    setUserProfile((prev) => {
      return {
        ...prev,
        img: url,
      };
    });
  };

  const onClickDeleteImg = () => {
    setUserProfile((prev) => {
      return {
        ...prev,
        img: '',
      };
    });
    setProfileImgFile(null);
  };

  const onSubmitProfile = async () => {
    // 파일이 변경된 경우에만 post요청

    if (
      userProfile.img === userProfile.prevImg &&
      userProfile.nickname === userProfile.prevNickName
    ) {
      return window.alert('변경된 사항이 없어요!');
    }

    if (showWarningMessage && !showCorrectMessage) {
      return window.alert('닉네임을 확인해주세요.');
    }

    const formData = new FormData();
    if (userProfile.img) {
      if (profileImgFile) formData.append('images', profileImgFile);
    }

    formData.append(
      'request',
      new Blob([JSON.stringify({ nickname: userProfile.nickname })], {
        type: 'application/json',
      })
    );

    try {
      const res = await patch({
        endpoint: `${myPageApi.PATCH_MY_PROFILE}`,
        body: formData,
        isFormData: true,
      });
      if (res.status === 200) {
        window.alert('변경이 완료되었어요.');
        navigate(`${MY_PAGE_PATH}`);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const onCheckDuplicateNickname = async () => {
    // * 닉네임 중복확인 버튼 클릭
    try {
      const res = await post({
        endpoint: `${joinApi.POST_DUPLICATE_NICKNAME}`,
        body: {
          nickname: userProfile.nickname,
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

      setUserProfile((prev) => {
        return {
          ...prev,
          nickname: e.target.value,
        };
      });
    },
    [isValidNickname]
  );

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.value = userProfile.nickname;
      inputRef.current.focus();
    }
  }, [inputRef.current]);

  return (
    <div className='profile-editor-container'>
      <CustomHeader title='내 프로필 변경' hideIcon />

      {userProfile.img ? (
        <div
          onMouseEnter={() => setShowImgDeleteText(true)}
          onMouseLeave={() => setShowImgDeleteText(false)}
          //TODO: 모바일 화면에서도 지원해야함
          className='img-container'
        >
          <img className='profile-img' src={userProfile.img} alt='프로필 사진' />
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
            value={userProfile.nickname}
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
