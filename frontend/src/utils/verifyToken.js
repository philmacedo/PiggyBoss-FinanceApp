import API from "../api";

export const verifyToken = async (token) => {
  try {
    await API.post("/token/verify/", { token });
    return true;
  } catch (err) {
    localStorage.removeItem("token");
    localStorage.removeItem("refresh");
    return false;
  }
};