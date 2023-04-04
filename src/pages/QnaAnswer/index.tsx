import { FooterButton } from 'components';
import CustomHeader from 'components/common/CustomHeader';
import InputTilte from 'components/common/InputTitle';
import { useRef, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { post } from 'utils';

export default function QnaAnswer() {
  const nav = useNavigate();
  const location = useLocation();
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [answer, setAnaswer] = useState('');

  useEffect(() => {
    textAreaRef.current?.focus();
  }, []);

  async function sendData() {
    const res = await post({
      endpoint: `questions/${location.state}/answers/write`,
      body: {
        content: answer,
        postCategory: '1',
      },
    });

    if (res.data.resultCode === 'SUCCESS') {
      alert('답변 작성 완료');
      nav(-1);
    } else {
      alert('답변 작성 실패. 잠시 후 다시 시도해주세요');
    }
  }

  return (
    <>
      <CustomHeader
        left={'<'}
        center='Q&A 답변 작성'
        onClickLeft={() => {
          nav(-1);
        }}
      />
      <div>
        <InputTilte isRequire={true} margin='50px 0px 10px 0px'>
          답변 내용
        </InputTilte>
        <textarea
          className='text-body'
          maxLength={500}
          defaultValue={answer}
          placeholder='답변을 입력해주세요.(최대 500자)'
          ref={textAreaRef}
          onChange={(e) => {
            setAnaswer(e.target.value);
          }}
        />
      </div>
      <FooterButton onClick={sendData}>답변 작성하기</FooterButton>
    </>
  );
}
