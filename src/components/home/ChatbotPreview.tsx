
import { useState } from 'react';
import { Send, Bot, User, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const ChatbotPreview = () => {
  const [inputValue, setInputValue] = useState('');
  
  // Predefined chat demo messages
  const demoMessages = [
    { type: 'bot', content: 'Hello! I\'m your SolarSentinel AI assistant. How can I help you learn about space weather today?' },
    { type: 'user', content: 'What is a solar flare?' },
    { type: 'bot', content: 'A solar flare is a sudden, intense burst of radiation from the release of magnetic energy associated with sunspots. Flares are our solar system\'s largest explosive events and can last from minutes to hours. They\'re classified into categories (A, B, C, M, X) based on their X-ray brightness, with X-class being the most intense. Solar flares can impact Earth\'s ionosphere and radio communications, and they\'re often associated with Coronal Mass Ejections (CMEs) that can cause geomagnetic storms.' },
    { type: 'user', content: 'Is there a solar flare happening now?' },
    { type: 'bot', content: 'Based on the latest data, there is a C5.2 solar flare that was detected in region AR3662 approximately 3 hours ago. No immediate Earth-directed CME has been observed from this event. You can view real-time solar flare data on our Live Data Dashboard.' },
  ];
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // This is just a preview, so we won't actually process the input
    setInputValue('');
  };

  return (
    <section className="py-16 md:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="section-title">Ask Our AI Assistant</h2>
          <p className="text-lg text-space-muted">
            Have questions about space weather? Our AI assistant is ready to help explain phenomena,
            current conditions, and more in simple terms.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <div className="bg-space-blue/20 rounded-xl p-4 border border-white/10 shadow-lg">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-space-accent flex items-center justify-center">
                    <Bot size={18} className="text-white" />
                  </div>
                  <span className="ml-2 font-medium text-white">SolarSentinel AI</span>
                </div>
                <div className="flex items-center">
                  <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-1"></span>
                  <span className="text-xs text-green-400">Online</span>
                </div>
              </div>
              
              <div className="py-4 h-[300px] overflow-y-auto">
                {demoMessages.map((message, index) => (
                  <div 
                    key={index}
                    className={`mb-4 flex ${message.type === 'bot' ? '' : 'justify-end'}`}
                  >
                    {message.type === 'bot' && (
                      <div className="w-8 h-8 rounded-full bg-space-accent/20 flex items-center justify-center mr-2 mt-1">
                        <Bot size={16} className="text-space-accent" />
                      </div>
                    )}
                    
                    <div 
                      className={`rounded-lg px-4 py-2 max-w-[80%] ${
                        message.type === 'bot' 
                          ? 'bg-space/90 text-white' 
                          : 'bg-space-accent text-white'
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                    </div>
                    
                    {message.type === 'user' && (
                      <div className="w-8 h-8 rounded-full bg-space-blue/40 flex items-center justify-center ml-2 mt-1">
                        <User size={16} className="text-white" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
              
              <form onSubmit={handleSubmit} className="mt-2 flex items-center">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask about space weather..."
                  className="flex-grow px-4 py-2 bg-space/80 rounded-l-lg border border-white/10 text-white focus:outline-none focus:border-space-accent"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-space-accent text-white rounded-r-lg hover:bg-purple-600 transition-colors duration-200"
                >
                  <Send size={18} />
                </button>
              </form>
            </div>
          </div>
          
          <div className="order-1 lg:order-2">
            <h3 className="text-2xl font-bold text-white mb-4">Your Personal Space Weather Guide</h3>
            <p className="text-space-muted mb-6">
              Our AI assistant can help you understand complex space weather phenomena in simple terms.
              Ask questions about:
            </p>
            
            <ul className="space-y-3 mb-8">
              {[
                'Current solar activity and space weather conditions',
                'Explanations of solar flares, CMEs, and geomagnetic storms',
                'How space weather affects Earth, satellites, and technology',
                'Historical space weather events and their impacts',
                'Forecasts and predictions for upcoming space weather'
              ].map((item, index) => (
                <li key={index} className="flex items-start">
                  <div className="mr-2 mt-1 text-space-accent">•</div>
                  <span className="text-white">{item}</span>
                </li>
              ))}
            </ul>
            
            <Link to="/chatbot" className="button-primary">
              Try the Full AI Assistant
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </div>
      
      {/* Background decorative elements */}
      <div className="absolute -z-10 top-1/3 left-1/4 w-64 h-64 bg-space-highlight/5 rounded-full blur-3xl"></div>
      <div className="absolute -z-10 bottom-1/4 right-1/4 w-72 h-72 bg-space-accent/5 rounded-full blur-3xl"></div>
    </section>
  );
};

export default ChatbotPreview;
