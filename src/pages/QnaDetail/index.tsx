import CustomHeader from 'components/common/CustomHeader';
import FooterButton from 'components/common/FooterButton';
import Comment from 'components/qnaDetail/Comment';
import { useEffect, useState, useContext } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';
import { get } from 'utils';
import { AnswerInfo, PostDataInfo } from 'types/commentTypes';
import { initQnaDetail } from 'utils/initialValues/qnaDetail';
import { UserInfo } from 'App';

export default function QnaDetail() {
  const nav = useNavigate();
  const location = useLocation();
  const postId = location.pathname.split('/')[3];
  const [answerList, setAnswerList] = useState<AnswerInfo[]>([]);
  const [postDataInfo, setPostDataInfo] = useState<PostDataInfo>(initQnaDetail);

  const getDetailData = async () => {
    const res = await get({ endpoint: 'questions', params: `/${postId}` });

    setPostDataInfo(res.data.data);
    setAnswerList(res.data.data.answerList);
  };

  const userInfo = useContext(UserInfo);
  console.log(userInfo);

  useEffect(() => {
    getDetailData();
  }, []);

  useEffect(() => {}, [answerList, postDataInfo]);

  const AnsewerList = (answer: AnswerInfo) => {
    let isExport = answer.userRole === 'ROLE_USER' ? false : true;
    let isPostUser = postDataInfo.nickname === userInfo.nickname;
    const isCommentWriteUser = answer.nickname === userInfo.nickname;

    return (
      <Comment
        key={answer.id}
        answerData={answer}
        isExport={isExport}
        isPostUser={isPostUser}
        isSolved={postDataInfo?.isSolved}
        isCommentWriteUser={isCommentWriteUser}
        setPostDataInfo={setPostDataInfo}
        setAnswerList={setAnswerList}
      />
    );
  };

  const IsFirstWriter = () => {
    const isFirstWriter = !answerList.some((answer) => answer.nickname === userInfo.nickname);
    return (
      <FooterButton
        onClick={() => {
          isFirstWriter
            ? nav('write/answer', { state: postId })
            : nav('write/answer', { state: postId });
          //TODO: 첫번째 작성자가 아니면 수정페이지로 이동 하기. 현재는 수정페이지 이동이 없어서 라우팅 주소가 같음
        }}
      >
        {isFirstWriter ? '답글 입력하기' : '답글 수정하기'}
      </FooterButton>
    );
  };

  return (
    <>
      {postDataInfo && (
        <div>
          <CustomHeader
            left={'<'}
            center='Q&A'
            onClickLeft={() => {
              nav(-1);
            }}
            right='bell'
          />
          <div className='qna-detail-container'>
            <section className='title'>
              <div className='title-text'>
                <span className='title-category'>[{postDataInfo.category}]</span>
                {postDataInfo.title}
              </div>

              <div className='post-info'>
                <span className='post-date'>{postDataInfo.createdDate.slice(0, 10)}</span>
                <span className='post-user'>{postDataInfo.nickname}</span>
              </div>
              <hr className='qna-divide-line' />
            </section>

            <section className='body'>
              <div className='body-text'>{postDataInfo.content}</div>

              <div className='img-box'>
                {postDataInfo.imagePath !== '' ? (
                  <>
                    <img className='qna-image' src={postDataInfo.imagePath} />
                  </>
                ) : (
                  <></>
                )}
              </div>

              {/*
                            TODO: 내 펫 정보 등록 시 해당 정보 보여주기
              <div className='tag-container'>
                <span className='tag-item'>알레스카 말라뮤트</span>
                <span className='tag-item'>중성화</span>
                <span className='tag-item'>여아</span>
                <span className='tag-item'>2.5kg</span>
                <span className='tag-item'>알레스카 말라뮤트</span>
              </div> */}
            </section>
            <hr className='qna-divide-line' />
            <section className='comment'>
              <div className='comment-title-conainer'>
                {postDataInfo.isSolved && (
                  <div className='comment-selected-comment'>
                    <span className='comment-title'>
                      <span>채택된 답변 🐾</span>
                    </span>
                    <br />
                    <span className='comment-sub-title'>작성자가 채택한 답변이에요.</span>
                    {answerList
                      .filter((answer) => answer.selected === true)
                      .map((answer) => {
                        return AnsewerList(answer);
                      })}
                  </div>
                )}
                {answerList.filter((answer) => answer.selected === false).length === 0 ? (
                  answerList.filter((answer) => answer.selected === true).length === 0 && (
                    <div className='comment-zero'>답변이 존재하지 않아요</div>
                  )
                ) : (
                  <>
                    <span className='comment-title'>
                      작성된 <span>답변 🐾</span>
                    </span>
                    <br />
                    <span className='comment-sub-title'>
                      원하는 답변이 달렸다면 채택을 해보세요.
                    </span>
                  </>
                )}
              </div>
              {answerList
                .filter((answer) => answer.selected === false)
                .map((answer) => {
                  return AnsewerList(answer);
                })}
            </section>
          </div>
          {postDataInfo.nickname === userInfo.nickname ? '' : IsFirstWriter()}
        </div>
      )}
    </>
  );
}
