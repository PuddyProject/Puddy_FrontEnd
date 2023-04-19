import { Tag } from './commentTypes';
export interface MainQnaCardType {
  title: string;
  content: string;
  isSolved: boolean;
  nickname: string;
  questionId: number;
}

export interface MainCommunityCardType {
  articleId: number;
  content: string;
  createdDate: string;
  imagePath: string;
  likeCount: number;
  nickname: string;
  postCategory: number;
  tagList: Tag[];
  title: string;
  viewCount: number;
}

export interface MainExpertCardType {
  careerList: string[];
  education: string;
  expertId: number;
  imagePath: string;
  introduce: string;
  location: string;
  username: string;
}
