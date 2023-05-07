import { PropsWithChildren, useMemo } from 'react';
import type { Theme, SxProps } from '@mui/material/styles';
import type { LoadingButtonProps as ButtonProps } from '@mui/lab/LoadingButton';

import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import GoogleIcon from '@mui/icons-material/Google';
import Typography from '@mui/material/Typography';
import Button from '@mui/lab/LoadingButton';

import { BrandIcon, Link } from '@components';
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
 const { provider, ...buttonProps } = props;

 const icon = useMemo(() => {
  switch (provider) {
   case 'Facebook':
    return <FacebookOutlinedIcon sx={buttonSocialIconStyle} />;

   default:
    return <GoogleIcon sx={buttonSocialIconStyle} />;
  }
 }, [provider]);

 return <Button variant='outlined' color='info' startIcon={icon} {...buttonProps} />;
};

export const TermAndPoilicyCaption = () => (
 <Typography variant='caption'>
  By continuing with Google, Facebook, or Email, you agree to <Link to={pathnames.register}>Zal Todos Terms of Service and Privacy Policy</Link>.
 </Typography>
);
