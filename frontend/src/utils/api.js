import axios from 'axios';

let isRefreshing = false;
let failedQueue = [];
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'; 
const REFRESH_URL = `${API_BASE_URL}/account/login/refresh/`;

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
  const instance = axios.create({ baseURL: `${API_BASE_URL}${baseURL}` })

  instance.interceptors.request.use(config => {

    const token = localStorage.getItem("token")
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config

  })

  instance.interceptors.response.use(
    res => res,
    async (err) => {
      const originalRequest = err.config;

      if (err.response?.status === 401 && !originalRequest._retry) {
        if (isRefreshing) {
          return new Promise((resolve, reject) => failedQueue.push({ resolve, reject }))
            .then(token => {
              originalRequest.headers["Authorization"] = "Bearer " + token
              return instance(originalRequest)
            })
            .catch(err => {
              return Promise.reject(err);
            });
        }

        originalRequest._retry = true;
        isRefreshing = true;

        const refreshToken = localStorage.getItem("refresh")

        try {
          const response = await axios.post(
            REFRESH_URL,
            { refresh: refreshToken }
          )

          const newAccess = response.data.access

          localStorage.setItem("token", newAccess)
          instance.defaults.headers.common["Authorization"] = `Bearer ${newAccess}`;
          processQueue(null, newAccess);
          return instance(originalRequest);

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

  return instance;
};

const API = {
  account: axios.create({baseURL: `${API_BASE_URL}/account`}),
  finance: createAPI('/finance'),
  dashboard: createAPI('/dashboard'),
  planning: createAPI('/planning'),
}

export default API;