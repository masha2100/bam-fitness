import { useQuery } from '@tanstack/react-query';
import { qk } from '../../lib/queryKeys';
import { getRoutine } from '../../api/workout';

export const useTemplateQuery = (id: string) => {
  return useQuery({
    queryKey: qk.workout.routine(id),
    queryFn: () => getRoutine(id),
    staleTime: 5 * 60_000,
  });
};