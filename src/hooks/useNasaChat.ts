
import { useState } from 'react';
import { getAPOD, searchNASAImages } from '../services/nasaApi';

const GROQ_API_KEY = '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';

export const useNasaChat = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const processNASACommands = async (message: string) => {
    const lowerMessage = message.toLowerCase();
    
    try {
      if (lowerMessage.includes('today') && 
          (lowerMessage.includes('space pic') || lowerMessage.includes('apod'))) {
        const apod = await getAPOD();
        return `🌟 **${apod.title}**\n\n![${apod.title}](${apod.url})\n\n${apod.explanation}`;
      }
      
      if (lowerMessage.includes('show') || lowerMessage.includes('find') || 
          lowerMessage.includes('search')) {
        const searchTerms = message.replace(/show|find|search|me|some|pictures|photos|of/gi, '').trim();
        if (searchTerms) {
          const images = await searchNASAImages(searchTerms);
          if (images.length === 0) return "No space media found for that topic—want to try another term?";
          
          return images.map(img => 
            `🛸 **${img.title}**\n![${img.title}](${img.thumbnail})\n[View Full Image](${img.href})\n\n`
          ).join('');
        }
      }
      return "I can show you today's space picture (APOD) or search for space images. Try asking me one of those!";
    } catch (err) {
      console.error('NASA API Error:', err);
      return "I encountered an error while fetching space images. Please try again!";
    }
  };

  const sendMessage = async (message: string) => {
    setIsLoading(true);
    setError(null);

    try {
      // First try NASA-specific commands
      const nasaResponse = await processNASACommands(message);
      if (nasaResponse) {
        setIsLoading(false);
        return nasaResponse;
      }

      // If no NASA command matches, use Groq for general responses
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${GROQ_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'mixtral-8x7b-32768',
          messages: [
            {
              role: 'system',
              content: 'You are a NASA image specialist assistant. Focus on providing information about space imagery, astronomical phenomena, and visual aspects of space exploration. Keep responses focused on visual content and imagery.'
            },
            {
              role: 'user',
              content: message
            }
          ],
          temperature: 0.7,
          max_tokens: 2048,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response from Groq');
      }

      const data = await response.json();
      return data.choices[0].message.content;

    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      return "I'm having trouble processing your request. Please try again!";
    } finally {
      setIsLoading(false);
    }
  };

  return { sendMessage, isLoading, error };
};
