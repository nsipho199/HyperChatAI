import React, { useState, useRef, useEffect } from 'react';
import { 
  View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet, 
  SafeAreaView, KeyboardAvoidingView, Platform, Animated, Modal,
  Image, Alert 
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Camera from 'expo-camera';
import { colors, spacing, borderRadius, fontSize, shadows } from '../utils/theme';
import { Message, UploadOption } from '../types';
import { AIService } from '../services/AIService';
import { 
  SendIcon, PlusIcon, BackIcon, MoreIcon
} from '../components/Icons';

interface ChatScreenProps {
  route?: {
    params?: {
      contactId?: string;
      contactName?: string;
      isAI?: boolean;
    };
  };
}

const mockMessages: Message[] = [
  {
    id: '1',
    senderId: 'other',
    content: 'Hey! How are you doing?',
    type: 'text',
    timestamp: new Date(Date.now() - 3600000),
    status: 'read',
  },
  {
    id: '2',
    senderId: 'me',
    content: "I'm good! Just finished that project we talked about.",
    type: 'text',
    timestamp: new Date(Date.now() - 3500000),
    status: 'read',
  },
];

const uploadOptions: UploadOption[] = [
  { id: 'camera', icon: '📷', label: 'Camera', action: () => {}, color: colors.error },
  { id: 'gallery', icon: '🖼️', label: 'Gallery', action: () => {}, color: colors.success },
  { id: 'file', icon: '📄', label: 'File', action: () => {}, color: colors.info },
  { id: 'voice', icon: '🎤', label: 'Voice', action: () => {}, color: colors.warning },
  { id: 'location', icon: '📍', label: 'Location', action: () => {}, color: colors.primary },
  { id: 'video', icon: '🎥', label: 'Video', action: () => {}, color: colors.accent },
  { id: 'audio', icon: '🎵', label: 'Audio', action: () => {}, color: '#E91E63' },
  { id: 'ai', icon: '🧠', label: 'AI Tools', action: () => {}, color: colors.accent },
  { id: 'build', icon: '🛠️', label: 'Build App', action: () => {}, color: colors.success },
];

const ChatScreen: React.FC<ChatScreenProps> = ({ route }) => {
  const { contactId, contactName, isAI } = route?.params || {};
  const flatListRef = useRef<FlatList>(null);
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [inputText, setInputText] = useState('');
  const [showPlusMenu, setShowPlusMenu] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [streamingContent, setStreamingContent] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const plusMenuAnim = useRef(new Animated.Value(0)).current;
  const aiService = AIService.getInstance();

  useEffect(() => {
    Animated.timing(plusMenuAnim, {
      toValue: showPlusMenu ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [showPlusMenu]);

  const handleSend = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      senderId: 'me',
      content: inputText.trim(),
      type: 'text',
      timestamp: new Date(),
      status: 'sending',
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');

    if (isAI) {
      await processAIResponse(inputText.trim());
    }
  };

  const processAIResponse = async (text: string) => {
    setIsTyping(true);
    setIsStreaming(true);
    
    try {
      // Add streaming message placeholder
      const streamingMessageId = (Date.now() + 1).toString();
      const streamingMessage: Message = {
        id: streamingMessageId,
        senderId: 'other',
        content: '',
        type: 'ai-response',
        timestamp: new Date(),
        status: 'read',
        metadata: { isStreaming: true },
      };
      setMessages(prev => [...prev, streamingMessage]);
      setStreamingContent('');

      // Get AI response
      const response = await aiService.processText(text, messages);
      
      // Simulate streaming effect
      const words = response.content.split(' ');
      for (let i = 0; i < words.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 30));
        setStreamingContent(words.slice(0, i + 1).join(' ') + ' ▌');
        
        // Update message in real-time
        setMessages(prev => {
          const updated = prev.map(msg => {
            if (msg.id === streamingMessageId) {
              return { ...msg, content: words.slice(0, i + 1).join(' ') };
            }
            return msg;
          });
          return updated;
        });
      }

      // Remove typing indicator
      setIsStreaming(false);
      setIsTyping(false);
      
      // Final update without cursor
      setMessages(prev => {
        const updated = prev.map(msg => {
          if (msg.id === streamingMessageId) {
            return { ...msg, content: response.content, metadata: { isStreaming: false } };
          }
          return msg;
        });
        return updated;
      });
      
    } catch (error) {
      setIsTyping(false);
      setIsStreaming(false);
      
      // Add error message
      const errorMessage: Message = {
        id: (Date.now() + 2).toString(),
        senderId: 'other',
        content: "I encountered an error processing your request. Please try again.",
        type: 'ai-response',
        timestamp: new Date(),
        status: 'read',
      };
      setMessages(prev => [...prev, errorMessage]);
    }
  };

  const handleCamera = async () => {
    setShowPlusMenu(false);
    const [status, requestPermission] = Camera.useCameraPermissions();
    
    if (!status?.granted) {
      const result = await requestPermission();
      if (!result.granted) {
        Alert.alert('Permission needed', 'Camera access is required to take photos.');
        return;
      }
    }
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
    });
    if (!result.canceled && result.assets[0]) {
      addImageMessage(result.assets[0].uri);
      if (isAI) {
        await processAIResponse("Analyze this image");
      }
    }
  };

  const handleGallery = async () => {
    setShowPlusMenu(false);
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
    });
    if (!result.canceled && result.assets[0]) {
      addImageMessage(result.assets[0].uri);
      if (isAI) {
        await processAIResponse("Analyze this image");
      }
    }
  };

  const addImageMessage = (uri: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      senderId: 'me',
      content: '',
      type: 'image',
      timestamp: new Date(),
      status: 'sending',
      attachments: [{
        id: '1',
        type: 'image',
        uri,
        name: 'image.jpg',
        size: 0,
        mimeType: 'image/jpeg',
      }],
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const handleBuildCommand = () => {
    setShowPlusMenu(false);
    setInputText('Build ');
  };

  const handleImageGenCommand = () => {
    setShowPlusMenu(false);
    setInputText('Generate ');
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const renderMessage = ({ item }: { item: Message }) => {
    const isMyMessage = item.senderId === 'me';
    const isAIMessage = item.senderId === 'other' && isAI;

    return (
      <View style={[styles.messageBubble, isMyMessage ? styles.myMessage : styles.otherMessage]}>
        {item.type === 'image' && item.attachments?.[0] ? (
          <Image source={{ uri: item.attachments[0].uri }} style={styles.messageImage} />
        ) : (
          <Text style={[styles.messageText, isMyMessage && styles.myMessageText]}>
            {item.content}
            {item.metadata?.isStreaming && ' ▌'}
          </Text>
        )}
        {isAIMessage && (
          <View style={styles.aiBadge}>
            <Text style={styles.aiBadgeText}>🧠 AI</Text>
          </View>
        )}
        <Text style={[styles.timestamp, isMyMessage && styles.myTimestamp]}>
          {formatTime(item.timestamp)}
        </Text>
      </View>
    );
  };

  const renderUploadMenu = () => (
    <Modal visible={showPlusMenu} transparent animationType="fade">
      <TouchableOpacity style={styles.menuOverlay} activeOpacity={1} onPress={() => setShowPlusMenu(false)}>
        <Animated.View style={[
          styles.uploadMenu,
          {
            opacity: plusMenuAnim,
            transform: [{
              scale: plusMenuAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0.8, 1],
              }),
            }],
          },
        ]}>
          <Text style={styles.menuTitle}>{isAI ? '🧠 AI Tools' : '📎 Attachments'}</Text>
          <View style={styles.uploadGrid}>
            {uploadOptions.map((option) => (
              <TouchableOpacity 
                key={option.id}
                style={styles.uploadOption}
                onPress={() => {
                  if (option.id === 'camera') handleCamera();
                  else if (option.id === 'gallery') handleGallery();
                  else if (option.id === 'build') handleBuildCommand();
                  else if (option.id === 'ai') {
                    setShowPlusMenu(false);
                    setInputText('Analyze this: ');
                  }
                  else setShowPlusMenu(false);
                }}
              >
                <View style={[styles.uploadIconBg, { backgroundColor: option.color + '30' }]}>
                  <Text style={styles.uploadIcon}>{option.icon}</Text>
                </View>
                <Text style={styles.uploadLabel}>{option.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <TouchableOpacity style={styles.closeButton} onPress={() => setShowPlusMenu(false)}>
            <Text style={styles.closeButtonText}>Cancel</Text>
          </TouchableOpacity>
        </Animated.View>
      </TouchableOpacity>
    </Modal>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Chat Header */}
      <View style={styles.chatHeader}>
        <TouchableOpacity style={styles.backButton}>
          <BackIcon size={24} />
        </TouchableOpacity>
        <View style={[styles.headerAvatar, isAI && styles.aiHeaderAvatar]}>
          <Text style={styles.headerAvatarText}>{isAI ? '🧠' : contactName?.charAt(0) || '💬'}</Text>
        </View>
        <View style={styles.headerInfo}>
          <Text style={styles.headerTitle}>{contactName || 'Chat'}</Text>
          {isAI ? (
            <Text style={styles.headerStatus}>🧠 Hyper AI • Online</Text>
          ) : (
            <Text style={styles.headerStatus}>Active now</Text>
          )}
        </View>
        <TouchableOpacity style={styles.moreButton}>
          <MoreIcon size={24} />
        </TouchableOpacity>
      </View>

      {/* Messages */}
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={renderMessage}
        contentContainerStyle={styles.messagesList}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd()}
      />

      {/* Typing Indicator */}
      {isTyping && isAI && (
        <View style={styles.typingContainer}>
          <View style={styles.typingBubble}>
            <View style={[styles.typingDot, { backgroundColor: colors.aiTyping }]} />
            <View style={[styles.typingDot, { backgroundColor: colors.aiTyping }]} />
            <View style={[styles.typingDot, { backgroundColor: colors.aiTyping }]} />
          </View>
          <Text style={styles.typingText}>Hyper AI is thinking...</Text>
        </View>
      )}

      {/* Input Area */}
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        <View style={styles.inputContainer}>
          {/* Plus Button */}
          <TouchableOpacity 
            style={styles.plusButton} 
            onPress={() => setShowPlusMenu(!showPlusMenu)}
          >
            <PlusIcon size={24} color={colors.primary} />
          </TouchableOpacity>

          {/* Text Input */}
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.textInput}
              placeholder={isAI ? "Message Hyper AI..." : "Type a message..."}
              placeholderTextColor={colors.textMuted}
              value={inputText}
              onChangeText={setInputText}
              multiline
              maxLength={2000}
            />
          </View>

          {/* Send Button */}
          <TouchableOpacity 
            style={[styles.sendButton, !inputText.trim() && styles.sendButtonDisabled]}
            onPress={handleSend}
            disabled={!inputText.trim()}
          >
            <SendIcon size={20} color={colors.textOnPrimary} />
          </TouchableOpacity>
        </View>

        {/* AI Quick Actions */}
        {isAI && (
          <View style={styles.quickActions}>
            <TouchableOpacity style={styles.quickAction} onPress={handleBuildCommand}>
              <Text style={styles.quickActionText}>🛠️ Build App</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickAction} onPress={handleImageGenCommand}>
              <Text style={styles.quickActionText}>🎨 Generate Image</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickAction} onPress={handleCamera}>
              <Text style={styles.quickActionText}>📷 Analyze</Text>
            </TouchableOpacity>
          </View>
        )}
      </KeyboardAvoidingView>

      {renderUploadMenu()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  chatHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backButton: {
    marginRight: spacing.sm,
  },
  headerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.surfaceLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  aiHeaderAvatar: {
    backgroundColor: colors.accent,
    ...shadows.glow,
  },
  headerAvatarText: {
    fontSize: 18,
  },
  headerInfo: {
    flex: 1,
    marginLeft: spacing.md,
  },
  headerTitle: {
    fontSize: fontSize.lg,
    fontWeight: '600',
    color: colors.text,
  },
  headerStatus: {
    fontSize: fontSize.xs,
    color: colors.online,
    marginTop: 2,
  },
  moreButton: {
    padding: spacing.sm,
  },
  messagesList: {
    padding: spacing.md,
    paddingBottom: spacing.lg,
  },
  messageBubble: {
    maxWidth: '80%',
    padding: spacing.md,
    borderRadius: borderRadius.lg,
    marginBottom: spacing.sm,
  },
  myMessage: {
    alignSelf: 'flex-end',
    backgroundColor: colors.userBubble,
    borderBottomRightRadius: 4,
  },
  otherMessage: {
    alignSelf: 'flex-start',
    backgroundColor: colors.aiBubble,
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontSize: fontSize.md,
    color: colors.text,
    lineHeight: 22,
  },
  myMessageText: {
    color: colors.textOnPrimary,
  },
  messageImage: {
    width: 200,
    height: 200,
    borderRadius: borderRadius.md,
  },
  aiBadge: {
    position: 'absolute',
    top: -8,
    left: 8,
    backgroundColor: colors.accent,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: borderRadius.sm,
  },
  aiBadgeText: {
    fontSize: 10,
    color: colors.textOnPrimary,
    fontWeight: 'bold',
  },
  timestamp: {
    fontSize: fontSize.xs,
    color: colors.textMuted,
    marginTop: spacing.xs,
    alignSelf: 'flex-end',
  },
  myTimestamp: {
    color: colors.textOnPrimary,
    opacity: 0.7,
  },
  typingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  typingBubble: {
    flexDirection: 'row',
    backgroundColor: colors.aiBubble,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.lg,
    marginRight: spacing.sm,
  },
  typingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 2,
  },
  typingText: {
    fontSize: fontSize.sm,
    color: colors.textMuted,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  plusButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.primary + '20',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm,
  },
  inputWrapper: {
    flex: 1,
    backgroundColor: colors.inputBackground,
    borderRadius: borderRadius.xl,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    maxHeight: 120,
  },
  textInput: {
    fontSize: fontSize.md,
    color: colors.text,
    maxHeight: 100,
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: spacing.sm,
  },
  sendButtonDisabled: {
    backgroundColor: colors.surfaceLight,
  },
  quickActions: {
    flexDirection: 'row',
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.sm,
    backgroundColor: colors.surface,
  },
  quickAction: {
    backgroundColor: colors.surfaceLight,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.md,
    marginRight: spacing.sm,
  },
  quickActionText: {
    fontSize: fontSize.sm,
    color: colors.text,
  },
  menuOverlay: {
    flex: 1,
    backgroundColor: colors.overlay,
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadMenu: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    width: '85%',
    maxWidth: 400,
    ...shadows.lg,
  },
  menuTitle: {
    fontSize: fontSize.lg,
    fontWeight: '600',
    color: colors.text,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  uploadGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  uploadOption: {
    alignItems: 'center',
    width: '25%',
    marginBottom: spacing.md,
  },
  uploadIconBg: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xs,
  },
  uploadIcon: {
    fontSize: 24,
  },
  uploadLabel: {
    fontSize: fontSize.xs,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  closeButton: {
    alignItems: 'center',
    paddingVertical: spacing.md,
    marginTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  closeButtonText: {
    fontSize: fontSize.md,
    color: colors.error,
    fontWeight: '600',
  },
});

export default ChatScreen;