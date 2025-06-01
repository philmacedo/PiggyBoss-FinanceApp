import axios from 'axios';

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

const createAPI = (baseURL) => {
  const instance = axios.create({ baseURL })

  API.interceptors.request.use(config => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
  });

  API.interceptors.response.use(
    res => res,
    async (err) => {
      const originalRequest = err.config;

      if (err.response?.status === 401 && !originalRequest._retry) {
        if (isRefreshing) {

          return new Promise(function (resolve, reject) {
            failedQueue.push({ resolve, reject });
          })
            .then(token => {
              originalRequest.headers["Authorization"] = "Bearer " + token;
              return API(originalRequest);
            })
            .catch(err => {
              return Promise.reject(err);
            });
        }

        originalRequest._retry = true;
        isRefreshing = true;

        const refreshToken = localStorage.getItem("refresh");

        try {
          const response = await axios.post(
            `${API.defaults.baseURL.replace(/\/$/, "")}/token/refresh/`,
            { refresh: refreshToken }
          );

          const newAccess = response.data.access;
          localStorage.setItem("token", newAccess);
          API.defaults.headers.common["Authorization"] = `Bearer ${newAccess}`;
          processQueue(null, newAccess);
          return API(originalRequest);
          } catch (refreshErr) {
            processQueue(refreshErr, null);
            localStorage.removeItem("token");
            localStorage.removeItem("refresh");
            
            return Promise.reject(refreshErr);
          } finally {
            isRefreshing = false;
          }
        }

      return Promise.reject(err);
    }
  );

  instance.interceptors.request.use(config => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  return instance;
};

const API = {
  account: axios.create({baseURL: 'http://localhost:8000/account'}),
  finance: axios.create({baseURL: 'http://localhost:8000/finance'}),
} 

export default API;
