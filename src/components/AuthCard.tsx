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
    <div
      style={{
        position: "fixed",
        inset: 0,
        background:
          "radial-gradient(circle at top, #3b2f80, #0f0c29 70%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
        zIndex: 9999,
      }}
    >
      {/* GLOW BORDER */}
      <Card
        style={{
          width: "100%",
          maxWidth: 480,
          padding: 2,
          borderRadius: 22,
          background:
            "linear-gradient(135deg, #8b5cf6, #ec4899, #22d3ee)",
          boxShadow:
            "0 0 40px rgba(139,92,246,0.45), 0 0 80px rgba(236,72,153,0.25)",
        }}
      >
        {/* CARD BODY */}
        <div
          style={{
            background: "linear-gradient(180deg, #1b1b3a, #141432)",
            borderRadius: 20,
          }}
        >
          <CardContent style={{ padding: 32, color: "white" }}>
            {/* Title */}
            <div style={{ textAlign: "center", marginBottom: 24 }}>
              <h2
                style={{
                  fontSize: 32,
                  fontWeight: 800,
                  letterSpacing: 1,
                }}
              >
                VERBORA
              </h2>
              <p style={{ opacity: 0.7 }}>
                Learn meaning, not memorization
              </p>
            </div>

            {/* Inputs */}
            <div style={{ display: "grid", gap: 14 }}>
              <Input
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  background: "#0f172a",
                  color: "white",
                  height: 44,
                }}
              />
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  background: "#0f172a",
                  color: "white",
                  height: 44,
                }}
              />
            </div>

            {error && (
              <p
                style={{
                  color: "#f87171",
                  textAlign: "center",
                  marginTop: 12,
                }}
              >
                {error}
              </p>
            )}

            {/* Main Button */}
            <Button
              onClick={handleSubmit}
              style={{
                width: "100%",
                height: 48,
                marginTop: 24,
                fontSize: 16,
                fontWeight: 700,
                background:
                  "linear-gradient(135deg, #8b5cf6, #ec4899)",
                boxShadow:
                  "0 10px 30px rgba(236,72,153,0.4)",
              }}
            >
              {isLogin ? "START GAME" : "CREATE PLAYER"}
            </Button>

            {/* Switch */}
            <Button
              variant="ghost"
              onClick={() => setIsLogin(!isLogin)}
              style={{
                width: "100%",
                marginTop: 12,
                color: "#c7bdfc",
              }}
            >
              {isLogin
                ? "New player? Create an account"
                : "Already a player? Login"}
            </Button>
          </CardContent>
        </div>
      </Card>
    </div>
  );
}