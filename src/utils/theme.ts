// HyperChat AI Color Theme
export const colors = {
  // Primary Brand Colors
  primary: '#6366F1',      // Indigo - main brand color
  primaryDark: '#4F46E5',
  primaryLight: '#818CF8',
  
  // Accent Colors
  accent: '#8B5CF6',        // Purple - AI accent
  accentDark: '#7C3AED',
  accentLight: '#A78BFA',
  
  // Status Colors
  success: '#10B981',        // Green
  warning: '#F59E0B',       // Amber
  error: '#EF4444',         // Red
  info: '#3B82F6',          // Blue
  
  // AI Specific
  aiGlow: '#A78BFA',
  aiTyping: '#C4B5FD',
  
  // Backgrounds
  background: '#0F172A',    // Dark slate
  backgroundLight: '#1E293B',
  surface: '#1E293B',
  surfaceLight: '#334155',
  card: '#1E293B',
  
  // Text Colors
  text: '#F8FAFC',
  textSecondary: '#94A3B8',
  textMuted: '#64748B',
  textOnPrimary: '#FFFFFF',
  
  // Borders & Dividers
  border: '#334155',
  divider: '#1E293B',
  
  // Message Bubbles
  userBubble: '#6366F1',
  aiBubble: '#1E293B',
  otherBubble: '#334155',
  
  // Input
  inputBackground: '#1E293B',
  inputBorder: '#334155',
  
  // Status Indicators
  online: '#10B981',
  offline: '#64748B',
  away: '#F59E0B',
  busy: '#EF4444',
  
  // Transparent
  overlay: 'rgba(0, 0, 0, 0.5)',
  ripple: 'rgba(255, 255, 255, 0.1)',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const borderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  xxl: 24,
  full: 9999,
};

export const fontSize = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
  xxl: 24,
  xxxl: 32,
};

export const shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  glow: {
    shadowColor: colors.aiGlow,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 10,
  },
};

export default {
  colors,
  spacing,
  borderRadius,
  fontSize,
  shadows,
};