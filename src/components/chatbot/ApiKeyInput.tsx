
import React from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ExternalLink } from 'lucide-react';

const formSchema = z.object({
  apiKey: z.string().min(1, "API key is required")
    .regex(/^gsk_/, "API key must start with 'gsk_'")
});

interface ApiKeyInputProps {
  onSubmit: (apiKey: string) => void;
}

const ApiKeyInput = ({ onSubmit }: ApiKeyInputProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    onSubmit(values.apiKey);
  };

  return (
    <div className="glass-card p-8 rounded-xl">
      <h2 className="text-2xl font-bold text-white mb-4">Enter Your Groq API Key</h2>
      <p className="text-space-muted mb-6">
        To use our AI Space Weather Assistant, please enter your Groq API key. 
        Don't have one? <a 
          href="https://console.groq.com/keys" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-space-accent hover:text-space-accent/80 inline-flex items-center gap-1"
        >
          Get one here <ExternalLink size={16} />
        </a>
      </p>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="apiKey"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Groq API Key</FormLabel>
                <FormControl>
                  <Input
                    placeholder="gsk_..."
                    className="bg-space/20 border-white/10 text-white"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            Start Chatting
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ApiKeyInput;
