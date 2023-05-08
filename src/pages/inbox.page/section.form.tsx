import type { SubmitHandler } from 'react-hook-form';
import type { Database } from '@interfaces';

import Box, { BoxProps } from '@mui/material/Box';
import Button from '@mui/lab/LoadingButton';
import Fade from '@mui/material/Fade';
import Popper, { PopperProps } from '@mui/material/Popper';
import { styled } from '@mui/material/styles';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { SectionForm, sectionSchema } from '@schemas';
import { TextField } from '@components';
import { useAuthStore, apiKey, queryClient, t, useSectionMutation } from '@utils';

interface FormSectionProps extends PopperProps {
 onClose: () => void;
}

const FormSectionContainer = styled(Box)<BoxProps>(({ theme }) => ({
 marginTop: theme.spacing(1),
 border: `1px solid ${theme.palette.divider}`,
 width: theme.additionalFields!.todoSectionWidth + 'px',
 borderRadius: theme.shape.borderRadius + 'px',
 display: 'flex',
 flexDirection: 'column',
 gap: theme.spacing(1),
 padding: theme.spacing(1),
 backgroundColor: theme.palette.background.default,
}));

const FormSectionActions = styled(Box)<BoxProps>(({ theme }) => ({
 display: 'flex',
 gap: theme.spacing(1),
 justifyContent: 'flex-end',
}));

export const FormSection = (props: FormSectionProps) => {
 const userId = useAuthStore((store) => store.session?.user?.id ?? '');

 const { mutateAsync: createSection, isLoading } = useSectionMutation();

 const {
  control,
  handleSubmit,
  reset: resetForm,
 } = useForm<SectionForm>({
  defaultValues: {
   title: '',
  },
  resolver: zodResolver(sectionSchema),
 });

 const onSubmit: SubmitHandler<SectionForm> = async (data) => {
  const newTodo: Database['public']['Tables']['sections']['Insert'] = { title: data.title, userId, projectId: '44110a37-b2d2-4398-ae63-7ee056fe03b1' };

  const { error } = await createSection(newTodo);

  if (!error) {
   queryClient.invalidateQueries([apiKey.projects, '44110a37-b2d2-4398-ae63-7ee056fe03b1']);
  }

  resetForm();

  props.onClose();
 };

 return (
  <Popper {...props}>
   {({ TransitionProps }) => (
    <Fade {...TransitionProps}>
     <FormSectionContainer>
      <TextField<SectionForm, 'title'> name='title' control={control} label='Name'  />

      <FormSectionActions>
       <Button variant='outlined' onClick={props.onClose}>
        {t('cancel')}
       </Button>

       <Button onClick={handleSubmit(onSubmit)} loading={isLoading} variant='contained'>
        {t('save')}
       </Button>
      </FormSectionActions>
     </FormSectionContainer>
    </Fade>
   )}
  </Popper>
 );
};
