import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { MessageSquare, Send } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

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

  useEffect(() => {
    if (messages.length === 0) {
      const welcomeMessage: Message = {
        id: Date.now(),
        text: "Hello! I'm your AI assistant. I can help you with various tasks including creating websites. How can I assist you today?",
        sender: "ai",
        timestamp: new Date().toISOString(),
      };
      setMessages([welcomeMessage]);
    }
  }, []);

  const fetchJokeResponse = async () => {
    try {
      const response = await fetch('https://official-joke-api.appspot.com/random_joke');
      const data = await response.json();
      return `Here's a joke: ${data.setup} ${data.punchline}`;
    } catch (error) {
      console.error('Joke API Error:', error);
      return null;
    }
  };

  const fetchQuoteResponse = async () => {
    try {
      const response = await fetch('https://api.quotable.io/random');
      const data = await response.json();
      return `Here's an inspiring quote: "${data.content}" - ${data.author}`;
    } catch (error) {
      console.error('Quote API Error:', error);
      return null;
    }
  };

  const fetchFactResponse = async () => {
    try {
      const response = await fetch('https://uselessfacts.jsph.pl/random.json?language=en');
      const data = await response.json();
      return `Here's an interesting fact: ${data.text}`;
    } catch (error) {
      console.error('Fact API Error:', error);
      return null;
    }
  };

  const generateWebDevResponse = (userInput: string) => {
    if (userInput.toLowerCase().includes('create website') || userInput.toLowerCase().includes('make website')) {
      return `Here's a suggestion for creating a website:

1. HTML Structure:
\`\`\`html
<!DOCTYPE html>
<html>
<head>
    <title>Your Website</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
</head>
<body>
    <nav class="bg-gray-800 p-4">
        <div class="container mx-auto">
            <h1 class="text-white text-xl">Your Brand</h1>
        </div>
    </nav>
    <main class="container mx-auto p-4">
        <h2 class="text-2xl mb-4">Welcome to Your Website</h2>
        <p>Add your content here!</p>
    </main>
</body>
</html>
\`\`\`

Would you like me to explain any part of this code or suggest more features?`;
    }
    return null;
  };

  const getChatResponse = async (userMessage: string) => {
    const webDevResponse = generateWebDevResponse(userMessage);
    if (webDevResponse) return webDevResponse;

    const responses = await Promise.all([
      fetchJokeResponse(),
      fetchQuoteResponse(),
      fetchFactResponse()
    ]);

    const validResponses = responses.filter(response => response !== null);
    
    if (validResponses.length > 0) {
      const randomIndex = Math.floor(Math.random() * validResponses.length);
      return validResponses[randomIndex];
    }

    return "I'm here to help! I can tell jokes, share quotes, provide facts, or help you create websites. What would you like to know?";
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

    try {
      const aiResponse = await getChatResponse(input);
      const aiMessage: Message = {
        id: Date.now(),
        text: aiResponse,
        sender: "ai",
        timestamp: new Date().toISOString(),
      };
      
      setMessages((prev) => [...prev, aiMessage]);
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
                  <p className="text-sm whitespace-pre-wrap">{message.text}</p>
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
        </div>
      </form>
    </div>
  );
};