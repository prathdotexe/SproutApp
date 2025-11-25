import React, { useState, useEffect, useRef } from 'react';
import { geminiService } from '../services/geminiService';
import { ChatMessage } from '../types';
import { SendIcon } from './icons';
import ReactMarkdown from 'react-markdown';
import { Chat } from '@google/genai';

export default function ChatBot() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { sender: 'bot', text: "Hello! What garden question can I dig into for you?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatRef = useRef<Chat | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize the chat session
    chatRef.current = geminiService.getChat();
  }, []);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading || !chatRef.current) return;

    const userMessage: ChatMessage = { sender: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    
    setMessages(prev => [...prev, { sender: 'bot', text: '', isLoading: true }]);

    try {
      const chat = chatRef.current;
      const result = await chat.sendMessage({ message: input });
      const botResponse: ChatMessage = { sender: 'bot', text: result.text };
      
      setMessages(prev => {
        const newMessages = [...prev];
        newMessages[newMessages.length - 1] = botResponse;
        return newMessages;
      });
      
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage: ChatMessage = { sender: 'bot', text: "Sorry, I'm having trouble connecting. Please try again later." };
      setMessages(prev => {
        const newMessages = [...prev];
        newMessages[newMessages.length - 1] = errorMessage;
        return newMessages;
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[60vh]">
      <h2 className="text-2xl font-semibold mb-4 text-gray-700">Gardening Chat</h2>
      <div className="flex-1 overflow-y-auto pr-4 -mr-4 mb-4 border rounded-lg p-4 bg-gray-50">
        {messages.map((msg, index) => (
          <div key={index} className={`flex mb-4 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-md p-3 rounded-lg ${
                msg.sender === 'user'
                  ? 'bg-green-600 text-white'
                  : 'bg-white text-gray-800 border'
              }`}
            >
              {msg.isLoading ? (
                <div className="flex items-center justify-center space-x-1">
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                </div>
              ) : (
                <div className="prose prose-sm max-w-none">
                  <ReactMarkdown>{msg.text}</ReactMarkdown>
                </div>
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSendMessage} className="flex items-center border-t pt-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about watering, pests, etc..."
          className="flex-1 p-2 border rounded-lg focus:ring-green-500 focus:border-green-500"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="ml-3 bg-green-600 text-white p-2 rounded-full hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          <SendIcon className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
}
