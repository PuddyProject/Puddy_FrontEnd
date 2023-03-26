import { BiBell } from 'react-icons/bi';

interface CustomHeaderProps {
  left?: string;
  center?: string;
  right?: string;
  onClickLeft?: () => void;
  onClickCenter?: () => void;
  onClickRight?: () => void;
}

export default function CustomHeader({
  left,
  center,
  right,
  onClickLeft,
  onClickCenter,
  onClickRight,
}: CustomHeaderProps) {
  return (
    <header className='custom-header'>
      <div className='custom-header-left' onClick={onClickLeft}>
        {left}
      </div>
      <div className='custom-header-center' onClick={onClickCenter}>
        {center}
      </div>
      <div className='custom-header-right' onClick={onClickRight}>
        {right === 'bell' ? <BiBell className='bell-icon' size='30' /> : right}
      </div>
    </header>
  );
}
