<template>
  <div class="page-wrapper lineup-wrapper">
    <section class="nav-wrapper">
      <BackwardButton @click="moveBackward" message="나의 줄서기 내역" />
    </section>
    <a-tabs v-model:activeKey="activeKey">
      <a-tab-pane key="1" tab="오늘의 줄서기 내역">
        <LineupList :datas="datas" @inactive="handleWaitingInActive" />
      </a-tab-pane>
      <a-tab-pane key="2" tab="과거 줄서기 내역" force-render>
        <LineupList :datas="datas" @inactive="handleHistioyInActive" />
      </a-tab-pane>
    </a-tabs>
  </div>
</template>
<script>
import BackwardButton from "../components/BackwardButton.vue";
import { mapGetters } from "vuex";
import { api } from "../utils/apis";
import Modal from "ant-design-vue/lib/modal";
import LineupList from "../components/LineupList.vue";

// const MOCK_DATA = [];
// const DATA_COUNT = 0;
// for (let i = 1; i <= DATA_COUNT; i++) {
//   MOCK_DATA.push({
//     restaurantId: i,
//     restaurantName: "레스토랑 이름",
//     numOfMembers: i,
//     status:
//       i % 4 == 0
//         ? "WAIT"
//         : i % 4 === 1
//         ? "ARRIVE"
//         : i % 4 === 2
//         ? "CANCEL"
//         : "CALL",
//     reviewed: i % 2 == 0 ? true : false,
//     startedAt: new Date(),
//     arrivedAt: new Date(),
//   });
// }

export default {
  name: "MyLineupList",
  components: { BackwardButton, LineupList, Modal },
  props: {
    isBottom: false,
  },
  methods: {
    moveBackward() {
      this.$router.push("/info");
    },
    async syncWaitingHistories(id) {
      this.checkAndSetAccessToken();
      const payload = {
        size: 10,
        lastId: id,
      };
      await this.$store.dispatch("syncUserWaitingHistories", payload);
      this.datas = this.userWaitingHistories.sort(
        (a, b) => b.lineupId - a.lineupId
      );
    },
    async syncWaitings() {
      this.checkAndSetAccessToken();
      await this.$store.dispatch("syncUserWaitings");
      this.datas = this.userWaitings.sort((a, b) => b.lineupId - a.lineupId);
    },
    initWaitingHistories() {
      this.$store.dispatch("initWaitings");
      this.syncWaitingHistories();
    },
    initWaitings() {
      this.$store.dispatch("initWaitings");
      this.syncWaitings();
    },
    handleHistioyInActive() {
      Modal.error({
        title: "리뷰 불가",
        content: "입장완료한 줄서기 내역에만 리뷰를 추가할 수 있습니다.",
      });
    },
    async handleWaitingInActive(restaurantId) {
      await this.$store.dispatch("syncRestaurantBasicInfo", restaurantId);
      await this.$store.dispatch("syncRestaurantDetailInfo", restaurantId);
      this.$store.commit("setIsRestaurantModalStatus", true);
    },
    checkAndSetAccessToken() {
      const token = window.localStorage.getItem("accessToken");
      api.default.setHeadersAuthorization(token);
    },
  },
  computed: {
    ...mapGetters({
      userWaitings: "getUserWaitings",
      userWaitingHistories: "getUserWaitingHistories",
      hasRemainWaitingHistoryData: "getHasRemainWaitingHistories",
    }),
  },
  watch: {
    isBottom(value) {
      // console.log(value, this.hasRemainData);
      if (value) {
        if (this.activeKey === "1") {
          return;
        } else {
          if (this.hasRemainWaitingHistoryData) {
            const lastId = this.datas[this.datas.length - 1].id;
            this.syncWaitingHistories(lastId);
          }
        }
      }
    },

    activeKey: {
      immediate: true,
      handler: function (value) {
        if (value === "1") {
          this.initWaitings();
        } else {
          this.initWaitingHistories();
        }
      },
    },
  },
  created() {
    const token = window.localStorage.getItem("accessToken");
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
  },
  data() {
    return {
      datas: [],
      activeKey: "1",
    };
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
