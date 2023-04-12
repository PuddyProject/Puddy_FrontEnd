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
  POST_CREATE_QUESTION: `${QUESTIONS_API}/write`,
  GET_QUESTION_LIST: `${QUESTIONS_API}`,
  GET_QUESTIONS_COUNT: `${QUESTIONS_API}/count`,

  /* 게시글 단건 get, put, delete 요청 시 아래 함수 사용 */
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
  GET_ANSWERS_COUNT: `${ANSWER_API}/count`,

  /* 답변 put, delete, patch 요청 시 아래 함수 사용 */
  requestPutDeletePatchAnswer: (questionId: string, answerId: string) => {
    return `questions/${questionId}/${ANSWER_API}/${answerId}`;
  },

  /* 답변 글 작성 */
  requestPostAnswer: (questionId: string) => {
    return `questions/${questionId}/${ANSWER_API}/write`;
  },

  /* 답변 글 목록 조회 */
  requestGetAnswers: (questionId: string) => {
    return `questions/${questionId}/${ANSWER_API}`;
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
});

/* ------------------------------------- */
/*
#=========================================#
|              커뮤니티 - 글              |
#=========================================#
*/
const ARTICLE_API = 'articles';
export const articleApi = Object.freeze({
  GET_POST_ARTICLES: `${ARTICLE_API}`,

  /* 커뮤니티 글 get, put 요청 시 아래 함수 사용 */
  getArticle: (articleId: string) => {
    return `${ARTICLE_API}/${articleId}`;
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
  requestArticleId: (articleId: string) => {
    return `${COMMENT_API}/${articleId}/comments`;
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
  PATCH_MY_PROFILE: `${MY_PAGE_API}/update-profile`,
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
  /* 리뷰 get, post 요청 시 아래 함수 사용 */
  requestReviewId: (expertId: string) => {
    return `${REVIEW_API}/${expertId}`;
  },
});
