import { useState, useCallback } from 'react';
import * as Speech from 'expo-speech';

interface UseSpeechReturn {
  isSpeaking: boolean;
  speak: (text: string) => void;
  stop: () => void;
  error: string | null;
}

export const useSpeech = (): UseSpeechReturn => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const speak = useCallback((text: string) => {
    try {
      setError(null);
      
      Speech.speak(text, {
        language: 'en-US',
        pitch: 1.0,
        rate: 1.0,
        onStart: () => setIsSpeaking(true),
        onDone: () => setIsSpeaking(false),
        onStopped: () => setIsSpeaking(false),
        onError: () => {
          setIsSpeaking(false);
          setError('Speech synthesis failed');
        },
      });
    } catch (err) {
      setError('Failed to speak');
      console.error('Speech error:', err);
    }
  }, []);

  const stop = useCallback(() => {
    Speech.stop();
    setIsSpeaking(false);
  }, []);

  return { isSpeaking, speak, stop, error };
};