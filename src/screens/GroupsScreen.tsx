import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { colors, spacing, borderRadius, fontSize } from '../utils/theme';
import { Group } from '../types';

const mockGroups: Group[] = [
  { id: '1', name: 'Dev Team', members: [], description: 'Development team discussions', createdAt: new Date() },
  { id: '2', name: 'Family Group', members: [], description: 'Family updates', createdAt: new Date() },
  { id: '3', name: 'Project Alpha', members: [], description: 'Alpha project team', createdAt: new Date() },
  { id: '4', name: 'Study Buddy', members: [], description: 'Study group', createdAt: new Date() },
  { id: '5', name: 'Gaming Squad', members: [], description: 'Gaming community', createdAt: new Date() },
];

const GroupsScreen: React.FC = () => {
  const renderGroupItem = ({ item }: { item: Group }) => (
    <TouchableOpacity style={styles.groupItem}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>👥</Text>
      </View>
      <View style={styles.groupInfo}>
        <Text style={styles.groupName}>{item.name}</Text>
        <Text style={styles.groupDescription} numberOfLines={1}>{item.description}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Groups</Text>
        <TouchableOpacity style={styles.createButton}>
          <Text style={styles.createButtonText}>+ Create</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={mockGroups}
        keyExtractor={(item) => item.id}
        renderItem={renderGroupItem}
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
  groupItem: {
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
  groupInfo: {
    flex: 1,
    marginLeft: spacing.md,
  },
  groupName: {
    fontSize: fontSize.md,
    fontWeight: '500',
    color: colors.text,
  },
  groupDescription: {
    fontSize: fontSize.sm,
    color: colors.textMuted,
    marginTop: 2,
  },
  separator: {
    height: 1,
    backgroundColor: colors.divider,
    marginLeft: 74,
  },
});

export default GroupsScreen;