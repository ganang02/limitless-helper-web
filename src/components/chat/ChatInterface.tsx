import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { MessageSquare, Send, History } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

interface Message {
  id: number;
  text: string;
  sender: "user" | "ai";
  timestamp: string;
}

export const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // Add welcome message when chat starts
    if (messages.length === 0) {
      const welcomeMessage: Message = {
        id: Date.now(),
        text: "Hello! I'm your AI assistant. How can I help you today?",
        sender: "ai",
        timestamp: new Date().toISOString(),
      };
      setMessages([welcomeMessage]);
    }
  }, []);

  const fetchChatResponse = async (userMessage: string) => {
    try {
      // Using free API from API Ninjas for demonstration
      const response = await fetch('https://api.api-ninjas.com/v1/facts?limit=1', {
        headers: {
          'X-Api-Key': 'YOUR_API_NINJAS_KEY',
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      return data[0]?.fact || "I'm sorry, I couldn't generate a response at the moment.";
    } catch (error) {
      console.error('Error:', error);
      return "I apologize, but I'm having trouble connecting to my knowledge base right now.";
    }
  };

  const saveMessageToHistory = async (message: Message) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        await supabase.from('chat_history').insert([
          {
            user_id: user.id,
            message: message.text,
            sender: message.sender,
            timestamp: message.timestamp
          }
        ]);
      }
    } catch (error) {
      console.error('Error saving message:', error);
    }
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      text: input,
      sender: "user",
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    await saveMessageToHistory(userMessage);

    try {
      const aiResponse = await fetchChatResponse(input);
      const aiMessage: Message = {
        id: Date.now(),
        text: aiResponse,
        sender: "ai",
        timestamp: new Date().toISOString(),
      };
      
      setMessages((prev) => [...prev, aiMessage]);
      await saveMessageToHistory(aiMessage);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to get response from AI",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen flex flex-col">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <Card
              className={`max-w-[80%] p-4 ${
                message.sender === "user"
                  ? "bg-primary text-primary-foreground"
                  : "glass-card"
              } fade-in`}
            >
              <div className="flex items-start gap-2">
                {message.sender === "ai" && (
                  <MessageSquare className="w-4 h-4 mt-1" />
                )}
                <div>
                  <p className="text-sm">{message.text}</p>
                  <span className="text-xs opacity-50">
                    {new Date(message.timestamp).toLocaleTimeString()}
                  </span>
                </div>
              </div>
            </Card>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <Card className="glass-card p-4 fade-in">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce delay-100" />
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce delay-200" />
              </div>
            </Card>
          </div>
        )}
      </div>
      <form onSubmit={handleSend} className="p-4 border-t bg-background/50 backdrop-blur-sm">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="bg-white/50"
          />
          <Button type="submit" disabled={!input.trim() || isLoading}>
            <Send className="h-4 w-4" />
          </Button>
          <Button variant="outline" onClick={() => navigate('/history')}>
            <History className="h-4 w-4" />
          </Button>
        </div>
      </form>
    </div>
  );
};
