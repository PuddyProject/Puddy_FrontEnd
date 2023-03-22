export enum Tier {
  TITLE,
  CONTENT_NAME,
}

export interface MypageListItem {
  tier: Tier;
  title: string;
  icon?: boolean;
}

export const myPageList: Array<MypageListItem> = [
  {
    tier: Tier.TITLE,
    title: '내 활동 정보',
  },
  {
    tier: Tier.CONTENT_NAME,
    title: '내가 쓴 게시글/댓글',
  },
  {
    tier: Tier.CONTENT_NAME,
    title: '즐겨찾기',
  },
  {
    tier: Tier.TITLE,
    title: '전문가 전용',
  },
  {
    tier: Tier.CONTENT_NAME,
    title: '전문가 인증하기',
    icon: true,
  },
  {
    tier: Tier.TITLE,
    title: '설정',
  },
  {
    tier: Tier.CONTENT_NAME,
    title: '계정',
  },
  {
    tier: Tier.CONTENT_NAME,
    title: '알림',
  },
];
