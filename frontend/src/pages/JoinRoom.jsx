import { useNavigate } from "react-router-dom";
import { Users } from "lucide-react";
import Navbar from "../components/Navbar";

export default function JoinRoom() {
  const nav = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-400 via-cyan-500 to-blue-500">
      
      <Navbar />

      <div className="flex items-center justify-center px-4 py-16">
        <div className="backdrop-blur-lg bg-white/80 border border-white/40 shadow-2xl rounded-3xl w-full max-w-md p-8">
          
          <div className="text-center mb-6">
            <Users className="mx-auto text-teal-500 mb-2" size={36} />
            <h1 className="text-3xl font-bold text-gray-800">Join Poll Room</h1>
            <p className="text-gray-500 text-sm">
              Enter the room code shared by the host
            </p>
          </div>

          <input
            placeholder="Enter room code"
            className="w-full border border-gray-300 p-3 rounded-xl mb-6 text-center tracking-widest text-lg focus:ring-2 focus:ring-teal-400 focus:outline-none"
          />

          <button
            onClick={() => nav("/room")}
            className="w-full bg-gradient-to-r from-teal-400 to-cyan-500 text-white py-3 rounded-xl font-semibold shadow-md hover:scale-[1.02] transition"
          >
            Join Room
          </button>

          <button
            onClick={() => nav("/home")}
            className="w-full mt-3 text-sm text-gray-500 hover:text-gray-700"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}
