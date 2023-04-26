import React, { useState, useEffect, useRef, ChangeEvent } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { Button, CustomHeader, FooterButton, InputBox, TextArea } from 'components';
import InputTilte from 'components/common/InputTitle';

import { useUser } from 'context/UserContext';
import { get, post } from 'utils';
import { put } from 'utils/axiosHelper';

import { Profile } from 'types/expertProfileTypes';

import { expertApi } from 'constants/apiEndpoint';
import { HOME_PATH, MY_PAGE_PATH } from 'constants/routes';

const MAX_CAREER_COUNT = 5;

const initProfile = {
  username: '',
  education: '',
  careerList: [],
  introduce: '',
  location: '',
};

export default function ExpertProfileEditor() {
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const { decodedToken } = useUser();
  const auth = decodedToken?.auth;

  const [profile, setProfile] = useState<Profile>(initProfile);
  const [careerIndex, setCareerIndex] = useState(0);
  const [careerInputs, setCareerInputs] = useState(['']);

  const [isDisabled, setIsDisabled] = useState(true);

  const [isModification, setIsModification] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // TODO: 이미 프로필을 등록한 전문가 유저는 프로필 보기 페이지로 라우팅 해야할듯
  const { pathname } = useLocation();
  const expertId = pathname.split('/').pop();

  /*
   * 서버에서 전문가 유저가 프로필을 등록했는지 알려줘야 함.
  - 발생할 수 있는 문제
  1. 프로필을 등록하지 않은 전문가가 URL로 입장했을 때 문제가 있음
  2. 마이페이지에서 작성유무를 알 방법이 없어서 메뉴를 동적으로 변경할 수 없음.

   * 현재 userID와 path의 id가 같은지 확인한다. 
   * 같을 경우 수정 페이지로 이동, 다를 경우 404 페이지로 라우트
   * 
   * 에디터 페이지 데이터 바인딩, 포커싱
   * 경력은 최대 5개까지 가능하므로 1개를 초과하여 작성했다면 인풋을 미리 만들어놔야 함
   * 작성완료 버튼 누르면 서버로 전송 (PUT)
   * 
   */

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted && !decodedToken) return;

    if (isModification && expertId !== decodedToken?.id.toString()) {
      window.alert('404 NOT FOUND'); // TODO: 자기 프로필 수정이 아닌 경우
      navigate('/');
    }
  }, [isModification]);

  useEffect(() => {
    if (!decodedToken) return;

    if (decodedToken.id.toString() === expertId) setIsModification(true);
    else setIsModification(false);
  }, [decodedToken, expertId]);

  useEffect(() => {
    if (!isMounted || !expertId) return;

    const getModificationExpertProfile = async () => {
      try {
        const res = await get({ endpoint: `${expertApi.requestExpertId(expertId)}` });
        const data = res.data.data;
        setProfile((prev) => ({
          ...prev,
          careerList: data.careerList,
          education: data.education,
          imagePath: data.imagePath,
          introduce: data.introduce,
          username: data.username,
          location: data.location,
        }));
        setCareerInputs(() => {
          return Array(data.careerList.length)
            .fill('')
            .map((_, i) => {
              return data.careerList[i];
            });
        });
      } catch (err) {
        console.error(err);
      }
    };

    getModificationExpertProfile();
  }, [isMounted, expertId]);

  // TODO: 코드 리팩토링
  const submitExpertProfile = async () => {
    if (!isModification) {
      // * 등록하기 * //
      try {
        const res = await post({ endpoint: `${expertApi.POST_EXPERT}`, body: profile });
        if (res.data.resultCode === 'SUCCESS') {
          alert('프로필 등록 완료');
          navigate(`${MY_PAGE_PATH}`);
        }
      } catch (err) {
        console.error(err);
      }
    } else {
      // * 수정하기 * //
      try {
        profile.careerList = profile.careerList?.filter((value) => !!value); // 빈 값 제거
        const res = await put({
          endpoint: `${expertApi.GET_PUT_EXPERT}`,
          isFormData: false,
          body: profile,
        });
        if (res.data.resultCode === 'SUCCESS') {
          window.alert('수정이 완료되었어요.');
          navigate(-1);
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  useEffect(() => {
    if (!auth) return;

    if (auth !== 'ROLE_EXPERT') {
      alert('접근 권한이 없습니다.');
      return navigate(`${HOME_PATH}`);
    }
  }, [decodedToken, auth]);

  const onChangeInput =
    (target: string) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      console.log(target, e.target.value);
      setProfile((prev) => {
        return { ...prev, [target]: e.target.value };
      });
    };

  useEffect(() => {
    setCareerIndex((prev) => prev + 1);
  }, []);

  const onClick = () => {
    if (careerInputs.length >= MAX_CAREER_COUNT) {
      return window.alert('경력은 최대 5개까지 추가할 수 있어요.');
    }
    return setCareerInputs([...careerInputs, '']);
  };

  const onChangeCareerInput = (index: number) => (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const newCareerInputs = [...careerInputs];
    newCareerInputs[index] = value;
    setCareerInputs(() => newCareerInputs);
  };

  useEffect(() => {
    setProfile((prev) => {
      return {
        ...prev,
        careerList: careerInputs,
      };
    });
  }, [careerInputs]);

  useEffect(() => {
    if (profile.username && profile.education) {
      setIsDisabled(() => false);
    } else setIsDisabled(() => true);
  }, [profile]);

  // TODO: 체크해야할 부분 location이 안 넘어 옴
  // TODO: 이름하고 학력 외에 다른 값 모두 required 인 것 같으니 확인 필요
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.selectionStart = profile.username.length;
      inputRef.current.selectionEnd = profile.username.length;
      inputRef.current.focus();
    }
  }, [isMounted, profile.username]);

  return (
    <>
      <CustomHeader title='전문가 프로필 등록' hideIcon />

      <div className='expert-profile-container'>
        <InputTilte isRequire>이름</InputTilte>
        <InputBox
          maxLength={20}
          onChange={onChangeInput('username')}
          inputRef={inputRef}
          width='250px'
          required
          value={isModification ? profile.username : ''}
          placeholder='이름을 입력해주세요.'
        />

        <InputTilte isRequire>학력</InputTilte>
        <InputBox
          maxLength={20}
          onChange={onChangeInput('education')}
          width='250px'
          required
          value={isModification ? profile.education : ''}
          placeholder='최종 학력을 입력해주세요.'
        />

        <InputTilte>경력</InputTilte>
        <div className='career-input-container'>
          {careerInputs.map((careerInput, i) => {
            return (
              <InputBox
                maxLength={20}
                width='250px'
                required
                placeholder='경력을 입력해주세요.'
                key={`${careerIndex} ${i}`}
                value={isModification ? careerInput : ''}
                onChange={onChangeCareerInput(i)}
              />
            );
          })}
        </div>
        <Button onClick={onClick} outline secondStyle>
          추가하기
        </Button>

        <InputTilte>소개</InputTilte>
        <TextArea
          maxLength={200}
          onChange={onChangeInput('introduce')}
          placeholder='자유롭게 소개를 작성해주세요.'
          value={isModification ? profile.introduce : ''}
        ></TextArea>

        <InputTilte>근무지/매장 위치</InputTilte>
        <InputBox
          maxLength={20}
          onChange={onChangeInput('location')}
          width='250px'
          placeholder='근무지 또는 매장 위치를 홍보해보세요.'
          value={isModification ? profile.location : ''}
        />
        <FooterButton disabled={isDisabled} onClick={submitExpertProfile}>
          작성완료
        </FooterButton>
      </div>
    </>
  );
}
