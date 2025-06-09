'use client';
import { MessageSquare } from 'lucide-react';
import { Service } from '../type';

const ChatbotDevelopment: Service = {
  id: 20,
  title: 'Chatbot Development',
  icon: <MessageSquare className="w-8 h-8 text-[var(--primary)]" />,
  description: 'AI-powered conversations',
  longDescription: 'We build intelligent chatbots that automate customer interactions, reduce support costs, and improve user engagement.',
  features: [
    'Natural language understanding',
    'Multi-channel deployment',
    'Sentiment analysis',
    'CRM integration',
    'Conversation analytics',
    'Continuous learning'
  ],
  image: '/assets/services/chatbot.jpg'
};

export default ChatbotDevelopment;