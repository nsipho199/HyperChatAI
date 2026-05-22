import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, SafeAreaView, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors, spacing, borderRadius, fontSize } from '../utils/theme';
import { RootStackParamList, Contact } from '../types';
import { SearchIcon, BotIcon, OnlineIcon } from '../components/Icons';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

// Mock data
const mockContacts: Contact[] = [
  { id: '1', name: 'Sarah Wilson', status: 'online', avatar: undefined },
  { id: '2', name: 'Alex Chen', status: 'away', avatar: undefined },
  { id: '3', name: 'Jordan Lee', status: 'offline', avatar: undefined },
  { id: '4', name: 'Mike Johnson', status: 'busy', avatar: undefined },
  { id: '5', name: 'Emma Brown', status: 'online', avatar: undefined },
  { id: 'ai', name: 'Hyper AI', status: 'online', isAI: true, avatar: undefined },
];

const mockLastMessages: Record<string, { message: string; time: string; unread: number }> = {
  '1': { message: 'Hey, are you free for the meeting?', time: '2m ago', unread: 2 },
  '2': { message: 'The project is going great!', time: '15m ago', unread: 0 },
  '3': { message: 'Can you review my code?', time: '1h ago', unread: 1 },
  '4': { message: 'Thanks for the help!', time: '3h ago', unread: 0 },
  '5': { message: 'See you tomorrow', time: '5h ago', unread: 0 },
  'ai': { message: '🧠 Ask me anything!', time: 'Now', unread: 0 },
};

const ChatsScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredContacts = mockContacts.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderChatItem = ({ item }: { item: Contact }) => {
    const chatData = mockLastMessages[item.id];
    
    return (
      <TouchableOpacity 
        style={styles.chatItem}
        onPress={() => navigation.navigate('Chat', { 
          contactId: item.id, 
          contactName: item.name,
          isAI: item.isAI 
        })}
      >
        <View style={[styles.avatar, item.isAI && styles.aiAvatar]}>
          <Text style={styles.avatarText}>
            {item.isAI ? '🧠' : item.name.charAt(0)}
          </Text>
          {!item.isAI && item.status && (
            <View style={[styles.statusDot, { backgroundColor: colors[item.status] }]} />
          )}
        </View>
        
        <View style={styles.chatContent}>
          <View style={styles.chatHeader}>
            <Text style={styles.chatName}>{item.name}</Text>
            <Text style={styles.chatTime}>{chatData?.time}</Text>
          </View>
          <View style={styles.chatPreview}>
            <Text style={[styles.lastMessage, chatData?.unread > 0 && styles.unreadMessage]} numberOfLines={1}>
              {chatData?.message}
            </Text>
            {chatData?.unread > 0 && (
              <View style={styles.unreadBadge}>
                <Text style={styles.unreadCount}>{chatData?.unread}</Text>
              </View>
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Chats</Text>
        <TouchableOpacity style={styles.searchContainer}>
          <SearchIcon size={20} color={colors.textMuted} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search chats..."
            placeholderTextColor={colors.textMuted}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredContacts}
        keyExtractor={(item) => item.id}
        renderItem={renderChatItem}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerTitle: {
    fontSize: fontSize.xxl,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: spacing.sm,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.inputBackground,
    borderRadius: borderRadius.lg,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  searchInput: {
    flex: 1,
    marginLeft: spacing.sm,
    color: colors.text,
    fontSize: fontSize.md,
  },
  listContent: {
    paddingBottom: spacing.xl,
  },
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.surfaceLight,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  aiAvatar: {
    backgroundColor: colors.accent,
  },
  avatarText: {
    fontSize: fontSize.xl,
    color: colors.text,
    fontWeight: 'bold',
  },
  statusDot: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 2,
    borderColor: colors.background,
  },
  chatContent: {
    flex: 1,
    marginLeft: spacing.md,
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  chatName: {
    fontSize: fontSize.md,
    fontWeight: '600',
    color: colors.text,
  },
  chatTime: {
    fontSize: fontSize.xs,
    color: colors.textMuted,
  },
  chatPreview: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  lastMessage: {
    flex: 1,
    fontSize: fontSize.sm,
    color: colors.textSecondary,
  },
  unreadMessage: {
    fontWeight: '600',
    color: colors.text,
  },
  unreadBadge: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    minWidth: 22,
    height: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: spacing.sm,
  },
  unreadCount: {
    fontSize: fontSize.xs,
    fontWeight: 'bold',
    color: colors.textOnPrimary,
    paddingHorizontal: 6,
  },
  separator: {
    height: 1,
    backgroundColor: colors.divider,
    marginLeft: 80,
  },
});

export default ChatsScreen;