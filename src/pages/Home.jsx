import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { legalTopics } from '../data/topics';

function Home() {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-900 via-primary-700 to-primary-500 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-300/20 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent-50/10 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary-400/10 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
      </div>

      <motion.div 
        className="relative z-10 max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Header */}
        <motion.div className="text-center mb-20" variants={itemVariants}>
          <motion.div 
            className="flex justify-center items-center mb-8"
            whileHover={{ scale: 1.05, rotate: 5 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary-300 to-accent-100 rounded-3xl blur-xl opacity-50"></div>
              <div className="relative bg-gradient-to-br from-primary-400 to-primary-300 rounded-3xl p-6 shadow-2xl">
                <svg 
                  className="w-20 h-20 text-white" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={1.5} 
                    d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" 
                  />
                </svg>
              </div>
            </div>
          </motion.div>
          
          <h1 className="text-6xl sm:text-7xl lg:text-8xl font-extrabold mb-6 bg-gradient-to-r from-white via-accent-50 to-primary-200 bg-clip-text text-transparent">
            Pocket Legal
            <br />
            Consultant
          </h1>
          
          <p className="text-xl sm:text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed font-light">
            Your AI-powered legal companion. Get instant guidance on contracts, disputes, 
            and legal matters — <span className="text-accent-100 font-medium">anytime, anywhere</span>.
          </p>
        </motion.div>

        {/* Start Chat Button */}
        <motion.div className="text-center mb-24" variants={itemVariants}>
          <motion.button
            onClick={() => navigate('/chat')}
            className="group relative inline-flex items-center gap-3 bg-orange hover:bg-orange/90 text-white font-bold px-10 py-5 rounded-2xl text-lg shadow-2xl shadow-orange/50 overflow-hidden"
            whileHover={{ scale: 1.05, boxShadow: "0 20px 50px rgba(255, 78, 0, 0.4)" }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-accent-400 to-primary-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            <span className="relative">Start Conversation</span>
            <svg className="relative w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </motion.button>
        </motion.div>

        {/* Quick Topics */}
        <motion.div variants={itemVariants} className="mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-12 flex items-center justify-center gap-3">
            <svg className="w-6 h-6 text-accent-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Popular Legal Topics
            <svg className="w-6 h-6 text-accent-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
            {legalTopics.slice(0, 6).map((topic, index) => (
              <motion.button
                key={index}
                onClick={() => navigate('/chat', { state: { selectedTopic: topic } })}
                className="group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 text-left overflow-hidden hover:bg-white/10 transition-all duration-300"
                variants={itemVariants}
                whileHover={{ scale: 1.03, y: -5 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-orange to-purple opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
                
                <div className="relative">
                  <span className="block text-white font-semibold text-lg mb-1">{topic}</span>
                  <span className="text-gray-400 text-sm">Click to explore →</span>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Disclaimer */}
        <motion.div 
          className="mt-20 text-center text-sm max-w-4xl mx-auto"
          variants={itemVariants}
        >
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl">
            <p className="flex items-center justify-center text-gray-300 flex-wrap gap-2">
              <svg 
                className="w-5 h-5 text-accent-100 flex-shrink-0" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
                />
              </svg>
              <span>
                <strong className="text-white">Disclaimer:</strong> Pocket Legal Consultant provides general information 
                for educational purposes only and is not a substitute for professional legal advice.
              </span>
            </p>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div 
          className="mt-12 pb-8 text-center text-sm text-gray-400"
          variants={itemVariants}
        >
          <p>Powered by Nestro AI © Ancestro 2025</p>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default Home;
