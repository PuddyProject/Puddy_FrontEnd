/* eslint-disable indent */
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { CustomHeader, FooterButton, QnaComment, CommunityComment } from 'components';

import { initQnaDetail } from 'utils/initialValues/qnaDetail';
import { useUser } from 'context/UserContext';
import ButtonModal from 'components/common/ButtonModal';

import { AiOutlineHeart as Heart, AiTwotoneHeart as ClickHeart } from 'react-icons/ai';
import { del, get, patch } from 'utils';
import { AnswerInfo, PostDataInfo } from 'types/commentTypes';
import { PET_INFO } from 'constants/cardDetail';
import { articleApi, questionsApi } from 'constants/apiEndpoint';
import { currentPage } from 'utils/currentPage';
import { ANSWER_LIST } from 'constants/cardDetail';
import useLoading from 'hooks/useLoading';
import { Loading } from 'components';

export default function CardDetail() {
  const nav = useNavigate();
  const location = useLocation();
  const postId = location.pathname.split('/')[3];
  const [answerList, setAnswerList] = useState<AnswerInfo[]>([]);
  const [postDataInfo, setPostDataInfo] = useState<PostDataInfo>(initQnaDetail);
  const [showModal, setShowModal] = useState(false);
  const [isLiked, setIsLiked] = useState(postDataInfo.isLike);
  const [isButtonShow, setIsButtonShow] = useState(false);
  const { decodedToken } = useUser();
  const isPostUser = postDataInfo.nickname === decodedToken?.nickname;
  const isCommunityPage = location.pathname.includes('/community');
  const { isLoading, hideLoading, showLoading } = useLoading();

  const CURRENT_PAGE = currentPage(location);

  useEffect(() => {
    showLoading();
    get({
      endpoint: isCommunityPage
        ? articleApi.getArticle(postId)
        : questionsApi.requestQuestionsId(postId),
    })
      .then((res) => {
        setPostDataInfo(res.data.data);
        setAnswerList(res.data.data[ANSWER_LIST[CURRENT_PAGE]]);
        setIsLiked(res.data.data.isLike);
        setIsButtonShow(() => true);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        hideLoading();
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
        isSolved={postDataInfo?.isSolved!}
        isCommentWriteUser={isCommentWriteUser}
        setPostDataInfo={setPostDataInfo}
        setAnswerList={setAnswerList}
      />
    );
  };

  if (isLoading) {
    return <Loading />;
  }

  const deletePost = async () => {
    try {
      await del({
        endpoint: `${
          isCommunityPage ? articleApi.getArticle(postId) : questionsApi.requestQuestionsId(postId)
        }`,
      });
      alert('삭제되었습니다.');
      nav(-1);
    } catch (err) {
      console.log(err);
    }
  };

  const IsFirstWriter = () => {
    const isFirstAnswer = !answerList.some((answer) => answer.nickname === decodedToken?.nickname);
    const myComment = answerList.filter((answer) => answer.nickname === decodedToken?.nickname)[0];

    return (
      !myComment?.selected && (
        <FooterButton
          onClick={() => {
            isFirstAnswer
              ? nav('write/answer', { state: postId })
              : nav('write/answer/edit', { state: { comment: myComment, postId } });
          }}
        >
          {isFirstAnswer ? '답변 작성하기' : '답변 수정하기'}
        </FooterButton>
      )
    );
  };

  const choiceTagInfo = (tagInfo: string[]) => {
    const [key, value] = tagInfo;

    if (value === '') return;
    switch (key) {
      case 'age':
        return value + ' 살';
      case 'gender':
        return value ? '수컷' : '암컷';
      case 'neutered':
        return value ? '중성화 O' : '중성화 X';
      case 'weight':
        return value + 'KG';
      default:
        return value;
    }
  };

  return (
    <>
      {postDataInfo && (
        <div>
          {showModal && (
            <ButtonModal
              cancleText={'취소'}
              confirmText={'삭제'}
              text={'게시글을 삭제하시겠습니까?'}
              subText={'한번만 더 생각을....'}
              closeModal={() => {
                setShowModal(false);
              }}
              onCancle={() => {
                setShowModal(false);
              }}
              onConfirm={deletePost}
            />
          )}

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
                        <span onClick={() => setShowModal(true)}> 삭제하기</span>
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

              <div className='tag-container'>
                {isCommunityPage
                  ? postDataInfo.tagList?.map((v) => {
                      return <span className='tag-item'>{v.tag.tagName}</span>;
                    })
                  : postDataInfo.pet !== null &&
                    Object.entries(postDataInfo.pet!).map((tagInfo, i) => {
                      return (
                        PET_INFO.includes(tagInfo[0]) && (
                          <span className='tag-item' key={i}>
                            {choiceTagInfo(tagInfo)}
                          </span>
                        )
                      );
                    })}
              </div>

              {isCommunityPage && (
                <div className='like-container'>
                  {isLiked ? (
                    <ClickHeart
                      onClick={() => {
                        setIsLiked(false);
                        del({ endpoint: articleApi.deleteLike(postId) });
                        setPostDataInfo((prev) => ({ ...prev, likeCount: prev.likeCount! - 1 }));
                      }}
                      size='15'
                      style={{ color: '#2A60FF' }}
                    />
                  ) : (
                    <Heart
                      size='15'
                      onClick={() => {
                        setIsLiked(true);
                        setPostDataInfo((prev) => ({ ...prev, likeCount: prev.likeCount! + 1 }));
                        patch({ endpoint: articleApi.patchLike(postId), isFormData: true });
                      }}
                    />
                  )}

                  <span className='like-text'>좋아요</span>
                  <span className='like-count'>{postDataInfo.likeCount}</span>
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
                {answerList.length === 0 ? (
                  <div className='comment-zero-community'>댓글이 존재하지 않아요.</div>
                ) : (
                  answerList.map((comment, i) => {
                    const isMyComment = comment.nickname === decodedToken?.nickname;

                    return (
                      <CommunityComment
                        key={i}
                        setAnswerList={setAnswerList}
                        commentData={comment}
                        isMyComment={isMyComment}
                      />
                    );
                  })
                )}
              </section>
            )}
          </div>
          {isButtonShow && !isPostUser && !isCommunityPage && IsFirstWriter()}

          {isButtonShow && isCommunityPage && (
            <FooterButton
              onClick={() => {
                nav('write/comment', { state: postId });
              }}
            >
              댓글 작성하기
            </FooterButton>
          )}
        </div>
      )}
    </>
  );
}
