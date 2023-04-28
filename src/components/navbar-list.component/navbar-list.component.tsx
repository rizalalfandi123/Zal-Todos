import type { FunctionComponent, MouseEvent, ReactNode } from 'react';
import type { RouteApp } from '@interfaces';

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
import ListItemButton, { ListItemButtonProps } from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Outlet } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { RoutePath } from '@utils';

export interface NavbarItem {
 pathname: RoutePath;
 icon: ReactNode;
 label: string;
 disable?: boolean;
 visible?: boolean;
}

interface TNavbarListProps {
 onClickItemButton: (data: NavbarItem) => void;
 getSelected: (data: NavbarItem) => boolean;
 items: NavbarItem[];
}

type TNavbarList = FunctionComponent<TNavbarListProps>;

export const NavbarList: TNavbarList = (props) => {
 const { items, onClickItemButton, getSelected } = props;

 return (
  <List>
   {items.map((item, index) => {
    return (
     <ListItem key={index} disablePadding>
      <ListItemButton onClick={() => onClickItemButton(item)} selected={getSelected(item)}>
       <ListItemIcon>{item.icon}</ListItemIcon>

       <ListItemText primary={item.label} />
      </ListItemButton>
     </ListItem>
    );
   })}
  </List>
 );
};
