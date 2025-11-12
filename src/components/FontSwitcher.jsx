import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const fonts = [
  { name: 'Boska', url: 'https://api.fontshare.com/v2/css?f[]=boska@400,500,600,700&display=swap' },
  { name: 'General Sans', url: 'https://api.fontshare.com/v2/css?f[]=general-sans@200,300,400,500,600,700&display=swap' },
  { name: 'Gambarino', url: 'https://api.fontshare.com/v2/css?f[]=gambarino@400,500,600,700&display=swap' },
  { name: 'Satoshi', url: 'https://api.fontshare.com/v2/css?f[]=satoshi@300,400,500,700&display=swap' },
  { name: 'Cabinet Grotesk', url: 'https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@400,500,700&display=swap' },
  { name: 'Clash Display', url: 'https://api.fontshare.com/v2/css?f[]=clash-display@400,600,700&display=swap' },
  { name: 'Switzer', url: 'https://api.fontshare.com/v2/css?f[]=switzer@400,500,600,700&display=swap' },
  { name: 'Author', url: 'https://api.fontshare.com/v2/css?f[]=author@400,600,700&display=swap' },
  { name: 'Synonym', url: 'https://api.fontshare.com/v2/css?f[]=synonym@400,600,700&display=swap' },
  { name: 'Britney', url: 'https://api.fontshare.com/v2/css?f[]=britney@400,600&display=swap' },
];

function FontSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentFont, setCurrentFont] = useState(() => {
    return localStorage.getItem('selectedFont') || 'Boska';
  });

  useEffect(() => {
    // Apply the saved font on mount
    applyFont(currentFont);
  }, []);

  const applyFont = (fontName) => {
    const font = fonts.find(f => f.name === fontName);
    if (!font) return;

    // Remove existing font link
    const existingLink = document.getElementById('dynamic-font');
    if (existingLink) {
      existingLink.remove();
    }

    // Add new font link
    const link = document.createElement('link');
    link.id = 'dynamic-font';
    link.href = font.url;
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    // Update body font
    document.body.style.fontFamily = `'${fontName}', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif`;
    
    // Save to localStorage
    localStorage.setItem('selectedFont', fontName);
    setCurrentFont(fontName);
  };

  const handleFontChange = (fontName) => {
    applyFont(fontName);
    setIsOpen(false);
  };

  return (
    <>
      {/* Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-gradient-to-br from-accent-500 to-accent-600 hover:from-accent-600 hover:to-accent-700 rounded-full shadow-2xl flex items-center justify-center text-white"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        title="Change Font"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
        </svg>
      </motion.button>

      {/* Font Selector Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-gradient-to-br from-dark-800 to-dark-900 border border-white/10 rounded-3xl p-8 max-w-md w-full shadow-2xl max-h-[80vh] overflow-y-auto custom-scrollbar"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-white">Choose Font</h2>
                  <p className="text-sm text-gray-400 mt-1">Current: {currentFont}</p>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 bg-white/5 hover:bg-white/10 rounded-lg flex items-center justify-center transition-colors"
                >
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-2">
                {fonts.map((font) => (
                  <motion.button
                    key={font.name}
                    onClick={() => handleFontChange(font.name)}
                    className={`w-full text-left px-5 py-4 rounded-xl transition-all ${
                      currentFont === font.name
                        ? 'bg-gradient-to-r from-accent-500/30 to-primary-500/30 border-2 border-accent-500/50 text-white'
                        : 'bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300'
                    }`}
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold">{font.name}</span>
                      {currentFont === font.name && (
                        <svg className="w-5 h-5 text-accent-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    <div className="mt-2 text-sm opacity-70">
                      The quick brown fox jumps over the lazy dog
                    </div>
                  </motion.button>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-white/10">
                <p className="text-xs text-gray-500 text-center">
                  Font will be saved and persist on page reload
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default FontSwitcher;
