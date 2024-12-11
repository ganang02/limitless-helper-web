import { AuthForm } from "@/components/auth/AuthForm";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = (email: string, password: string) => {
    // Implement actual login logic here
    console.log("Login:", email, password);
    toast({
      title: "Success",
      description: "You have been logged in successfully.",
    });
    navigate("/chat");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <AuthForm type="login" onSubmit={handleLogin} />
      </div>
    </div>
  );
};

export default Login;