import { useNavigate, Link } from 'react-router-dom';

import { BiBell as BellIcon } from 'react-icons/bi';
import { GrFormPrevious as PrevIcon } from 'react-icons/gr';

import Logo from 'assets/Logo.svg';

interface CustomHeaderProps {
  title?: string;
  submitText?: string;
  hideIcon?: boolean;
  isLogoHeader?: boolean;
  onClickLeft?: () => void;
  onClickCenter?: () => void;
  onClickRight?: () => void;
}

export default function CustomHeader({
  title,
  submitText,
  hideIcon = false,
  isLogoHeader = false,
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
      <div className={`custom-header-left ${isLogoHeader ? 'logo-img' : ''}`}>
        {isLogoHeader ? (
          <Link to='/'>
            <img className='logo-img' src={Logo} alt='logo' />
          </Link>
        ) : (
          <PrevIcon className='prev' onClick={onClickLeft || onClickPrev} />
        )}
      </div>
      <div className='custom-header-center' onClick={onClickCenter}>
        {title}
      </div>
      {
        <div className='custom-header-right bell' onClick={onClickRight}>
          {submitText ? <button className='submit-btn'>{submitText}</button> : <></>}
          {hideIcon ? <></> : <BellIcon size={25} />}
        </div>
      }
    </header>
  );
}
