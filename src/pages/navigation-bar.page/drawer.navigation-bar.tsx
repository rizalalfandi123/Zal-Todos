import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import Container from '@mui/material/Container';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { NavbarList } from '@components';
import { navbarList } from './list.navigation-bar';

export const NavigationBarDrawer = () => {
 const navigate = useNavigate();

 return (
  <>
   <Toolbar />
   <Divider />
   <NavbarList
    items={navbarList}
    onClickItemButton={(data) => void navigate(data.pathname)}
    getSelected={(data) => location.pathname === data.pathname}
   />
  </>
 );
};
