import { useNavigate } from "react-router-dom";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import Navbar from "../components/Navbar";
import { createPoll } from "../lib/poll.api";

export default function CreateRoom() {
  const nav = useNavigate();

  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const [shareId, setShareId] = useState(""); 

  const addOption = () => {
    if (options.length >= 6) return;
    setOptions([...options, ""]);
  };

  const updateOption = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleCreate = async () => {
    if (!question.trim()) {
      alert("Enter question");
      return;
    }

    const filledOptions = options.filter((opt) => opt.trim() !== "");

    if (filledOptions.length < 2) {
      alert("At least 2 options required");
      return;
    }

    try {
      const res = await createPoll({
        question,
        options: filledOptions,
      });

      console.log("Created:", res);
      const link = `${window.location.origin}/room/${res.shareId}`;
      setShareId(link);

    } catch (err) {
      alert(err);
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-gradient-to-br from-teal-400 via-cyan-500 to-blue-500">
      <Navbar />

      <div className="flex min-h-[calc(100vh-64px)] items-center justify-center px-4">
        <div className="backdrop-blur-lg bg-white/80 border border-white/40 shadow-2xl rounded-3xl w-full max-w-lg p-8">
          
          <div className="text-center mb-6">
            <PlusCircle className="mx-auto text-teal-500 mb-2" size={36} />
            <h1 className="text-3xl font-bold text-gray-800">Create Poll Room</h1>
            <p className="text-gray-500 text-sm">
              Start a live poll and share with others
            </p>
          </div>

          <input
            placeholder="Poll question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded-xl mb-4 focus:ring-2 focus:ring-teal-400"
          />

          {options.map((opt, i) => (
            <input
              key={i}
              value={opt}
              onChange={(e) => updateOption(i, e.target.value)}
              placeholder={`Option ${i + 1}`}
              className="w-full border border-gray-300 p-3 rounded-xl mb-3 focus:ring-2 focus:ring-teal-400"
            />
          ))}

          {options.length < 6 && (
            <button
              onClick={addOption}
              className="text-sm text-teal-600 mb-6 hover:underline"
            >
              + Add another option
            </button>
          )}

          <button
            onClick={handleCreate}
            className="w-full bg-gradient-to-r from-teal-400 to-cyan-500 text-white py-3 rounded-xl font-semibold shadow-md hover:scale-[1.02] transition"
          >
            Create & Start Voting
          </button>

          {shareId && (
            <div className="mt-6 bg-white/70 border border-teal-200 rounded-2xl p-5 shadow-sm">
              <p className="text-sm text-gray-500 mb-2 text-center">
                Share this link to invite others
              </p>

              <div className="flex items-center gap-2">
                <input
                  readOnly
                  value={`${shareId}`}
                  className="flex-1 px-3 py-2 rounded-lg border bg-gray-50 text-sm"
                />

                <button
                  onClick={() =>
                    navigator.clipboard.writeText(`${shareId}`)
                  }
                  className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg text-sm"
                >
                  Copy
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
