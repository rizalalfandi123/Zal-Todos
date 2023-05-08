import { FunctionComponent, useRef } from 'react';
import type { DraggableProvided, DraggableStateSnapshot } from '@hello-pangea/dnd';

import { memo, useState } from 'react';

import Checkbox, { CheckboxProps } from '@mui/material/Checkbox';
import Box, { BoxProps } from '@mui/material/Box';
import Typography, { TypographyProps } from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import CheckIcon from '@mui/icons-material/CheckCircleOutlined';
import UncheckedIcon from '@mui/icons-material/RadioButtonUncheckedOutlined';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import MoreIcon from '@mui/icons-material/MoreHorizOutlined';
import { svgIconClasses } from '@mui/material/SvgIcon';
import { styled, lighten } from '@mui/material/styles';

import { Todo, transientOptions, useProjectStore } from '@utils';
import { TodoItemMenu } from './todo-item-menu';
import { UpdateTodo } from './todo.form';

export interface TodoItemProps extends Todo {
 handleChangeComplete: CheckboxProps['onChange'];
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

const TodoContent = styled(Box)<BoxProps>({
 display: 'flex',
 flexDirection: 'column',
 flexGrow: 1,
});

const AnchorEditForm = styled(Box)<BoxProps>({
 width: '100%',
 height: '1px',
 visibility: 'hidden',
});

const TodoTitle = styled(
 Typography,
 transientOptions
)<TypographyProps & { $complete: boolean }>(({ $complete, theme }) => ({
 fontWeight: 600,
 wordWrap: 'break-word',
 overflow: 'hidden',
 maxHeight: '3.0em',
 textDecoration: $complete ? 'line-through' : 'none',
 paddingBottom: theme.spacing(1),
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
 const { handleChangeComplete, provided, snapshot, ...todoProps } = props;

 const [showMoreButton, setShowMoreButton] = useState<boolean>(false);

 const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

 const openMenu = Boolean(anchorEl);

 const ref = useRef<null | HTMLElement>(null);

 const handleClickMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
  setAnchorEl(event.currentTarget);
 };

 const handleCloseMenu = () => {
  setAnchorEl(null);

  handleHideMoreButton();
 };

 const handleShowMoreButton = () => setShowMoreButton(true);

 const handleHideMoreButton = () => setShowMoreButton(false);

 const idOpenedTodoForm = useProjectStore((store) => store.idOpenedTodoForm);

 const setIdOpenedTodoForm = useProjectStore((store) => store.setIdOpenedTodoForm);

 return (
  <>
   <AnchorEditForm ref={ref} />

   <Container
    ref={provided.innerRef}
    onMouseOver={handleShowMoreButton}
    onMouseOut={handleHideMoreButton}
    sx={provided.draggableProps.style}
    $snapshot={snapshot}
    {...provided.draggableProps}
    {...provided.dragHandleProps}
   >
    <ButtonMoreOption $show={showMoreButton} onClick={handleClickMenu}>
     <MoreIcon />
    </ButtonMoreOption>

    <Check onChange={handleChangeComplete} checked={todoProps.isComplete} checkedIcon={<CheckIcon />} icon={<UncheckedIcon />} />

    <TodoContent>
     <TodoTitle $complete={todoProps.isComplete}>{todoProps.title}</TodoTitle>

     {todoProps.description && (
      <>
       <Divider />

       <TodoDescription $complete={todoProps.isComplete} variant='caption'>
        {todoProps.description}
       </TodoDescription>
      </>
     )}
    </TodoContent>

    <TodoItemMenu open={openMenu} anchorEl={anchorEl} onClose={handleCloseMenu} todoId={props.id} />

    <UpdateTodo
     open={idOpenedTodoForm === props.id}
     anchorEl={ref.current}
     transition
     todo={todoProps}
     onClose={() => {
      setIdOpenedTodoForm(null);
     }}
     sectionId={props.sectionId}
    />
   </Container>
  </>
 );
};

export const MemorizeTodoItem = memo(TodoItem);
