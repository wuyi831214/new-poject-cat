import { useState, useEffect } from 'react';
import { Message } from '../types-extended';
import { MessageService } from '../services/messageService';

export const useMessages = (userId: string) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (userId) {
      fetchMessages();
    }
  }, [userId]);

  const fetchMessages = async () => {
    setLoading(true);
    setError(null);
    
    const response = await MessageService.getUserMessages(userId);
    
    if (response.data) {
      setMessages(response.data);
    } else if (response.error) {
      setError(response.error.message);
    }
    
    setLoading(false);
  };

  const sendUserMessage = async (content: string) => {
    const response = await MessageService.sendUserMessage(userId, content);
    
    if (response.data) {
      setMessages(prev => [...prev, response.data!]);
      return { success: true, data: response.data };
    } else {
      return { success: false, error: response.error };
    }
  };

  const sendAssistantMessage = async (content: string) => {
    const response = await MessageService.sendAssistantMessage(userId, content);
    
    if (response.data) {
      setMessages(prev => [...prev, response.data!]);
      return { success: true, data: response.data };
    } else {
      return { success: false, error: response.error };
    }
  };

  const clearMessages = async () => {
    const response = await MessageService.clearUserMessages(userId);
    
    if (!response.error) {
      setMessages([]);
      return { success: true };
    } else {
      return { success: false, error: response.error };
    }
  };

  return { messages, loading, error, refetch: fetchMessages, sendUserMessage, sendAssistantMessage, clearMessages };
};
