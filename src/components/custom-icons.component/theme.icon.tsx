import type { SxProps, Theme } from '@mui/material/styles';
import ButtonBase, { ButtonBaseProps } from '@mui/material/ButtonBase';
import { tailwindColors } from '@utils';

export interface ThemeButtonProps extends ButtonBaseProps {
 title: string;
 bodyColor?: string;
 headerColor?: string;
 accentColor?: string;
 selected?: boolean;
}

export const ThemeButton = (props: ThemeButtonProps) => {
 const {
  accentColor = tailwindColors.indigo[500],
  bodyColor = tailwindColors.stale[50],
  headerColor = tailwindColors.indigo[500],
  title,
  selected,
  ...buttonProps
 } = props;

 const buttonStyle: SxProps<Theme> = (theme) => ({
  border: `1px solid ${selected ? accentColor : theme.palette.divider}`,
  borderRadius: '4px',
 });

 return (
  <ButtonBase sx={buttonStyle} {...buttonProps}>
   <svg xmlSpace='http://www.w3.org/2000/svg' xmlnsXlink='http://www.w3.org/1999/xlink' width='166' height='77' viewBox='0 0 166 77' fill='#212121'>
    <defs>
     <rect id='a' width='164' height='75' rx='3' fill='#FFF' />
    </defs>
    <g fill='none' fillRule='evenodd'>
     <g transform='translate(1 1)'>
      <mask id='b' fill='#fff'>
       <use xlinkHref='#a'></use>
      </mask>
      <rect x='-.5' y='-.5' width='165' height='76' rx='4' fill={bodyColor} />
      <path fill={headerColor} mask='url(#b)' d='M0 0h164v30H0z' />
      <text mask='url(#b)' fontSize='12' fill='#fff'>
       <tspan x='7' y='20'>
        {title}
       </tspan>
      </text>
      <path
       d='M11 43a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 1a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm11.3-7h47.4l.8.1.4.4.1.8v3.4l-.1.8-.4.4-.8.1H22.3l-.8-.1a1 1 0 0 1-.4-.4l-.1-.8v-3.4l.1-.8.4-.4.8-.1zm58 0h74.4l.8.1.4.4.1.8v3.4l-.1.8-.4.4-.8.1H80.3l-.8-.1a1 1 0 0 1-.4-.4l-.1-.8v-3.4l.1-.8.4-.4.8-.1zm-58 12h23.4l.8.1.4.4.1.8v3.4l-.1.8-.4.4-.8.1H22.3l-.8-.1a1 1 0 0 1-.4-.4l-.1-.8v-3.4l.1-.8.4-.4.8-.1zm34 0h62.4l.8.1.4.4.1.8v3.4l-.1.8-.4.4-.8.1H56.3l-.8-.1a1 1 0 0 1-.4-.4l-.1-.8v-3.4l.1-.8.4-.4.8-.1zM11 56a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0-1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z'
       fill={tailwindColors.stale[200]}
       fillRule='nonzero'
       mask='url(#b)'
      />
      <rect fill={accentColor} mask='url(#b)' x='7' y='62' width='26' height='6' rx='1' />
     </g>
     {selected && <path d='M149.2 67l-4.1-4.1a.5.5 0 0 0-.7 0c-.2.2-.2.5 0 .7l4.8 4.9 8.5-8.4c.2-.2.2-.6 0-.7a.5.5 0 0 0-.7 0l-7.8 7.7z' fill={accentColor} />}
    </g>
   </svg>
  </ButtonBase>
 );
};
