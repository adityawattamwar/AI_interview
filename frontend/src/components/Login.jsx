import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { BrainCircuit, Mail, Lock, AlertCircle } from "lucide-react";

const GeometricShapes = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div className="absolute top-20 right-20 w-64 h-64 bg-yellow-400/20 rounded-full blur-3xl" />
    <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-teal-400/10 rounded-full blur-3xl" />
    <div className="absolute top-1/3 right-1/4 w-32 h-32 border border-yellow-400/30 rounded-full" />
    <div className="absolute bottom-1/4 left-1/3 w-48 h-48 border border-teal-400/20 rotate-45" />
  </div>
);

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { signInWithGoogle, signInWithEmail } = useAuth();
  const navigate = useNavigate();

  const handleEmailSignIn = async (e) => {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      await signInWithEmail(email, password);
      navigate("/interview");
    } catch (error) {
      setError("Failed to sign in. Please check your credentials.");
      console.error("Error signing in:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setError("");
      setLoading(true);
      await signInWithGoogle();
      navigate("/interview");
    } catch (error) {
      setError("Failed to sign in with Google.");
      console.error("Error signing in:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-yellow-50 to-teal-50 flex flex-col justify-center relative overflow-hidden">
      <GeometricShapes />

      <div className="relative sm:mx-auto sm:w-full sm:max-w-md z-10">
        <div className="relative">
          <div className="mx-auto w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center">
            <BrainCircuit className="h-8 w-8 text-teal-900" />
          </div>
        </div>

        <h2 className="mt-6 text-center font-mono">
          <span className="text-4xl font-bold block text-teal-900">
            Welcome Back
          </span>
          <span className="text-teal-700 mt-2 block">
            Sign in to continue your practice
          </span>
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="bg-white/80 backdrop-blur-sm py-8 px-4 shadow-lg border border-yellow-200 sm:rounded-2xl sm:px-10">
          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 flex items-center gap-2 text-red-700">
              <AlertCircle className="h-5 w-5 flex-shrink-0" />
              <p className="text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleEmailSignIn} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-teal-700"
              >
                Email address
              </label>
              <div className="mt-1 relative">
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-yellow-200 rounded-lg 
                    placeholder-gray-400 focus:outline-none focus:ring-yellow-400 focus:border-yellow-400
                    text-teal-900"
                  required
                />
                <Mail className="absolute right-3 top-2.5 h-5 w-5 text-teal-400" />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-teal-700"
              >
                Password
              </label>
              <div className="mt-1 relative">
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-yellow-200 rounded-lg 
                    placeholder-gray-400 focus:outline-none focus:ring-yellow-400 focus:border-yellow-400
                    text-teal-900"
                  required
                />
                <Lock className="absolute right-3 top-2.5 h-5 w-5 text-teal-400" />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg
                text-sm font-medium text-teal-900 bg-yellow-400 hover:bg-yellow-300
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400
                disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Sign in
            </button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-yellow-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-teal-700">
                  Or continue with
                </span>
              </div>
            </div>

            <button
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="mt-6 w-full flex justify-center py-2 px-4 border border-yellow-200 
                rounded-lg text-sm font-medium text-teal-900 bg-white hover:bg-yellow-50
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400
                disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Sign in with Google
            </button>
          </div>

          <p className="mt-6 text-center text-sm text-teal-700">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="font-medium text-yellow-600 hover:text-yellow-500"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
