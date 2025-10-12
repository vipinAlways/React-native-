// components/Register.js
import { useNavigation } from '@react-navigation/native';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getAlluser, signUp, checkServerHealth } from '../ApiCall/AuthApis';
import { useState, useEffect } from 'react';
import { 
  Text, 
  TextInput, 
  TouchableOpacity, 
  View, 
  Alert,
  ActivityIndicator 
} from 'react-native';

export function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [serverStatus, setServerStatus] = useState('checking');
  
  const navigation = useNavigation();

  // Check server health on component mount
  useEffect(() => {
    checkServerHealth()
      .then(isHealthy => {
        setServerStatus(isHealthy ? 'online' : 'offline');
      })
      .catch(() => setServerStatus('offline'));
  }, []);

  // Get all users query (optional, for testing)
  const { data: allUsers, isPending: isLoadingUsers, error: usersError } = useQuery({
    queryKey: ["getAllUsers"],
    queryFn: getAlluser,
    enabled: serverStatus === 'online', // Only run if server is online
    retry: 2,
    retryDelay: 1000,
  });

  // Registration mutation
  const mutation = useMutation({
    mutationKey: ['User-register'],
    mutationFn: signUp,
    onSuccess: (data) => {
      console.log("Registration successful:", data);
      Alert.alert(
        'Success', 
        'Registration successful!', 
        [{ text: 'OK', onPress: () => navigation.navigate('Home') }]
      );
    },
    onError: (error) => {
      console.error("Registration failed:", error.message);
      Alert.alert('Registration Failed', error.message);
    },
  });

  const handleRegister = () => {
    // Validation
    if (!username || !email || !password || !confirmPassword) {
      Alert.alert('Validation Error', 'Please fill all fields');
      return;
    }
    
    if (password !== confirmPassword) {
      Alert.alert('Validation Error', 'Passwords do not match');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Validation Error', 'Password must be at least 6 characters long');
      return;
    }

    if (serverStatus === 'offline') {
      Alert.alert('Server Offline', 'Cannot connect to server. Please check if your backend is running.');
      return;
    }

    console.log("Attempting registration with:", { username, email });
    mutation.mutate({ username, email, password });
  };

  // Server status indicator
  const ServerStatus = () => (
    <View className="flex-row items-center justify-center mb-2">
      <View 
        className={`w-2 h-2 rounded-full mr-2 ${
          serverStatus === 'online' ? 'bg-green-500' : 
          serverStatus === 'offline' ? 'bg-red-500' : 'bg-yellow-500'
        }`} 
      />
      <Text className="text-sm text-zinc-300">
        Server: {serverStatus === 'checking' ? 'Checking...' : serverStatus}
      </Text>
    </View>
  );

  // Loading state
  if (isLoadingUsers && serverStatus === 'online') {
    return (
      <View className="min-h-3/5 flex w-full flex-col items-center justify-center gap-3 rounded-xl bg-white/20 p-5 backdrop-blur-xl">
        <ActivityIndicator size="large" color="#ffffff" />
        <Text className="text-white">Loading...</Text>
      </View>
    );
  }

  return (
    <View className="min-h-3/5 flex w-full flex-col items-center justify-between gap-3 rounded-xl bg-white/20 p-5 backdrop-blur-xl">
      <View className="flex flex-col items-center gap-2">
        <Text className="text-3xl text-zinc-100">Welcome!</Text>
        <Text className="text-xl text-zinc-300">Register to continue</Text>
        <ServerStatus />
        {usersError && (
          <Text className="text-red-300 text-sm">
            API Error: {usersError.message}
          </Text>
        )}
      </View>

      <View className="flex w-full flex-col gap-4 text-lg">
        <Text className="text-zinc-200">User Name</Text>
        <TextInput
          placeholder="Enter username"
          placeholderTextColor="#a1a1aa"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
          className="w-full rounded-lg border-2 border-zinc-50 p-3 text-lg text-white focus:border-zinc-500"
        />

        <Text className="text-zinc-200">Email</Text>
        <TextInput
          placeholder="Enter email"
          placeholderTextColor="#a1a1aa"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          className="w-full rounded-lg border-2 border-zinc-50 p-3 text-lg text-white focus:border-zinc-500"
        />

        <Text className="text-zinc-200">Password</Text>
        <TextInput
          placeholder="Enter password"
          placeholderTextColor="#a1a1aa"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          className="w-full rounded-lg border-2 border-zinc-50 p-3 text-lg text-white focus:border-zinc-500"
        />

        <Text className="text-zinc-200">Confirm Password</Text>
        <TextInput
          placeholder="Confirm password"
          placeholderTextColor="#a1a1aa"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          className="w-full rounded-lg border-2 border-zinc-50 p-3 text-lg text-white focus:border-zinc-500"
        />
      </View>

      <TouchableOpacity 
        onPress={handleRegister} 
        disabled={mutation.isPending || serverStatus === 'offline'}
        className={`w-full py-4 rounded-lg ${
          mutation.isPending || serverStatus === 'offline' 
            ? 'bg-gray-500' 
            : 'bg-blue-600 hover:bg-blue-700'
        }`}
      >
        {mutation.isPending ? (
          <ActivityIndicator color="#ffffff" />
        ) : (
          <Text className="text-white text-lg font-semibold text-center">
            Register
          </Text>
        )}
      </TouchableOpacity>

      {/* Debug info (remove in production) */}
      {__DEV__ && allUsers && (
        <Text className="text-xs text-zinc-400">
          Debug: Found {Array.isArray(allUsers) ? allUsers.length : 'N/A'} users
        </Text>
      )}
    </View>
  );
}