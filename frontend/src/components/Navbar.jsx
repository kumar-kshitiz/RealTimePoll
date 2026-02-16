import { Link, useNavigate, useLocation } from "react-router-dom";
import { LogOut, PlusCircle, Home, Users } from "lucide-react";
import { logoutUser } from "../lib/auth.api";

export default function Navbar() {
  const nav = useNavigate();
  const location = useLocation();

  const token = localStorage.getItem("token"); // 👈 check login

  const linkStyle = (path) =>
    `flex items-center gap-1 px-3 py-2 rounded-lg transition ${
      location.pathname === path
        ? "bg-teal-100 text-teal-600"
        : "text-gray-600 hover:text-teal-500 hover:bg-gray-100"
    }`;

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-lg bg-white/80 border-b border-white/40 shadow-sm">
      <div className="max-w-6xl mx-auto px-6 py-3 flex justify-between items-center">
        
        <h1
          onClick={() => nav("/home")}
          className="text-2xl font-bold bg-gradient-to-r from-teal-500 to-cyan-500 bg-clip-text text-transparent cursor-pointer"
        >
          PollRooms
        </h1>

        <div className="flex items-center gap-2">
          
          <Link to="/home" className={linkStyle("/home")}>
            <Home size={18} />
            Home
          </Link>

          <Link to="/create" className={linkStyle("/create")}>
            <PlusCircle size={18} />
            Create
          </Link>

          <Link to="/join" className={linkStyle("/join")}>
            <Users size={18} />
            Join
          </Link>

          {token && (
            <>
              <div className="w-9 h-9 rounded-full bg-gradient-to-r from-teal-400 to-cyan-500 text-white flex items-center justify-center font-bold ml-2">
                U
              </div>

              <button
                onClick={() => {
                  logoutUser();
                  nav("/");
                }}
                className="ml-2 flex items-center gap-2 bg-gradient-to-r from-teal-400 to-cyan-500 text-white px-4 py-2 rounded-xl shadow hover:scale-[1.03] transition"
              >
                <LogOut size={16} />
                Logout
              </button>
            </>
          )}

        </div>
      </div>
    </nav>
  );
}
