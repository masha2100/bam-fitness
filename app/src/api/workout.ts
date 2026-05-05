import { apiClient } from './client';

export type Routine = {
  id: string;
  name: string;
  exerciseCount: number;
  estimatedMinutes: number;
};

export type DefaultSet = { reps: number; weight: number };

export type Exercise = {
  id: string;
  name: string;
  tags: string[];
  defaultSets: DefaultSet[];
};

export type RoutineDetail = {
  id: string;
  name: string;
  exercises: Exercise[];
};

export const getRoutines = async (): Promise<Routine[]> => {
  const response = await apiClient.get('/api/workout/routines');
  return response.data;
};

export const getRoutine = async (id: string): Promise<RoutineDetail> => {
  const response = await apiClient.get(`/api/workout/routine/${id}`);
  return response.data;
};