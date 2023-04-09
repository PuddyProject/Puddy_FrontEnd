import { Link } from 'react-router-dom';
import { BiBell as BellIcon } from 'react-icons/bi';

import Logo from 'assets/Logo.svg';

export default function Header() {
  return (
    <header className='header'>
      <Link to='/'>
        <img className='logo-img' src={Logo} alt='logo' />
      </Link>
      <BellIcon className='bell-icon' size='25' />
    </header>
  );
}
