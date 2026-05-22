import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { colors, spacing, borderRadius, fontSize } from '../../utils/theme';
import { UploadOption } from '../../types';

interface UploadMenuProps {
  visible: boolean;
  onClose: () => void;
  options: UploadOption[];
}

const UploadMenu: React.FC<UploadMenuProps> = ({ visible, onClose, options }) => {
  if (!visible) return null;

  return (
    <TouchableOpacity 
      style={styles.overlay} 
      activeOpacity={1} 
      onPress={onClose}
    >
      <View style={styles.menu}>
        <Text style={styles.title}>Share with Hyper AI</Text>
        
        <View style={styles.grid}>
          {options.map((option) => (
            <TouchableOpacity 
              key={option.id} 
              style={styles.option}
              onPress={() => {
                option.action();
                onClose();
              }}
            >
              <View style={[styles.iconBg, { backgroundColor: option.color + '20' }]}>
                <Text style={styles.icon}>{option.icon}</Text>
              </View>
              <Text style={styles.label}>{option.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
          <Text style={styles.closeText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: colors.overlay,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menu: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    width: '85%',
    maxWidth: 400,
  },
  title: {
    fontSize: fontSize.lg,
    fontWeight: '600',
    color: colors.text,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  option: {
    alignItems: 'center',
    width: '25%',
    marginBottom: spacing.md,
  },
  iconBg: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xs,
  },
  icon: {
    fontSize: 24,
  },
  label: {
    fontSize: fontSize.xs,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  closeBtn: {
    alignItems: 'center',
    paddingVertical: spacing.md,
    marginTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  closeText: {
    fontSize: fontSize.md,
    color: colors.error,
    fontWeight: '600',
  },
});

export default UploadMenu;