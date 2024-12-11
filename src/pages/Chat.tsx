import { ChatInterface } from "@/components/chat/ChatInterface";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { supabase } from "@/lib/supabase";

const Chat = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/login");
      }
    };
    checkAuth();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-pink-500/20">
      <ChatInterface />
    </div>
  );
};

export default Chat;