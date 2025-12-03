import { Tabs } from 'expo-router';
import { FontAwesome5 } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ 
      headerShown: false,
      tabBarActiveTintColor: '#0055ff',
      tabBarStyle: { paddingBottom: 5, height: 60 },
    }}>
      
      <Tabs.Screen
        name="index"
        options={{
          title: 'Início',
          tabBarIcon: ({ color }) => <FontAwesome5 name="home" size={24} color={color} />,
        }}
      />

      <Tabs.Screen
        name="diario/index"
        options={{
          title: 'Diário',
          tabBarIcon: ({ color }) => <FontAwesome5 name="book-open" size={24} color={color} />,
        }}
      />

      <Tabs.Screen
        name="receitas"
        options={{
          title: 'Receitas',
          tabBarIcon: ({ color }) => <FontAwesome5 name="utensils" size={24} color={color} />,
        }}
      />

      {/* --- NOVO: ABA SOBRE MIM --- */}
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