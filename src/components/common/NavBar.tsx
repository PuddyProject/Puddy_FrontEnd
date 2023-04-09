import { navItems } from 'constants/navItem';
import { Link, useLocation } from 'react-router-dom';

export default function NavBar() {
  const location = useLocation();
  const isLoggedIn = sessionStorage.getItem('userToken');

  return (
    <nav className='nav-bar'>
      {navItems.map(({ path, title, memberOnly, icon }, i) => {
        const Icon = icon;

        return (
          <div key={i} className='nav-item'>
            <Link key={i} to={memberOnly && !isLoggedIn ? '/auth/login' : path}>
              <div className={location.pathname === path ? 'nav-selected-link' : 'nav-link'}>
                <Icon size={20} />
                {title}
              </div>
            </Link>
          </div>
        );
      })}
    </nav>
  );
}
