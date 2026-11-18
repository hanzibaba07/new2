import { Stack } from 'expo-router';
import { Providers } from '../context/Providers';

export default function RootLayout() {
  return (
    <Providers>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(public)" />
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(member)" />
      </Stack>
    </Providers>
  );
}