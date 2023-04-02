import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
import { post } from 'utils';

import { MyPetFormRefs, Profile, RequiredValues } from 'types/petProfileTypes';

const REQUIRED_KEY: RequiredValues[] = ['name', 'breed', 'age', 'gender', 'weight'];

export default function PetProfileEditor() {
  const inputRefs = useRef<MyPetFormRefs>({
    name: useRef(null),
    age: useRef(null),
    breed: useRef(null),
    weight: useRef(null),
  });

  const navigate = useNavigate();

  const [isMounted, setIsMounted] = useState(false);

  const [profileImg, setProfileImg] = useState('');
  const [showImgDeleteText, setShowImgDeleteText] = useState(false);

  const [emptyValues, setEmptyValues] = useState<RequiredValues[]>([]);
  const [inputsToShake, setInputsToShake] = useState<RequiredValues[]>([]);

  /**
   * 서버로 전송할 Pet Profile Values, image file
   */
  const [petProfile, setPetProfile] = useState<Profile>({
    name: '',
    breed: '',
    age: '',
    gender: '',
    isNeutered: false,
    weight: '',
    note: '',
  });
  const [imgFile, setImgFile] = useState<File | null>();
  /**
   *
   */

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
    (target: keyof Profile) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setPetProfile((prev) => {
        const hasClassNameAgeOrWeight =
          e.target.className.includes('age') || e.target.className.includes('weight');

        if (hasClassNameAgeOrWeight) {
          return { ...prev, [target]: Math.abs(Number(e.target.value)).toString() };
        }

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
   * 서버 POST 요청
   */
  const onSubmitPetProfile = async () => {
    const emptyValues = Object.entries(petProfile)
      .map(([key, value]) => (REQUIRED_KEY && !value ? key : ''))
      .filter((key) => key && REQUIRED_KEY.includes(key as RequiredValues));

    setEmptyValues(() => [...emptyValues] as RequiredValues[]);
    setInputsToShake(() => []);

    const formData = new FormData();
    if (imgFile) {
      formData.append('file', imgFile);
    }

    if (!emptyValues.length) {
      try {
        const res = await post({
          endpoint: 'users/pets',
          body: {
            request: {
              ...petProfile,
              age: Number(petProfile.age),
              weight: Number(petProfile.weight),
            },
            file: formData,
          },
        });
        console.log(res);

        if (res.status === 201) {
          window.alert('등록을 완료했어요.'); // *임시 메시지
          navigate('/');
        }
      } catch (err) {
        console.error(err);
        window.alert('에러가 발생했어요. 잠시 후 다시 시도해주세요.');
      }
    }
  };

  useEffect(() => {
    setIsMounted(true);
    inputRefs.current.name.current?.focus();
  }, []);

  useEffect(() => {
    if (isMounted) {
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
    }
  }, [inputsToShake, emptyValues]);

  return (
    <>
      <div className='profile-editor-container'>
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
              <RadioButton onChange={onChangeInputs('gender')} required name='gender' value='암컷'>
                암컷
              </RadioButton>
              <RadioButton onChange={onChangeInputs('gender')} required name='gender' value='수컷'>
                수컷
              </RadioButton>
            </div>
          </div>

          <Checkbox onClick={onClickNeutered} text={'중성화 수술을 했어요.'} />

          <div className={`${inputsToShake.includes('weight') ? 'shake' : ''}`}>
            <InputTitle isRequire>체중</InputTitle>
            <InputBox
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
          />
        </div>
      </div>
      <FooterButton onClick={onSubmitPetProfile}>등록하기</FooterButton>
    </>
  );
}
