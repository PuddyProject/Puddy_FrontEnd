import { Outlet } from 'react-router-dom';
import Header from 'components/common/Header';
import NavBar from 'components/common/NavBar';

export default function Layout() {
  return (
    <>
      <Header />
      <Outlet />
      <NavBar />
    </>
  );
}
