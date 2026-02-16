import { useNavigate } from "react-router-dom";
import { PlusCircle, Users } from "lucide-react";
import Navbar from "../components/Navbar";

export default function Home() {
  const nav = useNavigate();

  return (
    <> 
        <Navbar/>
    <div className="min-h-screen bg-gradient-to-br from-teal-400 via-cyan-500 to-blue-500 flex items-center justify-center px-4">
      
      <div className="w-full max-w-5xl text-center">
   
        <h1 className="text-5xl font-bold text-white mb-3">Poll Rooms</h1>
        <p className="text-white/90 mb-12 text-lg">
          Create live polls and watch results update in real-time
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          
          <div className="backdrop-blur-lg bg-white/80 border border-white/40 p-8 rounded-3xl shadow-2xl hover:scale-[1.02] transition-all">
            <PlusCircle className="mx-auto mb-4 text-teal-500" size={40} />
            <h2 className="text-2xl font-bold mb-2 text-gray-800">Create Room</h2>
            <p className="text-gray-500 mb-6 text-sm">
              Start a new poll room and invite people to vote live.
            </p>

            <button
              onClick={() => nav("/create")}
              className="w-full bg-gradient-to-r from-teal-400 to-cyan-500 text-white py-3 rounded-xl font-semibold shadow-md hover:shadow-lg hover:scale-[1.02] transition"
            >
              Create Poll Room
            </button>
          </div>

          <div className="backdrop-blur-lg bg-white/80 border border-white/40 p-8 rounded-3xl shadow-2xl hover:scale-[1.02] transition-all">
            <Users className="mx-auto mb-4 text-teal-500" size={40} />
            <h2 className="text-2xl font-bold mb-2 text-gray-800">Join Room</h2>
            <p className="text-gray-500 mb-6 text-sm">
              Enter a room code and participate in live voting.
            </p>

            <button
              onClick={() => nav("/join")}
              className="w-full bg-gradient-to-r from-teal-400 to-cyan-500 text-white py-3 rounded-xl font-semibold shadow-md hover:shadow-lg hover:scale-[1.02] transition"
            >
              Join Poll Room
            </button>
          </div>
        </div>

        <p className="text-white/80 text-sm mt-12">
          Real-time polling system
        </p>
      </div>
    </div>
    </>
  );
}
