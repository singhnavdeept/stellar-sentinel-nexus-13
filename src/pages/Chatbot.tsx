
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import StarField from '@/components/ui/StarField';
import { ArrowLeft, Send, Bot, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';

// Interface for SpaceX launch data
interface SpaceXLaunch {
  id: string;
  name: string;
  date_utc: string;
  details: string | null;
  success: boolean | null;
  links: {
    webcast: string | null;
    patch: {
      small: string | null;
    };
  };
}

// Message interface
interface Message {
  type: 'bot' | 'user';
  content: string;
}

const Chatbot = () => {
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { type: 'bot', content: 'Hello! I\'m your SolarSentinel AI assistant. How can I help you learn about space weather today?' }
  ]);
  
  // Fetch latest SpaceX launch data
  const { data: launchData } = useQuery({
    queryKey: ['spacex-latest-launch'],
    queryFn: async (): Promise<SpaceXLaunch> => {
      const response = await fetch('https://api.spacexdata.com/v5/launches/latest');
      if (!response.ok) {
        throw new Error('Failed to fetch launch data');
      }
      return response.json();
    },
    staleTime: 1000 * 60 * 60 * 6, // 6 hours
    refetchOnWindowFocus: false,
  });
  
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'MMMM d, yyyy');
    } catch (e) {
      return 'unknown date';
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    
    // Add user message
    setMessages(prev => [...prev, { type: 'user', content: inputValue }]);
    
    // Process the message and generate a response
    const userQuestion = inputValue.toLowerCase();
    setInputValue('');
    
    // Simulate AI response based on the question
    setTimeout(() => {
      // Check if the question is about SpaceX launches
      if (
        userQuestion.includes('spacex') || 
        userQuestion.includes('launch') || 
        userQuestion.includes('falcon') || 
        userQuestion.includes('rocket')
      ) {
        // If we have launch data and the question is about the latest launch
        if (launchData && (
          userQuestion.includes('latest') || 
          userQuestion.includes('recent') || 
          userQuestion.includes('last')
        )) {
          const successText = launchData.success === true 
            ? 'was successful' 
            : launchData.success === false 
              ? 'was unsuccessful' 
              : 'has an unknown status';
              
          setMessages(prev => [...prev, { 
            type: 'bot', 
            content: `The latest SpaceX mission was "${launchData.name}" launched on ${formatDate(launchData.date_utc)}. The mission ${successText}. ${launchData.details || 'No additional details are available.'} You can view more information about this on the Dashboard page.`
          }]);
        } 
        // If the question is about mission success
        else if (
          userQuestion.includes('successful') || 
          userQuestion.includes('success')
        ) {
          if (launchData) {
            const successResponse = launchData.success === true 
              ? `Yes, the ${launchData.name} mission was successful.` 
              : launchData.success === false 
                ? `No, the ${launchData.name} mission was not successful.` 
                : `The success status of the ${launchData.name} mission is currently unknown.`;
            
            setMessages(prev => [...prev, { 
              type: 'bot', 
              content: successResponse + ' You can see more details on our Dashboard.'
            }]);
          } else {
            setMessages(prev => [...prev, { 
              type: 'bot', 
              content: 'I don\'t have information about the latest launch success at the moment. Please check our Dashboard for the most up-to-date information.'
            }]);
          }
        }
        // If the question is about images or videos
        else if (
          userQuestion.includes('image') || 
          userQuestion.includes('photo') || 
          userQuestion.includes('video') || 
          userQuestion.includes('watch')
        ) {
          if (launchData && launchData.links.webcast) {
            setMessages(prev => [...prev, { 
              type: 'bot', 
              content: `You can watch the ${launchData.name} mission webcast on YouTube. The video link is available on our Dashboard page along with mission photos if available.`
            }]);
          } else {
            setMessages(prev => [...prev, { 
              type: 'bot', 
              content: 'Media for the latest launch can be found on our Dashboard page. I recommend checking there for images and video links.'
            }]);
          }
        }
        // General SpaceX question
        else {
          setMessages(prev => [...prev, { 
            type: 'bot', 
            content: 'SpaceX conducts regular launches for various missions including satellite deployments, ISS resupply, and crewed missions. You can view the latest launch information on our Dashboard page. Would you like to know about a specific aspect of SpaceX missions?'
          }]);
        }
      } 
      // Default response for non-SpaceX questions
      else {
        setMessages(prev => [...prev, { 
          type: 'bot', 
          content: 'I\'m your space weather assistant. I can provide information about solar phenomena, space weather conditions, and recent space events including SpaceX launches. How can I help you today?'
        }]);
      }
    }, 1000);
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
              />
              <button
                type="submit"
                className="px-4 py-3 bg-space-accent text-white rounded-r-lg hover:bg-purple-600 transition-colors duration-200"
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
