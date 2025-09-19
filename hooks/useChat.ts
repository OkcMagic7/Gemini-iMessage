
import { useState, useCallback, useEffect, useRef } from 'react';
import { Message, Sender } from '../types';
import { getChatInstance } from '../services/geminiService';
import { Chat, GenerateContentResponse } from '@google/genai';


export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'initial-bot-message',
      text: 'Hey there! How can I help you today?',
      sender: Sender.Bot,
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const chatRef = useRef<Chat | null>(null);

  useEffect(() => {
    chatRef.current = getChatInstance();
  }, []);

  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim() || !chatRef.current) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: Sender.User,
    };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setIsLoading(true);

    try {
      const stream = await chatRef.current.sendMessageStream({ message: text });
      
      let botMessageText = '';
      const botMessageId = (Date.now() + 1).toString();

      // Create an empty bot message to update with stream chunks
      setMessages((prevMessages) => [
        ...prevMessages,
        { id: botMessageId, text: '', sender: Sender.Bot },
      ]);

      for await (const chunk of stream) {
        botMessageText += chunk.text;
        setMessages((prevMessages) =>
          prevMessages.map((msg) =>
            msg.id === botMessageId ? { ...msg, text: botMessageText } : msg
          )
        );
      }
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Sorry, something went wrong. Please try again.',
        sender: Sender.Bot,
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { messages, isLoading, sendMessage };
};
