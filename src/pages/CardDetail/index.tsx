import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { CustomHeader, FooterButton, QnaComment, CommunityComment } from 'components';

import { initQnaDetail } from 'utils/initialValues/qnaDetail';
import { useUser } from 'context/UserContext';

import { AiOutlineHeart as Heart, AiTwotoneHeart as ClickHeart } from 'react-icons/ai';
import { del, get } from 'utils';
import { AnswerInfo, PostDataInfo } from 'types/commentTypes';

export default function QnaDetail() {
  const nav = useNavigate();
  const location = useLocation();
  const postId = location.pathname.split('/')[3];
  const [answerList, setAnswerList] = useState<AnswerInfo[]>([]);
  const [postDataInfo, setPostDataInfo] = useState<PostDataInfo>(initQnaDetail);
  const { decodedToken } = useUser();
  const isPostUser = postDataInfo.nickname === decodedToken?.nickname;
  const isCommunityPage = location.pathname.includes('/community');

  useEffect(() => {
    get({ endpoint: 'questions', params: `/${postId}` }).then((res) => {
      setPostDataInfo(res.data.data);
      setAnswerList(res.data.data.answerList);
    });
  }, []);

  useEffect(() => {}, [answerList, postDataInfo]);

  const AnsewerList = (answer: AnswerInfo) => {
    let isExport = answer.userRole === 'ROLE_USER' ? false : true;
    const isCommentWriteUser = answer.nickname === decodedToken?.nickname;

    return (
      <QnaComment
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

  const deletePost = async () => {
    await del({ endpoint: 'questions/', params: postId });
    alert('삭제되었습니다.');
    nav(-1);
  };

  const IsFirstWriter = () => {
    const isFirstWriter = !answerList.some((answer) => answer.nickname === decodedToken?.nickname);
    const myComment = answerList.filter((answer) => answer.nickname === decodedToken?.nickname);

    return (
      <FooterButton
        onClick={() => {
          isFirstWriter
            ? nav('write/answer', { state: postId })
            : nav('write/answer/edit', { state: { comment: myComment[0], postId } });
        }}
      >
        {isFirstWriter ? '답변 작성하기' : '답변 수정하기'}
      </FooterButton>
    );
  };

  return (
    <>
      {postDataInfo && (
        <div>
          <CustomHeader title={isCommunityPage ? '커뮤니티' : 'Q&A'} />
          <div className='qna-detail-container'>
            <section className='title'>
              <div className='title-text'>
                <span className='title-category'>
                  [{isCommunityPage ? '커뮤니티' : postDataInfo.category}]
                </span>
                {postDataInfo.title}
              </div>

              <div className='post-info'>
                <span className='post-date'>{postDataInfo.createdDate.slice(0, 10)}</span>
                <span className='post-user'>{postDataInfo.nickname}</span>
              </div>
              <hr className='qna-divide-line' />
            </section>

            <section className='body'>
              <div className='user-role-container'>
                <div className='view-count'>조회수 {postDataInfo.viewCount}</div>
                <div>
                  {isPostUser && (
                    <div className={`${isPostUser ? 'post-user' : ''}`}>
                      <span className={`user-role ${isPostUser ? 'post-user' : ''}`}>
                        <span onClick={() => nav('edit', { state: postDataInfo })}>수정하기</span> |
                        <span onClick={deletePost}> 삭제하기</span>
                      </span>
                    </div>
                  )}
                </div>
              </div>
              <div className='body-text'>{postDataInfo.content}</div>
              <div className='img-box'>
                {postDataInfo.images.length !== 0 ? (
                  <>
                    {postDataInfo.images.map((v, i) => {
                      return <img key={i} className='qna-image' src={v} alt={''} />;
                    })}
                  </>
                ) : (
                  <></>
                )}
              </div>
              {/* <div className='tag-container'>
                <span className='tag-item'>알레스카 말라뮤트</span>
                <span className='tag-item'>중성화</span>
                <span className='tag-item'>여아</span>
                <span className='tag-item'>2.5kg</span>
                <span className='tag-item'>알레스카 말라뮤트</span>
              </div> */}
              {isCommunityPage && (
                <div className='like-container'>
                  {/* TODO: 사용자가 좋아요를 눌렸는지에 따른 상태관리로 아이콘 변경 기능 추가 
                <Heart size='15' /> 
                */}
                  <ClickHeart size='15' style={{ color: '#2A60FF' }} />
                  <span className='like-text'>좋아요</span>
                  <span className='like-count'>312</span>
                </div>
              )}
            </section>
            <hr className='qna-divide-line' />
            {!isCommunityPage && (
              <section className='qna-comment'>
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
            )}
            {isCommunityPage && (
              <section className='community-comment'>
                <CommunityComment />
                <CommunityComment />
                <CommunityComment />
                <CommunityComment />
              </section>
            )}
          </div>
          {isPostUser ? '' : IsFirstWriter()}
        </div>
      )}
    </>
  );
}
