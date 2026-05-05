import { useQuery } from '@tanstack/react-query';
import { qk } from '../../lib/queryKeys';
import { getRoutines } from '../../api/workout';

export const useRoutinesQuery = () => {
  return useQuery({
    queryKey: qk.workout.routines(),
    queryFn: getRoutines,
    staleTime: 5 * 60_000,
  });
};