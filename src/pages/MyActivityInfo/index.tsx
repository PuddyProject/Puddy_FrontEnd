import { QnaCard } from 'components';
import { useState } from 'react';

const TAB_MENU_TITLES = ['Q&A', '커뮤니티'];

export default function MyActivityInfo() {
  const [currentTab, setCurrentTab] = useState(0);

  const onClickTab = (index: number) => (e: React.MouseEvent) => {
    setCurrentTab(index);
  };

  return (
    <>
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
        <div className='my-posts'>
          {currentTab === 0 ? (
            <>
              {Array(5)
                .fill(0)
                .map(() => (
                  <QnaCard />
                ))}
            </>
          ) : (
            <div style={{ fontSize: '1.5rem' }}>준비중입니다.</div>
          )}
        </div>
      </div>
    </>
  );
}
