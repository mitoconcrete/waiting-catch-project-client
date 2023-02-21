<template>
  <section class="page-wrapper profile-page">
    <header>
      <button @click="nickname ? goProfilePage() : goLoginPage()">
        <strong>{{ nickname ? `${nickname} 님` : "-" }}</strong>
        <img class="present-icon" src="/icon/r_forward.png" />
      </button>
    </header>
    <ul>
      <li v-for="menu in menus" @click="goNextPage(menu.page)">
        <div
          class="icon-wrapper present-icon"
          :style="{ backgroundImage: `url(${menu.imgSrc})` }"
        ></div>
        <h3>{{ menu.name }}</h3>
        <div
          class="icon-wrapper present-icon"
          :style="{ backgroundImage: `url('/icon/forward.png')` }"
        ></div>
      </li>
    </ul>
  </section>
</template>

<style lang="scss">
.profile-page {
  header {
    button {
      background-color: inherit;
      border: none;
      display: flex;

      strong {
        font-size: 20px;
        color: rgb(140, 96, 200);
      }

      img {
        width: 20px;
        height: 20px;
        margin: auto 0 auto 15px;
      }
    }
  }
  ul {
    display: flex;
    flex-direction: column;
    li {
      display: flex;
      width: 100%;
      height: 80px;
      cursor: pointer;
      h3 {
        margin: auto;
        margin-left: 10px;
        color: rgb(140, 96, 200);
      }

      div {
        margin: auto 0;
      }
      border-bottom: 1px solid rgb(169, 127, 224, 0.3);
    }
  }
  .present-icon {
    width: 20px;
    height: 20px;
    background-size: contain;
    background-repeat: no-repeat;
  }
}
</style>

<script>
import { mapGetters } from "vuex";
// const REVIEW_COUNT = 10;
// const LINE_UP_COUNT = 10;
// const REVIEW_MOCK_DATA = [];
// const LINE_UP_MOCK_DATA = [];

// for (let i = 1; i <= REVIEW_COUNT; i++) {
//   REVIEW_MOCK_DATA.push({
//     id: i,
//     restaurantName: "리뷰가게이름",
//     content: "리뷰내용",
//     rate: 5,
//     createdDate: new Date(),
//   });
// }

// for (let i = 1; i <= LINE_UP_COUNT; i++) {
//   LINE_UP_MOCK_DATA.push({
//     restaurantName: "줄선 가게 이름",
//     nickName: "내 닉네임",
//     waitingMemberCount: 3,
//     status: "WAIT",
//     createdDate: new Date(),
//     arrivedAt: new Date(),
//   });
// }

const MENU = [
  { name: "줄서기 내역", page: "/my/lineup", imgSrc: "/icon/history.png" },
  { name: "작성 리뷰 내역", page: "/my/reviews", imgSrc: "/icon/review.png" },
];
export default {
  name: "MyPage",
  data() {
    return {
      // linupList: LINE_UP_MOCK_DATA,
      // reviewList: REVIEW_MOCK_DATA,
      menus: MENU,
    };
  },
  methods: {
    goLoginPage() {
      this.$router.push("login");
    },
    goProfilePage() {
      this.$router.push("/info/detail");
    },
    goNextPage(page) {
      this.$router.push(page);
    },
  },
  computed: {
    ...mapGetters({
      nickname: "getUserNickname",
    }),
  },
  created() {
    this.$store.dispatch("syncUserProfile");
  },
};
</script>
