import type { SxProps, Theme } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import Typography from '@mui/material/Typography';
import { UserMenu } from './user-menu.navigation-bar';

interface AppBarProps {
 handleDrawerToggle: () => void;
}

const appBarStyle: SxProps<Theme> = (theme) => ({
 marginLeft: { sm: `${theme.additionalFields.sideBarWidth}px` },
 zIndex: (theme) => theme.zIndex.drawer + 1,
 height: theme.additionalFields.appBarHeight + 'px',
});

const toggleDrawerStyle: SxProps<Theme> = { marginRight: 2, display: { sm: 'none' } };

const appBarRightItemsStyle: SxProps<Theme> = { flexGrow: 1, display: 'flex', alignItems: 'center' };

export const AppBar = (props: AppBarProps) => {
 return (
  <MuiAppBar position='fixed' sx={appBarStyle}>
   <Toolbar>
    <Box sx={appBarRightItemsStyle}>
     <IconButton edge='start' onClick={props.handleDrawerToggle} sx={toggleDrawerStyle}>
      <MenuIcon />
     </IconButton>

     <Typography variant='h6' noWrap component='div'>
      Responsive drawer
     </Typography>
    </Box>

    <UserMenu/>
   </Toolbar>
  </MuiAppBar>
 );
};
