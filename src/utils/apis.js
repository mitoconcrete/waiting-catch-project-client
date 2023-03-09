import axios from "axios";
import { Modal } from "ant-design-vue";

axios.defaults.baseURL = import.meta.env.VITE_SERVER_HOST;

const http = axios.create();

// 응답 인터셉터 추가
http.interceptors.response.use(
  function (response) {
    // 2xx 범위에 있는 상태 코드는 이 함수를 트리거
    if ("authorization" in response.headers) {
      window.localStorage.setItem(
        "accessToken",
        response.headers.authorization.slice(7)
      );
    }

    // 응답 데이터가 있는 작업 수행
    return response;
  },
  function (error) {
    if (error.response && error.response.status) {
      switch (error.response.status) {
        // status code가 401인 경우 `logout`을 커밋하고 `/login` 페이지로 리다이렉트
        case 400:
          if (error.response.data.message === "사용자를 찾을 수 없습니다.") {
            Modal.warn({
              title: "정보 요청",
              content:
                "원활한 줄서기를 위해선 더 많은 정보가 필요해요.\n추가 정보들을 입력하여 가입한 뒤, 다음부턴 편하게 구글 로그인을 할 수 있습니다.",
            });
          } else {
            Modal.error({
              title: "에러",
              content: error.response.data.message,
            });
          }

          break;
        case 401:
          window.localStorage.clear();
          window.location.href = "/login";
          break;
        default:
          return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);

export const api = {
  // config
  default: {
    setHeadersAuthorization(token) {
      http.defaults.headers.common["Authorization"] = "Bearer " + token;
    },
    deleteHeadersAuthorization() {
      if ("Authorization" in http.defaults.headers.common) {
        delete http.defaults.headers.common["Authorization"];
      }
    },
  },
  // get
  getRestaurants(params) {
    return http.get("/general/restaurants", { params });
  },
  getRestaurantBasicInfo(restaurantId) {
    return http.get(`/customer/restaurants/${restaurantId}`);
  },
  getRestaurantDetailInfo(restaurantId) {
    return http.get(`/customer/restaurants/${restaurantId}/details`);
  },
  getRestaurantMenus(restaurantId) {
    return http.get(`/customer/restaurants/${restaurantId}/menus`);
  },
  getRestaurantReviews({ restaurantId, params }) {
    return http.get(`/customer/restaurants/${restaurantId}/reviews`, {
      params,
    });
  },
  getRestaurantEvents({ restaurantId, params }) {
    return http.get(`/customer/restaurants/${restaurantId}/events`, { params });
  },
  getGlobalEvents(params) {
    return http.get("/customer/events", { params });
  },
  getRestaurantSearch(params) {
    return http.get("/general/restaurants/search", { params });
  },
  getCustomerReviews(params) {
    return http.get("/customer/reviews", { params });
  },
  getWaitings(params) {
    return http.get("/customer/lineup-records", { params });
  },
  getWaitingHistories(params) {
    return http.get("/customer/lineup-history-records", { params });
  },
  getCustomerDetailInfo() {
    return http.get("/customer/info");
  },
  getCustomerCoupons() {
    return http.get("/customer/coupons");
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
    return http.get("/general/google/callback", { params });
  },
  // post
  postReview(restaurantId, payload) {
    return http.post(`/customer/restaurants/${restaurantId}/reviews`, payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  postWaiting(restaurantId, payload) {
    return http.post(`/customer/restaurants/${restaurantId}/lineup`, payload);
  },
  postCoupon(creatorId) {
    return http.post(`/customer/coupons/creators/${creatorId}`);
  },
  putCoupon(couponId) {
    return http.put(`/customer/coupons/${couponId}`);
  },
  login(payload) {
    return http.post("/general/customer/signin", payload);
  },
  signup(payload) {
    return http.post("/general/customer/signup", payload);
  },
  logout() {
    return http.post("/customer/signout");
  },
  findPassword(payload) {
    return http.post("/general/customer/find-password", payload);
  },
  // put
  updatePassword(payload) {
    return http.put("/customer/password", payload);
  },
  // delete
  deleteReview(restaurantId, reviewId) {
    return http.delete(
      `/customer/restaurants/${restaurantId}/reviews/${reviewId}`,
      payload
    );
  },
  deleteWaiting(lineupId) {
    return http.delete(`/customer/restaurants/lineup/${lineupId}`);
  },
  deleteCustomer() {
    return http.delete(`/customer/withdraw`);
  },
};
