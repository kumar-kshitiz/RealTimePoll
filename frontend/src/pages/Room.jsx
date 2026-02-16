import { useState } from "react";
import { Users } from "lucide-react";
import Navbar from "../components/Navbar";

export default function Room() {
  const [voted, setVoted] = useState(false);
  const [votes, setVotes] = useState([5, 3]);

  const vote = (i) => {
    if (voted) return;
    const newVotes = [...votes];
    newVotes[i]++;
    setVotes(newVotes);
    setVoted(true);
  };

  const total = votes.reduce((a, b) => a + b, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-400 via-cyan-500 to-blue-500">
      
      <Navbar />

      <div className="flex items-center justify-center px-4 py-16">
        <div className="backdrop-blur-lg bg-white/85 border border-white/40 shadow-2xl rounded-3xl w-full max-w-lg p-8">
          
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Best JS Framework?
            </h1>

            <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
              <Users size={16} />
              23 people voting live
            </div>
          </div>

          {["React", "Vue"].map((opt, i) => {
            const percent = total ? (votes[i] / total) * 100 : 0;

            return (
              <div key={i} className="mb-5">
                <button
                  onClick={() => vote(i)}
                  disabled={voted}
                  className={`w-full p-3 rounded-xl border font-medium transition 
                  ${voted 
                    ? "bg-gray-100 cursor-not-allowed" 
                    : "hover:bg-teal-50 hover:border-teal-400"
                  }`}
                >
                  {opt}
                </button>

                <div className="w-full bg-gray-200 h-3 rounded-full mt-2 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-teal-400 to-cyan-500 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${percent}%` }}
                  />
                </div>

                <div className="text-right text-xs text-gray-500 mt-1">
                  {votes[i]} votes • {percent.toFixed(0)}%
                </div>
              </div>
            );
          })}

          {voted && (
            <div className="text-center mt-4 text-green-600 font-medium">
              ✔ You already voted
            </div>
          )}

          <div className="mt-8 text-center">
            <p className="text-xs text-gray-500">Room Code</p>
            <div className="text-lg font-bold tracking-widest text-teal-600">
              AB12CD
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
