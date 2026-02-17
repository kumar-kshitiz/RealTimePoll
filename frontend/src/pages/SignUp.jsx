import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, User } from "lucide-react";
import Navbar from "../components/Navbar";
import { signupUser } from "../lib/auth.api";
import { useState } from "react";

export default function SignUp() {
  const nav = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async()=>{
    try{
      console.log("e");
      await signupUser(form);
      nav("/home");
    }catch(err){
      console.log("Signup Failed",err);
    }
  }

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-gradient-to-br from-teal-400 via-cyan-500 to-blue-500">
      
      <Navbar />

      <div className="flex min-h-[calc(100vh-64px)] items-center justify-center px-4 py-16">
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
              id="name"
              name="name"
              type="text"
              placeholder="Full Name"
              className="w-full border border-gray-300 pl-10 pr-4 py-3 rounded-xl focus:ring-2 focus:ring-teal-400 focus:outline-none"
              onChange={(e)=>{setForm({...form, name:e.target.value})}}
            />
          </div>

          <div className="relative mb-4">
            <Mail className="absolute left-3 top-3.5 text-gray-400" size={18} />
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Email"
              className="w-full border border-gray-300 pl-10 pr-4 py-3 rounded-xl focus:ring-2 focus:ring-teal-400 focus:outline-none"
              onChange={(e)=>{setForm({...form, email:e.target.value})}}
            />
          </div>

          <div className="relative mb-6">
            <Lock className="absolute left-3 top-3.5 text-gray-400" size={18} />
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              className="w-full border border-gray-300 pl-10 pr-4 py-3 rounded-xl focus:ring-2 focus:ring-teal-400 focus:outline-none"
              onChange={(e)=>{setForm({...form, password:e.target.value})}}
            />
          </div>

          <button
            onClick={handleSubmit}
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
