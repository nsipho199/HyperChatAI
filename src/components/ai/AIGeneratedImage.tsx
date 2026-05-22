import React, { useState } from 'react';
import { View, Image, ActivityIndicator, StyleSheet, Modal, TouchableOpacity, Text, Dimensions } from 'react-native';
import { colors, borderRadius, spacing } from '../../utils/theme';

interface AIGeneratedImageProps {
  uri: string;
  prompt?: string;
  onClose?: () => void;
}

const { width: screenWidth } = Dimensions.get('window');

export const AIGeneratedImage: React.FC<AIGeneratedImageProps> = ({ uri, prompt, onClose }) => {
  const [loading, setLoading] = useState(true);
  const [showFullscreen, setShowFullscreen] = useState(false);

  return (
    <>
      <TouchableOpacity 
        style={styles.container}
        onPress={() => setShowFullscreen(true)}
        activeOpacity={0.9}
      >
        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="small" color={colors.accent} />
            <Text style={styles.loadingText}>AI generating...</Text>
          </View>
        )}
        <Image 
          source={{ uri }} 
          style={styles.image}
          onLoadStart={() => setLoading(true)}
          onLoadEnd={() => setLoading(false)}
        />
        {prompt && (
          <View style={styles.promptBadge}>
            <Text style={styles.promptText} numberOfLines={1}>🎨 {prompt}</Text>
          </View>
        )}
      </TouchableOpacity>

      <Modal
        visible={showFullscreen}
        transparent
        animationType="fade"
        onRequestClose={() => setShowFullscreen(false)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowFullscreen(false)}
        >
          <Image 
            source={{ uri }} 
            style={styles.fullscreenImage}
            resizeMode="contain"
          />
          {prompt && (
            <View style={styles.modalPrompt}>
              <Text style={styles.modalPromptText}>{prompt}</Text>
            </View>
          )}
          <TouchableOpacity 
            style={styles.closeButton}
            onPress={() => setShowFullscreen(false)}
          >
            <Text style={styles.closeText}>✕</Text>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 200,
    height: 200,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    backgroundColor: colors.surfaceLight,
  },
  loadingContainer: {
    ...StyleSheet.absoluteFill,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.surfaceLight,
  },
  loadingText: {
    color: colors.textMuted,
    fontSize: 12,
    marginTop: 8,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  promptBadge: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    right: 8,
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: borderRadius.sm,
  },
  promptText: {
    color: colors.text,
    fontSize: 10,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullscreenImage: {
    width: screenWidth - 40,
    height: screenWidth - 40,
  },
  modalPrompt: {
    position: 'absolute',
    bottom: 60,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(0,0,0,0.8)',
    padding: spacing.md,
    borderRadius: borderRadius.md,
  },
  modalPromptText: {
    color: colors.text,
    fontSize: 14,
    textAlign: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeText: {
    color: colors.text,
    fontSize: 20,
    fontWeight: 'bold',
  },
});