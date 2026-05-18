import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:8000/api"
});

API.interceptors.request.use((req) => {

    const token = localStorage.getItem("accessToken");

    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
    }

    return req;
});

API.interceptors.response.use(

    (response) => response,

    async (error) => {

        const originalRequest = error.config;

        if (
            error.response.status === 401 &&
            !originalRequest._retry
        ) {

            originalRequest._retry = true;

            try {

                const refreshToken = localStorage.getItem("refreshToken");

                const response = await axios.post(
                    "http://localhost:8000/api/auth/refresh",
                    { refreshToken }
                );

                const newAccessToken = response.data.accessToken;

                localStorage.setItem(
                    "accessToken",
                    newAccessToken
                );

                originalRequest.headers.Authorization =
                    `Bearer ${newAccessToken}`;

                return API(originalRequest);

            } catch (refreshError) {

                localStorage.clear();

                window.location.href = "/login";

                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default API;