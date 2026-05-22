import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../utils/theme';

interface IconProps {
  size?: number;
  color?: string;
}

export const ChatIcon: React.FC<IconProps> = ({ size = 24, color = colors.text }) => (
  <Text style={[styles.icon, { fontSize: size, color }]}>💬</Text>
);

export const ContactIcon: React.FC<IconProps> = ({ size = 24, color = colors.text }) => (
  <Text style={[styles.icon, { fontSize: size, color }]}>👤</Text>
);

export const GroupIcon: React.FC<IconProps> = ({ size = 24, color = colors.text }) => (
  <Text style={[styles.icon, { fontSize: size, color }]}>👥</Text>
);

export const ChannelIcon: React.FC<IconProps> = ({ size = 24, color = colors.text }) => (
  <Text style={[styles.icon, { fontSize: size, color }]}>📢</Text>
);

export const SettingsIcon: React.FC<IconProps> = ({ size = 24, color = colors.text }) => (
  <Text style={[styles.icon, { fontSize: size, color }]}>⚙️</Text>
);

export const SendIcon: React.FC<IconProps> = ({ size = 24, color = colors.text }) => (
  <Text style={[styles.icon, { fontSize: size, color }]}>➤</Text>
);

export const PlusIcon: React.FC<IconProps> = ({ size = 24, color = colors.text }) => (
  <Text style={[styles.icon, { fontSize: size, color }]}>➕</Text>
);

export const CameraIcon: React.FC<IconProps> = ({ size = 24, color = colors.text }) => (
  <Text style={[styles.icon, { fontSize: size, color }]}>📷</Text>
);

export const GalleryIcon: React.FC<IconProps> = ({ size = 24, color = colors.text }) => (
  <Text style={[styles.icon, { fontSize: size, color }]}>🖼️</Text>
);

export const FileIcon: React.FC<IconProps> = ({ size = 24, color = colors.text }) => (
  <Text style={[styles.icon, { fontSize: size, color }]}>📄</Text>
);

export const VoiceIcon: React.FC<IconProps> = ({ size = 24, color = colors.text }) => (
  <Text style={[styles.icon, { fontSize: size, color }]}>🎤</Text>
);

export const LocationIcon: React.FC<IconProps> = ({ size = 24, color = colors.text }) => (
  <Text style={[styles.icon, { fontSize: size, color }]}>📍</Text>
);

export const VideoIcon: React.FC<IconProps> = ({ size = 24, color = colors.text }) => (
  <Text style={[styles.icon, { fontSize: size, color }]}>🎥</Text>
);

export const AudioIcon: React.FC<IconProps> = ({ size = 24, color = colors.text }) => (
  <Text style={[styles.icon, { fontSize: size, color }]}>🎵</Text>
);

export const AIIcon: React.FC<IconProps> = ({ size = 24, color = colors.accent }) => (
  <Text style={[styles.icon, { fontSize: size, color }]}>🧠</Text>
);

export const BuildIcon: React.FC<IconProps> = ({ size = 24, color = colors.text }) => (
  <Text style={[styles.icon, { fontSize: size, color }]}>🛠️</Text>
);

export const ImageGenIcon: React.FC<IconProps> = ({ size = 24, color = colors.text }) => (
  <Text style={[styles.icon, { fontSize: size, color }]}>🎨</Text>
);

export const SearchIcon: React.FC<IconProps> = ({ size = 24, color = colors.text }) => (
  <Text style={[styles.icon, { fontSize: size, color }]}>🔍</Text>
);

export const BackIcon: React.FC<IconProps> = ({ size = 24, color = colors.text }) => (
  <Text style={[styles.icon, { fontSize: size, color }]}>←</Text>
);

export const MoreIcon: React.FC<IconProps> = ({ size = 24, color = colors.text }) => (
  <Text style={[styles.icon, { fontSize: size, color }]}>⋮</Text>
);

export const CheckIcon: React.FC<IconProps> = ({ size = 24, color = colors.text }) => (
  <Text style={[styles.icon, { fontSize: size, color }]}>✓</Text>
);

export const CheckAllIcon: React.FC<IconProps> = ({ size = 24, color = colors.text }) => (
  <Text style={[styles.icon, { fontSize: size, color }]}>✓✓</Text>
);

export const OnlineIcon: React.FC<IconProps> = ({ size = 12, color = colors.online }) => (
  <View style={[styles.onlineDot, { backgroundColor: color, width: size, height: size }]} />
);

export const AttachIcon: React.FC<IconProps> = ({ size = 24, color = colors.text }) => (
  <Text style={[styles.icon, { fontSize: size, color }]}>📎</Text>
);

export const EmojiIcon: React.FC<IconProps> = ({ size = 24, color = colors.text }) => (
  <Text style={[styles.icon, { fontSize: size, color }]}>😊</Text>
);

export const StarIcon: React.FC<IconProps> = ({ size = 24, color = colors.warning }) => (
  <Text style={[styles.icon, { fontSize: size, color }]}>⭐</Text>
);

export const DownloadIcon: React.FC<IconProps> = ({ size = 24, color = colors.text }) => (
  <Text style={[styles.icon, { fontSize: size, color }]}>⬇️</Text>
);

export const CodeIcon: React.FC<IconProps> = ({ size = 24, color = colors.accent }) => (
  <Text style={[styles.icon, { fontSize: size, color }]}>💻</Text>
);

export const GlobeIcon: React.FC<IconProps> = ({ size = 24, color = colors.text }) => (
  <Text style={[styles.icon, { fontSize: size, color }]}>🌐</Text>
);

export const SparkleIcon: React.FC<IconProps> = ({ size = 24, color = colors.accent }) => (
  <Text style={[styles.icon, { fontSize: size, color }]}>✨</Text>
);

export const BotIcon: React.FC<IconProps> = ({ size = 24, color = colors.accent }) => (
  <Text style={[styles.icon, { fontSize: size, color }]}>🤖</Text>
);

const styles = StyleSheet.create({
  icon: {
    textAlign: 'center',
  },
  onlineDot: {
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#0F172A',
  },
});

export default {
  ChatIcon,
  ContactIcon,
  GroupIcon,
  ChannelIcon,
  SettingsIcon,
  SendIcon,
  PlusIcon,
  CameraIcon,
  GalleryIcon,
  FileIcon,
  VoiceIcon,
  LocationIcon,
  VideoIcon,
  AudioIcon,
  AIIcon,
  BuildIcon,
  ImageGenIcon,
  SearchIcon,
  BackIcon,
  MoreIcon,
  CheckIcon,
  CheckAllIcon,
  OnlineIcon,
  AttachIcon,
  EmojiIcon,
  StarIcon,
  DownloadIcon,
  CodeIcon,
  GlobeIcon,
  SparkleIcon,
  BotIcon,
};