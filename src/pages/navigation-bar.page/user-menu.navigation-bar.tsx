import IconButton from '@mui/material/IconButton';
import Popover from '@mui/material/Popover';
import Divider from '@mui/material/Divider';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import Typography from '@mui/material/Typography';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import ListItem from '@mui/material/ListItem';

import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import ListItemIcon from '@mui/material/ListItemIcon';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ListItemText from '@mui/material/ListItemText';
import { MouseEvent, useMemo, useState } from 'react';
import { pathnames, supabase, useSession } from '@utils';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';

export const UserMenu = () => {
 const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

 const { data: session } = useSession();

 const location = useLocation();

 const navigate = useNavigate();

 const handleOpenMenu = (event: MouseEvent<HTMLButtonElement>) => {
  setAnchorEl(event.currentTarget);
 };

 const handleClose = () => {
  setAnchorEl(null);
 };

 const handleLogout = async () => {
  await supabase.auth.signOut();
  navigate(pathnames.login);
 };

 const handleSettings = () => {
  handleClose();
  navigate(pathnames.settings, { state: { backgroundLocation: location } });
 };

 return (
  <>
   <IconButton onClick={handleOpenMenu}>
    <AccountCircleOutlinedIcon htmlColor='white' />
   </IconButton>

   <Popover
    open={Boolean(anchorEl)}
    anchorEl={anchorEl}
    onClose={handleClose}
    anchorOrigin={{
     vertical: 'bottom',
     horizontal: 'left',
    }}
    transformOrigin={{
     vertical: 'top',
     horizontal: 'right',
    }}
    PaperProps={{
     sx: {
      minWidth: '16rem',
      padding: '4px',
     },
    }}
   >
    <List disablePadding component='div'>
     <ListItemButton onClick={handleSettings}>
      <List disablePadding component='div'>
       <ListItem disablePadding>
        <ListItemAvatar>
         {session?.user.user_metadata['picture'] ? (
          <Avatar src={session.user.user_metadata['picture']} />
         ) : (
          <Avatar>{((session?.user.user_metadata['name'] || '-') as string).substring(0, 1)}</Avatar>
         )}
        </ListItemAvatar>

        <ListItemText primary={session?.user.user_metadata['name'] || '-'} sx={{ fontWeight: 600 }} secondary={session?.user.user_metadata['email'] || '-'} />
       </ListItem>

       <ListItem disablePadding sx={{ marginTop: '0.8rem' }}>
        <ListItemIcon>
         <SettingsOutlinedIcon />
        </ListItemIcon>

        <ListItemText primary='Settings' />
       </ListItem>
      </List>
     </ListItemButton>

     <Divider />

     <ListItemButton onClick={handleLogout}>
      <ListItemIcon>
       <LogoutOutlinedIcon />
      </ListItemIcon>

      <ListItemText primary='Logout' />
     </ListItemButton>
    </List>
   </Popover>
  </>
 );
};
