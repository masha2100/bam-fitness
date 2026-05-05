import { useState } from 'react';
import { View } from 'react-native';
import { Pressable } from 'react-native';
import {
  VStack,
  Text,
  Input,
  InputField,
  Button,
  ButtonText,
} from '@gluestack-ui/themed';

export default function SignInScreen() {
  const [email, setEmail] = useState('');

  return (
    <View style={{ flex: 1, backgroundColor: '#0D0D0D', paddingHorizontal: 24, paddingBottom: 48, justifyContent: 'flex-end' }}>

      {/* LOGO */}
      <VStack position="absolute" top={80} left={0} right={0} alignItems="center">
        <Text color="$white" fontSize={32} fontWeight="bold" letterSpacing={8}>
          B A M
        </Text>
        <Text color="$coolGray400" fontSize={12} marginTop={4}>
          @BAMLABS.USA
        </Text>
      </VStack>

      {/* TITLE */}
      <Text color="$white" fontSize={40} fontWeight="bold" marginBottom={32}>
        STAY{'\n'}PRESENT.{'\n'}TRY{'\n'}HARDER.
      </Text>

      {/* DESCRIPTION */}
      <Text color="$coolGray400" textAlign="center" fontSize={12} marginBottom={24}>
        Enter to access BAM's exclusive exercise Training & Tracking experience.
      </Text>

      {/* INPUT */}
      <Input
        backgroundColor="#1A1A1A"
        borderColor="#2A2A2A"
        borderWidth={1}
        borderRadius={12}
        paddingHorizontal={16}
        paddingVertical={12}
        marginBottom={16}
      >
        <InputField
          placeholder="Your email"
          placeholderTextColor="#888888"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          color="#FFFFFF"
        />
      </Input>

     <Pressable
  style={{
    width: '100%',
    backgroundColor: '#1A1A1A',
    borderColor: '#2A2A2A',
    borderWidth: 1,
    borderRadius: 999,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 24,
    opacity: email.length > 0 ? 1 : 0.5,
  }}
>
  <Text style={{ color: '#FFFFFF', letterSpacing: 2 }}>
    CONTINUE →
  </Text>
</Pressable>

      {/* FOOTER */}
      <Text color="$coolGray400" fontSize={10} textAlign="center">
        By continuing, you agree to BAM Labs'{' '}
        <Text color="#C8956C">Terms of Service</Text>{' '}
        and{' '}
        <Text color="#C8956C">Privacy Policy.</Text>
      </Text>
    </View>
  );
}