import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: "blue" }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Diário",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="book" color="black" />
          ),
          headerShown: false,
        }}
      />
       <Tabs.Screen
        name="receitas"
        options={{
          title: 'Receitas',
          tabBarIcon: ({ color }) => 
          <MaterialCommunityIcons name="chef-hat" size={24} color="black" />,
          headerShown: false,
        }}
      />
    </Tabs>
    
  );
}
