import type { FunctionComponent } from 'react';
import type { DroppableStateSnapshot, DroppableProps } from '@hello-pangea/dnd';
import { Todo, useProjectStore } from '@utils';

import { memo } from 'react';
import Divider, { DividerProps } from '@mui/material/Divider';
import CardHeader from '@mui/material/CardHeader';
import CardContent, { CardContentProps } from '@mui/material/CardContent';
import Card, { CardProps } from '@mui/material/Card';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';

import { Draggable, Droppable } from '@hello-pangea/dnd';
import { styled } from '@mui/material/styles';
import { TodoItem } from './todo-item';
import { tailwindColors, transientOptions } from '@utils';

interface TodoSectionProps extends Omit<DroppableProps, 'children'> {
 todos: Todo[];
 title: string;
}

type TodoSectionComponent = FunctionComponent<TodoSectionProps>;

const setUpdatedTodos = useProjectStore.getState().setUpdatedTodos;

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

export const TodoSection: TodoSectionComponent = (props) => {
 const { todos, title, ...droppableProps } = props;


 return (
  <Droppable {...droppableProps}>
   {(provided, snapshot) => {
    return (
     <DroppableArea {...provided.droppableProps} ref={provided.innerRef} $snapshot={snapshot}>
      <CardHeader
       title={title}
       action={
        <IconButton size='small'>
         <MoreVertOutlinedIcon />
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
 );
};

export const MemorizeTodoSection = memo(TodoSection);
