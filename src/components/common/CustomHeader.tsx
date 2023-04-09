import { BiBell as BellIcon } from 'react-icons/bi';
import { GrFormPrevious as PrevIcon } from 'react-icons/gr';

import { useNavigate } from 'react-router-dom';

interface CustomHeaderProps {
  title?: string;
  hideIcon?: boolean;
  onClickLeft?: () => void;
  onClickCenter?: () => void;
  onClickRight?: () => void;
}

export default function CustomHeader({
  title,
  hideIcon = false,
  onClickLeft,
  onClickCenter,
  onClickRight,
}: CustomHeaderProps) {
  const navigate = useNavigate();

  const onClickPrev = () => {
    navigate(-1);
  };

  return (
    <header className='custom-header'>
      <div className='custom-header-left'>
        <PrevIcon className='prev' onClick={onClickLeft || onClickPrev} />
      </div>
      <div className='custom-header-center' onClick={onClickCenter}>
        {title}
      </div>
      <div className='custom-header-right' onClick={onClickRight}>
        {hideIcon ? <></> : <BellIcon size={25} />}
      </div>
    </header>
  );
}
