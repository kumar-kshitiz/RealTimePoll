import { Link, useLocation, useNavigate } from "react-router-dom";
import { Mail, Lock, Loader2 } from "lucide-react";
import Navbar from "../components/Navbar";
import { useState } from "react";
import { loginUser } from "../lib/auth.api";

export default function SignIn() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/home";

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setError("");

    if (!form.email || !form.password) {
      setError("Please enter email and password");
      return;
    }

    try {
      setLoading(true);

      const res = await loginUser(form);

      if (res?.token) {
        localStorage.setItem("token", res.token);
        navigate(from, { replace: true });
      } else {
        setError("Invalid email or password");
      }

    } catch (err) {
      setError(
        err?.response?.data?.message ||
        "Invalid email or password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-gradient-to-br from-teal-400 via-cyan-500 to-blue-500">
      <Navbar />

      <div className="flex min-h-[calc(100vh-64px)] items-center justify-center px-4 py-16">
        <div className="backdrop-blur-lg bg-white/80 shadow-2xl rounded-3xl w-full max-w-md p-8 border border-white/40">

          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800">Welcome Back</h1>
            <p className="text-gray-500 text-sm mt-1">
              Login to continue
            </p>
          </div>

          {/* ERROR UI */}
          {error && (
            <div className="mb-4 text-sm bg-red-100 border border-red-300 text-red-600 px-4 py-2 rounded-xl">
              {error}
            </div>
          )}

          <div className="relative mb-4">
            <Mail className="absolute left-3 top-3.5 text-gray-400" size={18} />
            <input
              type="email"
              placeholder="Email"
              className="w-full border border-gray-300 pl-10 pr-4 py-3 rounded-xl focus:ring-2 focus:ring-teal-400 focus:outline-none"
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
            />
          </div>

          <div className="relative mb-6">
            <Lock className="absolute left-3 top-3.5 text-gray-400" size={18} />
            <input
              type="password"
              placeholder="Password"
              className="w-full border border-gray-300 pl-10 pr-4 py-3 rounded-xl focus:ring-2 focus:ring-teal-400 focus:outline-none"
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
            />
          </div>

          <button
            disabled={loading}
            onClick={handleSubmit}
            className={`w-full py-3 rounded-xl font-semibold shadow-md transition flex items-center justify-center gap-2
              ${loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-teal-400 to-cyan-500 text-white hover:scale-[1.02]"
              }`}
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={18} />
                Signing in...
              </>
            ) : (
              "Sign In"
            )}
          </button>

          <p className="text-center text-sm mt-6 text-gray-600">
            Don’t have an account?{" "}
            <Link
              to="/signup"
              className="text-teal-600 font-semibold hover:underline"
            >
              Sign up
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}
