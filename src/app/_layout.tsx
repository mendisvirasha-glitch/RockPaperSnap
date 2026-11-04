import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#FF6347',
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Play Game',
          tabBarIcon: ({ color }) => (
            <Ionicons
              name="game-controller"
              size={24}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="rules"
        options={{
          title: 'Rules',
          tabBarIcon: ({ color }) => (
            <Ionicons
              name="information-circle"
              size={24}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}