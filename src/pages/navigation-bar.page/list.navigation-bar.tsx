import type { NavbarItem } from '@components';
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import { pathnames } from '@utils';

export const navbarList: NavbarItem[] = [
 {
  icon: <MailOutlinedIcon />,
  label: 'Inbox',
  pathname: pathnames.inbox,
 },
 {
  icon: <CalendarTodayOutlinedIcon />,
  label: 'Today',
  pathname: pathnames.today,
 },
 {
  icon: <CalendarMonthOutlinedIcon />,
  label: 'Upcoming',
  pathname: pathnames.upcoming,
 },
];
