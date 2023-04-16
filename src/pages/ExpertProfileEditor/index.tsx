import React, { useState, useEffect, useRef, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button, CustomHeader, FooterButton, InputBox, TextArea } from 'components';
import InputTilte from 'components/common/InputTitle';

import { useUser } from 'context/UserContext';
import { post } from 'utils';

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

  // TODO: 이미 프로필을 등록한 전문가 유저는 프로필 보기 페이지로 라우팅 해야할듯

  const submitExpertProfile = async () => {
    try {
      const res = await post({ endpoint: `${expertApi.POST_EXPERT}`, body: profile });
      if (res.data.resultCode === 'SUCCESS') {
        alert('프로필 등록 완료');
        navigate(`${MY_PAGE_PATH}`);
        // TODO: 전문가 프로필 수정은 ?
      }
    } catch (err) {
      console.error(err);
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

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, [inputRef]);

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
          placeholder='이름을 입력해주세요.'
        />

        <InputTilte isRequire>학력</InputTilte>
        <InputBox
          maxLength={20}
          onChange={onChangeInput('education')}
          width='250px'
          required
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
                value={careerInput}
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
        ></TextArea>

        <InputTilte>근무지/매장 위치</InputTilte>
        <InputBox
          maxLength={20}
          onChange={onChangeInput('location')}
          width='250px'
          placeholder='근무지 또는 매장 위치를 홍보해보세요.'
        />
        <FooterButton disabled={isDisabled} onClick={submitExpertProfile}>
          작성완료
        </FooterButton>
      </div>
    </>
  );
}
