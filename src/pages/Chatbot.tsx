
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import StarField from '@/components/ui/StarField';
import { ArrowLeft, Send, Bot, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useGroqChat } from '@/hooks/useGroqChat';

interface Message {
  type: 'bot' | 'user';
  content: string;
}

const Chatbot = () => {
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { type: 'bot', content: 'Hello! I\'m your SolarSentinel AI assistant. How can I help you learn about space weather today?' }
  ]);

  const { sendMessage, isLoading } = useGroqChat();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    
    // Add user message
    const userMessage = { type: 'user', content: inputValue } as Message;
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    
    try {
      // Format messages for Groq
      const groqMessages = messages.map(msg => ({
        role: msg.type === 'bot' ? 'assistant' : 'user',
        content: msg.content
      }));
      groqMessages.push({ role: 'user', content: userMessage.content });
      
      // Get response from Groq
      const response = await sendMessage(groqMessages);
      
      if (response) {
        setMessages(prev => [...prev, { type: 'bot', content: response }]);
      }
    } catch (error) {
      console.error('Failed to get response:', error);
    }
  };

  return (
    <div className="min-h-screen bg-space">
      <Navbar />
      <StarField />
      
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <Link to="/" className="text-space-muted hover:text-white flex items-center gap-2 mb-4 transition-colors">
              <ArrowLeft size={16} />
              Back to Home
            </Link>
            <h1 className="text-4xl font-bold text-white mb-4">AI Space Weather Assistant</h1>
            <p className="text-xl text-space-muted">
              Ask questions about space weather and get informative answers.
            </p>
          </div>
          
          <div className="glass-card p-6 rounded-xl min-h-[600px] flex flex-col">
            <div className="flex items-center border-b border-white/10 pb-4">
              <div className="w-10 h-10 rounded-full bg-space-accent flex items-center justify-center">
                <Bot size={24} className="text-white" />
              </div>
              <div className="ml-3">
                <h2 className="font-bold text-white">SolarSentinel AI</h2>
                <p className="text-xs text-space-muted">Powered by space weather knowledge</p>
              </div>
              <div className="ml-auto flex items-center">
                <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-1"></span>
                <span className="text-xs text-green-400">Online</span>
              </div>
            </div>
            
            <div className="flex-grow overflow-y-auto py-6 space-y-4">
              {messages.map((message, index) => (
                <div 
                  key={index}
                  className={`flex ${message.type === 'bot' ? '' : 'justify-end'}`}
                >
                  {message.type === 'bot' && (
                    <div className="w-10 h-10 rounded-full bg-space-accent/20 flex items-center justify-center mr-2 self-start mt-1">
                      <Bot size={20} className="text-space-accent" />
                    </div>
                  )}
                  
                  <div 
                    className={`rounded-xl px-4 py-3 max-w-[75%] ${
                      message.type === 'bot' 
                        ? 'bg-space-blue/30 text-white' 
                        : 'bg-space-accent text-white'
                    }`}
                  >
                    <p>{message.content}</p>
                  </div>
                  
                  {message.type === 'user' && (
                    <div className="w-10 h-10 rounded-full bg-space-blue/40 flex items-center justify-center ml-2 self-start mt-1">
                      <User size={20} className="text-white" />
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            <form onSubmit={handleSubmit} className="mt-4 border-t border-white/10 pt-4 flex items-center">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask about space weather..."
                className="flex-grow px-4 py-3 bg-space-blue/20 rounded-l-lg border border-white/10 text-white focus:outline-none focus:border-space-accent"
                disabled={isLoading}
              />
              <button
                type="submit"
                className="px-4 py-3 bg-space-accent text-white rounded-r-lg hover:bg-purple-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isLoading}
              >
                <Send size={20} />
              </button>
            </form>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Chatbot;
