import { ThemeOptions } from '@mui/material/styles';
import { muiAppbar } from './app-bar.theme';
import { muiButton } from './button.theme';
import { muiCardContent, muiCardHeader } from './card.theme';
import { muiDivider } from './divider.theme';
import { muiIconButton } from './icon-button.theme';
import { muiInputBase } from './input-base.theme';
import { muiLink } from './link.theme';
import { muiListItemButton } from './list-item-button.theme';
import { muiListItemIcon } from './list-item-icon.theme';
import { muiToolbar } from './toolbar.theme';

export const components: ThemeOptions['components'] = {
 MuiButton: muiButton,
 MuiInputBase: muiInputBase,
 MuiLink: muiLink,
 MuiToolbar: muiToolbar,
 MuiAppBar: muiAppbar,
 MuiListItemIcon: muiListItemIcon,
 MuiListItemButton: muiListItemButton,
 MuiIconButton: muiIconButton,
 MuiDivider: muiDivider,
 MuiCardHeader: muiCardHeader,
 MuiCardContent: muiCardContent
};
