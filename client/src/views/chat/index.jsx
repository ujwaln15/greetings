import { useAppStore } from "@/store";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Chat = () => {
  const { userInfo } = useAppStore();
  const navigate = useNavigate();
  useEffect(() => {
    if (!userInfo.profileComplete) {
      toast("setup profile to continue.");
      navigate("/user");
    }
  }, [userInfo, navigate]);

  return <div>Chat</div>;
};

export default Chat;
