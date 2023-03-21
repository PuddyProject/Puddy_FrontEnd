import Header from 'components/common/Header';
import { Outlet } from 'react-router-dom';

export default function LayoutWithoutNav() {
  return (
    <>
      <div className='container'>
        <Header />
        <Outlet />
      </div>
    </>
  );
}
