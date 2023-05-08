import type { Control, SubmitHandler } from 'react-hook-form';
import type { Database } from '@interfaces';

import Box, { BoxProps } from '@mui/material/Box';
import Button from '@mui/lab/LoadingButton';
import Fade from '@mui/material/Fade';
import Popper, { PopperProps } from '@mui/material/Popper';
import { styled } from '@mui/material/styles';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { TodoForm as TodoFormType, todoSchema } from '@schemas';
import { TextField } from '@components';
import {
 useAuthStore,
 apiKey,
 queryClient,
 t,
 useCreateTodoMutation,
 Todo,
 transientOptions,
 useUpdateTodoMutation,
 CreateTodoPayload,
 UpdateTodoPayload,
 useProjectStore,
} from '@utils';
import { FunctionComponent, useEffect } from 'react';

interface CreateTodoProps extends PopperProps {
 onClose: () => void;
 sectionId: string;
}

interface UpdateTodoProps extends CreateTodoProps {
 todo: Todo;
}

const FormTodoContainer = styled(
 Box,
 transientOptions
)<BoxProps & { $withMarginTop: boolean }>(({ theme, $withMarginTop }) => ({
 marginTop: $withMarginTop ? theme.spacing(1) : '0px',
 border: `1px solid ${theme.palette.divider}`,
 width: theme.additionalFields!.todoSectionWidth + 'px',
 borderRadius: theme.shape.borderRadius + 'px',
 display: 'flex',
 flexDirection: 'column',
 gap: theme.spacing(1),
 padding: theme.spacing(1),
 backgroundColor: theme.palette.background.default,
}));

const FormTodoActions = styled(Box)<BoxProps>(({ theme }) => ({
 display: 'flex',
 gap: theme.spacing(1),
 justifyContent: 'flex-end',
}));

type TodoFormComponent = FunctionComponent<{ control: Control<TodoFormType> }>;

const TodoForm: TodoFormComponent = ({ control }) => {
 return (
  <>
   <TextField<TodoFormType, 'title'>
    name='title'
    control={control}
    label='Name'
    slots={{
     inputProps: {
      autoFocus: true,
     },
    }}
   />

   <TextField<TodoFormType, 'description'> name='description' control={control} label='Description' slots={{ inputProps: { rows: 4, multiline: true } }} />
  </>
 );
};

export const CreateTodo = (props: CreateTodoProps) => {
 const { sectionId, onClose, ...popperProps } = props;

 const {
  control,
  handleSubmit,
  reset: resetForm,
 } = useForm<TodoFormType>({
  defaultValues: {
   title: '',
   description: '',
  },
  resolver: zodResolver(todoSchema),
 });

 const userId = useAuthStore((store) => store.session?.user?.id ?? '');

 const { mutateAsync: createTodo, isLoading: loadingCreateTodo } = useCreateTodoMutation({
  onSuccess: (data) => {
   if (!data.error) {
    queryClient.invalidateQueries([apiKey.projects, '44110a37-b2d2-4398-ae63-7ee056fe03b1']);

    resetForm();
   }
  },
 });

 const handleCreateTodo: SubmitHandler<TodoFormType> = async (data) => {
  const newTodo: CreateTodoPayload = {
   ...data,
   userId,
   projectId: '44110a37-b2d2-4398-ae63-7ee056fe03b1',
   sectionId: sectionId,
   index: 12,
  };

  await createTodo(newTodo);
 };

 return (
  <Popper {...popperProps}>
   {({ TransitionProps }) => (
    <Fade {...TransitionProps}>
     <FormTodoContainer $withMarginTop>
      <TodoForm control={control} />

      <FormTodoActions>
       <Button variant='outlined' onClick={onClose}>
        {t('cancel')}
       </Button>

       <Button onClick={handleSubmit(handleCreateTodo)} loading={loadingCreateTodo} variant='contained'>
        {t('save')}
       </Button>
      </FormTodoActions>
     </FormTodoContainer>
    </Fade>
   )}
  </Popper>
 );
};

export const UpdateTodo = (props: UpdateTodoProps) => {
 const { sectionId, onClose, todo, ...popperProps } = props;

 const {
  control,
  handleSubmit,
  reset: resetForm,
 } = useForm<TodoFormType>({
  defaultValues: {
   title: todo.title,
   description: todo.description ?? '',
  },
  resolver: zodResolver(todoSchema),
 });

 const { mutateAsync: updateTodo, isLoading: loadingUpdateTodo } = useUpdateTodoMutation({
  onSuccess: (data) => {
   if (!data.error) {
    console.log({ data });

    queryClient.invalidateQueries([apiKey.projects, '44110a37-b2d2-4398-ae63-7ee056fe03b1']);

    // resetForm();

    onClose();
   }
  },
 });

 const handleUpdateTodo: SubmitHandler<TodoFormType> = async (data) => {
  const newTodo: UpdateTodoPayload = {
   ...todo,
   ...data,
  };

  await updateTodo(newTodo);
 };

 return (
  <Popper {...popperProps}>
   {({ TransitionProps }) => (
    <Fade {...TransitionProps}>
     <FormTodoContainer $withMarginTop={false}>
      <TodoForm control={control} />

      <FormTodoActions>
       <Button variant='outlined' onClick={onClose}>
        {t('cancel')}
       </Button>

       <Button onClick={handleSubmit(handleUpdateTodo)} loading={loadingUpdateTodo} variant='contained'>
        {t('save')}
       </Button>
      </FormTodoActions>
     </FormTodoContainer>
    </Fade>
   )}
  </Popper>
 );
};
