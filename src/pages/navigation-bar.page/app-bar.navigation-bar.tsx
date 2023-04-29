import type { SxProps, Theme } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import Typography from '@mui/material/Typography';
import { UserMenu } from './user-menu.navigation-bar';
import { BrandIcon } from '@components';
import { useTheme } from '@mui/material/styles';

interface AppBarProps {
 handleDrawerToggle: () => void;
}

const brandIconStyle: SxProps<Theme> = {
 width: '6rem',
 height: 'fit-content',
};

const appBarStyle: SxProps<Theme> = (theme) => ({
 marginLeft: { sm: `${theme.additionalFields.sideBarWidth}px` },
 zIndex: (theme) => theme.zIndex.drawer + 1,
 height: theme.additionalFields.appBarHeight + 'px',
});

const toggleDrawerStyle: SxProps<Theme> = { marginRight: 2, display: { sm: 'none' } };

const appBarRightItemsStyle: SxProps<Theme> = { flexGrow: 1, display: 'flex', alignItems: 'center' };

export const AppBar = (props: AppBarProps) => {
 const theme = useTheme();

 return (
  <MuiAppBar position='fixed' sx={appBarStyle}>
   <Toolbar>
    <Box sx={appBarRightItemsStyle}>
     <IconButton edge='start' onClick={props.handleDrawerToggle} sx={toggleDrawerStyle}>
      <MenuIcon />
     </IconButton>

     <BrandIcon sx={brandIconStyle} primaryColor='white' secondaryColor={theme.palette.primary.main} />
    </Box>

    <UserMenu />
   </Toolbar>
  </MuiAppBar>
 );
};
