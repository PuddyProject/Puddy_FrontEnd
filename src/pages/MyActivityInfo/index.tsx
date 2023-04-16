import { ReactNode, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { CustomHeader, QnaCard } from 'components';

import { myPageApi } from 'constants/apiEndpoint';
import { FILTER_ITEM } from 'constants/cardList';

import { AnswerInfo } from 'types/commentTypes';
import { QnaData } from 'types/qnaCardTypes';

import { get } from 'utils';

enum TabNumber {
  Question,
  Answer,
  COMMUNITY,
}

const TAB_MENU_TITLES = ['Q&A 질문', 'Q&A답변', '커뮤니티'];

export default function MyActivityInfo() {
  const [currentTab, setCurrentTab] = useState(0);
  const [currentFilter, setCurrentFilter] = useState('최신순');

  const [myQnaList, setMyQnaList] = useState<QnaData[]>([]);
  const [myAnswerList, setMyAnswerList] = useState<AnswerInfo[]>([]);

  const onClickTab = (index: number) => (e: React.MouseEvent) => {
    setCurrentTab(index);
  };

  useEffect(() => {
    const getMyPost = async () => {
      try {
        const res = await get({ endpoint: `${myPageApi.GET_MY_POSTS}` });
        if (res.status === 200) {
          const { data } = res.data;
          const { questionList, answerList } = data;
          setMyQnaList(questionList);
          setMyAnswerList(answerList);
        }
      } catch (err) {
        console.error(err);
      }
    };

    getMyPost();
  }, []);

  console.log(currentTab);
  console.log(myQnaList, myAnswerList);

  return (
    <>
      <CustomHeader title='내 게시글/댓글' />

      <div>
        <ul className='tab-titles'>
          {TAB_MENU_TITLES.map((title, i) => (
            <li
              className={currentTab === i ? 'active' : ''}
              onClick={onClickTab(i)}
              key={`${title} ${i}`}
              role='button'
            >
              {title}
            </li>
          ))}
        </ul>

        <div className='filter-container'>
          {FILTER_ITEM.map((filter) => {
            return (
              <button
                className={`filter-item ${filter === currentFilter ? 'select-filter' : ''}`}
                onClick={() => {
                  setCurrentFilter(filter);
                }}
              >
                {filter}
              </button>
            );
          })}
        </div>

        <div>
          {/* // TODO 작성한 게시글 없을 때 추가하기  */}
          {/* // TODO 하드코딩 상수 수정  */}
          {TabNumber.Question === currentTab && QnaList(myQnaList)}
          {TabNumber.Answer === currentTab && AnswerList(myAnswerList)}
          {/* // TODO 커뮤니티 API가 없음 */}
        </div>
      </div>
    </>
  );
}

function QnaList(myQnaList: QnaData[]): ReactNode {
  return (
    <div>
      {myQnaList?.map((qna) => {
        return (
          <Link to={`/qna/detail/${qna.questionId}`}>
            <QnaCard qnaData={qna} />
          </Link>
        );
      })}
    </div>
  );
}

function AnswerList(answerList: AnswerInfo[]): ReactNode {
  return (
    <div>
      {answerList?.map((answer) => {
        return (
          <div className='comment-card'>
            <div className='comment-card-user-info'>
              <div className='user-export'>
                <span>{answer.id}번째 Q&A 답변 </span>
              </div>
            </div>
            <div className='comment-user-role-container'></div>
            <div className='comment-card-body'>{answer.content}</div>
          </div>
        );
      })}
    </div>
  );
}
