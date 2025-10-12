import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import {
  KeyboardAvoidingView,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Register } from './Register';
import { login } from 'ApiCall/AuthApis';
import { useMutation } from '@tanstack/react-query';

export function Login() {
  const navigation = useNavigation();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [signUp, setSignUp] = useState(false);

  const mutation = useMutation({
    mutationKey: ['User-login'],
    mutationFn: login,
    onSuccess: () => {
      console.log("how kya");
      navigation.navigate('Home');
    },
    onError: (error) => {
     console.log("nahi aar",+error);
    },
  });
  const handleLogin = () => {
    if (email && password) {
      console.log("chal rha hain");
      console.log("frontend email",email);
      mutation.mutate({ email, password });
      console.log("frontend password",password);
    } else {
      alert('Please enter email and password');
    }
  };
if(mutation.isPending){
  console.log("wait");
}
  return (
    <SafeAreaView>
      <KeyboardAvoidingView
        behavior="padding"
        className="mt-10 flex h-screen items-center gap-4 p-4">
        {signUp ? (
          <Register />
        ) : (
          <>
            <View className="min-h-2/5 flex w-full flex-col items-center justify-between gap-4 rounded-xl bg-white/20  p-5 backdrop-blur-xl">
              <View className="flex flex-col items-center gap-2">
                <Text className="text-3xl text-zinc-100">Welcome Back!</Text>
                <Text className="text-xl">Sign in to continue</Text>
              </View>
              <View className="flex w-full flex-col gap-4 text-lg ">
                <Text>Email</Text>
                <TextInput
                  placeholder="Email"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  className="w-full rounded-lg border-2 border-zinc-50 p-2 text-lg text-white focus:border-zinc-500"
                />
                <Text>Email</Text>
                <TextInput
                  placeholder="Password"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                  className="w-full rounded-lg border-2 border-zinc-50 p-2 text-white focus:border-zinc-500"
                />
              </View>

              <TouchableOpacity onPress={handleLogin}>
                <Text>Login</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
        <TouchableOpacity onPress={() => setSignUp(!signUp)}>
          <Text>Don't have an account? Sign up</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
