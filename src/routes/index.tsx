import { Route, Routes } from 'react-router-dom';
import Layout from '../layouts/Layout';
import LayoutWithoutHeader from '../layouts/LayoutWithoutHeader';
import { Qna, Main, Login, Community } from '../pages';
export default function Router() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route path='/' element={<Main />} />
        <Route path='/qna' element={<Qna />} />
        <Route path='/community' element={<Community />} />
      </Route>

      <Route path='/' element={<LayoutWithoutHeader />}>
        <Route path='/login' element={<Login />} />
      </Route>
    </Routes>
  );
}
