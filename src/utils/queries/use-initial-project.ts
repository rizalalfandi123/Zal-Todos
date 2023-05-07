import type { PostgrestSingleResponse } from '@supabase/supabase-js';
import type { UseQueryOptions, UseQueryResult } from 'react-query';
import type { Project, ProjectState, Section, Todo } from '../services';

import { useQuery } from 'react-query';

import { supabase } from '../config';
import { apiKey } from '../constants';
import { useProjectStore } from '../services';

type SectionsResponse = PostgrestSingleResponse<Section[]>;

type ProjectsResponse = PostgrestSingleResponse<Project[]>;

type TodosResponse = PostgrestSingleResponse<Todo[]>;

interface UseInitialProjectArgs extends Partial<UseQueryOptions<[SectionsResponse, TodosResponse, ProjectsResponse]>> {
 projectId: string;
 userId: string;
}

type UseInitialProject = (args: UseInitialProjectArgs) => UseQueryResult<[SectionsResponse, TodosResponse, ProjectsResponse]>;

const initProject = useProjectStore.getState().initProject;

export const useInitialProject: UseInitialProject = (args) => {
 const { projectId, userId, ...otherQueryOptions } = args;

 return useQuery<[SectionsResponse, TodosResponse, ProjectsResponse]>({
  queryKey: [apiKey.sections],

  queryFn: async () => {
   const projectsResponse = await supabase.from('projects').select('*').eq('id', projectId).eq('userId', userId);

   const sectionsResponse = await supabase.from('sections').select().eq('projectId', projectId).eq('userId', userId);

   const todosResponse = await supabase.from('todos').select().eq('projectId', projectId).eq('userId', userId);

   return [sectionsResponse, todosResponse, projectsResponse];
  },

  staleTime: Infinity,

  cacheTime: Infinity,

  onSuccess: ([sectionsResponse, todosResponse, projectsResponse]) => {
   if (projectsResponse.data && projectsResponse.data[0]) {
    const projectState: ProjectState = {
     ...projectsResponse.data[0],
     sections: {},
    };

    if (sectionsResponse.data) {
     sectionsResponse.data.forEach((section) => {
      projectState.sections[section.id] = { ...section, todos: [] };
     });
    }

    if (todosResponse.data) {
     todosResponse.data.forEach((todo) => {
      projectState.sections[todo.sectionId].todos.push(todo);
     });
    }

    initProject(projectState);
   }
  },

  ...otherQueryOptions,
 });
};
