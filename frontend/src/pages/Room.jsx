import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { Users } from "lucide-react";
import Navbar from "../components/Navbar";
import { getPollByShareId, votePoll } from "../lib/poll.api";
import { socket } from "../lib/socket";
import FingerprintJS from "@fingerprintjs/fingerprintjs";

async function getDeviceId() {
  const fp = await FingerprintJS.load();
  const result = await fp.get();
  return result.visitorId;
}

export default function Room() {
  const { shareId } = useParams();
  const votingRef = useRef(false);

  const [poll, setPoll] = useState(null);
  const [voted, setVoted] = useState(false);

  useEffect(() => {
    const loadPoll = async () => {
      try {
        const data = await getPollByShareId(shareId);
        setPoll(data);
      } catch (err) {
        console.log("Fetch poll error:", err);
      }
    };
    loadPoll();
  }, [shareId]);

  useEffect(() => {
    if (!socket.connected) socket.connect();

    socket.emit("joinPoll", shareId);

    socket.on("voteUpdated", (data) => {
      setPoll((prev) => ({
        ...prev,
        options: data.options,
      }));
    });

    return () => {
      socket.off("voteUpdated");
    };
  }, [shareId]);

  if (!poll) return <div className="p-10 text-center">Loading...</div>;

  const total = poll.options.reduce((a, b) => a + b.votes, 0);

  const vote = async (optionId) => {
    if (votingRef.current || voted) return;

    votingRef.current = true;
    setVoted(true);

    try {
      const device_id = await getDeviceId();
      await votePoll(poll._id, optionId, device_id);
    } catch (err) {
      console.log("Vote error:", err);
    }
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-gradient-to-br from-teal-400 via-cyan-500 to-blue-500">
      <Navbar />

      <div className="flex min-h-[calc(100vh-64px)] items-center justify-center px-4 py-16">
        <div className="bg-white/90 rounded-3xl w-full max-w-lg p-8 shadow-xl">

          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800">
              {poll.question}
            </h1>

            <div className="flex justify-center gap-2 text-sm text-gray-500 mt-2">
              <Users size={16} />
              Live voting
            </div>
          </div>

          {poll.options.map((opt) => {
            const percent = total ? (opt.votes / total) * 100 : 0;

            return (
              <div key={opt._id} className="mb-5">
                <button
                  onClick={() => vote(opt._id)}
                  disabled={voted}
                  className={`w-full p-3 rounded-xl border font-medium transition
                  ${
                    voted
                      ? "bg-gray-100 cursor-not-allowed"
                      : "hover:bg-teal-50 hover:border-teal-400"
                  }`}
                >
                  {opt.text}
                </button>

                <div className="w-full bg-gray-200 h-3 mt-2 rounded-full overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-teal-400 to-cyan-500 h-3 transition-all duration-500"
                    style={{ width: `${percent}%` }}
                  />
                </div>

                <div className="text-right text-xs text-gray-500 mt-1">
                  {opt.votes} votes • {percent.toFixed(0)}%
                </div>
              </div>
            );
          })}

          {voted && (
            <div className="text-center mt-4 text-green-600 font-semibold">
              You voted
            </div>
          )}

          <div className="text-center mt-6 text-teal-600 font-bold">
            Room: {shareId}
          </div>

        </div>
      </div>
    </div>
  );
}
