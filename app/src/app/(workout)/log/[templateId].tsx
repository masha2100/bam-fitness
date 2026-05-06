import { View, ActivityIndicator, Text, Pressable } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { useForm, FormProvider } from 'react-hook-form';
import { useAtomValue } from 'jotai';
import { useEffect, useState } from 'react';
import { useTemplateQuery } from '../../../hooks/api/useTemplateQuery';
import { useLogWorkoutMutation } from '../../../hooks/api/useLogWorkoutMutation';
import { ExerciseLogTable } from '../../../components/workout/ExerciseLogTable';
import { WorkoutHeader } from '../../../components/workout/WorkoutHeader';
import { WorkoutLogForm } from '../../../lib/validators/workoutLog';
import { timerStartAtAtom } from '../../../atoms/workoutTimer';

export default function WorkoutLogScreen() {
  const { templateId } = useLocalSearchParams<{ templateId: string }>();
  const { data, isLoading } = useTemplateQuery(templateId as string);
  const { mutate, isPending } = useLogWorkoutMutation();
  const timerStartAt = useAtomValue(timerStartAtAtom);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFormReady, setIsFormReady] = useState(false);
  const [hasAnyChecked, setHasAnyChecked] = useState(false);

  const methods = useForm<WorkoutLogForm>({
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

  // Відстежуємо галочки поточної вправи
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

  const handleNext = () => {
    if (isLastExercise) {
      const durationSec = timerStartAt
        ? Math.floor((Date.now() - timerStartAt) / 1000)
        : 0;
      mutate({ ...methods.getValues(), durationSec });
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
      <View style={{ flex: 1, backgroundColor: '#0D0D0D', alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator color="#C8956C" />
      </View>
    );
  }

  const currentExercise = data?.exercises[currentIndex];

  return (
    <FormProvider {...methods}>
      <View style={{ flex: 1, backgroundColor: '#0D0D0D', paddingHorizontal: 24 }}>

        <WorkoutHeader
          title={data?.name || ''}
          isValid={hasAnyChecked}
          onSave={() => {
            const durationSec = timerStartAt
              ? Math.floor((Date.now() - timerStartAt) / 1000)
              : 0;
            mutate({ ...methods.getValues(), durationSec });
          }}
          isSaving={isPending}
          onBack={handleBack}
        />

        <Text style={{ color: '#888888', fontSize: 12, textAlign: 'center', marginBottom: 16 }}>
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
          style={{
            backgroundColor: '#C8956C',
            borderRadius: 999,
            paddingVertical: 18,
            alignItems: 'center',
            marginTop: 'auto',
            marginBottom: 32,
            opacity: isPending ? 0.5 : 1,
          }}
        >
          <Text style={{ color: '#FFFFFF', fontWeight: 'bold', letterSpacing: 2 }}>
            {isLastExercise ? 'FINISH WORKOUT →' : 'NEXT EXERCISE →'}
          </Text>
        </Pressable>

      </View>
    </FormProvider>
  );
}