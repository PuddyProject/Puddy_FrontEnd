import { questionsApi, articleApi } from './apiEndpoint';

export const FILTER_ITEM = ['최신순', '오래된순', '인기순'];
export const PAGE_LIST = ['community', 'qna'];

export const TITLE = {
  community: '커뮤니티 🐶',
  qna: 'Q&A 🐶',
};

export const END_POINT = {
  community: articleApi.GET_POST_ARTICLES,
  qna: questionsApi.QUESTIONS,
};

export const LIST_NAME = {
  community: 'articleList',
  qna: 'questionList',
};

export const CARD_ID = {
  community: 'articleId',
  qna: 'questionId',
};

export const NO_POST = {
  community: '커뮤니티 ',
  qna: 'Q&A ',
};
