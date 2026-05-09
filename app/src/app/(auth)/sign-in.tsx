import { View, Text, TextInput, Pressable, ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSignInMutation } from '../../hooks/api/useSignInMutation';

const SignInSchema = z.object({
  email: z.string().email('Невалідний email'),
});

type SignInForm = z.infer<typeof SignInSchema>;

export default function SignInScreen() {
  const { mutate, isPending, error } = useSignInMutation();

  const { control, handleSubmit, formState: { errors } } = useForm<SignInForm>({
    resolver: zodResolver(SignInSchema),
  });

  const onSubmit = (data: SignInForm) => {
    mutate(data);
  };

  return (
  <KeyboardAvoidingView
    className="flex-1 bg-neutral-950"
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
  >
    <ScrollView
      contentContainerClassName="grow px-6 pb-12"
      keyboardShouldPersistTaps="handled"
    >
      <View className="items-center mt-16 mb-16">
        <Text className="text-white text-4xl font-bold tracking-widest">
          B A M
        </Text>
        <Text className="text-neutral-500 text-xs mt-1">
          @BAMLABS.USA
        </Text>
      </View>
      <Text className="text-white text-5xl font-bold mb-8">
        STAY{'\n'}PRESENT.{'\n'}TRY{'\n'}HARDER.
      </Text>

      <Text className="text-neutral-500 text-center text-xs mb-6">
        Enter to access BAM's exclusive exercise Training & Tracking experience.
      </Text>

      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, value } }) => (
          <View className={`bg-neutral-900 border rounded-xl px-4 py-4 mb-2 ${errors.email ? 'border-red-500' : 'border-neutral-800'}`}>
            <TextInput
              className="text-white text-base"
              placeholder="Your email"
              placeholderTextColor="#888888"
              value={value}
              onChangeText={onChange}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
        )}
      />

      {errors.email && (
        <Text className="text-red-500 text-xs mb-2">
          {errors.email.message}
        </Text>
      )}

      <Pressable
        onPress={handleSubmit(onSubmit)}
        disabled={isPending}
        className={`bg-neutral-900 border border-neutral-800 rounded-full py-4 items-center mb-6 ${isPending ? 'opacity-50' : 'opacity-100'}`}
      >
        {isPending ? (
          <ActivityIndicator color="#FFFFFF" />
        ) : (
          <Text className="text-white tracking-widest">CONTINUE →</Text>
        )}
      </Pressable>

      <Text className="text-neutral-500 text-xs text-center">
        By continuing, you agree to BAM Labs'{' '}
        <Text className="text-[#C8956C]">Terms of Service</Text>
        {' '}and{' '}
        <Text className="text-[#C8956C]">Privacy Policy.</Text>
      </Text>

    </ScrollView>
  </KeyboardAvoidingView>
);
}