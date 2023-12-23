import axios from "axios";

const REACT_APP_API_URL = 'http://localhost:5000';

const repository = axios.create({
  baseURL: REACT_APP_API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

const axiosAuth = axios.create({
  baseURL: REACT_APP_API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

function refreshToken() {
  return axiosAuth.get("auth/refresh", {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem("os_refresh_token")}`
    }
  });
}

repository.interceptors.request.use(
  (config) => {
    const access_token = localStorage.getItem("os_access_token");
    if (access_token) {
      config.headers["Authorization"] = `Bearer ${access_token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

repository.interceptors.response.use(
  (response) => {
    return response;
  },
  async (err) => {
    const originalRequest = err.config;

    if (err.response) {
      // access token expired
      if (err.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          localStorage.removeItem('os_access_token');
          const response = await refreshToken();
          const { access_token, refresh_token } = response.data;
          localStorage.setItem("os_access_token", access_token);
          localStorage.setItem("os_refresh_token", refresh_token);
          repository.defaults.headers.common["Authorization"] = access_token;
          console.log("refreshed tokens");

          return repository(originalRequest);
        } catch (error: any) {
          localStorage.clear();
          console.log("deleted tokens");
          window.location.replace("/auth/log_in");

          return Promise.reject(error);
        }
      }
    }

    return Promise.reject(err);
  }
);

export {repository, axiosAuth};