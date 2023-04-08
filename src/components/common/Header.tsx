import Logo from 'assets/Logo.svg';
import { BiBell } from 'react-icons/bi';

export default function Header() {
  return (
    <header className='header'>
      <img className='logo-img' src={Logo} alt='' />
      <BiBell className='bell-icon' size='25' />
    </header>
  );
}
