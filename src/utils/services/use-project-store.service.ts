import { Database } from '@interfaces';
import { create } from 'zustand';
import { devtools, subscribeWithSelector } from 'zustand/middleware';
import { produce } from 'immer';
import { reduxDevtoolOptions, storeNames } from '../constants';
import { OnDragEndResponder } from '@hello-pangea/dnd';

export type Project = Database['public']['Tables']['projects']['Row'];

export type Section = Database['public']['Tables']['sections']['Row'];

export type Todo = Database['public']['Tables']['todos']['Row'];

export type SectionMap = ProjectState['sections'];

export interface SectionState extends Section {
 todos: Todo[];
}

export interface ProjectState extends Project {
 sections: { [sectionId: string]: SectionState };
}

export interface UseProjectState {
 projects: { [projectId: string]: ProjectState };

 updatedTodos: Todo[];

 initProject: (project: ProjectState) => void;

 getSections: (projectId: Project['id']) => SectionMap;

 setUpdatedTodos: (todos: Todo[]) => void;

 removeUpdatedTodo: (todo: Todo) => void;

 setCompleteTodo: (todo: Todo) => void;

 reorderTodos: OnDragEndResponder;
}

const initialProjectValue: UseProjectState['projects'] = {};

export const useProjectStore = create<UseProjectState>()(
 devtools(
  subscribeWithSelector<UseProjectState>((set, get) => {
   const initProject: UseProjectState['initProject'] = (project) => {
    set(
     produce<UseProjectState>((state) => {
      state.projects[project.id] = project;
     })
    );
   };

   const getSections: UseProjectState['getSections'] = (projectId) => {
    return get().projects[projectId] ? get().projects[projectId]['sections'] : {};
   };

   const setUpdatedTodos: UseProjectState['setUpdatedTodos'] = (todos) => {
    set(
     produce<UseProjectState>((state) => {
      state.updatedTodos = state.updatedTodos.concat(todos);
     })
    );
   };

   const removeUpdatedTodo: UseProjectState['removeUpdatedTodo'] = (removedTodo) => {
    set(
     produce<UseProjectState>((state) => {
      state.updatedTodos = state.updatedTodos.filter((todo) => todo.id !== removedTodo.id);
     })
    );
   };

   const setCompleteTodo: UseProjectState['setCompleteTodo'] = (newTodo) => {
    set(
     produce<UseProjectState>((state) => {
      const nextTodos = state.projects[newTodo.projectId].sections[newTodo.sectionId].todos.map((todo) => {
       if (todo.id === newTodo.id) {
        const updatedTodo = { ...todo, isComplete: !todo.isComplete };
        state.updatedTodos.push(updatedTodo);
        return updatedTodo;
       }

       return todo;
      });

      state.projects[newTodo.projectId].sections[newTodo.sectionId].todos = nextTodos;
     })
    );
   };

   const reorderTodos: UseProjectState['reorderTodos'] = (dragUpdate) => {
    const { destination, source } = dragUpdate;

    // ! dropped outside the list
    if (!destination) {
     return undefined;
    }

    set(
     produce<UseProjectState>((state) => {
      const current: Todo[] = state.projects['44110a37-b2d2-4398-ae63-7ee056fe03b1'].sections[source.droppableId].todos;

      const next: Todo[] = state.projects['44110a37-b2d2-4398-ae63-7ee056fe03b1'].sections[destination.droppableId].todos;

      const target: Todo = current[source.index];

      // TODO: Moving same list
      if (source.droppableId === destination.droppableId) {
       orderTodos({
        todos: current,
        endIndex: destination.index,
        startIndex: source.index,
       });
      } else {
       // TODO: Moving difference list

       // !: Update sectionId in target
       target['sectionId'] = destination.droppableId;

       // !: Remove element from original list
       current.splice(source.index, 1);

       // !: Insert element into next list
       next.splice(destination.index, 0, target);

       const elementsAfterTarget = next.slice(destination.index, next.length);

       console.log({ elementsAfterTarget });

       state.updatedTodos = state.updatedTodos.concat(elementsAfterTarget);
      }
     })
    );
   };

   return {
    projects: initialProjectValue,
    getSections,
    updatedTodos: [],
    setUpdatedTodos,
    removeUpdatedTodo,
    setCompleteTodo,
    reorderTodos,
    initProject,
   };
  }),

  {
   store: storeNames.projects,
   ...reduxDevtoolOptions,
  }
 )
);

export function orderTodos(args: { todos: Todo[]; startIndex: number; endIndex: number }): Todo[] {
 const { todos, startIndex, endIndex } = args;

 // TODO: pick removed element
 const [pickElement] = todos.splice(startIndex, 1);

 todos.splice(endIndex, 0, pickElement);

 todos.forEach((_, index) => {
  return (todos[index].index = index);
 });

 return todos;
}
