import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, StyleSheet } from 'react-native';

import ChatsScreen from '../screens/ChatsScreen';
import ContactsScreen from '../screens/ContactsScreen';
import GroupsScreen from '../screens/GroupsScreen';
import ChannelsScreen from '../screens/ChannelsScreen';
import SettingsScreen from '../screens/SettingsScreen';
import ChatScreen from '../screens/ChatScreen';
import { colors } from '../utils/theme';
import { RootStackParamList, MainTabParamList } from '../types';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

const TabIcon: React.FC<{ label: string; emoji: string; focused: boolean }> = ({ label, emoji, focused }) => (
  <View style={styles.tabIconContainer}>
    <Text style={styles.tabEmoji}>{emoji}</Text>
    <Text style={[styles.tabLabel, { color: focused ? colors.primary : colors.textMuted }]}>{label}</Text>
  </View>
);

const MainTabs = () => (
  <Tab.Navigator
    screenOptions={{
      headerShown: false,
      tabBarStyle: styles.tabBar,
      tabBarShowLabel: false,
    }}
  >
    <Tab.Screen
      name="Chats"
      component={ChatsScreen}
      options={{
        tabBarIcon: ({ focused }) => <TabIcon label="Chats" emoji="💬" focused={focused} />,
      }}
    />
    <Tab.Screen
      name="Contacts"
      component={ContactsScreen}
      options={{
        tabBarIcon: ({ focused }) => <TabIcon label="Contacts" emoji="👤" focused={focused} />,
      }}
    />
    <Tab.Screen
      name="Groups"
      component={GroupsScreen}
      options={{
        tabBarIcon: ({ focused }) => <TabIcon label="Groups" emoji="👥" focused={focused} />,
      }}
    />
    <Tab.Screen
      name="Channels"
      component={ChannelsScreen}
      options={{
        tabBarIcon: ({ focused }) => <TabIcon label="Channels" emoji="📢" focused={focused} />,
      }}
    />
    <Tab.Screen
      name="Settings"
      component={SettingsScreen}
      options={{
        tabBarIcon: ({ focused }) => <TabIcon label="Settings" emoji="⚙️" focused={focused} />,
      }}
    />
  </Tab.Navigator>
);

const AppNavigator: React.FC = () => (
  <NavigationContainer>
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.background },
      }}
    >
      <Stack.Screen name="Main" component={MainTabs} />
      <Stack.Screen 
        name="Chat" 
        component={ChatScreen}
        options={({ route }) => ({
          headerShown: true,
          headerStyle: { backgroundColor: colors.surface },
          headerTintColor: colors.text,
          headerTitle: route.params?.contactName || 'Chat',
        })}
      />
    </Stack.Navigator>
  </NavigationContainer>
);

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: colors.surface,
    borderTopColor: colors.border,
    borderTopWidth: 1,
    height: 70,
    paddingBottom: 8,
    paddingTop: 8,
  },
  tabIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabEmoji: {
    fontSize: 24,
  },
  tabLabel: {
    fontSize: 11,
    marginTop: 2,
    fontWeight: '500',
  },
});

export default AppNavigator;