import { createContext, useContext, useEffect, useState } from "react";
import API from "../utils/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUserInfo = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setUserInfo(null);
      setLoading(false);
      return;
    }

    try {
      const res = await API["account"].get("/user/info/", {
                headers: { Authorization: `Bearer ${token}` }
      });
      setUserInfo(res.data);
    } catch (err) {
      setUserInfo(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const login = (token) => {
    localStorage.setItem("token", token);
    fetchUserInfo();
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUserInfo(null);
  };

  return (
    <AuthContext.Provider value={{ userInfo, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
