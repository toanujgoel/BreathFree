
import React, { useState, useEffect, useRef } from 'react';
import { LegacyChatMessage } from '../types';
import { sendMessageToBot, startChat } from '../services/geminiService';
import { DatabaseService } from '../services/databaseService';
import { useAuth } from './AuthContext';
import { Send, CornerDownLeft } from 'lucide-react';

const ChatBot: React.FC = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<LegacyChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    startChat();
    loadChatHistory();
  }, [user]);

  const loadChatHistory = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await DatabaseService.getChatHistory(user.id);
      if (error) {
        console.error('Error loading chat history:', error);
        setMessages([{ role: 'model', text: "Hi! I'm your CleverQuit coach. How can I support you on your quit journey today?" }]);
        return;
      }

      if (data && data.length > 0) {
        const formattedMessages: LegacyChatMessage[] = data.map(msg => ({
          role: msg.is_user ? 'user' : 'model',
          text: msg.message
        }));
        setMessages(formattedMessages);
      } else {
        setMessages([{ role: 'model', text: "Hi! I'm your CleverQuit coach. How can I support you on your quit journey today?" }]);
      }
    } catch (error) {
      console.error('Error loading chat history:', error);
      setMessages([{ role: 'model', text: "Hi! I'm your CleverQuit coach. How can I support you on your quit journey today?" }]);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const saveChatMessage = async (message: string, isUser: boolean) => {
    if (!user) return;
    
    try {
      await DatabaseService.saveChatMessage({
        user_id: user.id,
        message,
        is_user: isUser
      });
    } catch (error) {
      console.error('Error saving chat message:', error);
    }
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() === '' || isLoading) return;

    const userMessage: LegacyChatMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Save user message to database
    await saveChatMessage(input, true);

    try {
      const botResponse = await sendMessageToBot(input, messages);
      const botMessage: LegacyChatMessage = { role: 'model', text: botResponse };
      setMessages(prev => [...prev, botMessage]);
      
      // Save bot response to database
      await saveChatMessage(botResponse, false);
    } catch (error) {
      const errorMessage = "Sorry, I'm having trouble connecting right now.";
      setMessages(prev => [...prev, { role: 'model', text: errorMessage }]);
      await saveChatMessage(errorMessage, false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen" style={{ paddingBottom: '80px' }}>
      <header className="p-4 bg-white border-b border-gray-200">
        <h1 className="text-xl font-bold text-center text-text-primary">AI Coach</h1>
      </header>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.map((msg, index) => (
          <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-xs md:max-w-md lg:max-w-lg px-4 py-2 rounded-2xl shadow-sm ${
                msg.role === 'user'
                  ? 'bg-brand-primary text-white rounded-br-none'
                  : 'bg-white text-text-primary rounded-bl-none'
              }`}
            >
              <p className="text-sm">{msg.text}</p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="px-4 py-2 rounded-2xl bg-white text-text-primary shadow-sm rounded-bl-none">
              <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-150"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-300"></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 bg-white border-t border-gray-200">
        <form onSubmit={handleSend} className="flex items-center space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask your coach anything..."
            className="flex-1 p-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-brand-primary"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || input.trim() === ''}
            className="p-3 bg-brand-primary text-white rounded-full disabled:bg-gray-400 transition-colors"
          >
            <Send size={20} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatBot;
