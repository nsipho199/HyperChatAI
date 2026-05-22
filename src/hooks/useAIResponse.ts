import { useState, useCallback, useRef } from 'react';
import { AIService } from '../services/AIService';
import { Message } from '../types';

interface UseAIResponseReturn {
  isLoading: boolean;
  streamingContent: string;
  error: string | null;
  processMessage: (text: string, history: Message[]) => Promise<string>;
  abortController: AbortController | null;
}

export const useAIResponse = (): UseAIResponseReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const [streamingContent, setStreamingContent] = useState('');
  const [error, setError] = useState<string | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const processMessage = useCallback(async (text: string, history: Message[]): Promise<string> => {
    setIsLoading(true);
    setError(null);
    setStreamingContent('');

    abortControllerRef.current = new AbortController();

    try {
      const aiService = AIService.getInstance();
      
      // Get response from AI
      const response = await aiService.processText(text, history);
      
      // Simulate streaming effect
      const words = response.content.split(' ');
      let accumulated = '';
      
      for (let i = 0; i < words.length; i++) {
        if (abortControllerRef.current?.signal.aborted) {
          break;
        }
        
        accumulated += (i > 0 ? ' ' : '') + words[i];
        setStreamingContent(accumulated);
        
        // Small delay for visual effect
        await new Promise(resolve => setTimeout(resolve, 20));
      }

      setIsLoading(false);
      return response.content;
    } catch (err) {
      setIsLoading(false);
      const errorMessage = err instanceof Error ? err.message : 'AI request failed';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  }, []);

  const abort = useCallback(() => {
    abortControllerRef.current?.abort();
    setIsLoading(false);
    setStreamingContent('');
  }, []);

  // Cleanup on unmount
  // Note: In a real app, use useEffect with cleanup

  return {
    isLoading,
    streamingContent,
    error,
    processMessage,
    abortController: abortControllerRef.current,
  };
};