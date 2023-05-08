import type { FunctionComponent } from 'react';

import Menu, { MenuProps } from '@mui/material/Menu';
import EditIcon from '@mui/icons-material/EditOutlined';

import MenuItem from '@mui/material/MenuItem';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';

import { t, useAlert, useProjectStore } from '@utils';
import { AlertDeleteTodo } from './alert-delete-todo';

interface TodoItemMenuProps extends MenuProps {
 todoId: string;
}

type TodoItemMenuComponent = FunctionComponent<TodoItemMenuProps>;

export const TodoItemMenu: TodoItemMenuComponent = (props) => {
 const { todoId, ...menuProps } = props;

 const setIdOpenedTodoForm = useProjectStore((store) => store.setIdOpenedTodoForm);

 const setShowAlertSave = useAlert((store) => store.setShow);

 const handleShowAlertDelete = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
  if (menuProps.onClose) {
   menuProps.onClose(e, 'backdropClick');
  }
  setShowAlertSave({ id: `ALERT_DELETE_TODO_${props.todoId}`, data: {} });
 };

 const handleClickEdit = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
  if (menuProps.onClose) {
   menuProps.onClose(e, 'backdropClick');
  }
  setIdOpenedTodoForm(todoId);
 };

 return (
  <>
   <Menu {...menuProps}>
    <MenuItem onClick={handleClickEdit}>
     <ListItemIcon>
      <EditIcon />
     </ListItemIcon>

     <ListItemText>edit</ListItemText>
    </MenuItem>

    <MenuItem onClick={handleShowAlertDelete} autoFocus={false}>
     <ListItemIcon>
      <DeleteIcon />
     </ListItemIcon>

     <ListItemText>{t('delete')}</ListItemText>
    </MenuItem>
   </Menu>

   <AlertDeleteTodo idTodo={todoId} idProject='' />
  </>
 );
};
