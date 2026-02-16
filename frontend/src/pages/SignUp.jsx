import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, User } from "lucide-react";
import Navbar from "../components/Navbar";

export default function SignUp() {
  const nav = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-400 via-cyan-500 to-blue-500">
      
      <Navbar />

      <div className="flex items-center justify-center px-4 py-16">
        <div className="backdrop-blur-lg bg-white/80 shadow-2xl rounded-3xl w-full max-w-md p-8 border border-white/40">
          
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800">Create Account</h1>
            <p className="text-gray-500 text-sm mt-1">
              Join us and start your journey
            </p>
          </div>

          <div className="relative mb-4">
            <User className="absolute left-3 top-3.5 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Full Name"
              className="w-full border border-gray-300 pl-10 pr-4 py-3 rounded-xl focus:ring-2 focus:ring-teal-400 focus:outline-none"
            />
          </div>

          <div className="relative mb-4">
            <Mail className="absolute left-3 top-3.5 text-gray-400" size={18} />
            <input
              type="email"
              placeholder="Email"
              className="w-full border border-gray-300 pl-10 pr-4 py-3 rounded-xl focus:ring-2 focus:ring-teal-400 focus:outline-none"
            />
          </div>

          <div className="relative mb-6">
            <Lock className="absolute left-3 top-3.5 text-gray-400" size={18} />
            <input
              type="password"
              placeholder="Password"
              className="w-full border border-gray-300 pl-10 pr-4 py-3 rounded-xl focus:ring-2 focus:ring-teal-400 focus:outline-none"
            />
          </div>

          <button
            onClick={() => nav("/home")}
            className="w-full bg-gradient-to-r from-teal-400 to-cyan-500 text-white py-3 rounded-xl font-semibold shadow-md hover:scale-[1.02] transition"
          >
            Create Account
          </button>

          <p className="text-center text-sm mt-6 text-gray-600">
            Already have an account?{" "}
            <Link to="/" className="text-teal-600 font-semibold hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
