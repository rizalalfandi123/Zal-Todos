import { ThemeButton } from '@components';
import { SimplePaletteColorOptions } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { ThemeField } from './theme-field.theme-settings';

import Slider from '@mui/material/Slider';
import { BorderRadiusField } from './border-radius-field.theme-settings';
import { useEffect } from 'react';
import { history } from '@routes';
import { useAlert, useApplicationSettingsStore } from '@utils';
import { AlertSave } from '@pages/settings.page/alert-save.settings';

export const ThemeSettingsPage = () => {
 return (
  <Stack paddingY={2} spacing={4}>
   <ThemeField />

   <BorderRadiusField />
  </Stack>
 );
};

export default ThemeSettingsPage;
