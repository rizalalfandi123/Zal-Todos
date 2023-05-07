import type { FunctionComponent } from 'react';
import type { DraggableProvided, DraggableStateSnapshot } from '@hello-pangea/dnd';

import { memo, useState } from 'react';

import Checkbox, { CheckboxProps } from '@mui/material/Checkbox';
import Box, { BoxProps } from '@mui/material/Box';
import Typography, { TypographyProps } from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import CircularProgress, { CircularProgressProps } from '@mui/material/CircularProgress';
import CheckIcon from '@mui/icons-material/CheckCircleOutlined';
import UncheckedIcon from '@mui/icons-material/RadioButtonUncheckedOutlined';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import { svgIconClasses } from '@mui/material/SvgIcon';
import { styled, lighten } from '@mui/material/styles';

import { Todo, transientOptions } from '@utils';

export interface TodoItemProps extends Todo {
 handleChangeComplete: CheckboxProps['onChange'];
 isLoadingCheck?: boolean;
 provided: DraggableProvided;
 snapshot: DraggableStateSnapshot;
}

type TodoItemComponent = FunctionComponent<TodoItemProps>;

const Container = styled(
 Box,
 transientOptions
)<BoxProps & { $snapshot?: DraggableStateSnapshot }>(({ theme, $snapshot }) => ({
 display: 'flex',
 flexDirection: 'row',
 borderRadius: theme.shape.borderRadius + 'px',
 justifyContent: 'stretch',
 alignItems: 'center',
 padding: theme.spacing(1),
 gap: theme.spacing(2),
 border: `1px solid ${theme.palette.divider}`,
 minWidth: theme.additionalFields!.todoItemMinWidth + 'px',
 position: 'relative',
 backgroundColor: $snapshot?.isDragging ? lighten(theme.palette.primary.main, 0.75) : theme.palette.background.default,
 marginBottom: theme.spacing(1),

 ':hover': {
  boxShadow: theme.shadows[1],
 },

 ':last-child': {
  marginBottom: 0,
 },
}));

const Check = styled(Checkbox)<CheckboxProps>({
 padding: 0,

 [`& .${svgIconClasses.root}`]: {
  width: '1.5em',
  height: '1.5em',
 },
});

const LoadingCheckIcon = styled(CircularProgress)<CircularProgressProps>({
 margin: '0 3.1px',
});

const TodoContent = styled(Box)<BoxProps>({
 display: 'flex',
 flexDirection: 'column',
 flexGrow: 1,
});

const TodoTitle = styled(
 Typography,
 transientOptions
)<TypographyProps & { $complete: boolean }>(({ $complete }) => ({
 fontWeight: 600,
 wordWrap: 'break-word',
 overflow: 'hidden',
 maxHeight: '3.0em',
 textDecoration: $complete ? 'line-through' : 'none',
}));

const TodoDescription = styled(
 Typography,
 transientOptions
)<TypographyProps & { $complete: boolean }>(({ theme, $complete }) => ({
 color: theme.palette.text.secondary,
 wordWrap: 'break-word',
 overflow: 'hidden',
 maxHeight: '1.5em',
 textDecoration: $complete ? 'line-through' : 'none',
}));

const ButtonMoreOption = styled(
 IconButton,
 transientOptions
)<IconButtonProps & { $show: boolean }>(({ theme, $show }) => ({
 position: 'absolute',
 top: theme.spacing(0),
 right: theme.spacing(0),
 visibility: $show ? 'visible' : 'hidden',
}));

export const TodoItem: TodoItemComponent = (props) => {
 const { handleChangeComplete, isComplete, title, description = '', isLoadingCheck = false, provided, snapshot } = props;

 const [showMoreButton, setShowMoreButton] = useState<boolean>(false);

 const handleShowMoreButton = () => setShowMoreButton(true);

 const handleHideMoreButton = () => setShowMoreButton(false);

 return (
  <Container
   ref={provided.innerRef}
   onMouseOver={handleShowMoreButton}
   onMouseOut={handleHideMoreButton}
   sx={provided.draggableProps.style}
   $snapshot={snapshot}
   {...provided.draggableProps}
   {...provided.dragHandleProps}
  >
   <ButtonMoreOption $show={showMoreButton}>
    <MoreVertOutlinedIcon />
   </ButtonMoreOption>

   {isLoadingCheck ? (
    <Check icon={<LoadingCheckIcon size='1.8em' />} checked={false} disableFocusRipple disableRipple disableTouchRipple />
   ) : (
    <Check onChange={handleChangeComplete} checked={isComplete} checkedIcon={<CheckIcon />} icon={<UncheckedIcon />} />
   )}

   <TodoContent> 
    <TodoTitle $complete={isComplete}>{title}</TodoTitle>

    {description && (
     <>
      <Divider />

      <TodoDescription $complete={isComplete} variant='caption'>
       {description}
      </TodoDescription>
     </>
    )}
   </TodoContent>
  </Container>
 );
};

export const MemorizeTodoItem = memo(TodoItem);
