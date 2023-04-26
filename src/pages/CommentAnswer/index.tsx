import { answersApi, articlesApi } from 'constants/apiEndpoint';
import { useRef, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { FooterButton, InputTitle, CustomHeader } from 'components';

import { post, trimBody } from 'utils';

export default function CommentAnswer() {
  const location = useLocation();
  const nav = useNavigate();
  const { comment } = location.state;

  console.log(location.state);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [answer, setAnaswer] = useState<string>(comment?.content || '');

  const isEditPage = location.pathname.includes('edit');
  const isCommunityPage = location.pathname.includes('community');
  const isReviewPage = location.pathname.includes('reviews');

  const currentMessage = isReviewPage ? '리뷰' : isCommunityPage ? '댓글' : '답변';

  useEffect(() => {
    textAreaRef.current?.focus({});
  }, []);

  const choieApi = () => {
    if (isReviewPage) {
      return `reviews/${location.state}`;
    } else if (isCommunityPage) {
      if (isEditPage) {
        return articlesApi.requestPutDeletePatchArticleId(
          location.state.postId,
          location.state.comment.id
        );
      }
      return articlesApi.requestArticleId(location.state);
    } else {
      if (isEditPage) {
        return answersApi.requestPutDeletePatchAnswer(
          location.state.postId,
          location.state.comment.id
        );
      }
      return answersApi.requestPostAnswer(location.state);
    }
  };

  async function sendData() {
    let postAnswer = trimBody(answer);

    const res = await post({
      endpoint: `${choieApi()}`,
      body: {
        content: postAnswer,
        postCategory: '1',
      },
      isPost: isEditPage ? false : true,
    });

    const editText = isEditPage ? '수정' : '작성';
    if (res.data.resultCode === 'SUCCESS') {
      alert(`${currentMessage} ${editText} 완료`);
      nav(-1);
    } else {
      alert(`${currentMessage} ${editText} 실패. 잠시 후 다시 시도해주세요`);
    }
  }

  const onFocus = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    const target = e.target;
    target.selectionStart = target.value.length;
  };

  return (
    <>
      <CustomHeader
        title={`${isReviewPage ? '리뷰' : isCommunityPage ? '커뮤니티 댓글' : 'Q&A 답변'}  ${
          isEditPage ? '수정' : '작성'
        }`}
        hideIcon
      />
      <div>
        <InputTitle isRequire={true} margin='50px 0px 10px 0px'>
          {currentMessage} 내용
        </InputTitle>
        <textarea
          className='text-body'
          maxLength={100}
          defaultValue={answer}
          placeholder={`${currentMessage} 을 입력해주세요.(최대 100자)`}
          ref={textAreaRef}
          onFocus={onFocus}
          onChange={(e) => {
            setAnaswer(e.target.value);
          }}
        />
      </div>
      <FooterButton onClick={sendData}>
        {isReviewPage ? '리뷰' : isCommunityPage ? '댓글' : '답변'}
        {isEditPage ? ' 수정하기' : ' 작성하기'}
      </FooterButton>
    </>
  );
}
