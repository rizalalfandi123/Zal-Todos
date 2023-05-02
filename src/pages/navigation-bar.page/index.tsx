import { useState } from 'react';
import Box from '@mui/material/Box';
import Drawer, { drawerClasses } from '@mui/material/Drawer';
import Container from '@mui/material/Container';

import Toolbar from '@mui/material/Toolbar';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Theme, SxProps, useTheme } from '@mui/material/styles';
import { NavigationBarDrawer } from './drawer.navigation-bar';
import { AppBar } from './app-bar.navigation-bar';
import { tailwindColors } from '@utils';

const containerStyle: SxProps<Theme> = { display: 'flex' };

const navStyle: SxProps<Theme> = (theme) => ({
 width: { sm: theme.additionalFields!.sideBarWidth },
 flexShrink: { sm: 0 },
});

const tempDrawerStyle: SxProps<Theme> = (theme) => ({
 display: { xs: 'block', sm: 'none' },
 '& .MuiDrawer-paper': { boxSizing: 'border-box', width: theme.additionalFields!.sideBarWidth },
});

export const NavigationBarPage = () => {
 const navigate = useNavigate();

 const location = useLocation();

 const [mobileOpen, setMobileOpen] = useState<boolean>(false);

 const theme = useTheme();

 const drawerWidth = theme.additionalFields!.sideBarWidth;

 const handleDrawerToggle = () => setMobileOpen((prev) => !prev);

 return (
  <Box sx={containerStyle}>
   <AppBar handleDrawerToggle={handleDrawerToggle} />

   <Box component='nav' sx={navStyle}>
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
     PaperProps={{
      sx: {
       backgroundColor: tailwindColors.stale[100],
       borderRight: 'none',
      },
     }}
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
