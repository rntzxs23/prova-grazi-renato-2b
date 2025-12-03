import { Tabs } from 'expo-router';
// AQUI ESTAVA O ERRO: Precisamos importar o MaterialCommunityIcons também!
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ 
      headerShown: false,
      tabBarActiveTintColor: '#0055ff',
      tabBarStyle: { paddingBottom: 5, height: 60 },
    }}>
      
      {/* 1. HOME */}
      <Tabs.Screen
        name="index"
        options={{
          title: 'Início',
          tabBarIcon: ({ color }) => <FontAwesome5 name="home" size={24} color={color} />,
        }}
      />

      {/* 2. DIÁRIO */}
      <Tabs.Screen
        name="diario/index"
        options={{
          title: 'Diário',
          tabBarIcon: ({ color }) => <FontAwesome5 name="book-open" size={24} color={color} />,
        }}
      />

      {/* 3. RECEITAS */}
      <Tabs.Screen
        name="receitas"
        options={{
          title: 'Receitas',
          tabBarIcon: ({ color }) => <FontAwesome5 name="utensils" size={24} color={color} />,
        }}
      />

      {/* 4. JEJUM (NOVA) */}
      <Tabs.Screen
        name="jejum"
        options={{
          title: 'Jejum',
          // Agora vai funcionar porque importamos o MaterialCommunityIcons lá em cima
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="timer-outline" size={26} color={color} />,
        }}
      />

      {/* 5. PERFIL */}
      <Tabs.Screen
        name="sobre"
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color }) => <FontAwesome5 name="user-alt" size={24} color={color} />,
        }}
      />

    </Tabs>
  );
}