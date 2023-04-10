import { Route, Routes, Navigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Layout from 'layouts';
import LayoutWithoutHeader from 'layouts/LayoutWithoutHeader';
import LayoutWithoutNav from 'layouts/LayoutWithoutNav';

import {
  Main,
  Login,
  NewPost,
  MyPage,
  CardList,
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
          <Route path='qna' element={<CardList />} />
          <Route path='community' element={<CardList />} />
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
      {/* // ********** 기본 레이아웃 *********** */}
      <Route element={<Layout />}>
        <Route index element={<Main />} />
        <Route path='qna' element={<CardList />} />
        <Route path='community' element={<CardList />} />
        <Route path='mypage' element={<MyPage />} />
      </Route>
      {/* // ************************************ */}
      {/* --------------------------------------- */}
      {/* // ********** 상단 Nav 없음 *********** */}
      <Route path='/' element={<LayoutWithoutHeader />}>
        {/* //? Q&A 작성/상세 보기 */}
        <Route path='qna/detail/:id' element={<QnaDetail />} />
        <Route path='qna/detail/:id/write/answer' element={<QnaAnswer />} />
        <Route path='qna/detail/:id/write/answer/edit' element={<QnaAnswer />} />
        <Route path='qna/newpost' element={<NewPost />} />

        {/* //? 프로필 작성 */}
        {/* //TODO 전문가 프로필 작성 페이지는 전문가 회원 유형만 접근할 수 있도록 추가 필요 */}
        <Route path='profile/pets' element={<PetProfileEditor />} />
        <Route path='profile/pets/:id' element={<PetProfileEditor />} />
        <Route path='profile/experts' element={<ExpertProfileEditor />} />

        <Route path='mypage/posts' element={<MyActivityInfo />} />
      </Route>
      {/* // ************************************ */}
      {/* --------------------------------------- */}
      {/* // ********** 하단 Nav 없음 *********** */}
      <Route path='/' element={<LayoutWithoutNav />}>
        {/* //? 마이페이지 메뉴 */}
        <Route path='mypage/experts' element={<AuthExpert />} />

        {/* //? 프로필 보기 */}
        <Route path='mypage/profile' element={<MyProfileEditor />} />
        <Route path='experts/:id' element={<ExpertProfile />} />
        <Route path='mypage/pets' element={<PetProfile />} />
      </Route>

      <Route path='/' element={<LayoutWithoutHeader />}>
        <Route path='qna/detail/:id' element={<QnaDetail />} />
        <Route path='qna/detail/:id/write/answer' element={<QnaAnswer />} />
        <Route path='qna/detail/:id/edit' element={<NewPost />} />

        <Route path='qna/newpost' element={<NewPost />} />
        <Route path='community/newpost' element={<NewPost />} />
        <Route path='community/detail/:id' element={<QnaDetail />} />
      </Route>

      <Route path='*' element={<Navigate to='/' />} />
    </Routes>
  );
}
