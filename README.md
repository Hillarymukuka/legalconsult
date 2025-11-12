# Pocket Legal Consultant 🏛️

A modern, AI-powered legal consultant web application. Get instant guidance on contracts, disputes, and legal matters with specialized expertise in African legal systems and Zambian law.

**Live Demo:** [https://hillarymukuka.github.io/legalconsult/](https://hillarymukuka.github.io/legalconsult/)

![Primary Color: #3B0270](https://via.placeholder.com/15/3B0270/000000?text=+) `#3B0270` | ![Accent Color: #FF4E00](https://via.placeholder.com/15/FF4E00/000000?text=+) `#FF4E00`

## ✨ Features

- 💬 **Interactive Chat Interface** - Chat with an AI legal consultant powered by Cloudflare Workers AI (Llama 4 Scout)
- 📚 **Quick Topic Suggestions** - Pre-defined legal topics for quick queries
- 🎨 **Beautiful UI** - Modern design with smooth animations using Framer Motion
- 📱 **Fully Responsive** - Works seamlessly on desktop, tablet, and mobile devices
- ⚡ **Fast & Lightweight** - Built with Vite and React for optimal performance
- 🌍 **African Legal Focus** - Specialized in Zambian law and African legal systems
- ⏸️ **Stop Response** - Ability to stop AI responses mid-generation
- ✨ **Typing Effect** - Smooth character-by-character AI responses

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)

### Installation

1. **Clone or download this repository**
   ```bash
   git clone https://github.com/Hillarymukuka/legalconsult.git
   cd legalconsult
   ```

2. **Install dependencies**
   ```powershell
   npm install
   ```
   Or simply double-click `install.bat`

3. **Run the development server**
   ```powershell
   npm run dev
   ```
   Or simply double-click `start-server.bat`

4. **Open your browser** and navigate to `http://localhost:5173`

### Quick Start with Batch Files

For Windows users, simply double-click:
- `install.bat` - Install dependencies (first time only)
- `start-server.bat` - Start the development server
- `stop-server.bat` - Stop the development server
- `build.bat` - Build for production

## 🏗️ Build for Production

```powershell
npm run build
```

The production-ready files will be in the `dist` folder.

## 🎯 How to Use

1. **Home Page**: View the introduction and popular legal topics
2. **Start Chat**: Click the "Start Chat" button or any topic suggestion
3. **Ask Questions**: Type your legal question in the chat input
4. **Get Answers**: Receive professional legal guidance from the AI consultant

### Example Topics

- How to write a contract
- Employee vs Contractor differences
- Starting a business legally
- Resolving legal disputes
- Understanding NDAs
- Property law basics
- And many more...

## 🛠️ Tech Stack

- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **React Router** - Navigation
- **OpenRouter API** - AI model access

## ⚖️ Legal Disclaimer

This application provides general legal information for **educational purposes only**. It is not a substitute for professional legal advice. Always consult with a licensed attorney for specific legal matters.

## 📝 API Configuration

The app uses OpenRouter API with the `meta-llama/llama-4-maverick:free` model. The AI is configured with the following system prompt:

> "You are a veteran legal consultant and lawyer with over 20 years of experience in contracts, corporate law, and dispute resolution. You write clearly and concisely in a professional tone. Always provide practical, educational legal explanations and examples."

The API is pre-configured and works seamlessly in the background. No additional setup required!

## 🎨 Customization

### Colors

The brand colors are defined in `tailwind.config.js`:

```js
colors: {
  primary: '#3B0270',   // Deep purple
  accent: '#FF4E00',    // Vibrant orange
  background: '#FFF1F1' // Light pink
}
```

### Topics

Edit the legal topics in `src/data/topics.js` to customize the suggestions.

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

---

Built with ❤️ for those seeking accessible legal guidance
