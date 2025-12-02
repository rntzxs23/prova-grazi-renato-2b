import { Stack } from "expo-router";
import { CaloriesProvider } from "../caloriesContext";

export default function RootLayout() {
  return (
    <CaloriesProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </CaloriesProvider>
  );
}
