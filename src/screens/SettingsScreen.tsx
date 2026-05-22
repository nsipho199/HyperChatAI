import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, Switch } from 'react-native';
import { colors, spacing, borderRadius, fontSize } from '../utils/theme';

const SettingsScreen: React.FC = () => {
  const [darkMode, setDarkMode] = React.useState(true);
  const [notifications, setNotifications] = React.useState(true);
  const [soundEffects, setSoundEffects] = React.useState(true);

  const SettingsRow: React.FC<{
    icon: string;
    title: string;
    subtitle?: string;
    onPress?: () => void;
    toggle?: boolean;
    value?: boolean;
    onToggle?: (val: boolean) => void;
  }> = ({ icon, title, subtitle, onPress, toggle, value, onToggle }) => (
    <TouchableOpacity 
      style={styles.settingsRow} 
      onPress={onPress}
      disabled={toggle}
    >
      <Text style={styles.settingsIcon}>{icon}</Text>
      <View style={styles.settingsContent}>
        <Text style={styles.settingsTitle}>{title}</Text>
        {subtitle && <Text style={styles.settingsSubtitle}>{subtitle}</Text>}
      </View>
      {toggle && onToggle && (
        <Switch
          value={value}
          onValueChange={onToggle}
          trackColor={{ false: colors.surfaceLight, true: colors.primary }}
          thumbColor={colors.text}
        />
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Settings</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          <View style={styles.card}>
            <SettingsRow icon="👤" title="Profile" subtitle="Manage your profile" />
            <View style={styles.separator} />
            <SettingsRow icon="🔐" title="Privacy & Security" subtitle="Control your data" />
            <View style={styles.separator} />
            <SettingsRow icon="📱" title="Connected Devices" subtitle="Manage devices" />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferences</Text>
          <View style={styles.card}>
            <SettingsRow icon="🌙" title="Dark Mode" toggle value={darkMode} onToggle={setDarkMode} />
            <View style={styles.separator} />
            <SettingsRow icon="🔔" title="Notifications" toggle value={notifications} onToggle={setNotifications} />
            <View style={styles.separator} />
            <SettingsRow icon="🔊" title="Sound Effects" toggle value={soundEffects} onToggle={setSoundEffects} />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>HyperChat AI</Text>
          <View style={styles.card}>
            <SettingsRow icon="🧠" title="AI Settings" subtitle="Configure AI preferences" />
            <View style={styles.separator} />
            <SettingsRow icon="💾" title="AI Memory" subtitle="Manage AI context" />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          <View style={styles.card}>
            <SettingsRow icon="📋" title="Terms of Service" />
            <View style={styles.separator} />
            <SettingsRow icon="🔒" title="Privacy Policy" />
            <View style={styles.separator} />
            <SettingsRow icon="📱" title="Version" subtitle="1.0.0" />
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>HyperChat AI</Text>
          <Text style={styles.footerSubtext}>Unlimited • Open • Private</Text>
        </View>
      </ScrollView>
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
  content: {
    paddingBottom: spacing.xxl,
  },
  section: {
    marginTop: spacing.lg,
    paddingHorizontal: spacing.md,
  },
  sectionTitle: {
    fontSize: fontSize.sm,
    fontWeight: '600',
    color: colors.textMuted,
    marginBottom: spacing.sm,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
  },
  settingsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
  },
  settingsIcon: {
    fontSize: 24,
    marginRight: spacing.md,
  },
  settingsContent: {
    flex: 1,
  },
  settingsTitle: {
    fontSize: fontSize.md,
    color: colors.text,
    fontWeight: '500',
  },
  settingsSubtitle: {
    fontSize: fontSize.sm,
    color: colors.textMuted,
    marginTop: 2,
  },
  separator: {
    height: 1,
    backgroundColor: colors.divider,
    marginLeft: 56,
  },
  footer: {
    alignItems: 'center',
    marginTop: spacing.xxl,
    paddingVertical: spacing.lg,
  },
  footerText: {
    fontSize: fontSize.lg,
    fontWeight: 'bold',
    color: colors.primary,
  },
  footerSubtext: {
    fontSize: fontSize.sm,
    color: colors.textMuted,
    marginTop: 4,
  },
});

export default SettingsScreen;