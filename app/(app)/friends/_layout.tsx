import { Stack, Tabs } from "expo-router";

export default function HomeLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen
        name="add"
        // options={{ presentation: "modal" }}
      />
    </Stack>
  );
}
