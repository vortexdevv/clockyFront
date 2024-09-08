"use client";
// Login.tsx
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/login", { email, password });
      const { token, user } = response.data;
      // Store JWT token in localStorage
      localStorage.setItem("token", token);
      // Optionally store the user information as well
      localStorage.setItem("user", JSON.stringify(user));
      // Redirect to homepage or another route after login
      router.push("/");
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <form onSubmit={handleLogin} className="flex flex-col gap-4 p-4">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="border p-2"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        className="border p-2"
      />
      <button type="submit" className="bg-green-500 text-white p-2">
        Log In
      </button>
    </form>
  );
};

export default Login;
