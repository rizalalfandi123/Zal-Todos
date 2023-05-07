import { useQuery } from 'react-query';
import { supabase } from '../config';
import { apiKey } from '../constants';

export const useProjects = () => {
 return useQuery({
  queryKey: [apiKey.projects],
  queryFn: async () => {
   const res = await supabase.from('projects').select('*');

   return res;
  },
 });
};
