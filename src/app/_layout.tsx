import { Stack } from 'expo-router';
import { AuthProvider } from '../context/AuthContext';
import { ProductProvider } from '../context/ProductContext';

export default function RootLayout() {
  return (
    <AuthProvider>
      <ProductProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="login" />
          <Stack.Screen name="home" />
          <Stack.Screen name="admin" />
        </Stack>
      </ProductProvider>
    </AuthProvider>
  );
}
