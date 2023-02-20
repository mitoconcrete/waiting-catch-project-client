import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_SERVER_HOST;

const http = axios.create();

export const api = {
  default: {
    setHeadersAuthorization(token) {
      http.defaults.headers.common["Authorization"] = "Bearer " + token;
    },
    deleteHeadersAuthorization() {
      delete http.defaults.headers.common["Authorization"];
    },
  },
  googleOAuth(accessToken) {
    return axios.get(
      "https://www.googleapis.com/oauth2/v2/userinfo?access_token=" +
        accessToken,
      {
        headers: {
          authorization: `token ${accessToken}`,
          accept: "application/json",
        },
      }
    );
  },
  googleRedirect(params) {
    return http.get("/google/callback", { params });
  },
};
