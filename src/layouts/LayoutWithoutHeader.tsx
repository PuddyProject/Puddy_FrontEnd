import { Outlet } from 'react-router-dom';

export default function LayoutWithoutHeader() {
  return (
    <>
      <div className='container'>
        <Outlet />
      </div>
    </>
  );
}
