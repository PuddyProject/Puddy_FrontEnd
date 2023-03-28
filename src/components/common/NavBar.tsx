import { navString } from '../../constants/navItem';
import { Link, useLocation } from 'react-router-dom';

export default function NavBar() {
  const location = useLocation();

  return (
    <nav className='nav-bar'>
      {navString.map((nav, i) => {
        return (
          <div key={i} className='nav-item'>
            <Link
              key={i}
              className={location.pathname === nav[0] ? 'nav-selected-link' : 'nav-link'}
              to={nav[0]}
            >
              {nav[1]}
            </Link>
          </div>
        );
      })}
    </nav>
  );
}
