import type { PropsWithChildren } from 'react';
import type { Theme, SxProps } from '@mui/material/styles';
import type { ButtonProps } from '@mui/material/Button';

import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import GoogleIcon from '@mui/icons-material/Google';
import Typography from '@mui/material/Typography';

import { BrandIcon, Button, Link } from '@components';
import { pathnames } from '@utils';

interface SocialAuthButtonProps extends ButtonProps {
 provider: 'Google' | 'Facebook';
}

const containerStyle: SxProps<Theme> = {
 height: '90vh',
 display: 'flex',
 alignItems: 'center',
};

const borderContainerStyle: SxProps<Theme> = ({ palette, shape }) => ({
 border: `1px solid ${palette.divider}`,
 padding: 2,
 borderRadius: shape.borderRadius + 'px',
});

const brandIconStyle: SxProps<Theme> = {
 width: '12rem',
 height: 'fit-content',
 marginBottom: '0.8rem',
 alignSelf: 'center',
};

export const buttonSocialIconStyle: SxProps<Theme> = { marginRight: '0.6rem', marginTop: '-2px', fontSize: 'large' };

export const AuthTemplate = (props: PropsWithChildren) => {
 return (
  <Container maxWidth='xs' sx={containerStyle}>
   <Stack spacing={4} width='100%' flex='50%'>
    <BrandIcon sx={brandIconStyle} />

    <Stack spacing={3} width='100%' sx={borderContainerStyle}>
     {props.children}
    </Stack>
   </Stack>
  </Container>
 );
};

export const SocialAuthButton = (props: SocialAuthButtonProps) => {
 const { children, ...buttonProps } = props;

 switch (props.provider) {
  case 'Facebook':
   return (
    <Button variant='outlined' color='info' {...buttonProps}>
     <FacebookOutlinedIcon sx={buttonSocialIconStyle} /> {children}
    </Button>
   );

  default:
   return (
    <Button variant='outlined' color='info' {...buttonProps}>
     <GoogleIcon sx={buttonSocialIconStyle} /> {children}
    </Button>
   );
 }
};

export const TermAndPoilicyCaption = () => (
 <Typography variant='caption'>
  By continuing with Google, Facebook, or Email, you agree to{' '}
  <Link to={pathnames.register}>Zal Todos Terms of Service and Privacy Policy</Link>.
 </Typography>
);
