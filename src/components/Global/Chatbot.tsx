'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Bot, ChevronDown, ChevronUp, MessageSquare, Send, X } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';

const WELCOME_MESSAGE = "Hello! I'm EurosHub's AI assistant. How can I help you today?";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{ text: WELCOME_MESSAGE, isUser: false }]);
    }
  }, [isOpen, messages.length]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = useCallback(() => {
    const trimmed = inputValue.trim();
    if (!trimmed) return;

    const updatedMessages = [...messages, { text: trimmed, isUser: true }];
    setMessages(updatedMessages);
    setInputValue('');

    setTimeout(() => {
      setMessages(prev => [...prev, { text: getBotResponse(trimmed), isUser: false }]);
    }, 1000);
  }, [inputValue, messages]);

  const getBotResponse = (input: string) => {
    const lower = input.toLowerCase();

    if (/(hello|hi|hey)/.test(lower)) {
      return "Hi there! Welcome to EurosHub. How can I assist you today?";
    } else if (/(service|offer|provide)/.test(lower)) {
      return `Here are our main services:\n\n📌 Business Services:\n- Virtual Assistance\n- Project Management\n- Data Entry & Transcription\n- Data Extraction/ETL\n- Lead Generation\n- ERP/CRM Software\n- Data Mining\n- Market Research\n- Data Analysis\n- Database Management\n\n📌 Technology Services:\n- Web Development\n- Mobile App Development\n- UI/UX Design\n- Cloud Solutions\n- AI Solutions\n\nWould you like more details about any specific service?`;
    } else if (/(contact|email|phone|address)/.test(lower)) {
      return `Here's our contact info:\n\n📧 Email: contact@euroshub.com\n📞 Phone: +92 334 5678900\n📍 Address: Office 509, Kohistan Tower, Rawalpindi\n🕒 Hours: Mon–Sat, 9am–6pm`;
    } else if (/(career|job|hire|opportunity)/.test(lower)) {
      return "We're hiring! Send your resume to careers@euroshub.com with the role you're interested in.";
    } else if (/(location|map|visit)/.test(lower)) {
      return "Visit us at Office 509, Kohistan Tower, Saddar, Rawalpindi. Or check us on Google Maps.";
    } else if (/(hour|time|open)/.test(lower)) {
      return "Our business hours:\nMon–Sat: 9am–6pm\nSunday: Closed";
    } else if (/(about|company|euroshub)/.test(lower)) {
      return "EurosHub offers business & tech services including virtual assistance, web/app development, and AI solutions.";
    } else if (/(help|support|question)/.test(lower)) {
      return "Ask me about our services, contact info, careers, or anything else EurosHub-related!";
    } else {
      return "Thanks for reaching out! If you need help, feel free to ask about services or contact info.";
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSendMessage();
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => {
          setIsOpen(prev => !prev);
          if (!isOpen) setIsMinimized(false);
        }}
        className={`p-4 rounded-full shadow-xl relative flex items-center justify-center ${
          isOpen ? 'bg-white text-[var(--primary)] border border-[var(--primary)]' : 'bg-[var(--primary)] text-white'
        }`}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
        animate={{ y: isOpen ? -10 : 0 }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <>
            <MessageSquare className="w-6 h-6" />
            <motion.span
              className="absolute inset-0 rounded-full bg-[var(--primary)] opacity-20"
              animate={{ scale: [1, 1.5, 1], opacity: [0, 0.3, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
          </>
        )}
      </motion.button>

      {/* Chat Box */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className={`absolute bottom-16 right-0 bg-[var(--card-bg)] border border-[var(--secondary)] rounded-xl shadow-2xl w-[350px] flex flex-col overflow-hidden ${
              isMinimized ? 'h-16' : 'h-[500px]'
            }`}
          >
            {/* Header */}
            <div
              onClick={() => setIsMinimized(!isMinimized)}
              className="bg-gradient-to-r from-[var(--primary)] to-[#0d9488] text-white p-4 flex justify-between items-center cursor-pointer"
            >
              <div className="flex items-center">
                <motion.div
                  animate={{ rotate: isMinimized ? 0 : 360, scale: isMinimized ? 1 : 1.1 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 15 }}
                >
                  <Bot className="w-5 h-5 mr-2" />
                </motion.div>
                <h3 className="font-medium">EurosHub Assistant</h3>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={e => {
                    e.stopPropagation();
                    setIsMinimized(prev => !prev);
                  }}
                  className="p-1 rounded-full hover:bg-white/10"
                >
                  {isMinimized ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                <button
                  onClick={e => {
                    e.stopPropagation();
                    setIsOpen(false);
                  }}
                  className="p-1 rounded-full hover:bg-white/10"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Body */}
            {!isMinimized && (
              <>
                <div className="flex-1 p-4 overflow-y-auto">
                  {messages.map((msg, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className={`mb-4 flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}
                    >
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        className={`max-w-[80%] p-3 rounded-lg ${
                          msg.isUser
                            ? 'bg-[var(--primary)] text-white rounded-tr-none'
                            : 'bg-[var(--secondary)] rounded-tl-none'
                        }`}
                      >
                        {msg.text.split('\n').map((line, idx) => (
                          <p key={idx} className="mb-2 last:mb-0">
                            {line}
                          </p>
                        ))}
                      </motion.div>
                    </motion.div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="p-4 border-t border-[var(--secondary)] bg-[var(--background)]">
                  <div className="flex gap-2">
                    <input
                      value={inputValue}
                      onChange={e => setInputValue(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Type your message..."
                      className="flex-1 p-3 border border-[var(--secondary)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] bg-[var(--card-bg)]"
                    />
                    <motion.button
                      onClick={handleSendMessage}
                      disabled={!inputValue.trim()}
                      whileTap={{ scale: 0.95 }}
                      whileHover={{ scale: 1.05 }}
                      className="bg-[var(--primary)] text-white p-3 rounded-lg disabled:opacity-50"
                    >
                      <Send className="w-5 h-5" />
                    </motion.button>
                  </div>
                  <p className="text-xs text-[var(--foreground)] opacity-50 mt-2 text-center">
                    AI assistant may produce inaccurate information.
                  </p>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
