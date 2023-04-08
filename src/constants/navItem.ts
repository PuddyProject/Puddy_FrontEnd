import { AiOutlineHome as HomeIcon, AiOutlineComment as CommunityIcon } from 'react-icons/ai';
import { BsPersonCircle as PersonIcon } from 'react-icons/bs';
import { BiPencil as PencilIcon } from 'react-icons/bi';
import { IconType } from 'react-icons';

interface NavItem {
  icon: IconType;
  path: string;
  title: string;
  memberOnly: boolean;
}

export const navItems: NavItem[] = [
  {
    icon: HomeIcon,
    path: '/',
    title: '홈',
    memberOnly: false,
  },
  {
    icon: PencilIcon,
    path: '/qna',
    title: 'Q&A',
    memberOnly: false,
  },
  {
    icon: CommunityIcon,
    path: '/community',
    title: '커뮤니티',
    memberOnly: false,
  },
  {
    icon: PersonIcon,
    path: '/mypage',
    title: '마이페이지',
    memberOnly: true,
  },
];
