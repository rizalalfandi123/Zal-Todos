import { FunctionComponent, useRef, useState } from 'react';
import type { DroppableStateSnapshot, DroppableProps } from '@hello-pangea/dnd';
import { t, Todo, useProjectStore } from '@utils';

import { memo } from 'react';
import Divider, { DividerProps } from '@mui/material/Divider';
import CardHeader from '@mui/material/CardHeader';
import CardContent, { CardContentProps } from '@mui/material/CardContent';
import Card, { CardProps } from '@mui/material/Card';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import MoreIcon from '@mui/icons-material/MoreHorizOutlined';
import Button, { LoadingButtonProps as ButtonProps } from '@mui/lab/LoadingButton';

import { Draggable, Droppable } from '@hello-pangea/dnd';
import { styled } from '@mui/material/styles';
import { TodoItem } from './todo-item';
import { tailwindColors, transientOptions } from '@utils';
import { CreateTodo } from './todo.form';

interface TodoSectionProps extends Omit<DroppableProps, 'children'> {
 todos: Todo[];
 title: string;
}

type TodoSectionComponent = FunctionComponent<TodoSectionProps>;

const setCompleteTodo = useProjectStore.getState().setCompleteTodo;

const DroppableArea = styled(
 Card,
 transientOptions
)<CardProps & { $snapshot: DroppableStateSnapshot }>(({ $snapshot, theme }) => ({
 background: $snapshot.isDraggingOver ? tailwindColors.stale[100] : theme.palette.background.default,
 borderRadius: theme.shape.borderRadius + 'px',
 padding: theme.spacing(1),
 userSelect: 'none',
 border: `1px solid ${theme.palette.divider}`,
 boxShadow: 'none',
 width: '100%',
}));

const TodoContent = styled(CardContent)<CardContentProps>({
 paddingRight: '0px',
 paddingLeft: '0px',
});

const ButtonNewTodo = styled(Button)<ButtonProps>(({ theme }) => ({
 marginTop: theme.spacing(2),
}));

export const TodoSection: TodoSectionComponent = (props) => {
 const { todos, title, ...droppableProps } = props;

 const buttonRef = useRef<HTMLElement | null>(null);

 const setIdOpenedTodoForm = useProjectStore((store) => store.setIdOpenedTodoForm);

 const idOpenedTodoForm = useProjectStore((store) => store.idOpenedTodoForm);

 const handleClickOpenTodoForm = (_event: React.MouseEvent<HTMLElement>) => {
  setIdOpenedTodoForm(droppableProps.droppableId);
 };

 const handleClickCloseTodoForm = () => {
  setIdOpenedTodoForm(null);
 };

 return (
  <>
   <Droppable {...droppableProps}>
    {(provided, snapshot) => {
     return (
      <DroppableArea {...provided.droppableProps} ref={provided.innerRef} $snapshot={snapshot}>
       <CardHeader
        title={title}
        action={
         <IconButton size='small'>
          <MoreIcon />
         </IconButton>
        }
       />

       <Divider />

       <TodoContent>
        {todos.map((todo, index) => {
         return (
          <Draggable key={todo.id} draggableId={todo.id} index={index}>
           {(provided, snapshot) => {
            const handleChangeComplete = () => {
             setCompleteTodo(todo);
            };
            return <TodoItem provided={provided} snapshot={snapshot} handleChangeComplete={handleChangeComplete} {...todo} />;
           }}
          </Draggable>
         );
        })}
       </TodoContent>

       {provided.placeholder}
      </DroppableArea>
     );
    }}
   </Droppable>

   <ButtonNewTodo fullWidth variant='outlined' onClick={handleClickOpenTodoForm} ref={buttonRef as any}>
    {t('createNewTodo')}
   </ButtonNewTodo>

   <CreateTodo
    open={idOpenedTodoForm === droppableProps.droppableId}
    anchorEl={buttonRef.current}
    transition
    onClose={handleClickCloseTodoForm}
    sectionId={droppableProps.droppableId}
   />
  </>
 );
};

export const MemorizeTodoSection = memo(TodoSection);
