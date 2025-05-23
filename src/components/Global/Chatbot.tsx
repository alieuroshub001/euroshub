'use client';

import { useState, useEffect, useRef } from 'react';
import { Send, X, Bot, MessageSquare, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{text: string; isUser: boolean}>>([]);
  const [inputValue, setInputValue] = useState('');
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Sample welcome message
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{
        text: "Hello! I'm EurosHub's AI assistant. How can I help you today?",
        isUser: false
      }]);
    }
  }, [isOpen, messages.length]);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (inputValue.trim() === '') return;
    
    // Add user message
    const newMessages = [...messages, { text: inputValue, isUser: true }];
    setMessages(newMessages);
    setInputValue('');
    
    // Simulate bot response after a delay
    setTimeout(() => {
      setMessages(prev => [...prev, {
        text: getBotResponse(inputValue),
        isUser: false
      }]);
    }, 1000);
  };

  const getBotResponse = (userInput: string) => {
    const input = userInput.toLowerCase();
    
    if (input.includes('hello') || input.includes('hi') || input.includes('hey')) {
      return "Hi there! Welcome to EurosHub. How can I assist you today? You can ask about our services, contact information, or anything else!";
    } else if (input.includes('service') || input.includes('offer') || input.includes('provide')) {
      return `Here are our main services:
      
📌 Business Services:
- Virtual Assistance
- Project Management
- Data Entry & Transcription
- Data Extraction/ETL
- Lead Generation
- ERP/CRM Software
- Data Mining
- Market Research
- Data Analysis
- Database Management

📌 Technology Services:
- Web Development
- Mobile App Development
- UI/UX Design
- Cloud Solutions
- AI Solutions

Would you like more details about any specific service?`;
    } else if (input.includes('contact') || input.includes('email') || input.includes('phone') || input.includes('address')) {
      return `Here's our contact information:
      
📧 Email: contact@euroshub.com
📞 Phone: +92 334 5678900
📍 Address: Office 509, 5th Floor, Kohistan Tower, Saddar, Rawalpindi, 46000
🕒 Business Hours: Monday - Saturday: 9am - 6pm (Sunday: Closed)

You can also use the contact form on our website to send us a message directly.`;
    } else if (input.includes('career') || input.includes('job') || input.includes('hire') || input.includes('opportunity')) {
      return "We're always looking for talented individuals to join our team! Please send your resume to careers@euroshub.com with the position you're interested in. We'll review your application and get back to you.";
    } else if (input.includes('location') || input.includes('map') || input.includes('visit')) {
      return "Our office is located at:\n\nOffice 509, 5th Floor, Kohistan Tower, Saddar, Rawalpindi, 46000\n\nYou can view our location on Google Maps: https://maps.google.com (or check the map on our contact page)";
    } else if (input.includes('hour') || input.includes('time') || input.includes('open')) {
      return "Our business hours are:\n\nMonday - Saturday: 9am - 6pm\nSunday: Closed\n\nWe're available during these hours to answer your calls and emails.";
    } else if (input.includes('about') || input.includes('company') || input.includes('euroshub')) {
      return "EurosHub is a professional services company offering both business solutions and technology development. We help businesses streamline their operations and build cutting-edge digital solutions. Our team consists of experienced professionals dedicated to delivering high-quality services.";
    } else if (input.includes('help') || input.includes('support') || input.includes('question')) {
      return "I'm here to help! You can ask me about:\n- Our services\n- Contact information\n- Career opportunities\n- Company information\n- Or anything else about EurosHub\n\nWhat would you like to know?";
    } else {
      return "Thank you for your message! If you need specific assistance, you might want to ask about our services or contact information. Alternatively, you can fill out the contact form on our website and a human representative will get back to you shortly.";
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setIsMinimized(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating Chat Button - Always visible */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleChat}
        className={`p-4 rounded-full shadow-xl flex items-center justify-center relative overflow-hidden ${
          isOpen ? 'bg-white text-[var(--primary)] border border-[var(--primary)]' : 'bg-[var(--primary)] text-white'
        }`}
        aria-label={isOpen ? "Close chat" : "Open chat"}
        initial={false}
        animate={{
          y: isOpen ? -10 : 0
        }}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 30
        }}
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <>
            <MessageSquare className="w-6 h-6" />
            {/* Pulse animation when closed */}
            <motion.span
              className="absolute inset-0 rounded-full bg-[var(--primary)] opacity-20"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0, 0.3, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            />
          </>
        )}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ 
              type: 'spring', 
              damping: 25,
              stiffness: 300
            }}
            className={`absolute bottom-16 right-0 bg-[var(--card-bg)] border border-[var(--secondary)] rounded-xl shadow-2xl overflow-hidden ${
              isMinimized ? 'h-16' : 'h-[500px]'
            } w-[350px] flex flex-col`}
            style={{
              boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
            }}
          >
            {/* Chat Header */}
            <div 
              className="bg-gradient-to-r from-[var(--primary)] to-[#0d9488] text-white p-4 flex justify-between items-center cursor-pointer"
              onClick={() => setIsMinimized(!isMinimized)}
            >
              <div className="flex items-center">
                <motion.div
                  animate={{
                    rotate: isMinimized ? 0 : 360,
                    scale: isMinimized ? 1 : 1.1
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 500,
                    damping: 15
                  }}
                >
                  <Bot className="w-5 h-5 mr-2" />
                </motion.div>
                <h3 className="font-medium">EurosHub Assistant</h3>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  className="p-1 rounded-full hover:bg-white/10 transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsMinimized(!isMinimized);
                  }}
                >
                  {isMinimized ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                <button 
                  className="p-1 rounded-full hover:bg-white/10 transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleChat();
                  }}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Messages Container */}
                <div className="flex-1 p-4 overflow-y-auto">
                  {messages.map((message, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className={`mb-4 flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                    >
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        className={`max-w-[80%] p-3 rounded-lg ${
                          message.isUser 
                            ? 'bg-[var(--primary)] text-white rounded-tr-none' 
                            : 'bg-[var(--secondary)] rounded-tl-none'
                        }`}
                      >
                        {message.text.split('\n').map((paragraph, i) => (
                          <p key={i} className="mb-2 last:mb-0">{paragraph}</p>
                        ))}
                      </motion.div>
                    </motion.div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="p-4 border-t border-[var(--secondary)] bg-[var(--background)]">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Type your message..."
                      className="flex-1 p-3 border border-[var(--secondary)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] bg-[var(--card-bg)]"
                    />
                    <motion.button
                      onClick={handleSendMessage}
                      disabled={inputValue.trim() === ''}
                      whileTap={{ scale: 0.95 }}
                      whileHover={{ scale: 1.05 }}
                      className="bg-[var(--primary)] text-white p-3 rounded-lg disabled:opacity-50 flex items-center justify-center"
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