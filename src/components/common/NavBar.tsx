import { navItems } from '../../constants/navItem';
import { Link, useLocation } from 'react-router-dom';

export default function NavBar() {
  const location = useLocation();
  const isLoggedIn = sessionStorage.getItem('userToken');

  return (
    <nav className='nav-bar'>
      {navItems.map(({ path, title, memberOnly }, i) => {
        return (
          <div key={i} className='nav-item'>
            <Link
              key={i}
              className={location.pathname === path ? 'nav-selected-link' : 'nav-link'}
              to={memberOnly && !isLoggedIn ? '/auth/login' : path}
            >
              {title}
            </Link>
          </div>
        );
      })}
    </nav>
  );
}
