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
import { get, post, put } from 'utils/axiosHelper';
import { convertImgToFile } from 'utils/convertImageToFile';

import { MyPetFormRefs, PetInfo, RequiredValues } from 'types/petProfileTypes';

import { useUser } from 'context/UserContext';
import { usePet } from 'context/PetContext';

import {
  HOME_PATH,
  MY_PAGE_PATH,
  MY_PAGE_PET_PATH,
  PROFILE_PET_PATH,
  getPathPetProfile,
} from 'constants/routes';
import { petsApi } from 'constants/apiEndpoint';

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

  const [isCheckedFemale, setIsCheckedFemale] = useState(false);
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
    if (hasPet) setIsModification(() => true);
    else setIsModification(() => false);

    // * 수정하기 페이지 진입 시 토큰의 id와 경로 id가 일치하는지 확인 * //
    // 펫 등록 여부에 따라 라우팅 분기
    if (!hasPet) return navigate(`${PROFILE_PET_PATH}`);

    if (hasPet && pathname === `${PROFILE_PET_PATH}`) {
      if (!decodedToken) return;
      return navigate(getPathPetProfile(decodedToken?.id.toString()));
    }

    if (decodedToken?.id !== Number(pathId)) {
      window.alert('잘못된 접근입니다.');
      return navigate(`${HOME_PATH}`);
    }

    if (decodedToken?.id === Number(pathId)) {
      if (!pathId) return;
      return navigate(`${getPathPetProfile(pathId)}`);
    }
  }, [decodedToken, hasPet, pathname, pathId]);

  useEffect(() => {
    // * 펫 프로필 수정: 에디터 init * //
    if (!isModification) return;

    const getPetProfileData = async () => {
      try {
        const res = await get({ endpoint: `${petsApi.GET_PET_DETAIL}` });
        setProfileImg(() => res.data.data.imagePath);
        setPetProfile(() => {
          return { ...res.data.data, gender: res.data.data.gender ? '암컷' : '수컷' };
        });
        setIsCheckedFemale(() => (res.data.data?.gender ? true : false));

        const imgFile = await convertImgToFile(res.data.data?.imagePath!);
        setImgFile(() => imgFile);
      } catch (err) {
        console.error(err);
      }
    };

    getPetProfileData();
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
      // * 나이, 체중 음수인 경우 절대값으로 변경 * //
      const hasClassNameAgeOrWeight =
        e.target.className.includes('age') || e.target.className.includes('weight');

      if (hasClassNameAgeOrWeight) {
        setPetProfile((prev) => {
          return { ...prev, [target]: Math.abs(Number(e.target.value)).toString() };
        });
      }

      if (target === 'gender') {
        setIsCheckedFemale((prev) => !prev);
      }

      setPetProfile((prev) => {
        return { ...prev, [target]: e.target.value };
      });
    };

  const onClickNeutered = () => {
    setPetProfile((prev) => {
      return { ...prev, isNeutered: !petProfile.isNeutered };
    });
  };

  /**
   * * 펫 프로필
   * * 서버 POST 요청
   */
  const onSubmitPetProfile = async () => {
    const emptyValues = Object.entries(petProfile)
      .map(([key, value]) => (REQUIRED_KEY && !value ? key : ''))
      .filter((key) => key && REQUIRED_KEY.includes(key as RequiredValues));

    setEmptyValues(() => [...emptyValues] as RequiredValues[]);
    setInputsToShake(() => []);

    const convertProfileData = {
      ...petProfile,
      age: Number(petProfile.age.toString().slice(0, 3)),
      weight: Number(petProfile.weight.toString().slice(0, 3)),
      gender: petProfile.gender === '암컷' ? true : false,
    };

    const formData = new FormData();
    if (imgFile) {
      formData.append('images', imgFile);
    }

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
          endpoint: `${petsApi.UPDATE_PET}`,
          body: formData,
          isFormData: true,
        });

        console.log(res);
        if (res.status === 200) {
          console.log('수정 완료, 전송 데이터 : ', petProfile);
          window.alert('수정을 완료했어요.'); // *임시 메시지
          navigate(`${MY_PAGE_PET_PATH}`);
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
          endpoint: `${petsApi.POST_CREATE_PET}`,
          body: formData,
          isImage: true,
        });

        if (res.status === 201) {
          window.alert('등록을 완료했어요.'); // *임시 메시지
          navigate(`${MY_PAGE_PET_PATH}`);
        }
      } catch (err) {
        console.error(err);
        window.alert('에러가 발생했어요. 잠시 후 다시 시도해주세요.');
      }
    }
  };

  useEffect(() => {
    setIsMounted(true);

    const nameRef = inputRefs.current.name.current;
    if (nameRef) {
      nameRef.value = petProfile?.name;
      nameRef.focus();
    }
  }, []);

  const focusInput = (inputName: RequiredValues) => {
    if (inputsToShake.includes(inputName)) return;

    if (inputName !== 'gender') inputRefs.current[inputName].current?.focus();
    return setInputsToShake((prev) => [...prev, inputName]);
  };

  useEffect(() => {
    if (!isMounted) return;

    if (!petProfile.name) {
      return focusInput('name');
    }

    if (!petProfile.breed) {
      return focusInput('breed');
    }

    if (!petProfile.age) {
      return focusInput('age');
    }

    if (!petProfile.gender) {
      return focusInput('gender');
    }

    if (!petProfile.weight) {
      return focusInput('weight');
    }
  }, [inputsToShake, emptyValues]);

  console.log(petProfile);

  return (
    <>
      <div className='profile-editor-container'>
        <CustomHeader
          onClickLeft={() => navigate(`${MY_PAGE_PATH}`)}
          title='펫 프로필 등록'
          hideIcon
        />

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
              maxLength={20}
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
              maxLength={20}
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
                checked={isModification ? isCheckedFemale : petProfile.gender === '암컷'}
                onChange={onChangeInputs('gender')}
                required
                name='gender'
                value='암컷'
              >
                암컷
              </RadioButton>
              <RadioButton
                checked={isModification ? !isCheckedFemale : petProfile.gender === '수컷'}
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
            maxLength={200}
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
