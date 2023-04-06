import { Route, Routes, Navigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Layout from 'layouts';
import LayoutWithoutHeader from 'layouts/LayoutWithoutHeader';
import LayoutWithoutNav from 'layouts/LayoutWithoutNav';

import {
  Main,
  Login,
  Community,
  NewPost,
  MyPage,
  Qna,
  QnaDetail,
  QnaAnswer,
  AuthExpert,
  Signup,
  PetProfile,
  PetProfileEditor,
  ExpertProfile,
  ExpertProfileEditor,
  MyActivityInfo,
  MyProfileEditor,
} from 'pages';

const MEMBER_ONLY_PAGES = ['mypage', 'profile', 'expert', 'detail', 'newpost'];

export default function Router() {
  const isLoggedIn = sessionStorage.getItem('userToken');
  // TODO: 로그인에 따른 페이지 라우트 수정 필요
  const location = useLocation();

  useEffect(() => {
    if (!isLoggedIn) {
      const memberOnly = MEMBER_ONLY_PAGES.filter((page) => location.pathname.includes(page));

      if (memberOnly.length) {
        window.alert('회원전용 페이지입니다.');
      }
    }
  }, [location]);

  if (!isLoggedIn) {
    return (
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Main />} />
          <Route path='qna' element={<Qna />} />
          <Route path='community' element={<Community />} />
        </Route>

        <Route path='/' element={<LayoutWithoutHeader />}>
          <Route path='auth/login' element={<Login />} />
          <Route path='auth/Signup' element={<Signup />} />
        </Route>

        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Main />} />
        <Route path='qna' element={<Qna />} />
        <Route path='community' element={<Community />} />
        <Route path='mypage' element={<MyPage />} />
      </Route>

      <Route path='/' element={<LayoutWithoutNav />}>
        {/* 마이페이지 메뉴 */}
        <Route path='mypage/experts' element={<AuthExpert />} />
        <Route path='mypage/posts' element={<MyActivityInfo />} />

        {/* 프로필 작성 */}
        {/* //TODO 전문가 프로필 작성 페이지는 전문가 회원 유형만 접근할 수 있도록 추가 필요 */}
        <Route path='profile/pets' element={<PetProfileEditor />} />
        <Route path='profile/pets/:id' element={<PetProfileEditor />} />
        <Route path='profile/experts' element={<ExpertProfileEditor />} />

        {/* 프로필 보기 */}
        <Route path='mypage/profile' element={<MyProfileEditor />} />
        <Route path='experts/:id' element={<ExpertProfile />} />
        <Route path='mypage/pets' element={<PetProfile />} />
      </Route>

      <Route path='/' element={<LayoutWithoutHeader />}>
        <Route path='qna/detail' element={<QnaDetail />} />
        <Route path='qna/detail/write/answer' element={<QnaAnswer />} />
        <Route path='qna/newpost' element={<NewPost />} />
      </Route>

      <Route path='*' element={<Navigate to='/' />} />
    </Routes>
  );
}
