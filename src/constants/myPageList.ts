export enum Tier {
  TITLE,
  CONTENT_NAME,
}

export enum Role {
  USER = 'ROLE_USER',
  EXPERT = 'ROLE_EXPERTS',
}

export interface MypageListItem {
  tier: Tier;
  title: string;
  url?: string;
  icon?: boolean;
  role?: Role;
}

export const myPageList: Array<MypageListItem> = [
  {
    tier: Tier.TITLE,
    title: '내 활동 정보',
  },
  {
    tier: Tier.CONTENT_NAME,
    title: '내가 쓴 게시글/댓글',
    url: '/mypage/posts',
  },
  {
    tier: Tier.CONTENT_NAME,
    title: '즐겨찾기',
    url: '/mypage/bookmarks',
  },
  {
    tier: Tier.TITLE,
    title: '전문가 전용',
  },
  {
    tier: Tier.CONTENT_NAME,
    title: '전문가 인증하기',
    url: '/mypage/experts',
    icon: true,
    role: Role.USER,
  },
  {
    tier: Tier.CONTENT_NAME,
    title: '전문가 프로필 등록',
    url: '/profile/experts',
    role: Role.EXPERT,
  },
  {
    tier: Tier.TITLE,
    title: '설정',
  },
  {
    tier: Tier.CONTENT_NAME,
    title: '계정',
    url: '/mypage/account',
  },
  {
    tier: Tier.CONTENT_NAME,
    title: '알림',
    url: '/mypage/alarm',
  },
];
