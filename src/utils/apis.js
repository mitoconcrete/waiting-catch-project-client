import axios from "axios";
import { Modal } from "ant-design-vue";

axios.defaults.baseURL = import.meta.env.VITE_SERVER_HOST;

const http = axios.create();
// 응답 인터셉터 추가
http.interceptors.response.use(
  function (response) {
    // 2xx 범위에 있는 상태 코드는 이 함수를 트리거
    // 응답 데이터가 있는 작업 수행
    return response;
  },
  function (error) {
    if (error.response && error.response.status) {
      switch (error.response.status) {
        // status code가 401인 경우 `logout`을 커밋하고 `/login` 페이지로 리다이렉트
        case 400:
          Modal.error({
            title: "에러",
            content: error.response.data.message,
          });
          break;
        case 401:
          store.commit("/logout");
          router.push("/login").catch(() => {});
          break;
        default:
          return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);

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
