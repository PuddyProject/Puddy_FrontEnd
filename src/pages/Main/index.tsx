import Button from 'components/common/Button';
import ExpertContainer from 'components/main/ExpertContainer';
import QnaContainer from 'components/main/QnaContainer';
import { useState } from 'react';
import dragEvent from 'utils/dragEvent';

const COLOR = ['red', 'black', 'green', 'pink', 'skyblue'];
const MAX_INDEX = 4;

export default function Main() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [transX, setTransX] = useState(0);

  return (
    <div className='main'>
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
        {Array(5)
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
        <Button width='160px'>Q&A 질문하기</Button>
        <Button outline width='160px'>
          내 펫 등록하기
        </Button>
      </div>
      <QnaContainer title={'인기 Q&A'} />
      <QnaContainer title={'최근 Q&A'} />
      <ExpertContainer />
    </div>
  );
}
