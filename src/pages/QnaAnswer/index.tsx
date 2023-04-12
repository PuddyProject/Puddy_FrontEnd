import { answersApi } from 'constants/apiEndpoint';
import { useRef, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { FooterButton, InputTitle, CustomHeader } from 'components';

import { post } from 'utils';

export default function QnaAnswer() {
  const location = useLocation();
  const nav = useNavigate();
  const { comment } = location.state;

  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [answer, setAnaswer] = useState<string>(comment?.content || '');

  const isEditPage = location.pathname.includes('edit');

  useEffect(() => {
    textAreaRef.current?.focus({});
  }, []);

  console.log(location.state);

  async function sendData() {
    const res = await post({
      endpoint: `${
        isEditPage
          ? answersApi.requestPutDeletePatchAnswer(location.state.postId, location.state.comment.id)
          : answersApi.requestPostAnswer(location.state)
      }`,
      body: {
        content: answer,
        postCategory: '1',
      },
      isPost: isEditPage ? false : true,
    });

    if (res.data.resultCode === 'SUCCESS') {
      alert(`답변 ${isEditPage ? '수정' : '작성'} 완료`);
      nav(-1);
    } else {
      alert(`답변 ${isEditPage ? '수정' : '작성'} 실패. 잠시 후 다시 시도해주세요`);
    }
  }

  const onFocus = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    const target = e.target;
    target.selectionStart = target.value.length;
  };

  return (
    <>
      <CustomHeader title='Q&A 답변 작성' hideIcon />
      <div>
        <InputTitle isRequire={true} margin='50px 0px 10px 0px'>
          답변 내용
        </InputTitle>
        <textarea
          className='text-body'
          maxLength={100}
          defaultValue={answer}
          placeholder='답변을 입력해주세요.(최대 100자)'
          ref={textAreaRef}
          onFocus={onFocus}
          onChange={(e) => {
            setAnaswer(e.target.value);
          }}
        />
      </div>
      <FooterButton onClick={sendData}>
        {isEditPage ? '답변 수정하기' : '답변 작성하기'}
      </FooterButton>
    </>
  );
}
