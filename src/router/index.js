import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("@/views/Home.vue"),
    },
    {
      path: "/info",
      name: "info",
      component: () => import("@/views/MyPage.vue"),
    },
    {
      path: "/search",
      name: "search",
      component: () => import("@/views/Search.vue"),
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/Login.vue"),
    },
    {
      path: "/oauth/callback",
      name: "oauth",
      component: () => import("@/views/OauthCallback.vue"),
    },
    {
      path: "/find/password",
      name: "find-password",
      component: () => import("@/views/FindPassword.vue"),
    },
    {
      path: "/reviews",
      name: "review",
      component: () => import("@/views/MyReviewList.vue"),
    },
    {
      path: "/info/detail",
      name: "user-detail",
      component: () => import("@/views/InfoManage.vue"),
    },
  ],
});

export default router;
