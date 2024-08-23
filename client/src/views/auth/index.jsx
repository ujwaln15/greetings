import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleLogin = async () => {};

  const handleCreate = async () => {};

  return (
    <div className="h-[100vh] w-[100vw] flex items-center justify-center">
      <div className="h-[80vh] w-[80vw] bg-white border-2 border-white text-opacity-90 shadow-2xl md:w-[90vw] lg:w-[70vw] xl:w-[60vw] rounded-2xl grid">
        <div className="flex flex-col gap-10 items-center justify-center">
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="flex items-center justify-center">
              <h1 className="text-5xl font-bold md:text-6xl">greetings.</h1>
            </div>
            <p className="font-medium text-center">
              the minimalist's chat app.
            </p>
          </div>
          <div className="flex items-center justify-center w-full">
            <Tabs defaultValue="login" className="w-3/5">
              <TabsList className="bg-transparent rounded-none w-full">
                <TabsTrigger
                  className="data-[state=active]:bg-transparent data-[state=active]:font-semibold data-[state=active]:text-black data-[state=active]:border-b-blue-600 p-3 transition-all text-black text-opacity-90 border-b-2 w-full duration-300 rounded-none"
                  value="login"
                >
                  login
                </TabsTrigger>
                <TabsTrigger
                  className="data-[state=active]:bg-transparent data-[state=active]:font-semibold data-[state=active]:text-black data-[state=active]:border-b-blue-600 p-3 transition-all text-black text-opacity-90 border-b-2 w-full duration-300 rounded-none"
                  value="create"
                >
                  sign up
                </TabsTrigger>
              </TabsList>
              <TabsContent className="flex flex-col gap-3" value="login">
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
                <Button className="rounded-full p-6" onClick={handleLogin}>
                  login
                </Button>
              </TabsContent>
              <TabsContent className="flex flex-col gap-3" value="create">
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
                <Button className="rounded-full p-6" onClick={handleLogin}>
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
