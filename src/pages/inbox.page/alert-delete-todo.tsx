import { Modal } from '@components';
import { history } from '@routes';
import { apiKey, pathnames, queryClient, settingPathnames, t, useAlert, useApplicationSettingsStore, useDeleteTodoMutation, useWebTitle } from '@utils';
import { useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/lab/LoadingButton';

interface AlertDeleteTodoProps {
 idTodo: string;
 idProject: string;
}

export const AlertDeleteTodo = (props: AlertDeleteTodoProps) => {
 const deleteTodoAlert = `ALERT_DELETE_TODO_${props.idTodo}`;

 const alertStatus = useAlert((store) => store.getAlertStatus(deleteTodoAlert));

 const removeShowAlert = useAlert((store) => store.removeShow);

 const { mutateAsync: deleteTodo, isLoading } = useDeleteTodoMutation(props.idTodo);

 const handleCancel = () => {
  if (!isLoading) {
   removeShowAlert(deleteTodoAlert);
  }
 };

 const handleDeleteTodo = async () => {
  await deleteTodo();

  queryClient.invalidateQueries([apiKey.projects, '44110a37-b2d2-4398-ae63-7ee056fe03b1']);

  handleCancel();
 };

 const actions = (
  <Box display='flex' gap='8px'>
   <Button variant='outlined' onClick={handleCancel}>
    {t('cancel')}
   </Button>

   <Button variant='contained' color='error' onClick={handleDeleteTodo} loading={isLoading}>{`${t('delete')}`}</Button>
  </Box>
 );

 return (
  <Modal
   title={`${t('delete')}`}
   slots={{
    dialogProps: {
     open: alertStatus.open,
     onClose: handleCancel,
     fullScreen: false,
     maxWidth: 'xs',
    },
   }}
   actions={actions}
  >
   <Typography>{t('deleteConfirmNotice')}.</Typography>
  </Modal>
 );
};
