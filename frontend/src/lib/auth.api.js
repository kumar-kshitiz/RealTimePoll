import api from "./api";
import { setToken, removeToken } from "./token";

// signup
export const signupUser = async (formData) => {
  try {
    console.log(formData);
    const res = await api.post("/auth/signup", formData);

    if (res.data.token) {
      setToken(res.data.token);
    }

    return res.data;
  } catch (err) {
    throw err.response?.data?.message || "Signup failed";
  }
};

// login
export const loginUser = async (formData) => {
  try {
    const res = await api.post("/auth/signin", formData);

    if (res.data.token) {
      setToken(res.data.token);
    }

    return res.data;
  } catch (err) {
    throw err.response?.data?.message || "Login failed";
  }
};

// logout
export const logoutUser = () => {
  removeToken();
};
