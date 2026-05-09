import { View, ActivityIndicator, Text, Pressable } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAtomValue } from 'jotai';
import { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTemplateQuery } from '../../../hooks/api/useTemplateQuery';
import { useLogWorkoutMutation } from '../../../hooks/api/useLogWorkoutMutation';
import { ExerciseLogTable } from '../../../components/workout/ExerciseLogTable';
import { WorkoutHeader } from '../../../components/workout/WorkoutHeader';
import { WorkoutLogForm, WorkoutLogSchema } from '../../../lib/validators/workoutLog';
import { timerStartAtAtom } from '../../../atoms/workoutTimer';

export default function WorkoutLogScreen() {
  const { templateId } = useLocalSearchParams<{ templateId: string }>();
  const { data, isLoading } = useTemplateQuery(templateId as string);
  const { mutate, isPending } = useLogWorkoutMutation();
  const timerStartAt = useAtomValue(timerStartAtAtom);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFormReady, setIsFormReady] = useState(false);
  const [hasAnyChecked, setHasAnyChecked] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const methods = useForm<WorkoutLogForm>({
    resolver: zodResolver(WorkoutLogSchema),
    mode: 'onChange',
    defaultValues: {
      templateId: templateId as string,
      durationSec: 0,
      exercises: [],
    },
  });

  useEffect(() => {
    if (data && data.exercises.length > 0) {
      methods.reset({
        templateId: templateId as string,
        durationSec: 0,
        exercises: data.exercises.map((exercise) => ({
          id: exercise.id,
          sets: exercise.defaultSets.map((set) => ({
            reps: set.reps,
            weight: set.weight,
            completed: false,
          })),
        })),
      });
      setIsFormReady(true);
    }
  }, [data?.id]);

  useEffect(() => {
    const subscription = methods.watch((value) => {
      const currentExercise = value.exercises?.[currentIndex];
      const anyChecked = currentExercise?.sets?.some(s => s?.completed) ?? false;
      setHasAnyChecked(anyChecked);
    });
    return () => subscription.unsubscribe();
  }, [currentIndex, methods]);

  const isLastExercise = data
    ? currentIndex === data.exercises.length - 1
    : false;

  const handleFinishWorkout = () => {
  const durationSec = timerStartAt
    ? Math.floor((Date.now() - timerStartAt) / 1000)
    : 0;
  mutate(
    { ...methods.getValues(), durationSec },
    {
      onSuccess: () => {
        setShowModal(false);
        router.replace('/(tabs)');
      },
    }
  );
};

  const handleNext = () => {
    if (isLastExercise) {
      setShowModal(true);
    } else {
      setCurrentIndex(prev => prev + 1);
      setHasAnyChecked(false);
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    } else {
      router.back();
    }
  };

  if (isLoading || !isFormReady) {
    return (
      <View className="flex-1 bg-neutral-950 items-center justify-center">
        <ActivityIndicator color="#C8956C" />
      </View>
    );
  }

  const currentExercise = data?.exercises[currentIndex];

  return (
    <FormProvider {...methods}>
      <SafeAreaView className="flex-1 bg-neutral-950">
        <View className="flex-1 px-6">

          <WorkoutHeader
            title={data?.name || ''}
            isValid={isFormReady && methods.formState.isValid}
            onSave={() => setShowModal(true)}
            isSaving={isPending}
            onBack={handleBack}
          />

          <Text className="text-neutral-500 text-xs text-center mb-4">
            EXERCISES {currentIndex + 1}/{data?.exercises.length}
          </Text>

          {currentExercise && (
            <ExerciseLogTable
              exercises={[currentExercise]}
              exerciseStartIndex={currentIndex}
            />
          )}

          <Pressable
            onPress={handleNext}
            disabled={isPending}
            className={`bg-[#C8956C] rounded-full py-5 items-center mt-auto mb-8 ${isPending ? 'opacity-50' : 'opacity-100'}`}
          >
            <Text className="text-white font-bold tracking-widest">
              {isLastExercise ? 'FINISH WORKOUT →' : 'NEXT EXERCISE →'}
            </Text>
          </Pressable>

        </View>

        {showModal && (
  <View className="absolute top-0 left-0 right-0 bottom-0 bg-black/70 items-center justify-center px-6">
    <View className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 w-full">
      <Text className="text-white text-lg font-bold text-center mb-2">
        Finish Workout?
      </Text>
      <Text className="text-neutral-500 text-sm text-center mb-6">
        Are you sure you want to finish the workout?
      </Text>
      <Pressable
        onPress={handleFinishWorkout}
        disabled={isPending}
        className={`bg-[#C8956C] rounded-full py-4 items-center mb-3 ${isPending ? 'opacity-50' : 'opacity-100'}`}
      >
        <Text className="text-white font-bold tracking-widest">
          FINISH →
        </Text>
      </Pressable>
      <Pressable
        onPress={() => setShowModal(false)}
        className="items-center py-4"
      >
        <Text className="text-neutral-500">Cancel</Text>
      </Pressable>
    </View>
  </View>
)}

      </SafeAreaView>
    </FormProvider>
  );
}