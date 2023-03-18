import Logo from '../../assets/Logo.svg';
import { BiBell } from 'react-icons/bi';
export default function Header() {
  return (
    <div className='header'>
      <img className='logoImg' src={Logo} alt='' />
      <BiBell className='bellIcon' size='30' />
    </div>
  );
}
