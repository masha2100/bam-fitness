import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';
import { router } from 'expo-router';
import { apiClient } from '../../api/client';
import { qk } from '../../lib/queryKeys';
import { stopTimerAtom } from '../../atoms/workoutTimer';
import { HomeResponse } from '../../api/user';

type WorkoutLogRequest = {
  templateId: string;
  durationSec: number;
  exercises: {
    id: string;
    sets: { reps: number; weight: number; completed: boolean }[];
  }[];
};

export const useLogWorkoutMutation = () => {
  const queryClient = useQueryClient();
  const stopTimer = useSetAtom(stopTimerAtom);

  return useMutation({
    mutationFn: async (data: WorkoutLogRequest) => {
      const response = await apiClient.post('/api/workout/log', data);
      return response.data;
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: qk.user.home() });
      const previous = queryClient.getQueryData<HomeResponse>(qk.user.home());

      queryClient.setQueryData<HomeResponse>(qk.user.home(), (old) => {
        if (!old) return old;
        return {
          ...old,
          goalProgress: {
            ...old.goalProgress,
            completed: old.goalProgress.completed + 1,
          },
        };
      });

      return { previous };
    },

    onError: (err, variables, context) => {
      if (context?.previous) {
        queryClient.setQueryData(qk.user.home(), context.previous);
      }
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: qk.user.home() });
      stopTimer();
      router.replace('/(tabs)');
    },
  });
};