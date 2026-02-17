import api from "./api";

// create poll
export const createPoll = async (formData) => {
  try {
    const res = await api.post("/poll/create", formData);

    return res.data;
  } catch (err) {
    throw err.response?.data?.message || "Create Poll failed";
  }
};

export const getPollByShareId = async (shareId) => {
  try {
    const res = await api.get(`/poll/${shareId}`);
    return res.data;
  } catch (err) {
    throw err?.response?.data?.message || "Failed to fetch poll";
  }
};

export const votePoll = async (poll_id, option_id,device_id) => {
  const res = await api.post("/vote", {
    poll_id,
    option_id,
    device_id
  });

  return res.data;
};