import type { UseQueryOptions, UseQueryResult } from 'react-query';
import type { ProjectState } from '../services';

import { useQuery } from 'react-query';

import { supabase } from '../config';
import { apiKey } from '../constants';
import { useProjectStore } from '../services';

const getProject = async ({ projectId, userId }: { projectId: string; userId: string }) => {
 return await supabase.from('projects').select('*, sections(*, todos(*))').eq('id', projectId).eq('userId', userId);
};

type ProjectsResponse = Awaited<ReturnType<typeof getProject>>;

interface UseInitialProjectArgs extends Partial<UseQueryOptions<ProjectsResponse>> {
 projectId: string;
 userId: string;
}

type UseInitialProject = (args: UseInitialProjectArgs) => UseQueryResult<ProjectsResponse>;

const initProject = useProjectStore.getState().initProject;

export const useInitialProject: UseInitialProject = (args) => {
 const { projectId, userId, ...otherQueryOptions } = args;

 return useQuery<ProjectsResponse>({
  queryKey: [apiKey.projects, projectId],

  queryFn: () => getProject({ projectId, userId }),

  staleTime: Infinity,

  cacheTime: Infinity,

  onSuccess: (projectsResponse) => {
   if (projectsResponse.data && projectsResponse.data[0]) {
    const { sections, ...projectData } = projectsResponse.data[0];
    const projectState: ProjectState = { ...projectData, sections: {} };

    if (sections && Array.isArray(sections)) {
     const sectionMap = sections.reduce((result, current) => {
      return Object.assign(result, { [current.id]: current });
     }, {});

     projectState.sections = sectionMap;
    }

    initProject(projectState);
   }
  },

  ...otherQueryOptions,
 });
};
