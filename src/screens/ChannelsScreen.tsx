import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { colors, spacing, borderRadius, fontSize } from '../utils/theme';
import { Channel } from '../types';

const mockChannels: Channel[] = [
  { id: '1', name: 'Tech News', subscribers: 15420, description: 'Latest technology news and updates', createdAt: new Date() },
  { id: '2', name: 'AI Insights', subscribers: 8750, description: 'Artificial intelligence discussions', createdAt: new Date() },
  { id: '3', name: 'Dev Tips', subscribers: 12300, description: 'Programming tips and tricks', createdAt: new Date() },
  { id: '4', name: 'App Releases', subscribers: 5600, description: 'New app announcements', createdAt: new Date() },
  { id: '5', name: 'Gadget Talk', subscribers: 9800, description: 'Gadgets and hardware discussions', createdAt: new Date() },
];

const formatSubscribers = (count: number): string => {
  if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
  if (count >= 1000) return `${(count / 1000).toFixed(1)}K`;
  return count.toString();
};

const ChannelsScreen: React.FC = () => {
  const renderChannelItem = ({ item }: { item: Channel }) => (
    <TouchableOpacity style={styles.channelItem}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>📢</Text>
      </View>
      <View style={styles.channelInfo}>
        <Text style={styles.channelName}>{item.name}</Text>
        <Text style={styles.channelDescription} numberOfLines={1}>{item.description}</Text>
        <Text style={styles.subscriberCount}>📢 {formatSubscribers(item.subscribers)} subscribers</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Channels</Text>
        <TouchableOpacity style={styles.createButton}>
          <Text style={styles.createButtonText}>+ Create</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={mockChannels}
        keyExtractor={(item) => item.id}
        renderItem={renderChannelItem}
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  },
  createButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.md,
  },
  createButtonText: {
    color: colors.textOnPrimary,
    fontWeight: '600',
    fontSize: fontSize.sm,
  },
  listContent: {
    paddingBottom: spacing.xl,
  },
  channelItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.surfaceLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: fontSize.lg,
  },
  channelInfo: {
    flex: 1,
    marginLeft: spacing.md,
  },
  channelName: {
    fontSize: fontSize.md,
    fontWeight: '500',
    color: colors.text,
  },
  channelDescription: {
    fontSize: fontSize.sm,
    color: colors.textMuted,
    marginTop: 2,
  },
  subscriberCount: {
    fontSize: fontSize.xs,
    color: colors.textSecondary,
    marginTop: 4,
  },
  separator: {
    height: 1,
    backgroundColor: colors.divider,
    marginLeft: 74,
  },
});

export default ChannelsScreen;