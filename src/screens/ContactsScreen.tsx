import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { colors, spacing, borderRadius, fontSize } from '../utils/theme';
import { Contact } from '../types';

const mockContacts: Contact[] = [
  { id: '1', name: 'Sarah Wilson', status: 'online' },
  { id: '2', name: 'Alex Chen', status: 'away' },
  { id: '3', name: 'Jordan Lee', status: 'offline' },
  { id: '4', name: 'Mike Johnson', status: 'busy' },
  { id: '5', name: 'Emma Brown', status: 'online' },
  { id: '6', name: 'Chris Taylor', status: 'offline' },
  { id: '7', name: 'Lisa Anderson', status: 'online' },
  { id: '8', name: 'David Kim', status: 'away' },
];

const ContactsScreen: React.FC = () => {
  const renderContactItem = ({ item }: { item: Contact }) => (
    <TouchableOpacity style={styles.contactItem}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{item.name.charAt(0)}</Text>
        {item.status && (
          <View style={[styles.statusDot, { backgroundColor: colors[item.status] }]} />
        )}
      </View>
      <View style={styles.contactInfo}>
        <Text style={styles.contactName}>{item.name}</Text>
        <Text style={styles.contactStatus}>
          {item.status === 'online' ? 'Active now' : 
           item.status === 'away' ? 'Away' : 
           item.status === 'busy' ? 'Do not disturb' : 'Offline'}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Contacts</Text>
        <Text style={styles.headerCount}>{mockContacts.length} contacts</Text>
      </View>

      <FlatList
        data={mockContacts}
        keyExtractor={(item) => item.id}
        renderItem={renderContactItem}
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
  },
  headerCount: {
    fontSize: fontSize.sm,
    color: colors.textMuted,
    marginTop: 4,
  },
  listContent: {
    paddingBottom: spacing.xl,
  },
  contactItem: {
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
    position: 'relative',
  },
  avatarText: {
    fontSize: fontSize.lg,
    color: colors.text,
    fontWeight: 'bold',
  },
  statusDot: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: colors.background,
  },
  contactInfo: {
    flex: 1,
    marginLeft: spacing.md,
  },
  contactName: {
    fontSize: fontSize.md,
    fontWeight: '500',
    color: colors.text,
  },
  contactStatus: {
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

export default ContactsScreen;