import { Stack } from "expo-router";
import { CaloriesProvider } from "../caloriesContext"; 

export default function RootLayout() {
  return (
    <CaloriesProvider>
      <Stack>
        
        {/* 1. As abas principais (Home, etc) - SEM cabeçalho */}
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

     

        {/* 3. Selecionar Alimento - SEM cabeçalho (Adicionei esta linha) */}
        {/* Confirme se a pasta chama 'selecionarAlimento' ou 'selecionar' e ajuste o name abaixo se precisar */}
        <Stack.Screen name="selecionarAlimento/index" options={{ headerShown: false }} />


        {/* --- ROTAS DAS RECEITAS (Que fizemos antes) --- */}
        {/* Essas nós deixamos COM cabeçalho (true) para ter a setinha de voltar */}
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