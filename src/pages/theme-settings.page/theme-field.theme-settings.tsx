import type { SimplePaletteColorOptions } from '@mui/material/styles';
import type { AppThemeOptions } from '@utils';

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { appThemes, useApplicationSettingsStore, t } from '@utils';
import { ThemeButton } from '@components';

export const ThemeField = () => {
 const tempTheme = useApplicationSettingsStore((store) => store.tempSettings.theme);

 const changeTempSettings = useApplicationSettingsStore((store) => store.changeTempSettings);

 const handleChangeTheme = (theme: AppThemeOptions) => () =>
  changeTempSettings((prevState) => ({
   ...prevState,
   theme: {
    ...prevState.theme,
    ...theme,
   },
  }));

 return (
  <Stack spacing={2}>
   <Typography fontWeight='600'>{t("yourTheme")}</Typography>

   <Stack flexWrap='wrap' direction='row' gap='8px'>
    {appThemes.map((theme, key) => {
     return (
      <ThemeButton
       selected={theme.title === tempTheme.title}
       key={key}
       title={theme.title}
       bodyColor={theme.palette?.background?.default}
       headerColor={(theme.palette?.primary as SimplePaletteColorOptions | undefined)?.main}
       accentColor={(theme.palette?.primary as SimplePaletteColorOptions | undefined)?.main}
       onClick={handleChangeTheme(theme)}
      />
     );
    })}
   </Stack>
  </Stack>
 );
};
