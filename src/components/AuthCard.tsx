import { useState } from "react";
import { login, register } from "../utils/auth";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export default function AuthCard({ onAuth }: { onAuth: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (!email || !password) {
      setError("Please fill all fields");
      return;
    }

    if (isLogin) {
      const ok = login(email, password);
      if (!ok) {
        setError("Invalid credentials");
        return;
      }
    } else {
      register(email, password);
    }
    onAuth();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted">
      <Card className="w-[360px] shadow-xl">
        <CardContent className="p-6 space-y-4">
          <h2 className="text-2xl font-bold text-center">Verbora</h2>
          <p className="text-sm text-center text-muted-foreground">
            Learn meaning, not memorization
          </p>

          <Input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && (
            <p className="text-sm text-red-500 text-center">{error}</p>
          )}

          <Button className="w-full" onClick={handleSubmit}>
            {isLogin ? "Login" : "Register"}
          </Button>

          <p
            className="text-xs text-center cursor-pointer text-primary"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin
              ? "New user? Create an account"
              : "Already have an account? Login"}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
