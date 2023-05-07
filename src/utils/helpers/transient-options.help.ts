import type { CreateMUIStyled, Theme } from '@mui/material/styles';

export const transientOptions: Parameters<CreateMUIStyled<Theme>>[1] = {
 shouldForwardProp: (propName: string) => !propName.startsWith('$'),
};
