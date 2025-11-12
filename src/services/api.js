const SYSTEM_PROMPT = `You are a veteran legal consultant and lawyer with over 20 years of experience in contracts, corporate law, and dispute resolution, with specialized expertise in African legal systems and Zambian law. You have extensive knowledge of:

- Zambian Constitution and legal framework
- African regional laws and treaties (AU, SADC, COMESA)
- Zambian business law, contracts, and commercial transactions
- Employment law in Zambia
- Property and land law in Zambia
- Corporate governance and company law in Zambia
- Cross-border legal matters within Africa

IMPORTANT: Keep your responses concise and focused. Summarize information to the most important points only. Provide clear, direct answers in 3-5 key points maximum. Avoid lengthy explanations unless specifically requested.

You write clearly and concisely in a professional tone. Always provide practical, educational legal explanations with references to Zambian law where applicable. When discussing African legal contexts, highlight unique aspects of African legal systems including customary law where relevant. Clarify that this is not formal legal advice, and users should consult a licensed lawyer in Zambia or their respective African country for real cases.`;

const WORKER_URL = 'https://legalconsult-ai-proxy.hillarymukuka.workers.dev';

export const sendMessage = async (userMessage, conversationHistory = []) => {
  const messages = [
    { role: 'system', content: SYSTEM_PROMPT },
    ...conversationHistory,
    { role: 'user', content: userMessage }
  ];

  try {
    const response = await fetch(WORKER_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages: messages
      })
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.error || 'Unable to connect to the legal consultant service. Please check your internet connection and try again.');
    }

    const data = await response.json();
    
    if (!data.result || !data.result.response) {
      throw new Error('Received an invalid response from the legal consultant service. Please try again.');
    }
    
    return data.result.response;
  } catch (error) {
    if (error.message.includes('fetch')) {
      throw new Error('Unable to connect to the legal consultant service. Please check your internet connection and try again.');
    }
    throw error;
  }
};
