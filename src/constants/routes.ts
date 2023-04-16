/* 메인 페이지 */
export const HOME_PATH = '/';

/* =========================================================== */

/* Q&A 페이지 */
export const QNA_PATH = '/qna';

/* Q&A 게시글 상세보기 */
export const QNA_DETAIL_PATH = '/qna/detail/:id';

/* Q&A 게시글 답변 작성 */
export const getPathWriteAnswer = (id: string = ':id') => {
  return `/qna/detail/${id}/write/answer`;
};

/* Q&A 게시글 답변 수정 */
export const getPathModificationAnswer = (id: string = ':id') => {
  return `/qna/detail/${id}/write/answer/edit`;
};

/* Q&A 새 게시글 발행  */
export const QNA_WRITE_POST_PATH = '/qna/newpost';

/* Q&A 게시글 수정 */
export const getPathModificationQna = (id: string = ':id') => {
  return `/qna/detail/${id}/edit`;
};

export const QNA_SEARCH_PATH = 'qna/search';

/* =========================================================== */

/* 커뮤니티 페이지 */
export const COMMUNITY_PATH = '/community';

export const COMMUNITY_WRTIE_POST_PATH = '/community/newpost';

export const getPathCommunityDetail = (id: string = ':id') => {
  return `/community/detail/${id}`;
};

export const getPathModificationCommunity = (id: string = ':id') => {
  return `/community/detail/${id}/edit`;
};

export const COMMUNITY_SEARCH_PATH = 'community/search';
/* =========================================================== */

/* 로그인 페이지 */
export const LOGIN_PATH = '/auth/login';

/* 소셜 로그인 - 카카오 */
export const KAKAO_AUTH_PATH = '/oauth/authorize';

/* 회원가입 페이지 */
export const JOIN_PATH = '/auth/Signup';

/* =========================================================== */

/* 마이페이지 */
export const MY_PAGE_PATH = '/mypage';

/* 마이페이지 내가 쓴 게시글/댓글 */
export const MY_POSTS_PATH = 'mypage/posts';

/* 마이페이지 내 프로필 수정 */
export const MY_PAGE_PROFILE_PATH = '/mypage/profile';

/* 마이페이지 내 펫 프로필 보기 */
export const MY_PAGE_PET_PATH = '/mypage/pets';

/* 마이페이지 펫 프로필 등록하기 에디터*/
export const PROFILE_PET_PATH = '/profile/pets';

/* 마이페이지 펫 프로필 수정하기 에디터*/
export const getPathPetProfile = (userId: string = ':id') => {
  return `/profile/pets/${userId}`;
};

/* 마이페이지 전문가 등록 (서류제출) */
export const MY_PAGE_AUTH_EXPERT_PATH = '/mypage/experts';

/* 마이페이지 전문가 프로필 작성 */
export const EXPERTS_PROFILE_PATH = '/profile/experts';

/* 마이페이지 설정 - 계정 */
export const MY_PAGE_ACCOUNT_PATH = '/mypage/account';

/* 마이페이지 설정 - 회원탈퇴 */
export const MY_PAGE_WITHDRAWAL_PATH = '/mypage/withdrawal';

/* =========================================================== */

/* 펫 정보 보기 */
export const PET_PROFILE_PATH = '/users/pets/detail';

/* =========================================================== */

/* 전문가 프로필 보기 */
export const EXPERT_PATH = '/experts';
export const EXPERT_PROFILE_PATH = '/experts/:id';

/* =========================================================== */

/* 404 페이지 */
export const NOT_FOUND_PATH = '/not-found';
