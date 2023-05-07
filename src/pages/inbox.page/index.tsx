import { apiKey, pathnames, ProjectState, queryClient, reorderSectionMap, supabase, Todo, useInitialProject, useProjectStore, useWebTitle } from '@utils';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Box, { BoxProps } from '@mui/material/Box';
import CardHeader from '@mui/material/CardHeader';
import Container, { ContainerProps } from '@mui/material/Container';
import ViewIcon from '@mui/icons-material/CalendarViewDayOutlined';
import Button from '@mui/material/Button';
import { DragDropContext} from '@hello-pangea/dnd';
import { MemorizeTodoSection as TodoSection } from './todo-section';
import { useAuthStore } from '@utils';
import omitBy from 'lodash/omitBy';
import isEqual from 'lodash/isEqual';
import { shallow } from 'zustand/shallow';

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

export const updateTodo = async (todo: Todo) => {
 const { error } = await supabase.from('todos').update(todo).eq('id', todo.id);

 if (!error) {
  removeUpdatedTodo(todo);
 }
};

useProjectStore.subscribe(
 (state) => state.updatedTodos,
 (state) => {
  //   console.log({ state });
  state.forEach(async (todo) => {
   await updateTodo(todo);
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
 //  const [data, setData] = useState<TodoMap>(dataTodo);

 //  setProjects([{ id: '44110a37-b2d2-4398-ae63-7ee056fe03b1' }] as any);

 const user = useAuthStore((store) => store.session?.user);

 useInitialProject({ projectId: '44110a37-b2d2-4398-ae63-7ee056fe03b1', userId: user?.id ?? '' });

 const sections = useProjectStore((store) => store.getSections('44110a37-b2d2-4398-ae63-7ee056fe03b1'));

 const reorderTodos = useProjectStore((store) => store.reorderTodos);

 

 return (
  <DragDropContext onDragEnd={reorderTodos}>
   <HorizaontalTodoContainer>
    {Object.entries(sections).map(([key, value]) => {
     return (
      <Box width='358px' key={key}>
       <TodoSection todos={sections[key]['todos']} droppableId={key} title={value.title} />
      </Box>
     );
    })}
   </HorizaontalTodoContainer>
  </DragDropContext>
 );
};

export default InboxPage;
