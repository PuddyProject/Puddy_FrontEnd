import { Route, Routes, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { Suspense, useEffect, useState } from 'react';

import Layout from 'layouts';
import LayoutWithoutHeader from 'layouts/LayoutWithoutHeader';
import LayoutWithoutNav from 'layouts/LayoutWithoutNav';

import Loading from 'components/common/Loading';
import ButtonModal from 'components/common/ButtonModal';

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
  MY_PAGE_WITHDRAWAL_PATH,
  NOT_FOUND_PATH,
  getPathModificationCommunity,
  EXPERT_PATH,
} from 'constants/routes';

import * as pages from 'pages';

import { TOKEN_KEY, useUser } from 'context/UserContext';

const MEMBER_ONLY_PAGES = ['mypage', 'profile', 'expert', 'detail', 'newpost'];

const role = {
  EXPERT: 'ROLE_EXPERT',
  USER: 'ROLE_USER',
};

function isValidLoggedInUser(user: string) {
  if (user === role.EXPERT || user === role.USER) return true;
  return false;
}

export default function Router() {
  const { decodedToken } = useUser();

  const sessionToken = sessionStorage.getItem('userToken');
  const [isMounted, setIsMounted] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(isValidLoggedInUser(decodedToken?.auth || ''));
  const [userRole, setUserRole] = useState(decodedToken?.auth || '');

  const location = useLocation();
  useEffect(() => {
    const watchedStorageToken = (e: StorageEvent) => {
      if (e.key !== TOKEN_KEY) return;

      const userToken = e.newValue;
      if (!userToken) {
        setIsLoggedIn(false);
      }
    };

    window.addEventListener('storage', watchedStorageToken);

    return () => {
      window.removeEventListener('storage', watchedStorageToken);
    };
  }, []);

  useEffect(() => {
    setIsMounted(true);
    if (!isMounted || !decodedToken) return;

    setIsLoggedIn(() => isValidLoggedInUser(decodedToken.auth));
    setUserRole(() => decodedToken.auth);
  }, [isMounted, decodedToken]);

  console.log({ decodedToken });

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

  if (!isLoggedIn && !sessionToken) {
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

  // * -------------- 로그인 회원 전용 -------------- * //
  // TODO 모달 사용 부분은 임시로 넣은 부분입니당!
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        {/* // ********** 기본 레이아웃 *********** */}
        <Route element={<Layout />}>
          <Route index element={<pages.Main />} />
          <Route path={QNA_PATH} element={<pages.CardList />} />
          <Route path={COMMUNITY_PATH} element={<pages.Community />} />
          <Route path={MY_PAGE_PATH} element={<pages.MyPage />} />
          <Route path={EXPERT_PATH} element={<pages.ExpertList />} />
        </Route>

        {/* // ********** 상단 Nav 없음 *********** */}
        <Route path='/' element={<LayoutWithoutHeader />}>
          {/* Q&A 작성/상세 보기 */}
          <Route path={QNA_DETAIL_PATH} element={<pages.CardDetail />} />
          <Route path={getPathWriteAnswer()} element={<pages.CommentAnswer />} />
          <Route path={getPathModificationAnswer()} element={<pages.CommentAnswer />} />
          <Route path={QNA_WRITE_POST_PATH} element={<pages.NewPost />} />
          <Route path={getPathModificationQna()} element={<pages.NewPost />} />
          <Route path={QNA_SEARCH_PATH} element={<pages.CardSearch />} />

          {/* 커뮤니티 작성/상세 보기 */}
          <Route path={COMMUNITY_WRTIE_POST_PATH} element={<pages.NewPost />} />
          <Route path={getPathCommunityDetail()} element={<pages.CardDetail />} />
          <Route path={getPathModificationCommunity()} element={<pages.NewPost />} />
          <Route path={COMMUNITY_SEARCH_PATH} element={<pages.CardSearch />} />

          {/* 프로필 작성 */}
          <Route path={PROFILE_PET_PATH} element={<pages.PetProfileEditor />} />
          <Route path={getPathPetProfile()} element={<pages.PetProfileEditor />} />

          {/* 전문가 프로필 작성 페이지는 전문가 유저만 진입 가능*/}
          <Route
            path={EXPERTS_PROFILE_PATH}
            element={
              userRole === 'ROLE_EXPERT' ? (
                <pages.ExpertProfileEditor />
              ) : (
                <ButtonModal
                  cancleText='메인으로'
                  confirmText='이전 페이지'
                  closeModal={() => navigate(`${HOME_PATH}`)}
                  onCancle={() => navigate(`${HOME_PATH}`)}
                  onConfirm={() => navigate(-1)}
                  children={
                    <>
                      <h2 className='modal-title'>잘못된 접근</h2>
                      <p className='modal-content'>전문가 회원 전용 페이지입니다.</p>
                    </>
                  }
                />
              )
            }
          />
          <Route path={MY_PAGE_AUTH_EXPERT_PATH} element={<pages.AuthExpert />} />

          <Route path={MY_POSTS_PATH} element={<pages.MyActivityInfo />} />
        </Route>

        {/* // ********** 하단 Nav 없음 *********** */}
        <Route path='/' element={<LayoutWithoutNav />}>
          {/* 404 페이지 */}
          <Route path={NOT_FOUND_PATH} element={<pages.NotFound />} />

          {/* 마이페이지 메뉴 */}

          <Route
            path={MY_PAGE_AUTH_EXPERT_PATH}
            element={
              userRole === 'ROLE_USER' ? (
                <pages.AuthExpert />
              ) : (
                <ButtonModal
                  cancleText='메인으로'
                  confirmText='이전 페이지'
                  closeModal={() => navigate(`${HOME_PATH}`)}
                  onCancle={() => navigate(`${HOME_PATH}`)}
                  onConfirm={() => navigate(-1)}
                  children={
                    <>
                      <h2 className='modal-title'>전문가 인증 완료</h2>
                      <p className='modal-content'>이미 등록된 회원이에요.</p>
                    </>
                  }
                />
              )
            }
          />

          <Route path={MY_PAGE_ACCOUNT_PATH} element={<pages.Account />} />
          <Route path={MY_PAGE_WITHDRAWAL_PATH} element={<pages.Withdrawal />} />

          {/* 내 프로필 수정 */}
          <Route path={MY_PAGE_PROFILE_PATH} element={<pages.MyProfileEditor />} />

          {/* 프로필 보기 */}
          <Route path={EXPERT_PROFILE_PATH} element={<pages.ExpertProfile />} />
          <Route path={MY_PAGE_PET_PATH} element={<pages.PetProfile />} />
        </Route>

        {/* <Route path='*' element={<Navigate to={HOME_PATH} />} /> */}
      </Routes>
    </Suspense>
  );
}
