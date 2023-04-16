import { END_POINT, PAGE_LIST } from 'constants/cardList';

export function currentPage(location: any) {
  const currentPage = PAGE_LIST.map((page) => {
    if (location.pathname.includes(page)) {
      return page;
    }
  }).filter((page) => page !== undefined)[0]! as keyof typeof END_POINT;
  return currentPage;
}
