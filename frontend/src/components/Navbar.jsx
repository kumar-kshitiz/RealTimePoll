import { Link, useNavigate, useLocation } from "react-router-dom";
import { LogOut, PlusCircle, Home, Users, Menu, X } from "lucide-react";
import { logoutUser } from "../lib/auth.api";
import { useState } from "react";

export default function Navbar() {
  const nav = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("token");

  const [open, setOpen] = useState(false);

  const linkStyle = (path) =>
    `flex items-center gap-2 px-3 py-2 rounded-lg transition ${
      location.pathname === path
        ? "bg-teal-100 text-teal-600"
        : "text-gray-600 hover:text-teal-500 hover:bg-gray-100"
    }`;

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-lg bg-white/80 border-b border-white/40 shadow-sm w-full">
     
      <div className="w-full px-4 md:max-w-6xl md:mx-auto flex justify-between items-center h-14">
        
        <h1
          onClick={() => nav("/home")}
          className="text-xl md:text-2xl font-bold bg-gradient-to-r from-teal-500 to-cyan-500 bg-clip-text text-transparent cursor-pointer"
        >
          PollRooms
        </h1>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-2">
          
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

        {/* MOBILE MENU BUTTON */}
        <button
          className="md:hidden p-2"
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {/* MOBILE DROPDOWN */}
      {open && (
        <div className="md:hidden w-full px-4 pb-4 flex flex-col gap-2 bg-white/90 backdrop-blur border-t">
          
          <Link onClick={()=>setOpen(false)} to="/home" className={linkStyle("/home")}>
            <Home size={18} />
            Home
          </Link>

          <Link onClick={()=>setOpen(false)} to="/create" className={linkStyle("/create")}>
            <PlusCircle size={18} />
            Create
          </Link>

          <Link onClick={()=>setOpen(false)} to="/join" className={linkStyle("/join")}>
            <Users size={18} />
            Join
          </Link>

          {token && (
            <button
              onClick={() => {
                logoutUser();
                nav("/");
              }}
              className="flex items-center gap-2 bg-gradient-to-r from-teal-400 to-cyan-500 text-white px-4 py-2 rounded-xl shadow"
            >
              <LogOut size={16} />
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
}
