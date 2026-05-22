import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, borderRadius, fontSize } from '../../utils/theme';

interface TypingIndicatorProps {
  visible: boolean;
  label?: string;
}

export const TypingIndicator: React.FC<TypingIndicatorProps> = ({ 
  visible, 
  label = 'Hyper AI is thinking...' 
}) => {
  if (!visible) return null;

  return (
    <View style={styles.container}>
      <View style={styles.bubble}>
        <View style={[styles.dot, { backgroundColor: colors.aiTyping }]} />
        <View style={[styles.dot, { backgroundColor: colors.aiTyping }]} />
        <View style={[styles.dot, { backgroundColor: colors.aiTyping }]} />
      </View>
      <Text style={styles.text}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  bubble: {
    flexDirection: 'row',
    backgroundColor: colors.aiBubble,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.lg,
    marginRight: spacing.sm,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 2,
  },
  text: {
    fontSize: fontSize.sm,
    color: colors.textMuted,
  },
});