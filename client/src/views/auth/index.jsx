import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { SIGNUP_ROUTE, LOGIN_ROUTE } from "@/utils/constants";
import { apiClient } from "@/lib/api-client";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "@/store";

const Auth = () => {
  const navigate = useNavigate();
  const { setUserInfo } = useAppStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const validateLogin = () => {
    if (!email.length) {
      toast.error("email is required.");
      return false;
    }
    if (!email.match("[0-9A-Za-z]+@[0-9A-Za-z]+.com")) {
      toast.error("not a valid email address.");
      return false;
    }
    if (!password.length) {
      toast.error("password is required.");
      return false;
    }
    return true;
  };

  const validateSignUp = () => {
    if (!email.length) {
      toast.error("email is required.");
      return false;
    }
    if (!email.match("[0-9A-Za-z]+@[0-9A-Za-z]+.com")) {
      toast.error("not a valid email address.");
      return false;
    }
    if (!password.length) {
      toast.error("password is required.");
      return false;
    }
    if (!password.match("^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*\\d).{10,}$")) {
      toast.error(
        "password must be atleast 10 characters long and contain atleast 1 uppercase letter, special character and a numeral each."
      );
      return false;
    }
    if (password !== confirmPassword) {
      toast.error("passwords should match.");
      return false;
    }
    return true;
  };

  const handleLogin = async () => {
    if (validateLogin()) {
      try {
        const response = await apiClient.post(
          LOGIN_ROUTE,
          { email, password },
          { withCredentials: true }
        );
        if (response.data.user.id) {
          setUserInfo(response.data.user);
          if (response.data.user.profileComplete) navigate("/chat");
          else navigate("/user");
        }
        console.log(response);
      } catch (err) {
        console.log(err);
        if (err.response.status === 404) {
          toast.error("account does not exist. please signup.");
          setPassword("");
        }
      }
    }
  };

  const handleCreate = async () => {
    if (validateSignUp()) {
      try {
        const response = await apiClient.post(
          SIGNUP_ROUTE,
          { email, password },
          { withCredentials: true }
        );
        if (response.status === 201) {
          setUserInfo(response.data.user);
          navigate("/user");
        }
        console.log({ response });
      } catch (err) {
        console.log(err);
        if (err.response.status === 409) {
          toast.error("email exists, login instead.");
          setPassword("");
          setConfirmPassword("");
        }
      }
    }
  };

  return (
    <div className="h-[100vh] w-[100vw] bg-black flex items-center justify-center">
      <div className="h-[80vh] w-[80vw] bg-black border-2 text-white border-white text-opacity-90 shadow-2xl md:w-[90vw] lg:w-[70vw] xl:w-[60vw] rounded-2xl grid">
        <div className="flex flex-col gap-10 items-center justify-center">
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="flex items-center justify-center">
              <h1 className="text-5xl font-bold md:text-6xl lato-regular">
                greetings.
              </h1>
            </div>
            <p className="font-medium text-center">
              the minimalistic chat app.
            </p>
          </div>
          <div className="flex items-center justify-center w-full">
            <Tabs defaultValue="login" className="w-3/5">
              <TabsList className="bg-transparent rounded-none w-full">
                <TabsTrigger
                  className="data-[state=active]:bg-transparent data-[state=active]:font-semibold data-[state=active]:text-white data-[state=active]:border-b-blue-600 p-3 transition-all text-white text-opacity-90 border-b-2 w-full duration-300 rounded-none"
                  value="login"
                >
                  login
                </TabsTrigger>
                <TabsTrigger
                  className="data-[state=active]:bg-transparent data-[state=active]:font-semibold data-[state=active]:text-white data-[state=active]:border-b-blue-600 p-3 transition-all text-white text-opacity-90 border-b-2 w-full duration-300 rounded-none"
                  value="create"
                >
                  sign up
                </TabsTrigger>
              </TabsList>
              <TabsContent
                className="flex flex-col gap-3 text-black"
                value="login"
              >
                <Input
                  placeholder="email"
                  type="email"
                  className="rounded-full p-6 mt-3"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                  placeholder="password"
                  type="password"
                  className="rounded-full p-6"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Button
                  className="rounded-full p-6 bg-blue-600"
                  onClick={handleLogin}
                >
                  login
                </Button>
              </TabsContent>
              <TabsContent
                className="flex flex-col gap-3 text-black"
                value="create"
              >
                <Input
                  placeholder="email"
                  type="email"
                  className="rounded-full p-6 mt-1"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                  placeholder="password"
                  type="password"
                  className="rounded-full p-6"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Input
                  placeholder="confirm password"
                  type="password"
                  className="rounded-full p-6"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <Button
                  className="rounded-full p-6 bg-blue-600"
                  onClick={handleCreate}
                >
                  create account
                </Button>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
