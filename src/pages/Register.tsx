import { AuthForm } from "@/components/auth/AuthForm";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

const Register = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleRegister = (email: string, password: string) => {
    // Implement actual registration logic here
    console.log("Register:", email, password);
    toast({
      title: "Success",
      description: "Your account has been created successfully.",
    });
    navigate("/chat");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <AuthForm type="register" onSubmit={handleRegister} />
      </div>
    </div>
  );
};

export default Register;