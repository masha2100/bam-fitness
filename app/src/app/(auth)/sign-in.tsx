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
      style={{ flex: 1, backgroundColor: '#0D0D0D' }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 24, paddingBottom: 48, justifyContent: 'flex-end' }}
        keyboardShouldPersistTaps="handled"
      >
  
        <View style={{ position: 'absolute', top: 80, left: 0, right: 0, alignItems: 'center' }}>
          <Text style={{ color: '#FFFFFF', fontSize: 32, fontWeight: 'bold', letterSpacing: 8 }}>
            B A M
          </Text>
          <Text style={{ color: '#888888', fontSize: 12, marginTop: 4 }}>
            @BAMLABS.USA
          </Text>
        </View>

        <Text style={{ color: '#FFFFFF', fontSize: 40, fontWeight: 'bold', marginBottom: 32 }}>
          STAY{'\n'}PRESENT.{'\n'}TRY{'\n'}HARDER.
        </Text>

     
        <Text style={{ color: '#888888', textAlign: 'center', fontSize: 12, marginBottom: 24 }}>
          Enter to access BAM's exclusive exercise Training & Tracking experience.
        </Text>
<Controller
  control={control}
  name="email"
  render={({ field: { onChange, value } }) => (
    <View style={{ backgroundColor: '#1A1A1A', borderWidth: 1, borderColor: errors.email ? '#FF4444' : '#2A2A2A', borderRadius: 12, paddingHorizontal: 16, paddingVertical: 16, marginBottom: 8 }}>
      <TextInput
        style={{ color: '#FFFFFF', fontSize: 16 }}
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
  <Text style={{ color: '#FF4444', fontSize: 12, marginBottom: 8 }}>
    {errors.email.message}
  </Text>
)}
        <Pressable
          onPress={handleSubmit(onSubmit)}
          disabled={isPending}
          style={{ backgroundColor: '#1A1A1A', borderWidth: 1, borderColor: '#2A2A2A', borderRadius: 999, paddingVertical: 16, alignItems: 'center', marginBottom: 24, opacity: isPending ? 0.5 : 1 }}
        >
          {isPending ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={{ color: '#FFFFFF', letterSpacing: 4 }}>CONTINUE →</Text>
          )}
        </Pressable>

        <Text style={{ color: '#888888', fontSize: 10, textAlign: 'center' }}>
          By continuing, you agree to BAM Labs'{' '}
          <Text style={{ color: '#C8956C' }}>Terms of Service</Text>
          {' '}and{' '}
          <Text style={{ color: '#C8956C' }}>Privacy Policy.</Text>
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}