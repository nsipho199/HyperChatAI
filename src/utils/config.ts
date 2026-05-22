import Constants from 'expo-constants';
import { Platform } from 'react-native';

// Environment configuration for AI services
export const config = {
  // OpenAI / OpenRouter configuration
  openai: {
    apiKey: process.env.EXPO_PUBLIC_OPENAI_API_KEY || 
           (Constants.expoConfig?.extra?.openaiApiKey as string) || 
           '',
    baseURL: 'https://openrouter.ai/api/v1',
    model: 'openai/gpt-4o-mini',
    maxTokens: 4096,
    temperature: 0.7,
  },
  
  // Image generation
  imageGeneration: {
    model: 'dall-e-3',
    size: '1024x1024',
    quality: 'standard',
  },
  
  // App settings
  app: {
    name: 'HyperChat AI',
    version: Constants.expoConfig?.version || '1.0.0',
    buildNumber: Constants.expoConfig?.android?.versionCode || 1,
    environment: __DEV__ ? 'development' : 'production',
  },
  
  // Feature flags
  features: {
    voiceRecording: true,
    locationSharing: true,
    imageGeneration: true,
    appBuilder: true,
    streamingResponses: true,
  },
};

// API helper functions
export const isConfigured = (): boolean => {
  return config.openai.apiKey.length > 0;
};

export const getAPIStatus = (): { configured: boolean; provider: string } => {
  const configured = isConfigured();
  return {
    configured,
    provider: configured ? 'OpenRouter' : 'Not configured',
  };
};

// Validate API key format
export const validateAPIKey = (key: string): boolean => {
  // OpenRouter keys start with 'sk-or-v1-'
  // OpenAI keys start with 'sk-'
  return key.startsWith('sk-or-v1-') || key.startsWith('sk-');
};