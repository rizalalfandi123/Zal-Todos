import MuiLink from '@mui/material/Link';
import { forwardRef } from 'react';
import { Link as RouterLink, LinkProps as RouterLinkProps } from 'react-router-dom';

export const Link = forwardRef<HTMLAnchorElement, RouterLinkProps>((props, ref) => (
 <MuiLink {...props} ref={ref} component={RouterLink} />
));
