// Import the Stack component from 'expo-router', which handles navigating between screens by stacking them on top of each other.
import { Stack } from 'expo-router';

// This is the main Layout component that wraps our entire application.
export default function RootLayout() {
  return (
    // The Stack component is our navigator. 
    // screenOptions={{ headerShown: false }} tells the navigator to hide the default top header bar on all screens.
    <Stack screenOptions={{ headerShown: false }}>
      
      {/* This defines our first screen, which maps to the index.tsx file */}
      <Stack.Screen name="index" />
      
      {/* This defines our main home screen, which maps to the home.tsx file */}
      <Stack.Screen name="home" />
      
    </Stack>
  );
}
