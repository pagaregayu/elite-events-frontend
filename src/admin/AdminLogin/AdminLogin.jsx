import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { MdEmail, MdLock, MdArrowForward, MdShield } from "react-icons/md";

function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const ADMIN_EMAIL = "pagaregayatri6@gmail.com";
  const ADMIN_PASSWORD = "admin123";

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    await new Promise(resolve => setTimeout(resolve, 800));

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      localStorage.setItem("role", "admin");
      localStorage.setItem("adminToken", "true");
      navigate("/admin");
    } else {
      setError("Invalid email or password");
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Image */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-indigo-600 to-purple-700">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative z-10 flex flex-col justify-center items-center text-white p-12 text-center">
          <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mb-6">
            <MdShield className="text-white text-4xl" />
          </div>
          <h1 className="text-4xl font-bold mb-2">Elite Events</h1>
          <p className="text-white/80">Admin Portal</p>
          <div className="mt-12 space-y-3">
            <p className="text-white/70">✓ Event Management</p>
            <p className="text-white/70">✓ Vendor Control</p>
            <p className="text-white/70">✓ Analytics Dashboard</p>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 bg-white">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800">Admin Login</h2>
            <p className="text-gray-500 text-sm mt-1">Sign in to your account</p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm text-center">{error}</p>
            </div>
          )}

          <form onSubmit={handleLogin}>
            {/* Email Field - No overlapping */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Email Address
              </label>
              <div className="flex items-center border border-gray-200 rounded-lg bg-gray-50 focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500">
                <div className="px-3 py-3 border-r border-gray-200">
                  <MdEmail className="text-gray-400 text-lg" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter Email"
                  className="flex-1 px-3 py-3 bg-transparent text-gray-800 placeholder:text-gray-400 focus:outline-none"
                  required
                />
              </div>
            </div>

            {/* Password Field - No overlapping */}
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Password
              </label>
              <div className="flex items-center border border-gray-200 rounded-lg bg-gray-50 focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500">
                <div className="px-3 py-3 border-r border-gray-200">
                  <MdLock className="text-gray-400 text-lg" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="flex-1 px-3 py-3 bg-transparent text-gray-800 placeholder:text-gray-400 focus:outline-none"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-400 text-xs">Secure Admin Access Only</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;