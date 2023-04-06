import Button from 'components/common/Button';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import classnames from 'classnames';
import { patch } from 'utils';
import { useLocation } from 'react-router-dom';
import { AnswerInfo, PostDataInfo } from 'types/commentTypes';
import { Dispatch, SetStateAction } from 'react';

const cn = classnames;
interface CommentProps {
  answerData: AnswerInfo;
  postWriterName?: string;
  isSolved?: boolean;
  isExport?: boolean;
  isWriteUser?: boolean;
  answerList?: AnswerInfo[];
  setPostDataInfo: Dispatch<SetStateAction<PostDataInfo>>;
  setAnswerList: Dispatch<SetStateAction<AnswerInfo[]>>;
}

export default function Comment({
  answerData,
  isSolved,
  postWriterName,
  isExport = false,
  isWriteUser = false,
  setPostDataInfo,
  setAnswerList,
}: CommentProps) {
  const location = useLocation();

  const selectAnswer = async () => {
    const res = await patch({
      endpoint: `questions/${location.pathname.split('/')[3]}/answers/${answerData.id}`,
    });
    if (res.status === 200) {
      alert('답글이 채택 되었습니다.');
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

        <div className='user-roll-container'>
          <span className='user-roll'>{isExport ? '전문가 답변' : '사용자 답변'}</span>
          {isWriteUser && (
            <span className='user-roll'>
              <span>수정하기</span> | <span>삭제하기</span>
            </span>
          )}
        </div>
      </div>
      <div className='comment-card-body'>{answerData.content}</div>
      <div className='comment-button'>
        {!isSolved && (
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
