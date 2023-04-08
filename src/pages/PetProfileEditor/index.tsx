import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { IoMdClose as CloseIcon } from 'react-icons/io';

import {
  Checkbox,
  InputBox,
  InputTitle,
  RadioButton,
  TextArea,
  FooterButton,
  ImageUploader,
  CustomHeader,
} from 'components';

import checkExtensions from 'utils/checkExtensions';

import { MyPetFormRefs, PetInfo, RequiredValues } from 'types/petProfileTypes';
import { get, post, put } from 'utils/axiosHelper';
import { useUser } from 'context/UserContext';
import { usePet } from 'context/PetContext';

const REQUIRED_KEY: RequiredValues[] = ['name', 'breed', 'age', 'gender', 'weight'];

export default function PetProfileEditor() {
  const inputRefs = useRef<MyPetFormRefs>({
    name: useRef(null),
    age: useRef(null),
    breed: useRef(null),
    weight: useRef(null),
  });

  const { decodedToken } = useUser();
  const { hasPet } = usePet();

  const navigate = useNavigate();

  const { pathname } = useLocation();
  const pathId = pathname.split('/').pop();

  const [isMounted, setIsMounted] = useState(false);
  const [isModification, setIsModification] = useState(false);

  const [profileImg, setProfileImg] = useState('');
  const [showImgDeleteText, setShowImgDeleteText] = useState(false);

  const [isCheckedFemail, setIsCheckedFemail] = useState(false);
  // 성별 체크박스에서 사용

  const [emptyValues, setEmptyValues] = useState<RequiredValues[]>([]);
  const [inputsToShake, setInputsToShake] = useState<RequiredValues[]>([]);

  /**
   * 서버로 전송할 Pet Profile Values, image file
   */
  const [petProfile, setPetProfile] = useState<PetInfo>({
    name: '',
    breed: '',
    age: 0,
    gender: '',
    isNeutered: false,
    weight: 0,
    note: '',
  });
  const [imgFile, setImgFile] = useState<File | null>();
  /**
   *
   */

  useEffect(() => {
    // * 등록/수정 구분
    if (hasPet) {
      setIsModification(() => true);
    } else setIsModification(() => false);

    // * 수정하기 페이지 진입 시 토큰의 id와 경로 id가 일치하는지 확인
    // TODO: 수정하기 기능 추가하기
    // 펫 등록 여부에 따라 라우팅 분기

    if (!hasPet) return navigate('/profile/pets');

    if (hasPet && pathname === '/profile/pets') {
      return navigate(`/profile/pets/${decodedToken?.id}`);
    }

    if (decodedToken?.id !== Number(pathId)) {
      window.alert('잘못된 접근입니다.');
      return navigate('/');
    }

    if (decodedToken?.id === Number(pathId)) {
      return navigate(`/profile/pets/${pathId}`);
    }
  }, [decodedToken, hasPet]);

  useEffect(() => {
    // * 수정하기 일 때 펫 정보 초기화
    get({ endpoint: '/users/pets/detail' })
      .then((res) => {
        setProfileImg(() => res.data.data.imagePath);
        setPetProfile(() => {
          return { ...res.data.data, gender: res.data.data ? '암컷' : '수컷' };
        });
        setIsCheckedFemail(() => (res.data.data?.gender ? true : false));
      })
      .catch((err) => {
        console.error(err);
      });
  }, [isModification, hasPet]);

  const onChangeImage = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const files = target.files;

    const isValidImageExtensions = checkExtensions(files!);
    if (!isValidImageExtensions)
      return window.alert('.jpg, .jpeg, .png, .gif 확장자만 업로드 할 수 있어요.');

    const url = URL.createObjectURL(files![0]);
    setProfileImg(() => url);
    setImgFile(() => files![0]);
  };

  const onClickDeleteImg = () => {
    setProfileImg('');
    setImgFile(null);
  };

  const onChangeInputs =
    (target: keyof PetInfo) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setPetProfile((prev) => {
        const hasClassNameAgeOrWeight =
          e.target.className.includes('age') || e.target.className.includes('weight');

        // * 나이, 체중 음수인 경우 절대값으로 변경
        if (hasClassNameAgeOrWeight) {
          return { ...prev, [target]: Math.abs(Number(e.target.value)).toString() };
        }

        return { ...prev, [target]: e.target.value };
      });

      if (target === 'gender') {
        setIsCheckedFemail(() => !isCheckedFemail);
      }
    };

  const onClickNeutered = () => {
    setPetProfile((prev) => {
      return { ...prev, isNeutered: !petProfile.isNeutered };
    });
  };

  /**
   * * 펫 프로필
   * 서버 POST 요청
   */
  const onSubmitPetProfile = async () => {
    const emptyValues = Object.entries(petProfile)
      .map(([key, value]) => (REQUIRED_KEY && !value ? key : ''))
      .filter((key) => key && REQUIRED_KEY.includes(key as RequiredValues));

    setEmptyValues(() => [...emptyValues] as RequiredValues[]);
    setInputsToShake(() => []);

    const convertProfileData = {
      ...petProfile,
      age: Number(petProfile.age),
      weight: Number(petProfile.weight),
      gender: petProfile.gender === '암컷' ? true : false,
    };

    const formData = new FormData();
    if (imgFile) {
      formData.append('file', imgFile);
    }

    console.log({ imgFile });

    formData.append(
      'request',
      new Blob([JSON.stringify(convertProfileData)], { type: 'application/json' })
    );

    /**
     * * 펫 프로필 수정하기 (PUT)
     */
    if (!emptyValues.length && isModification) {
      try {
        const res = await put({
          endpoint: 'users/pets/update',
          body: formData,
          isFormData: true,
        });

        console.log(res);
        if (res.status === 200) {
          console.log('수정 완료, 전송 데이터 : ', petProfile);
          window.alert('수정을 완료했어요.'); // *임시 메시지
          navigate('/mypage/pets');
        }
      } catch (err) {
        console.error(err);
        window.alert('에러가 발생했어요. 잠시 후 다시 시도해주세요.');
      }

      return;
    }

    /*
     * 등록하기
     */

    if (!emptyValues.length) {
      try {
        const res = await post({
          endpoint: 'users/pets',
          body: formData,
          isImage: true,
        });

        if (res.status === 201) {
          window.alert('등록을 완료했어요.'); // *임시 메시지
          navigate('/profile/pets');
        }
      } catch (err) {
        console.error(err);
        window.alert('에러가 발생했어요. 잠시 후 다시 시도해주세요.');
      }
    }
  };

  useEffect(() => {
    setIsMounted(true);

    if (inputRefs.current.name.current) {
      inputRefs.current.name.current.value = petProfile?.name;
      inputRefs.current.name.current?.focus();
    }
  }, [petProfile.name, inputRefs.current]);

  useEffect(() => {
    if (!isMounted) return;

    if (!petProfile.name) {
      if (inputsToShake.includes('name')) return;
      inputRefs.current.name.current?.focus();
      return setInputsToShake((prev) => [...prev, 'name']);
    }

    if (!petProfile.breed) {
      if (inputsToShake.includes('breed')) return;
      inputRefs.current.breed.current?.focus();
      return setInputsToShake((prev) => [...prev, 'breed']);
    }

    if (!petProfile.age) {
      if (inputsToShake.includes('age')) return;
      inputRefs.current.age.current?.focus();
      return setInputsToShake((prev) => [...prev, 'age']);
    }

    if (!petProfile.gender) {
      if (inputsToShake.includes('gender')) return;
      return setInputsToShake((prev) => [...prev, 'gender']);
    }

    if (!petProfile.weight) {
      if (inputsToShake.includes('weight')) return;
      inputRefs.current.weight.current?.focus();
      return setInputsToShake((prev) => [...prev, 'weight']);
    }
  }, [inputsToShake, emptyValues]);

  console.log({ petProfile });

  return (
    <>
      <div className='profile-editor-container'>
        <CustomHeader onClickLeft={() => navigate('/mypage')} title='펫 프로필 등록' hideIcon />

        {profileImg ? (
          <div
            onMouseEnter={() => setShowImgDeleteText(true)}
            onMouseLeave={() => setShowImgDeleteText(false)}
            // TODO: 모바일 이벤트 추가 필요
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
          <div className={`${inputsToShake.includes('name') ? 'shake' : ''}`}>
            <InputTitle isRequire>이름</InputTitle>
            <InputBox
              value={isModification ? petProfile?.name : ''}
              onChange={onChangeInputs('name')}
              required
              width='250px'
              inputRef={inputRefs.current.name}
              placeholder='이름을 입력해주세요.'
            />
          </div>

          <div className={`${inputsToShake.includes('breed') ? 'shake' : ''}`}>
            <InputTitle isRequire>품종</InputTitle>
            <InputBox
              value={isModification ? petProfile?.breed : ''}
              onChange={onChangeInputs('breed')}
              required
              width='250px'
              inputRef={inputRefs.current.breed}
              placeholder='품종을 입력해주세요.'
            />
          </div>

          <div className={`${inputsToShake.includes('age') ? 'shake' : ''}`}>
            <InputTitle isRequire>나이</InputTitle>
            <InputBox
              value={isModification ? String(petProfile?.age) : ''}
              className='age'
              onChange={onChangeInputs('age')}
              min='0'
              max='100'
              required
              type='number'
              width='250px'
              inputRef={inputRefs.current.age}
              placeholder='나이를 입력해주세요.'
            />
          </div>

          <div className={`${inputsToShake.includes('gender') ? 'shake' : ''}`}>
            <InputTitle isRequire>성별</InputTitle>
            <div className='gender-buttons'>
              <RadioButton
                checked={isModification && isCheckedFemail}
                onChange={onChangeInputs('gender')}
                required
                name='gender'
                value='암컷'
              >
                암컷
              </RadioButton>
              <RadioButton
                checked={isModification && !isCheckedFemail}
                onChange={onChangeInputs('gender')}
                required
                name='gender'
                value='수컷'
              >
                수컷
              </RadioButton>
            </div>
          </div>

          <Checkbox
            checked={petProfile?.isNeutered}
            onClick={onClickNeutered}
            text={'중성화 수술을 했어요.'}
          />

          <div className={`${inputsToShake.includes('weight') ? 'shake' : ''}`}>
            <InputTitle isRequire>체중</InputTitle>
            <InputBox
              value={isModification ? petProfile?.weight.toString() : ''}
              className='weight'
              inputRef={inputRefs.current.weight}
              onChange={onChangeInputs('weight')}
              required
              type='number'
              width='250px'
              placeholder='kg'
              placeholderAlignRight
            />
          </div>

          <InputTitle>특이사항</InputTitle>
          <TextArea
            onChange={onChangeInputs('note')}
            placeholder='먹는 사료, 영양제, 간식, 건강상태 등'
            value={isModification ? petProfile?.note : ''}
          />
        </div>
      </div>

      <FooterButton onClick={onSubmitPetProfile}>등록하기</FooterButton>
    </>
  );
}
