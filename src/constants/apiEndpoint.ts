/*
#=========================================#
|               메인 화면                 |
#=========================================#
*/
const HOME_API = 'home';
export const homeApi = Object.freeze({
  GET_HOME: `${HOME_API}`,
});

/* ------------------------------------- */
/*
#=========================================#
|                    펫                   |
#=========================================#
*/
const PET_API = 'users/pets';
export const petsApi = Object.freeze({
  UPDATE_PET: `${PET_API}/update`,
  POST_CREATE_PET: `${PET_API}`,
  GET_PET_DETAIL: `${PET_API}/detail`,
});

/* ------------------------------------- */
/*
#=========================================#
|                   Q&A                   |
#=========================================#
*/
const QUESTIONS_API = 'questions';
export const questionsApi = Object.freeze({
  QUESTIONS: `${QUESTIONS_API}/`,

  /* Q&A 게시글 등록 */
  POST_CREATE_QUESTION: `${QUESTIONS_API}`,

  /* Q&A 게시글 리스트 조회 */
  GET_QUESTION_LIST: `${QUESTIONS_API}`,

  /* Q&A 게시글 개수 조회 */
  GET_QUESTIONS_COUNT: `${QUESTIONS_API}/count`,

  /* Q&A 게시글 get, put, delete */
  requestQuestionsId: (id: string) => {
    return `${QUESTIONS_API}/${id}`;
  },
});

/* ------------------------------------- */
/*
#=========================================#
|                 Q&A 답변                |
#=========================================#
*/
const ANSWER_API = 'answers';
export const answersApi = Object.freeze({
  /* 답변 글 개수 조회 */
  GET_ANSWERS_COUNT: `${ANSWER_API}/count`,

  /* 답변 글 수정, 삭제 (put, delete, patch) */
  requestPutDeletePatchAnswer: (questionId: string, answerId: string) => {
    return `questions/${questionId}/answers/${answerId}`;
  },

  /* 답변 글 작성 */
  requestPostAnswer: (questionId: string) => {
    return `questions/${questionId}/answers`;
  },

  /* 답변 글 목록 조회 */
  requestGetAnswers: (questionId: string) => {
    return `questions/${questionId}/answers`;
  },
});

/* ------------------------------------- */
/*
#=========================================#
|                 전문가                  |
#=========================================#
*/
const EXPERT_API = 'experts';
export const expertApi = Object.freeze({
  GET_PUT_EXPERT: `${EXPERT_API}`,
  POST_EXPERT: `users/${EXPERT_API}`,

  /* 전문가 프로필 조회 시 */
  requestExpertId: (userId: string) => {
    return `experts/${userId}`;
  },

  /* 전문가 목록 조회 */
  requestExpertList: (pageCount: string) => {
    return `experts?page=${pageCount}`;
  },
});

/* ------------------------------------- */
/*
#=========================================#
|              커뮤니티 - 글              |
#=========================================#
*/
const ARTICLE_API = 'articles';
export const articleApi = Object.freeze({
  /* 커뮤니티 글 작성 post */
  GET_POST_ARTICLES: `${ARTICLE_API}`,

  /* 커뮤니티 글 조회, 수정 get, put */
  getArticle: (articleId: string) => {
    return `${ARTICLE_API}/${articleId}`;
  },

  /* 커뮤니티 게시글 좋아요 */
  patchLike: (articleId: string) => {
    return `${ARTICLE_API}/${articleId}/like`;
  },

  /* 커뮤니티 게시글 좋아요 취소 */
  deleteLike: (articleId: string) => {
    return `${ARTICLE_API}/${articleId}/unlike`;
  },
});

/* ------------------------------------- */
/*
#=========================================#
|              커뮤니티 - 댓글            |
#=========================================#
*/
const COMMENT_API = 'articles';
export const articlesApi = Object.freeze({
  /* 커뮤니티 댓글 작성 */
  requestArticleId: (articleId: string) => {
    return `${COMMENT_API}/${articleId}/comments`;
  },
  requestPutDeletePatchArticleId: (articelId: string, commentId: number) => {
    return `${COMMENT_API}/${articelId}/comments/${commentId}`;
  },
});

/* ------------------------------------- */
/*
#=========================================#
|                 회원가입                |
#=========================================#
*/
const JOIN_API = 'users';
export const joinApi = Object.freeze({
  POST_JOIN: `${JOIN_API}/join`,
  POST_DUPLICATE_NICKNAME: `${JOIN_API}/duplicate-nickname`,
  POST_DUPLICATE_EMAIL: `${JOIN_API}/duplicate-email`,
  POST_DUPLICATE_ACCOUNT: `${JOIN_API}/duplicate-account`,

  /* target만 변경되는 경우 아래 함수 사용 */
  requestDuplicate: (target: string) => {
    return `${JOIN_API}/duplicate-${target}`;
  },
});

/* ------------------------------------- */
/*
#=========================================#
|            로그인 / 토큰 재발행         |
#=========================================#
*/
const LOGIN_API = 'users/login';
export const loginApi = Object.freeze({
  POST_LOGIN: `${LOGIN_API}`,
  POST_TOKEN_REISSUE: `${LOGIN_API}/reissue`,
});

/* ------------------------------------- */
/*
#=========================================#
|            소셜 로그인 - 카카오         |
#=========================================#
*/
const SOCIAL_LOGIN_API = 'oauth';
export const socialLoginApi = Object.freeze({
  POST_SOCIAL_LOGIN_KAKAO: `${SOCIAL_LOGIN_API}/kakao`,
});

/* ------------------------------------- */
/*
#=========================================#
|           아이디/비밀번호 찾기           |
#=========================================#
*/
const FIND_ID_PW_API = 'users';
export const findIdPwApi = Object.freeze({
  POST_FIND_PW: `${FIND_ID_PW_API}/find-password`,
  POST_FIND_ID: `${FIND_ID_PW_API}/find-account`,
});

/* ------------------------------------- */
/*
#=========================================#
|                마이페이지               |
#=========================================#
*/
const MY_PAGE_API = 'users';
export const myPageApi = Object.freeze({
  /* 내 프로필 수정 */
  PATCH_MY_PROFILE: `${MY_PAGE_API}/update-profile`,

  /* 유저 권한 변경 */
  PATCH_USER_AUTH: `${MY_PAGE_API}/update-auth`,
  GET_MY_POSTS: `${MY_PAGE_API}/posts`,
  GET_MY_PAGE_INFO: `${MY_PAGE_API}/me`,
  DELETE_LOGOUT: `${MY_PAGE_API}/logout`,
});

/* ------------------------------------- */
/*
#=========================================#
|             전문가 답변 리뷰            |
#=========================================#
*/
const REVIEW_API = 'reviews';
export const reviewApi = Object.freeze({
  /* 리뷰 작성 get, post */
  requestReviewId: (expertId: string) => {
    return `${REVIEW_API}/${expertId}`;
  },
});
