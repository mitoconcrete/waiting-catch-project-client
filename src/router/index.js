import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  scrollBehavior(to, from, savedPosition) {
    // always scroll to top
    return { top: 0 };
  },
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
      path: "/signup",
      name: "signup",
      component: () => import("@/views/Signup.vue"),
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
      path: "/my/reviews",
      name: "review",
      component: () => import("@/views/MyReviewList.vue"),
    },
    {
      path: "/info/detail",
      name: "user-detail",
      component: () => import("@/views/InfoManage.vue"),
    },
    {
      path: "/my/lineup",
      name: "lineup",
      component: () => import("@/views/MyLineupList.vue"),
    },
  ],
});

export default router;
