export interface QnaData {
  category: string;
  content: string;
  createdDate: string;
  isSolved: boolean;
  nickname: string;
  postCategory: number;
  questionId: number;
  title: string;
  viewCount: number;
}

export interface MainQnaCardType {
  title: string;
  content: string;
  isSolved: boolean;
  nickname: string;
  questionId: number;
}
