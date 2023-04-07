export interface AnswerInfo {
  id: number;
  content: string;
  nickname: string;
  selected: boolean;
  userRole: string;
}

export interface PostDataInfo {
  category: string;
  content: string;
  createdDate: string;
  isSolved: boolean;
  nickname: string;
  postCategory: number;
  questionId: number;
  title: string;
  viewCount: number;
  imagePath: string;
}
