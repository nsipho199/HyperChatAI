// Core Messenger Types
export interface User {
  id: string;
  name: string;
  avatar?: string;
  status?: 'online' | 'offline' | 'away' | 'busy';
  lastSeen?: Date;
}

export interface Contact extends User {
  isAI?: boolean;
  isVerified?: boolean;
}

export interface Group {
  id: string;
  name: string;
  avatar?: string;
  members: User[];
  description?: string;
  createdAt: Date;
}

export interface Channel {
  id: string;
  name: string;
  avatar?: string;
  description?: string;
  subscribers: number;
  createdAt: Date;
}

export interface Message {
  id: string;
  senderId: string;
  content: string;
  type: 'text' | 'image' | 'file' | 'audio' | 'video' | 'ai-response' | 'ai-image' | 'ai-app';
  timestamp: Date;
  status: 'sending' | 'sent' | 'delivered' | 'read';
  replyTo?: string;
  reactions?: Record<string, string[]>;
  attachments?: Attachment[];
  metadata?: AIMessageMetadata;
}

export interface Attachment {
  id: string;
  type: 'image' | 'file' | 'audio' | 'video';
  uri: string;
  name: string;
  size: number;
  mimeType: string;
}

export interface AIMessageMetadata {
  isStreaming?: boolean;
  progress?: string;
  generatedImage?: string;
  generatedApp?: AppBuildResult;
  analyzedImage?: string;
  location?: {
    latitude: number;
    longitude: number;
    address?: string;
  };
}

export interface AppBuildResult {
  name: string;
  description: string;
  apkUrl?: string;
  sourceCode?: string;
  previewImages?: string[];
}

// AI Types
export interface AIRequest {
  type: 'text' | 'image_analysis' | 'app_build' | 'image_generate' | 'document_summary';
  content: string;
  attachments?: Attachment[];
  context?: ChatContext;
}

export interface AIResponse {
  content: string;
  type: 'text' | 'image' | 'app' | 'code';
  metadata?: {
    streaming?: boolean;
    progress?: string;
    generatedCode?: string;
    imageUrl?: string;
  };
}

export interface ChatContext {
  previousMessages: Message[];
  userProfile?: User;
  chatHistory?: Message[];
}

// Navigation Types
export type RootStackParamList = {
  Main: undefined;
  Chat: { contactId: string; contactName: string; isAI?: boolean };
  AppBuilder: { request?: string };
  ImageGenerator: undefined;
  Camera: { returnTo: 'chat' | 'generator' };
  MediaPreview: { uri: string; type: 'image' | 'video' };
};

export type MainTabParamList = {
  Chats: undefined;
  Contacts: undefined;
  Groups: undefined;
  Channels: undefined;
  Settings: undefined;
};

// UI State Types
export interface ChatState {
  messages: Message[];
  isLoading: boolean;
  isTyping: boolean;
  inputText: string;
  showPlusMenu: boolean;
}

export interface UploadOption {
  id: string;
  icon: string;
  label: string;
  action: () => void;
  color: string;
}