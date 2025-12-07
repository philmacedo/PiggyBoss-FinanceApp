import { createContext, useContext, useEffect, useState, useRef } from "react";
import API from "../utils/api";

const AuthContext = createContext()


export function AuthProvider({ children }) {
  const [userInfo, setUserInfo] = useState(null)
  const [loading, setLoading] = useState(true)
  const refreshed = useRef(false);

  const fetchUserInfo = async () => {
    const token = localStorage.getItem("token")
    const refresh = localStorage.getItem("refresh")

    if (!token) {
      setUserInfo(null)
      setLoading(false)
      return;
    }

    try {
      const res = await API.account.get("/user/info/", {
          headers: { Authorization: `Bearer ${token}` }
      });
      setUserInfo(res.data)
      refreshed.current = false
    } catch (err) {
      if (err.response?.status === 401 && refresh){
        try {
          refreshed.current = true

          let refresh_response = await API.account.post('/login/refresh/', { refresh })
          if (refresh_response) {
            localStorage.setItem("token", refresh_response.data.access);
            await fetchUserInfo();
          }
        }
        catch (err) {
          logout()
        }
      }
      else {
        logout()
      }
    } finally {
      setLoading(false)
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const login = async (credenciais) => {
  try {
    const res = await API.account.post('/login/', credenciais)
    localStorage.setItem('token', res.data.access)
    localStorage.setItem('refresh', res.data.refresh)
    await fetchUserInfo()
    return res.data
  } catch (err) {
    return Promise.reject(err)
  }
};

  const logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem('refresh')
    setUserInfo(null);
  };

  return (
    <AuthContext.Provider value={{ userInfo, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
