import Logo from '../../assets/Logo.svg';
import { BiBell } from 'react-icons/bi';
export default function Header() {
  return (
    <div className='header'>
      <img className='logo-img' src={Logo} alt='' />
      <BiBell className='bell-icon' size='30' />
    </div>
  );
}
