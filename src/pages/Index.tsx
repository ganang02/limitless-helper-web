import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b p-4">
        <nav className="container flex justify-between items-center">
          <h1 className="text-xl font-semibold">AI Assistant</h1>
          <div className="space-x-2">
            <Button variant="ghost" onClick={() => navigate("/login")}>
              Sign In
            </Button>
            <Button onClick={() => navigate("/register")}>Sign Up</Button>
          </div>
        </nav>
      </header>

      <main className="flex-1">
        <section className="container py-24 space-y-8 text-center">
          <div className="space-y-4 fade-in">
            <h1 className="text-4xl font-bold sm:text-6xl">
              Your Personal AI Assistant
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Experience the power of AI with our intelligent chat assistant.
              Get instant responses, creative ideas, and helpful solutions.
            </p>
          </div>

          <Button
            size="lg"
            onClick={() => navigate("/chat")}
            className="slide-up"
          >
            <MessageSquare className="mr-2 h-4 w-4" />
            Start Chatting
          </Button>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 pt-8">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="glass-card p-6 text-left space-y-2 fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <h3 className="text-xl font-semibold">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t p-8 text-center text-muted-foreground">
        <p>&copy; 2024 AI Assistant. All rights reserved.</p>
      </footer>
    </div>
  );
};

const features = [
  {
    title: "Intelligent Conversations",
    description: "Engage in natural, meaningful conversations with our AI assistant.",
  },
  {
    title: "24/7 Availability",
    description: "Get instant responses whenever you need them, day or night.",
  },
  {
    title: "Secure & Private",
    description: "Your conversations are protected with enterprise-grade security.",
  },
];

export default Index;