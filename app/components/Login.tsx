"use client";
// Login.tsx
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation"; // Import Next.js router
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import axiosInstance from "@/lib/axiosConfig";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true); // Toggle between login and signup
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  // Check if a token exists on page load and redirect to home
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/"); // Redirect to home if token is found
    }
  }, [router]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); // Start loading
    setError(""); // Clear previous errors

    try {
      let response;
      if (isLogin) {
        // Login API call
        response = await axios.post("http://localhost:5000/api/users/login", {
          email,
          password,
        });
      } else {
        // Signup API call
        response = await axiosInstance.post("/users/register", {
          name,
          email,
          password,
        });
      }

      const { token, ...userData } = response.data;

      // Save token in local storage
      localStorage.setItem("token", token);
      localStorage.setItem("userId", userData._id); // Save user data in local storage

      // Navigate to home page after login/signup
      router.push("/");
    } catch (error: any) {
      setError(error.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false); // Stop loading
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-main text-[#414B43] p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <h2 className="text-center text-2xl font-semibold mb-6">
          {isLogin ? "Login" : "Sign Up"}
        </h2>

        {/* Error Display */}
        {error && <div className="text-red-500 text-center mb-4">{error}</div>}

        <form onSubmit={handleAuth} className="space-y-4">
          {!isLogin && (
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                required={!isLogin}
                disabled={loading}
              />
            </div>
          )}
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              disabled={loading}
            />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              // swor
              disabled={loading}
            />
          </div>

          {/* Submit Button with Loading Feedback */}
          <Button type="submit" className="w-full bg-main" disabled={loading}>
            {loading ? "Please wait..." : isLogin ? "Login" : "Sign Up"}
          </Button>
        </form>

        <div className="text-center mt-4">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <Button
            variant="link"
            className="text-blue-600 hover:text-blue-800"
            onClick={() => setIsLogin(!isLogin)}
            disabled={loading}
          >
            {isLogin ? "Sign Up" : "Login"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
