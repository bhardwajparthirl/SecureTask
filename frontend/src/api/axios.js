import axios from "axios";

const api = axios.create({
    baseURL: "http://127.0.0.1:5000",
});


/* =====================================================
   REQUEST INTERCEPTOR
   Automatically attach JWT to every request
===================================================== */

api.interceptors.request.use(
    (config) => {

        const token = localStorage.getItem("access_token");

        if (token) {

            config.headers.Authorization =
                `Bearer ${token}`;

        }

        return config;
    },

    (error) => {

        return Promise.reject(error);

    }
);


/* =====================================================
   RESPONSE INTERCEPTOR
   Handle expired / invalid JWT
===================================================== */

let isHandlingAuthError = false;


api.interceptors.response.use(

    (response) => {
        return response;
    },

    (error) => {

        if (
            error.response?.status === 401 &&
            !isHandlingAuthError
        ) {

            isHandlingAuthError = true;


            localStorage.removeItem(
                "access_token"
            );


            window.dispatchEvent(
                new Event("auth:expired")
            );


            if (
                window.location.pathname !== "/login" &&
                window.location.pathname !== "/register"
            ) {

                window.location.href = "/login";

            }

        }

        return Promise.reject(error);

    }

);


export default api;