import { navString } from '../../constants/navItem';
import { Link, useLocation } from 'react-router-dom';

export default function NavBar() {
  const location = useLocation();

  return (
    <nav className='nav-bar'>
      {navString.map((v, i) => {
        return (
          <>
            <div key={i} className='nav-item'>
              {location.pathname === v[0] ? (
                <Link className='nav-selected-link' to={v[0]}>
                  {v[1]}
                </Link>
              ) : (
                <Link className='nav-link' to={v[0]}>
                  {v[1]}
                </Link>
              )}
            </div>
          </>
        );
      })}
    </nav>
  );
}
