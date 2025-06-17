// hooks/useServiceDiscovery.ts
import { useState } from 'react';

interface ConversationMessage {
  type: 'user' | 'ai';
  message: string;
  services?: any[];
  timestamp: Date;
}

export const useServiceDiscovery = () => {
  const [conversation, setConversation] = useState<ConversationMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = async (userMessage: string) => {
    if (!userMessage.trim()) return;

    setIsLoading(true);
    setError(null);

    // Add user message
    const userMsg: ConversationMessage = {
      type: 'user',
      message: userMessage,
      timestamp: new Date(),
    };

    setConversation((prev) => [...prev, userMsg]);

    try {
      const response = await fetch('/api/discover-services', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: userMessage }),
      });

      if (!response.ok) {
        throw new Error('Failed to get recommendations');
      }

      const data = await response.json();

      // Add AI response
      const aiMsg: ConversationMessage = {
        type: 'ai',
        message: data.message,
        services: data.recommendedServices,
        timestamp: new Date(),
      };

      setConversation((prev) => [...prev, aiMsg]);
    } catch (err) {
      setError('Failed to get recommendations. Please try again.');
      console.error('Service discovery error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const clearConversation = () => {
    setConversation([]);
    setError(null);
  };

  return {
    conversation,
    isLoading,
    error,
    sendMessage,
    clearConversation,
  };
};
