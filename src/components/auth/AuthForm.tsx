import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { LogIn, UserPlus } from "lucide-react";

interface AuthFormProps {
  onSubmit: (email: string, password: string) => void;
  type: "login" | "register";
}

export const AuthForm = ({ onSubmit, type }: AuthFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(email, password);
  };

  return (
    <Card className="w-full max-w-md mx-auto glass-card fade-in">
      <CardHeader>
        <CardTitle>{type === "login" ? "Welcome Back" : "Create Account"}</CardTitle>
        <CardDescription>
          {type === "login"
            ? "Enter your credentials to continue"
            : "Sign up for a new account"}
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white/50"
              required
            />
          </div>
          <div className="space-y-2">
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-white/50"
              required
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full">
            {type === "login" ? <LogIn className="mr-2 h-4 w-4" /> : <UserPlus className="mr-2 h-4 w-4" />}
            {type === "login" ? "Sign In" : "Sign Up"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};