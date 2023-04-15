import { Route, Routes, Navigate, useLocation } from 'react-router-dom';
import { Suspense, useEffect } from 'react';

import Layout from 'layouts';
import LayoutWithoutHeader from 'layouts/LayoutWithoutHeader';
import LayoutWithoutNav from 'layouts/LayoutWithoutNav';

import Loading from 'components/common/Loading';

import {
  COMMUNITY_PATH,
  EXPERTS_PROFILE_PATH,
  EXPERT_PROFILE_PATH,
  HOME_PATH,
  JOIN_PATH,
  KAKAO_AUTH_PATH,
  LOGIN_PATH,
  MY_PAGE_ACCOUNT_PATH,
  MY_PAGE_AUTH_EXPERT_PATH,
  MY_PAGE_PATH,
  MY_PAGE_PET_PATH,
  MY_PAGE_PROFILE_PATH,
  MY_POSTS_PATH,
  PROFILE_PET_PATH,
  QNA_DETAIL_PATH,
  QNA_WRITE_POST_PATH,
  QNA_PATH,
  QNA_SEARCH_PATH,
  getPathWriteAnswer,
  getPathPetProfile,
  COMMUNITY_WRTIE_POST_PATH,
  COMMUNITY_SEARCH_PATH,
  getPathCommunityDetail,
  getPathModificationQna,
  getPathModificationAnswer,
  getPathModificationCommunity,
} from 'constants/routes';

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
              <Route path={QNA_PATH} element={<pages.CardList />} />
              <Route path={COMMUNITY_PATH} element={<pages.Community />} />
            </Route>

            <Route path={HOME_PATH} element={<LayoutWithoutHeader />}>
              <Route path={LOGIN_PATH} element={<pages.Login />} />
              <Route path={JOIN_PATH} element={<pages.Signup />} />
              <Route path={KAKAO_AUTH_PATH} element={<pages.KakaoLogin />} />
            </Route>

            <Route path='*' element={<Navigate to={HOME_PATH} />} />
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
          <Route path={QNA_PATH} element={<pages.CardList />} />
          <Route path={COMMUNITY_PATH} element={<pages.Community />} />
          <Route path={MY_PAGE_PATH} element={<pages.MyPage />} />
        </Route>
        {/*  ************************************ */}
        {/* --------------------------------------- */}
        {/* // ********** 상단 Nav 없음 *********** */}
        <Route path='/' element={<LayoutWithoutHeader />}>
          {/* //? Q&A 작성/상세 보기 */}
          <Route path={QNA_DETAIL_PATH} element={<pages.CardDetail />} />
          <Route path={getPathWriteAnswer()} element={<pages.CommentAnswer />} />
          <Route path={getPathModificationAnswer()} element={<pages.CommentAnswer />} />
          <Route path={QNA_WRITE_POST_PATH} element={<pages.NewPost />} />
          <Route path={getPathModificationQna()} element={<pages.NewPost />} />
          <Route path={QNA_SEARCH_PATH} element={<pages.CardSearch />} />

          {/* //? 커뮤니티 작성/상세 보기 */}

          <Route path={COMMUNITY_WRTIE_POST_PATH} element={<pages.NewPost />} />
          <Route path={getPathCommunityDetail()} element={<pages.CardDetail />} />
          <Route path={getPathModificationCommunity()} element={<pages.NewPost />} />
          <Route path={COMMUNITY_SEARCH_PATH} element={<pages.CardSearch />} />

          {/* //? 프로필 작성 */}
          {/* //TODO 전문가 프로필 작성 페이지는 전문가 회원 유형만 접근할 수 있도록 추가 필요 */}
          <Route path={PROFILE_PET_PATH} element={<pages.PetProfileEditor />} />
          <Route path={getPathPetProfile()} element={<pages.PetProfileEditor />} />
          <Route path={EXPERTS_PROFILE_PATH} element={<pages.ExpertProfileEditor />} />

          <Route path={MY_POSTS_PATH} element={<pages.MyActivityInfo />} />
        </Route>
        {/* *************************************** */}
        {/* --------------------------------------- */}
        {/* // ********** 하단 Nav 없음 *********** */}
        <Route path='/' element={<LayoutWithoutNav />}>
          {/* //? 마이페이지 메뉴 */}
          <Route path={MY_PAGE_AUTH_EXPERT_PATH} element={<pages.AuthExpert />} />
          <Route path={MY_PAGE_ACCOUNT_PATH} element={<pages.Account />} />

          {/* //? 내 프로필 수정 */}
          <Route path={MY_PAGE_PROFILE_PATH} element={<pages.MyProfileEditor />} />

          {/* //? 프로필 보기 */}
          <Route path={EXPERT_PROFILE_PATH} element={<pages.ExpertProfile />} />
          <Route path={MY_PAGE_PET_PATH} element={<pages.PetProfile />} />
        </Route>
        {/* *************************************** */}
        {/* --------------------------------------- */}

        {/* <Route path='*' element={<Navigate to={HOME_PATH} />} /> */}
      </Routes>
    </Suspense>
  );
}
