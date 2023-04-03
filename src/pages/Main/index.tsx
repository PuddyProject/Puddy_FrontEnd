import Button from 'components/common/Button';
import ExpertContainer from 'components/main/ExpertContainer';
import QnaContainer from 'components/main/QnaContainer';
import { useEffect, useState } from 'react';
import { get } from 'utils';
import dragEvent from 'utils/dragEvent';
import { MainQnaCardType } from 'types/qnaCardTypes';
import { useNavigate } from 'react-router-dom';
const COLOR = ['red', 'black', 'green', 'gray', 'skyblue', 'yellow', 'pink'];
const MAX_INDEX = COLOR.length - 1;

interface MainQnaList {
  popularQuestions: MainQnaCardType[];
  recentQuestions: MainQnaCardType[];
}
export default function Main() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [transX, setTransX] = useState(0);
  const [mainQnaList, setMainQnaList] = useState<MainQnaList>();
  const nav = useNavigate();

  const getMainData = async () => {
    const res = await get({ endpoint: 'home' });
    setMainQnaList(res.data.data);
  };

  useEffect(() => {
    getMainData();
  }, []);

  return (
    <>
      {mainQnaList && (
        <div className='main-container'>
          <div className='carousel-div'>
            <div
              className='carousel-container'
              style={{
                transform: `translateX(${-currentIndex * 308 + transX}px)`,
                transition: `transform ${transX ? 0 : 300}ms ease-in-out 0s`,
              }}
              {...dragEvent({
                onDragChange: (deltaX) => {
                  setTransX(deltaX);
                },
                onDragEnd: (deltaX) => {
                  if (deltaX < -100)
                    setCurrentIndex(currentIndex === MAX_INDEX ? MAX_INDEX : currentIndex + 1);
                  if (deltaX > 100) setCurrentIndex(currentIndex === 0 ? 0 : currentIndex - 1);
                  setTransX(0);
                },
              })}
            >
              {COLOR.map((color, i) => (
                <div key={i} style={{ backgroundColor: color }} className='carousel-item'></div>
              ))}
            </div>
          </div>

          <div className='circle-container'>
            {Array(MAX_INDEX + 1)
              .fill(0)
              .map((_, i) => {
                return (
                  <div
                    key={i}
                    className='circle-item'
                    style={{
                      backgroundColor: currentIndex === i ? '#A9A9A9' : '#D9D9D9',
                    }}
                  ></div>
                );
              })}
          </div>

          <div className='button-container'>
            <Button onClick={() => nav('/qna/newpost')} width='160px'>
              Q&A 질문하기
            </Button>
            <Button onClick={() => nav('/profile/pets')} outline width='160px'>
              내 펫 등록하기
            </Button>
          </div>
          <QnaContainer title={'인기 Q&A'} cardDataList={mainQnaList.popularQuestions} />
          <QnaContainer title={'최근 Q&A'} cardDataList={mainQnaList.recentQuestions} />
          <ExpertContainer />
        </div>
      )}
    </>
  );
}
