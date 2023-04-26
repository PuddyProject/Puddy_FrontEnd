import { ButtonModal } from 'components';
import { articlesApi } from 'constants/apiEndpoint';
import { Dispatch, SetStateAction, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AnswerInfo, PostDataInfo } from 'types/commentTypes';
import { del } from 'utils';

interface CommentDataInfo {
  id: number;
  content: string;
  nickname: string;
  createdDate?: string;
}

interface CommunityCommentProps {
  commentData: CommentDataInfo;
  isMyComment: boolean;
  setAnswerList: Dispatch<SetStateAction<AnswerInfo[]>>;
}

export default function CommunityComment({
  commentData,
  isMyComment,
  setAnswerList,
}: CommunityCommentProps) {
  const [showModal, setShowModal] = useState(false);
  const nav = useNavigate();
  const location = useLocation();
  let createdTime = commentData.createdDate?.split('T')[1].split('.')[0];
  const postId = location.pathname.split('/').pop()!;

  const deleteComment = async () => {
    let res = await del({
      endpoint: articlesApi.requestPutDeletePatchArticleId(postId, commentData.id),
    });

    if (res.status === 200) {
      alert('댓글을 삭제했습니다.');
      setShowModal(false);
      setAnswerList((answerList: AnswerInfo[]) => {
        return answerList.filter((answer) => answer.id !== commentData.id);
      });
    }
  };

  return (
    <>
      {showModal && (
        <ButtonModal
          cancleText={'취소'}
          confirmText={'삭제'}
          text={'댓글을 삭제하시겠습니까?'}
          subText={'한번만 더 생각을....'}
          closeModal={() => {
            setShowModal(false);
          }}
          onCancle={() => {
            setShowModal(false);
          }}
          onConfirm={deleteComment}
        />
      )}
      <div className='commnuity-comment-container'>
        <div className='user-info'>
          <div className={`user-nickname ${isMyComment ? 'post-user' : ''}`}>
            {commentData.nickname}
          </div>
          {isMyComment && (
            <div className='user-role'>
              <span
                onClick={() =>
                  nav('write/comment/edit', { state: { comment: commentData, postId } })
                }
              >
                수정하기 |
              </span>
              <span onClick={() => setShowModal(true)}> 삭제하기</span>
            </div>
          )}
        </div>
        <div className='body'>{commentData.content}</div>

        <div className='date'>
          {commentData.createdDate?.slice(0, 10)} {createdTime}
        </div>
      </div>
    </>
  );
}
