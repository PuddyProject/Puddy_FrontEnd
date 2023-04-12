import { Route, Routes, Navigate, useLocation } from 'react-router-dom';
import { Suspense, useEffect } from 'react';
import Layout from 'layouts';
import LayoutWithoutHeader from 'layouts/LayoutWithoutHeader';
import LayoutWithoutNav from 'layouts/LayoutWithoutNav';
import Loading from 'components/common/Loading';

import * as pages from 'pages';

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
      <>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route element={<Layout />}>
              <Route index element={<pages.Main />} />
              <Route path='qna' element={<pages.CardList />} />
              <Route path='community' element={<pages.Community />} />
            </Route>

            <Route path='/' element={<LayoutWithoutHeader />}>
              <Route path='auth/login' element={<pages.Login />} />
              <Route path='auth/Signup' element={<pages.Signup />} />
              <Route path='oauth/authorize' element={<pages.KakaoLogin />} />
            </Route>

            <Route path='*' element={<Navigate to='/' />} />
          </Routes>
        </Suspense>
      </>
    );
  }

  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        {/* // ********** 기본 레이아웃 *********** */}
        <Route element={<Layout />}>
          <Route index element={<pages.Main />} />
          <Route path='qna' element={<pages.CardList />} />
          <Route path='community' element={<pages.Community />} />
          <Route path='mypage' element={<pages.MyPage />} />
        </Route>
        {/* // ************************************ */}
        {/* --------------------------------------- */}
        {/* // ********** 상단 Nav 없음 *********** */}
        <Route path='/' element={<LayoutWithoutHeader />}>
          {/* //? Q&A 작성/상세 보기 */}
          <Route path='qna/detail/:id' element={<pages.CardDetail />} />
          <Route path='qna/detail/:id/write/answer' element={<pages.QnaAnswer />} />
          <Route path='qna/newpost' element={<pages.NewPost />} />

          {/* //? 프로필 작성 */}
          {/* //TODO 전문가 프로필 작성 페이지는 전문가 회원 유형만 접근할 수 있도록 추가 필요 */}
          <Route path='profile/pets' element={<pages.PetProfileEditor />} />
          <Route path='profile/pets/:id' element={<pages.PetProfileEditor />} />
          <Route path='profile/experts' element={<pages.ExpertProfileEditor />} />

          <Route path='mypage/posts' element={<pages.MyActivityInfo />} />
        </Route>
        {/* // ************************************ */}
        {/* --------------------------------------- */}
        {/* // ********** 하단 Nav 없음 *********** */}
        <Route path='/' element={<LayoutWithoutNav />}>
          {/* //? 마이페이지 메뉴 */}
          <Route path='mypage/experts' element={<pages.AuthExpert />} />
          <Route path='mypage/account' element={<pages.Account />} />

          {/* //? 내 프로필 수정 */}
          <Route path='mypage/profile' element={<pages.MyProfileEditor />} />

          {/* //? 프로필 보기 */}
          <Route path='experts/:id' element={<pages.ExpertProfile />} />
          <Route path='mypage/pets' element={<pages.PetProfile />} />
        </Route>
        {/* // ************************************ */}
        {/* --------------------------------------- */}

        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
    </Suspense>
  );
}
