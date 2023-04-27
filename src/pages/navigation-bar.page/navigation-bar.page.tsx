import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Outlet } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { NavbarList } from '@components';
import { navbarList } from './list.navigation-bar';

export const NavigationBarPage = () => {
 const [mobileOpen, setMobileOpen] = useState<boolean>(false);

 const theme = useTheme();

 const drawerWidth = theme.additionalFields.sideBarWidth;

 const handleDrawerToggle = () => setMobileOpen((prev) => !prev);

 const drawer = (
  <>
   <Toolbar />
   <Divider />
   <NavbarList items={navbarList} />
  </>
 );

 return (
  <Box sx={{ display: 'flex' }}>
   <AppBar
    position='fixed'
    sx={(theme) => ({
     ml: { sm: `${drawerWidth}px` },
     zIndex: (theme) => theme.zIndex.drawer + 1,
     height: theme.additionalFields.appBarHeight + 'px',
    })}
   >
    <Toolbar>
     <IconButton color='inherit' aria-label='open drawer' edge='start' onClick={handleDrawerToggle} sx={{ mr: 2, display: { sm: 'none' } }}>
      <MenuIcon />
     </IconButton>
     <Typography variant='h6' noWrap component='div'>
      Responsive drawer
     </Typography>
    </Toolbar>
   </AppBar>

   
   <Box component='nav' sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }} aria-label='mailbox folders'>
    <Drawer
     variant='temporary'
     open={mobileOpen}
     onClose={handleDrawerToggle}
     ModalProps={{
      keepMounted: true,
     }}
     sx={{
      display: { xs: 'block', sm: 'none' },
      '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
     }}
    >
     {drawer}
    </Drawer>
    <Drawer
     variant='permanent'
     sx={{
      display: { xs: 'none', sm: 'block' },
      '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
     }}
     open
    >
     {drawer}
    </Drawer>
   </Box>
   <Box component='main' sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}>
    <Toolbar />
    <Outlet />
   </Box>
  </Box>
 );
};
