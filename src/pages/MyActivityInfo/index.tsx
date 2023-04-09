import { CustomHeader } from 'components';
import { useState } from 'react';

const TAB_MENU_TITLES = ['Q&A', '커뮤니티'];

export default function MyActivityInfo() {
  const [currentTab, setCurrentTab] = useState(0);

  const onClickTab = (index: number) => (e: React.MouseEvent) => {
    setCurrentTab(index);
  };

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
      </div>
    </>
  );
}
