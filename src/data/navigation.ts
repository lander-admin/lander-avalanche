import { NavItemType } from '@/shared/Navigation/NavigationItem';
import ncNanoId from '@/utils/ncNanoId';

export const NAVIGATION: NavItemType[] = [
  // {
  //   id: ncNanoId(),
  //   href: "/listing/stays",
  //   name: "Explore",
  // },
  {
    id: ncNanoId(),
    // eslint-disable-next-line
    // @ts-ignore
    href: '/add-listing/1',
    name: 'Be a Host',
  },
  {
    id: ncNanoId(),
    href: '/swap',
    name: 'SWAP',
  },
  {
    id: ncNanoId(),
    href: '/real-state',
    name: 'Real State',
  },
];
