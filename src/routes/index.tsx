import { Route, Routes } from 'react-router-dom';
import Layout from 'layouts';
import LayoutWithoutHeader from 'layouts/LayoutWithoutHeader';
import LayoutWithoutNav from 'layouts/LayoutWithoutNav';

import { Qna, Main, Login, Community, NewPost, MyPage, QnaDetail, AuthExpert, Signup } from 'pages';
import PetProfileEditor from 'pages/PetProfileEditor';

export default function Router() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index path='/' element={<Main />} />
        <Route path='/qna' element={<Qna />} />
        <Route path='/community' element={<Community />} />

        <Route path='/mypage' element={<MyPage />} />

        <Route path='/pets/profiles' element={<PetProfileEditor />} />
      </Route>

      <Route path='/' element={<LayoutWithoutNav />}>
        <Route path='/qna/newpost' element={<NewPost />} />
        <Route path='/qna/detail' element={<QnaDetail />} />
        <Route path='/mypage/experts' element={<AuthExpert />} />
      </Route>

      <Route path='/' element={<LayoutWithoutHeader />}>
        <Route path='/auth/login' element={<Login />} />
        <Route path='/auth/Signup' element={<Signup />} />
      </Route>
    </Routes>
  );
}
