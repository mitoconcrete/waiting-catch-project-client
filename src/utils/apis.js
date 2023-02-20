import axios from "axios";
import { Modal } from "ant-design-vue";

axios.defaults.baseURL = import.meta.env.VITE_SERVER_HOST;

// 요청 인터셉터 추가
axios.interceptors.request.use(
  function (config) {
    // 요청이 전달되기 전에 작업 수행
    return config;
  },
  function (error) {
    // 요청 오류가 있는 경우 작업 수행
    console.log(error);
    Modal.error({
      title: "에러",
      content: "??",
    });
    return Promise.reject(error);
  }
);

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
