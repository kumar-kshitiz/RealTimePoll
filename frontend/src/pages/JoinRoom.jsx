import { useNavigate } from "react-router-dom";
import { Users } from "lucide-react";
import Navbar from "../components/Navbar";
import { useState } from "react";

export default function JoinRoom() {
  const nav = useNavigate();
  const [code, setCode] = useState("");

  const handleJoin = () => {
    if (!code.trim()) return;
    nav(`/room/${code.trim()}`);
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-gradient-to-br from-teal-400 via-cyan-500 to-blue-500">
      <Navbar />

      <div className="flex min-h-[calc(100vh-64px)] items-center justify-center px-4 py-10">
        <div className="backdrop-blur-lg bg-white/80 border border-white/40 shadow-2xl rounded-3xl w-full max-w-md mx-auto p-8">

          <div className="text-center mb-6">
            <Users className="mx-auto text-teal-500 mb-2" size={36} />
            <h1 className="text-3xl font-bold text-gray-800">Join Poll Room</h1>
            <p className="text-gray-500 text-sm">
              Enter the room code shared by the host
            </p>
          </div>

          <input
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Enter room code"
            className="w-full border border-gray-300 p-3 rounded-xl mb-6 text-center tracking-widest text-lg focus:ring-2 focus:ring-teal-400"
          />

          <button
            onClick={handleJoin}
            className="w-full bg-gradient-to-r from-teal-400 to-cyan-500 text-white py-3 rounded-xl font-semibold shadow-md active:scale-[0.98]"
          >
            Join Room
          </button>

          <button
            onClick={() => nav("/home")}
            className="w-full mt-3 text-sm text-gray-500"
          >
            ← Back to Home
          </button>

        </div>
      </div>
    </div>
  );
}

