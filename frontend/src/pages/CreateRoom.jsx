import { useNavigate } from "react-router-dom";
import { PlusCircle } from "lucide-react";
import Navbar from "../components/Navbar";

export default function CreateRoom() {
  const nav = useNavigate();

  return (
    <>
        <Navbar/>
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-400 via-cyan-500 to-blue-500 px-4">
      
      <div className="backdrop-blur-lg bg-white/80 border border-white/40 shadow-2xl rounded-3xl w-full max-w-lg p-8">
     
        <div className="text-center mb-6">
          <PlusCircle className="mx-auto text-teal-500 mb-2" size={36} />
          <h1 className="text-3xl font-bold text-gray-800">Create Poll Room</h1>
          <p className="text-gray-500 text-sm">
            Start a live poll and share with others
          </p>
        </div>

        <input
          placeholder="Room name"
          className="w-full border border-gray-300 p-3 rounded-xl mb-4 focus:ring-2 focus:ring-teal-400 focus:outline-none"
        />

        <input
          placeholder="Poll question"
          className="w-full border border-gray-300 p-3 rounded-xl mb-4 focus:ring-2 focus:ring-teal-400 focus:outline-none"
        />

        <input
          placeholder="Option 1"
          className="w-full border border-gray-300 p-3 rounded-xl mb-3 focus:ring-2 focus:ring-teal-400 focus:outline-none"
        />

        <input
          placeholder="Option 2"
          className="w-full border border-gray-300 p-3 rounded-xl mb-3 focus:ring-2 focus:ring-teal-400 focus:outline-none"
        />

        <button className="text-sm text-teal-600 mb-6 hover:underline">
          + Add another option
        </button>

        <button
          onClick={() => nav("/room")}
          className="w-full bg-gradient-to-r from-teal-400 to-cyan-500 text-white py-3 rounded-xl font-semibold shadow-md hover:scale-[1.02] hover:shadow-lg transition"
        >
          Create & Start Voting
        </button>
      </div>
    </div>
    </>
  );
}
