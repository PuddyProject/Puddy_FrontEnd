import Button from 'components/common/Button';
import QnaContainer from 'components/main/QnaContainer';
import { useState } from 'react';
import dragEvent from 'utils/dragEvent';

const COLOR = ['red', 'black', 'green', 'pink', 'skyblue'];
const MAX_INDEX = 4;

export default function Main() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [transX, setTransX] = useState(0);

  const inrange = (v: number, min: number, max: number) => {
    if (v < min) return min;
    if (v > max) return max;
    return v;
  };

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
              setTransX(inrange(deltaX, -308, 308));
            },
            onDragEnd: (deltaX) => {
              if (deltaX < -100) setCurrentIndex(inrange(currentIndex + 1, 0, MAX_INDEX));
              if (deltaX > 100) setCurrentIndex(inrange(currentIndex - 1, 0, MAX_INDEX));
              setTransX(0);
            },
          })}
        >
          {COLOR.map((url, i) => (
            <div key={i} style={{ backgroundColor: url }} className='carousel-item'></div>
          ))}
        </div>
      </div>

      <div className='circle-container'>
        {Array(5)
          .fill(0)
          .map((v, i) => {
            return (
              <div
                className='circle-item'
                style={{
                  backgroundColor: currentIndex === i ? '#A9A9A9' : '#D9D9D9',
                }}
              ></div>
            );
          })}
      </div>

      <div className='button-container'>
        <Button margin='10px' width='160px'>
          Q&A 질문하기
        </Button>
        <Button margin='10px' outline width='160px'>
          내 펫 등록하기
        </Button>
      </div>
      <div>
        <QnaContainer title={'인기 Q&A'} />
        <QnaContainer title={'최근 Q&A'} />
      </div>
    </div>
  );
}
