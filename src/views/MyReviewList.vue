<template lang="">
  <div class="page-wrapper">
    <section class="nav-wrapper">
      <BackwardButton @click="moveBackward" message="내가 작성한 리뷰조회" />
    </section>
    <ReviewList :datas="datas" />
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import BackwardButton from "../components/BackwardButton.vue";
import ReviewList from "../components/ReviewList.vue";
import { Modal } from "ant-design-vue";

const MOCK_DATA = [];
const DATA_COUNT = 0;
for (let i = 1; i <= DATA_COUNT; i++) {
  MOCK_DATA.push({
    restaurantName: "가게이름",
    nickname: "닉네임",
    content: "너무 맛있어요. 근데 별로네요.",
    rate: 3,
    imagePaths: [
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
      "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=960&q=80",
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
    ],
    createdDate: "2022-07-26",
  });
}
export default {
  name: "MyReviewList",
  components: {
    BackwardButton,
    ReviewList,
  },
  data() {
    return {
      datas: MOCK_DATA,
    };
  },
  props: {
    isBottom: false,
  },
  computed: {
    ...mapGetters({
      userReviews: "getUserReviews",
      hasRemainData: "getHasRemainReviews",
    }),
  },
  watch: {
    isBottom(value) {
      if (value && this.hasRemainData) {
        const lastId = this.datas[this.datas.length - 1].id;
        this.syncData(lastId);
      }
    },
  },
  async created() {
    this.$store.dispatch("initReviews");
    const token = window.localStorage.getItem("accessToken");
    // console.log(token);
    if (!token) {
      Modal.confirm({
        title: "로그인 요청",
        content:
          "로그인 이후 이용가능합니다. 로그인 페이지로 이동하시겠습니까?",
        okText: "예",
        cancelText: "아니오",
        onOk: () => {
          this.$router.replace("/login");
          return;
        },
      });
      this.$router.replace("/info");
      return;
    }
    this.syncData();
  },
  methods: {
    moveBackward() {
      this.$router.push("/info");
    },
    async syncData(id) {
      const payload = {
        lastId: id,
        size: 10,
      };
      await this.$store.dispatch("syncUserReviews", payload);
      this.datas = this.userReviews;
    },
  },
};
</script>
<style lang="scss">
.nav-wrapper {
  position: sticky;
  top: 0;
  background-color: #fff;
  z-index: 999;
}
</style>
