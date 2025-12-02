// app/_layout.js
import { Stack } from "expo-router";
import { CaloriesProvider } from "../caloriesContext"; // Mantenha seu provider

export default function RootLayout() {
  return (
    <CaloriesProvider>
      {/* Removemos o screenOptions={{headerShown: false}} global para evitar bloquear telas novas */}
      <Stack>
        
        {/* As abas (tabs) não devem ter cabeçalho em cima */}
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

        {/* A sua nova página DEVE ser declarada aqui */}
        <Stack.Screen 
          name="paginax/index" 
          options={{ title: 'Receitas', headerShown: true, headerBackTitle: 'Voltar' }} 
        />
        
        <Stack.Screen 
          name="paginax/[id]" 
          options={{ title: 'Detalhes', headerShown: true, headerBackTitle: 'Voltar' }} 
        />

      </Stack>
    </CaloriesProvider>
  );
}