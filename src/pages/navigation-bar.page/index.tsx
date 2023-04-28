import { useMemo, useState } from 'react';
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
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import Typography from '@mui/material/Typography';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { SxProps, useTheme, Theme } from '@mui/material/styles';
import { NavbarList } from '@components';
import { navbarList } from './list.navigation-bar';
import { NavigationBarDrawer } from './drawer.navigation-bar';
import { AppBar } from './app-bar.navigation-bar';

const appBarStyle: SxProps<Theme> = (theme) => ({
 marginLeft: { sm: `${theme.additionalFields.sideBarWidth}px` },
 zIndex: (theme) => theme.zIndex.drawer + 1,
 height: theme.additionalFields.appBarHeight + 'px',
});

export const NavigationBarPage = () => {
 const navigate = useNavigate();

 const location = useLocation();

 const [mobileOpen, setMobileOpen] = useState<boolean>(false);

 const theme = useTheme();

 const drawerWidth = theme.additionalFields.sideBarWidth;

 const handleDrawerToggle = () => setMobileOpen((prev) => !prev);

 return (
  <Box sx={{ display: 'flex' }}>
   <AppBar handleDrawerToggle={handleDrawerToggle} />

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
     <NavigationBarDrawer />
    </Drawer>
    <Drawer
     variant='permanent'
     sx={{
      display: { xs: 'none', sm: 'block' },
      '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
     }}
     open
    >
     <NavigationBarDrawer />
    </Drawer>
   </Box>
   <Container maxWidth='md' component='main' sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}>
    <Toolbar />
    <Outlet />
   </Container>
  </Box>
 );
};

export default NavigationBarPage;
