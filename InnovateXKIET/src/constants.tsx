import { Icon } from '@iconify/react';
import { useSelector } from 'react-redux';
import { RootState } from './lib/Redux/store';
import { SideNavItem } from './types';

export function useSideNavItems(): SideNavItem[] {
  const userId = useSelector((state: RootState) => state.user.userId);

  return [
    {
      title: 'Feeds',
      path: '/user/feeds',
      icon: <Icon icon="lucide:home" width="24" height="24" />,
      isBottom: false,
    },
    {
      title: 'Profile',
      path: `/user/profile?userId=${userId}`,
      icon: <Icon icon="lucide:user" width="24" height="24" />,
      isBottom: false,
    },
    {
      title: 'Messages',
      path: '/user/messages',
      icon: <Icon icon="lucide:mail" width="24" height="24" />,
      isBottom: false,
    },
    {
      title: 'Notification',
      path: '/user/notification',
      icon: <Icon icon="lucide:bell" width="24" height="24" />,
      isBottom: false,
    },
    {
      title: 'Settings',
      path: '/user/settings',
      icon: <Icon icon="lucide:settings" width="24" height="24" />,
      submenu: true,
      subMenuItems: [
        { title: 'Account', path: '/user/settings/account', isBottom: true },
        { title: 'Privacy', path: '/user/settings/privacy', isBottom: true },
      ],
      isBottom: true,
    },
    {
      title: 'About',
      path: '/user/about',
      icon: <Icon icon="lucide:info" width="24" height="24" />,
      isBottom: true,
    },
    {
      title: 'Logout',
      path: '/user/logout',
      icon: <Icon icon="lucide:log-out" width="24" height="24" />,
      isBottom: true,
    },
  ];
}
