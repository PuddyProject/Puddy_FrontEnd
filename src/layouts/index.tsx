import { Outlet } from 'react-router-dom';
import NavBar from 'components/common/NavBar';
import { CustomHeader } from 'components';

export default function Layout() {
  return (
    <>
      <CustomHeader isLogoHeader />
      <Outlet />
      <NavBar />
    </>
  );
}
