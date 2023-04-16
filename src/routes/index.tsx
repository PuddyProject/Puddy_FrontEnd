import { Route, Routes, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { Suspense, useEffect, useState } from 'react';

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
  getPathWriteAnswer,
  getPathPetProfile,
  COMMUNITY_WRTIE_POST_PATH,
  getPathCommunityDetail,
  getPathModificationQna,
  getPathModificationAnswer,
  MY_PAGE_WITHDRAWAL_PATH,
  NOT_FOUND_PATH,
} from 'constants/routes';

import * as pages from 'pages';
import ButtonModal from 'components/common/ButtonModal';
import { useUser } from 'context/UserContext';

const MEMBER_ONLY_PAGES = ['mypage', 'profile', 'expert', 'detail', 'newpost'];

export default function Router() {
  const isLoggedIn = sessionStorage.getItem('userToken');
  // TODO: 로그인에 따른 페이지 라우트 수정 필요
  const { decodedToken } = useUser();
  console.log(decodedToken);

  const location = useLocation();

  useEffect(() => {
    if (!isLoggedIn) {
      const memberOnly = MEMBER_ONLY_PAGES.filter((page) => location.pathname.includes(page));

      if (memberOnly.length) {
        setShowModal(true);
      }
    }
  }, [isLoggedIn, location]);

  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  if (!isLoggedIn) {
    return (
      <>
        {showModal && (
          <ButtonModal
            closeModal={() => setShowModal(false)}
            text='회원 전용 서비스 🐶'
            subText='지금 퍼디 회원가입 후 이용해보세요!'
            cancleText='로그인'
            confirmText='회원가입'
            onConfirm={() => {
              setShowModal(false);
              navigate(`${JOIN_PATH}`);
            }}
            onCancle={() => {
              navigate(`${LOGIN_PATH}`);
              setShowModal(false);
            }}
          />
        )}
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
          <Route path={getPathWriteAnswer()} element={<pages.QnaAnswer />} />
          <Route path={getPathModificationAnswer()} element={<pages.QnaAnswer />} />
          <Route path={QNA_WRITE_POST_PATH} element={<pages.NewPost />} />
          <Route path={getPathModificationQna()} element={<pages.NewPost />} />

          <Route path={COMMUNITY_WRTIE_POST_PATH} element={<pages.NewPost />} />
          <Route path={getPathCommunityDetail()} element={<pages.CardDetail />} />

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
          {/* //? 404 페이지 */}
          <Route path={NOT_FOUND_PATH} element={<pages.NotFound />} />

          {/* //? 마이페이지 메뉴 */}
          <Route path={MY_PAGE_AUTH_EXPERT_PATH} element={<pages.AuthExpert />} />
          <Route path={MY_PAGE_ACCOUNT_PATH} element={<pages.Account />} />
          <Route path={MY_PAGE_WITHDRAWAL_PATH} element={<pages.Withdrawal />} />

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
