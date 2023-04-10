import { Button } from 'components';
import { Dispatch, SetStateAction } from 'react';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import classnames from 'classnames';
import { del, patch } from 'utils';
import { useLocation, useNavigate } from 'react-router-dom';
import { AnswerInfo, PostDataInfo } from 'types/commentTypes';

const cn = classnames;
interface CommentProps {
  answerData: AnswerInfo;
  isSolved: boolean;
  isExport: boolean;
  isPostUser: boolean;
  isCommentWriteUser: boolean;
  setPostDataInfo: Dispatch<SetStateAction<PostDataInfo>>;
  setAnswerList: Dispatch<SetStateAction<AnswerInfo[]>>;
}

export default function QnaComment({
  answerData,
  isSolved,
  isPostUser,
  isExport,
  isCommentWriteUser,
  setPostDataInfo,
  setAnswerList,
}: CommentProps) {
  const location = useLocation();
  const nav = useNavigate();

  const postId = location.pathname.split('/')[3];

  const selectAnswer = async () => {
    const res = await patch({
      endpoint: `questions/${postId}/answers/${answerData.id}`,
      isFormData: false,
    });

    if (res.status === 200) {
      alert('답변이 채택 되었습니다.');
      setAnswerList((answerList: AnswerInfo[]) => {
        return answerList.map((answer: AnswerInfo) => {
          if (answer.id === answerData.id) {
            return { ...answer, selected: true };
          }
          return answer;
        });
      });

      setPostDataInfo((prev: PostDataInfo) => ({ ...prev, isSolved: true }));
    } else {
      alert('오류가 생겼습니다. 잠시 후 다시 시도해주세요.');
    }
  };

  const deleteComment = async () => {
    let res = await del({
      endpoint: `questions/${location.pathname.split('/')[3]}/answers/${answerData.id}`,
    });

    if (res.status === 200) {
      alert('답변을 삭제했습니다.');
      setAnswerList((answerList: AnswerInfo[]) => {
        return answerList.filter((answer) => answer.id !== answerData.id);
      });
    }
  };

  return (
    <div className={cn('comment-card', { isExport })}>
      <div className='comment-card-user-info'>
        {isExport ? (
          <div className='user-export'>
            <span>{answerData.nickname}</span> <AiOutlineCheckCircle />
          </div>
        ) : (
          <div className='user'>{answerData.nickname}</div>
        )}

        <div className='comment-user-role-container'>
          <div className='user-role'>{isExport ? '전문가 답변' : '사용자 답변'}</div>
          {isCommentWriteUser && (
            <div className='user-role'>
              <span
                onClick={() => nav('write/answer/edit', { state: { comment: answerData, postId } })}
              >
                수정하기
              </span>{' '}
              | <span onClick={deleteComment}>삭제하기</span>
            </div>
          )}
        </div>
      </div>
      <div className='comment-card-body'>{answerData.content}</div>
      <div className='comment-button'>
        {!isSolved && isPostUser && (
          <Button
            width='110px'
            height='25px'
            fontWeight='600'
            fontSize='12px'
            margin='15px 0px 0px 0px'
            onClick={selectAnswer}
          >
            이 답변 채택하기
          </Button>
        )}
      </div>
    </div>
  );
}
