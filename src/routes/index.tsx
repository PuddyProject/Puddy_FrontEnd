import { Route, Routes } from 'react-router-dom';
import Layout from 'layouts';
import LayoutWithoutHeader from 'layouts/LayoutWithoutHeader';
import LayoutWithoutNav from 'layouts/LayoutWithoutNav';

import { Qna, Main, Login, Community, NewPost, MyPage } from 'pages';

export default function Router() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route path='/' element={<Main />} />
        <Route path='/qna' element={<Qna />} />
        <Route path='/community' element={<Community />} />
        <Route path='/mypage' element={<MyPage />} />
      </Route>

      <Route path='/' element={<LayoutWithoutNav />}>
        <Route path='/qna/newpost' element={<NewPost />} />
      </Route>

      <Route path='/' element={<LayoutWithoutHeader />}>
        <Route path='/login' element={<Login />} />
      </Route>
    </Routes>
  );
}
