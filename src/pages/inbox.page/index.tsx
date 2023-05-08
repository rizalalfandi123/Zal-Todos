import {
 apiKey,
 pathnames,
 ProjectState,
 queryClient,
 reorderSectionMap,
 supabase,
 t,
 Todo,
 useInitialProject,
 useProjectStore,
 useSectionMutation,
 useWebTitle,
} from '@utils';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Box, { BoxProps } from '@mui/material/Box';
import CardHeader from '@mui/material/CardHeader';
import Container, { ContainerProps } from '@mui/material/Container';
import ViewIcon from '@mui/icons-material/CalendarViewDayOutlined';
import Button from '@mui/lab/LoadingButton';
import { DragDropContext } from '@hello-pangea/dnd';
import { MemorizeTodoSection as TodoSection } from './todo-section';
import { useAuthStore } from '@utils';
import omitBy from 'lodash/omitBy';
import isEqual from 'lodash/isEqual';
import { shallow } from 'zustand/shallow';

import Popper, { PopperProps } from '@mui/material/Popper';
import Fade from '@mui/material/Fade';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import { SectionForm, sectionSchema } from '@schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { TextField } from '@components';
import { Database } from '@interfaces';
import { FormSection } from './section.form';

const removeUpdatedTodo = useProjectStore.getState().removeUpdatedTodo;

const VerticalTodoContainer = styled(Container)<ContainerProps>(({ theme }) => ({
 display: 'flex',
 gap: theme.spacing(1),
 flexDirection: 'column',
}));

const HorizaontalTodoContainer = styled(Box)<BoxProps>(({ theme }) => ({
 display: 'flex',
 justifyContent: 'flex-start',
 alignItems: 'flex-start',
 overflowX: 'auto',
 overflowY: 'hidden',
 gap: theme.spacing(1),
 width: '100%',
 minHeight: 'calc(100vh - 74px)',
}));

export const updateTodo = async ([key, todos]: [string, Todo[]]) => {
 todos.forEach(async (todo) => {
  await supabase.from('todos').update(todo).eq('id', todo.id);
 });

 removeUpdatedTodo(key);
};

useProjectStore.subscribe(
 (state) => state.updatedTodos,
 (state) => {
  Object.entries(state).forEach((data) => {
   updateTodo(data);
  });
 },
 { equalityFn: shallow }
);

export const InboxPage = () => {
 useWebTitle('Inbox');

 return (
  <Box display='flex' flex={1}>
   {/* <Box flex={0.5}>
    <QuoteApp initial={quoteMap} />
   </Box> */}

   <TodoVertical />
  </Box>
 );
};

const TodoVertical = () => {
 const [openSectionForm, setOpenSectionForm] = useState<boolean>(false);
 const [anchorElSectionForm, setAnchorElSectionForm] = useState<null | HTMLElement>(null);

 const user = useAuthStore((store) => store.session?.user);

 useInitialProject({ projectId: '44110a37-b2d2-4398-ae63-7ee056fe03b1', userId: user?.id ?? '' });

 const sections = useProjectStore((store) => store.getSections('44110a37-b2d2-4398-ae63-7ee056fe03b1'));

 const reorderTodos = useProjectStore((store) => store.reorderTodos);

 const handleClickOpenSectionForm = (event: React.MouseEvent<HTMLElement>) => {
  setAnchorElSectionForm(event.currentTarget);
  setOpenSectionForm((previousOpen) => !previousOpen);
 };

 const handleClickCloseSectionForm = () => {
  setAnchorElSectionForm(null);
  setOpenSectionForm((previousOpen) => !previousOpen);
 };

 return (
  <>
   <DragDropContext onDragEnd={reorderTodos}>
    <HorizaontalTodoContainer>
     {Object.entries(sections).map(([key, value]) => {
      return (
       <Box minWidth={(theme) => theme.additionalFields!.todoSectionWidth + 'px'} key={key}>
        <TodoSection todos={sections[key]['todos']} droppableId={key} title={value.title} />
       </Box>
      );
     })}

     <Box minWidth={(theme) => theme.additionalFields!.todoSectionWidth + 'px'}>
      <Button fullWidth variant='outlined' onClick={handleClickOpenSectionForm}>
       {t('addNewSection')}
      </Button>
     </Box>
    </HorizaontalTodoContainer>
   </DragDropContext>

   <FormSection open={openSectionForm} anchorEl={anchorElSectionForm} transition onClose={handleClickCloseSectionForm} />
  </>
 );
};

export default InboxPage;
