import { Outlet } from 'react-router-dom';
import '../styles/layout.scss';
import Header from '../components/common/Header';
import NavBar from '../components/common/NavBar';
export default function Layout() {
  return (
    <>
      <div className='container'>
        <Header />
        <Outlet />
        <NavBar />
      </div>
    </>
  );
}
