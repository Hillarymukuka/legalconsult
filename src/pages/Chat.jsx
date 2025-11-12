import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { sendMessage } from '../services/api';
import { legalTopics, quickPrompts } from '../data/topics';

function Chat() {
  const navigate = useNavigate();
  const location = useLocation();
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSidebar, setShowSidebar] = useState(window.innerWidth >= 768);
  const [typingMessage, setTypingMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const typingIntervalRef = useRef(null);
  const abortControllerRef = useRef(null);

  useEffect(() => {
    // Handle responsive sidebar visibility
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setShowSidebar(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    // Check if we have a selected topic from navigation
    if (location.state?.selectedTopic) {
      const prompt = quickPrompts[location.state.selectedTopic] || location.state.selectedTopic;
      setInputValue(prompt);
    }
  }, [location]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, typingMessage]);

  useEffect(() => {
    // Cleanup typing interval on unmount
    return () => {
      if (typingIntervalRef.current) {
        clearInterval(typingIntervalRef.current);
      }
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const stopResponse = () => {
    // Stop typing effect
    if (typingIntervalRef.current) {
      clearInterval(typingIntervalRef.current);
      typingIntervalRef.current = null;
    }
    
    // Add partial message if there is one
    if (typingMessage) {
      setMessages(prev => [...prev, { role: 'assistant', content: typingMessage }]);
      setTypingMessage('');
    }
    
    // Abort ongoing API request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    
    setIsTyping(false);
    setIsLoading(false);
  };

  const typeMessage = (fullMessage) => {
    setIsTyping(true);
    setTypingMessage('');
    let currentIndex = 0;
    
    // Clear any existing interval
    if (typingIntervalRef.current) {
      clearInterval(typingIntervalRef.current);
    }
    
    // Type character by character
    typingIntervalRef.current = setInterval(() => {
      if (currentIndex < fullMessage.length) {
        setTypingMessage(fullMessage.substring(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(typingIntervalRef.current);
        setIsTyping(false);
        setTypingMessage('');
        // Add the complete message to the messages array
        setMessages(prev => [...prev, { role: 'assistant', content: fullMessage }]);
      }
    }, 20); // Adjust speed here (lower = faster)
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    
    if (!inputValue.trim() || isLoading || isTyping) return;

    const userMessage = inputValue;
    setInputValue('');
    
    // Add user message
    const newMessages = [...messages, { role: 'user', content: userMessage }];
    setMessages(newMessages);
    setIsLoading(true);

    // Create new AbortController for this request
    abortControllerRef.current = new AbortController();

    try {
      // Get AI response
      const conversationHistory = newMessages.map(msg => ({
        role: msg.role,
        content: msg.content
      }));
      
      const response = await sendMessage(userMessage, conversationHistory.slice(0, -1));
      
      setIsLoading(false);
      // Start typing effect
      typeMessage(response);
    } catch (error) {
      console.error('Error:', error);
      setIsLoading(false);
      const errorMessage = error.message || 'Sorry, I encountered an error. Please try again.';
      // Type error message as well
      typeMessage(errorMessage);
    }
  };

  const handleTopicClick = (topic) => {
    const prompt = quickPrompts[topic] || topic;
    setInputValue(prompt);
    // Close sidebar on mobile after selecting a topic
    if (window.innerWidth < 768) {
      setShowSidebar(false);
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-dark-900 via-primary-700 to-primary-500 overflow-hidden">
      {/* Sidebar */}
      <AnimatePresence>
        {showSidebar && (
          <motion.div
            initial={{ x: -320 }}
            animate={{ x: 0 }}
            exit={{ x: -320 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="w-80 bg-dark-900/80 backdrop-blur-xl border-r border-white/5 flex flex-col shadow-2xl md:relative absolute inset-y-0 left-0 z-50"
          >
            {/* Sidebar Header */}
            <div className="p-6 border-b border-white/5">
              {/* Mobile: Close button and Home button */}
              <div className="md:hidden flex items-center justify-between mb-6">
                <button
                  onClick={() => setShowSidebar(false)}
                  className="group flex items-center text-gray-300 hover:text-white transition-colors"
                >
                  <div className="w-8 h-8 bg-orange/20 rounded-lg flex items-center justify-center group-hover:bg-orange/40 transition-all mr-3">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                  <span className="font-medium">Close Menu</span>
                </button>
                <button
                  onClick={() => navigate('/')}
                  className="w-10 h-10 bg-orange/20 hover:bg-orange/40 rounded-lg flex items-center justify-center transition-all"
                >
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </button>
              </div>

              {/* Back to Home - Desktop only */}
              <button
                onClick={() => navigate('/')}
                className="hidden md:flex group items-center text-gray-300 hover:text-white transition-colors mb-6"
              >
                <div className="w-8 h-8 bg-orange/20 rounded-lg flex items-center justify-center group-hover:bg-orange/40 transition-all mr-3">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                </div>
                <span className="font-medium">Back to Home</span>
              </button>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <svg className="w-5 h-5 text-accent-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Quick Topics
              </h2>
            </div>
            
            {/* Topics List */}
            <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
              <div className="space-y-2">
                {legalTopics.map((topic, index) => (
                  <motion.button
                    key={index}
                    onClick={() => handleTopicClick(topic)}
                    className="w-full group relative text-left px-4 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-sm text-gray-300 hover:text-white overflow-hidden"
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-orange to-purple opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
                    <div className="relative">
                      <span className="font-medium">{topic}</span>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col relative">
        {/* Decorative gradient orbs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-300/15 rounded-full filter blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-50/10 rounded-full filter blur-3xl pointer-events-none"></div>

        {/* Header */}
        <div className="relative z-10 bg-dark-900/50 backdrop-blur-xl border-b border-white/5 p-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowSidebar(!showSidebar)}
                className="w-10 h-10 bg-white/5 hover:bg-white/10 rounded-xl flex items-center justify-center transition-all hover:shadow-lg"
              >
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <div>
                <h1 className="text-xl font-bold text-white">Legal Consultant</h1>
                <p className="text-xs text-gray-400">AI-Powered Legal Guidance</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setMessages([])}
                className="md:px-4 md:py-2 px-2 py-2 bg-orange hover:bg-orange/90 rounded-xl md:text-sm text-xs text-white transition-all flex items-center gap-1 md:gap-2 shadow-lg whitespace-nowrap"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                <span className="hidden sm:inline">Clear Chat</span>
                <span className="sm:hidden">Clear</span>
              </button>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="relative z-10 flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
          {messages.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="h-full flex items-center justify-center"
            >
              <div className="text-center max-w-md">
                <motion.div 
                  className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-primary-400 to-primary-300 rounded-3xl mb-6 shadow-2xl"
                  animate={{ 
                    rotate: [0, 5, -5, 0],
                    scale: [1, 1.05, 1]
                  }}
                  transition={{ 
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                  </svg>
                </motion.div>
                <h3 className="text-2xl font-bold text-white mb-3">Welcome Back!</h3>
                <p className="text-gray-400 mb-6">
                  I'm your AI legal consultant. Ask me anything about contracts, legal matters, or select a topic from the sidebar.
                </p>
                <div className="flex flex-wrap gap-2 justify-center">
                  <span className="px-3 py-1 bg-primary-400/30 border border-primary-300/40 rounded-full text-xs text-primary-100">Contracts</span>
                  <span className="px-3 py-1 bg-accent-100/20 border border-accent-100/30 rounded-full text-xs text-accent-50">Legal Advice</span>
                  <span className="px-3 py-1 bg-primary-400/30 border border-primary-300/40 rounded-full text-xs text-primary-100">Disputes</span>
                </div>
              </div>
            </motion.div>
          )}

          {messages.map((message, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.3 }}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex gap-3 max-w-3xl ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                {/* Avatar */}
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  message.role === 'user' 
                    ? 'bg-gradient-to-br from-accent-100 to-accent-200' 
                    : 'bg-gradient-to-br from-primary-400 to-primary-300'
                }`}>
                  {message.role === 'user' ? (
                    <svg className="w-5 h-5 text-primary-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  )}
                </div>

                {/* Message bubble */}
                <div
                  className={`relative rounded-2xl px-6 py-4 ${
                    message.role === 'user'
                      ? 'bg-gradient-to-br from-accent-100 to-accent-200 text-primary-900 shadow-lg shadow-accent-100/20'
                      : 'bg-white/5 backdrop-blur-xl border border-white/10 text-gray-100 shadow-lg'
                  }`}
                >
                  <div className="whitespace-pre-wrap leading-relaxed">{message.content}</div>
                </div>
              </div>
            </motion.div>
          ))}

          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-start"
            >
              <div className="flex gap-3 max-w-3xl">
                <div className="w-10 h-10 bg-gradient-to-br from-primary-400 to-primary-300 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex space-x-2">
                      <motion.div 
                        className="w-2 h-2 bg-primary-300 rounded-full"
                        animate={{ y: [0, -8, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                      />
                      <motion.div 
                        className="w-2 h-2 bg-accent-100 rounded-full"
                        animate={{ y: [0, -8, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                      />
                      <motion.div 
                        className="w-2 h-2 bg-primary-300 rounded-full"
                        animate={{ y: [0, -8, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                      />
                    </div>
                    <span className="text-gray-400 text-sm">Legal Consultant is thinking...</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Typing message */}
          {isTyping && typingMessage && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className="flex justify-start"
            >
              <div className="flex gap-3 max-w-3xl">
                {/* Avatar */}
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 bg-gradient-to-br from-primary-400 to-primary-300">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>

                {/* Message bubble with typing effect */}
                <div className="relative rounded-2xl px-6 py-4 bg-white/5 backdrop-blur-xl border border-white/10 text-gray-100 shadow-lg">
                  <div className="whitespace-pre-wrap leading-relaxed">
                    {typingMessage}
                    <motion.span
                      className="inline-block w-0.5 h-5 bg-accent-100 ml-1"
                      animate={{ opacity: [1, 0] }}
                      transition={{ duration: 0.8, repeat: Infinity }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="relative z-10 bg-dark-900/50 backdrop-blur-xl border-t border-white/5 p-6">
          <div className="max-w-4xl mx-auto">
            <form onSubmit={handleSendMessage} className="flex gap-3">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask your legal question..."
                  className="w-full px-6 py-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-all"
                  disabled={isLoading || isTyping}
                />
              </div>
              
              {(isLoading || isTyping) ? (
                <motion.button
                  type="button"
                  onClick={stopResponse}
                  className="px-8 py-4 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-2xl transition-all shadow-lg hover:shadow-red-500/50"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </motion.button>
              ) : (
                <motion.button
                  type="submit"
                  disabled={!inputValue.trim()}
                  className="px-8 py-4 bg-orange hover:bg-orange/90 disabled:bg-gray-600 text-white font-semibold rounded-2xl transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-orange/50"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </motion.button>
              )}
            </form>
            
            {/* Disclaimer */}
            <div className="mt-4 text-xs text-gray-500 text-center flex items-center justify-center gap-2">
              <svg className="w-4 h-4 text-accent-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Educational purposes only • Not a substitute for professional legal advice
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;

