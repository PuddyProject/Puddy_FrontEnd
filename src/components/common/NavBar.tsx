import { navString } from '../../constants/navItem';
import { Link, useLocation } from 'react-router-dom';

export default function NavBar() {
  const location = useLocation();

  return (
    <div className='navBar'>
      {navString.map((v, i) => {
        return (
          <>
            <div key={i} className='navItem'>
              {location.pathname === v[0] ? (
                <Link style={{ textDecorationLine: 'none', color: '#2a60ff' }} to={v[0]}>
                  {v[1]}
                </Link>
              ) : (
                <Link to={v[0]} style={{ textDecorationLine: 'none', color: '#cecece' }}>
                  {v[1]}
                </Link>
              )}
            </div>
          </>
        );
      })}
    </div>
  );
}
