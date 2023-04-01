interface NavItem {
  path: string;
  title: string;
  memberOnly: boolean;
}

export const navItems: NavItem[] = [
  {
    path: '/',
    title: '홈',
    memberOnly: false,
  },
  {
    path: '/qna',
    title: 'Q&A',
    memberOnly: false,
  },
  {
    path: '/community',
    title: '커뮤니티',
    memberOnly: false,
  },
  {
    path: '/mypage',
    title: '마이페이지',
    memberOnly: true,
  },
];
