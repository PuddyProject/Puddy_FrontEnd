import React, { useState, useEffect, useRef } from 'react';
import { Button, FooterButton, InputBox, TextArea } from 'components';
import InputTilte from 'components/common/InputTitle';

interface Profile {
  education: string;
  career?: string[];
  introduce?: string;
  location?: string;
}

const MAX_CAREER_COUNT = 4;

const initProfile = {
  education: '',
  career: [],
  introduce: '',
  location: '',
};

const createInputBox = () => {
  return <InputBox width='250px' required placeholder='경력을 입력해주세요.' />;
};

export default function ExpertProfileEditor() {
  const inputRef = useRef<HTMLInputElement>(null);

  const [profile, setProfile] = useState<Profile>(initProfile);
  const [careerInputs, setCareerInputs] = useState<JSX.Element[]>([]);

  const onClick = (e: React.MouseEvent) => {
    if (careerInputs.length >= MAX_CAREER_COUNT)
      return window.alert('경력은 최대 5개까지 추가할 수 있어요.');
    return setCareerInputs((prev) => [...prev, createInputBox()]);
  };

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, [inputRef]);

  return (
    <div className='expert-profile-container'>
      <InputTilte isRequire>이름</InputTilte>
      <InputBox inputRef={inputRef} width='250px' required placeholder='이름을 입력해주세요.' />

      <InputTilte isRequire>학력</InputTilte>
      <InputBox width='250px' required placeholder='최종 학력을 입력해주세요.' />

      <InputTilte>경력</InputTilte>
      <div className='career-input-container'>
        <InputBox width='250px' placeholder='경력을 입력해주세요.' />
        {careerInputs.map((careerInput, i) => {
          return <React.Fragment key={`${careerInput} ${i}`}>{careerInput}</React.Fragment>;
        })}
      </div>
      <Button onClick={onClick} outline secondStyle>
        추가하기
      </Button>

      <InputTilte>소개</InputTilte>
      <TextArea placeholder='자유롭게 소개를 작성해주세요.'></TextArea>

      <InputTilte>근무지/매장 위치</InputTilte>
      <InputBox width='250px' placeholder='근무지 또는 매장 위치를 홍보해보세요.' />
      <FooterButton>작성완료</FooterButton>
    </div>
  );
}
