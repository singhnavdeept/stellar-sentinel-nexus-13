
import { useState } from 'react';

export const useGroqChat = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const GROQ_API_KEY = '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';

  const sendMessage = async (messages: Array<{ role: string; content: string }>) => {
    setIsLoading(true);
    setError(null);

    try {
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
              content: 'You are a knowledgeable space weather assistant. Provide accurate, engaging information about solar phenomena, space weather events, and their impacts on Earth. Use clear, accessible language while maintaining scientific accuracy.'
            },
            ...messages
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
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return { sendMessage, isLoading, error };
};
