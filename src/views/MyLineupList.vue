<template>
  <div class="page-wrapper lineup-wrapper">
    <section class="nav-wrapper">
      <BackwardButton @click="moveBackward" message="나의 줄서기 내역" />
    </section>
    <LineupList :datas="datas" @sync="reSyncData" @inactive="handleInActive" />
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
    async syncData(id) {
      const token = window.localStorage.getItem("accessToken");
      if (!token) {
        Modal.warn({
          title: "로그인 요청",
          content: "로그인 이후 이용가능합니다.",
        });
        this.$router.replace("/info");
        return;
      }
      api.default.setHeadersAuthorization(token);
      const payload = {
        size: 10,
        lastId: id,
      };
      await this.$store.dispatch("syncUserWaitingHistories", payload);
      this.datas = this.userWaitingHistories.sort(
        (a, b) => b.lineupId - a.lineupId
      );
    },
    reSyncData() {
      this.$store.dispatch("initWaitings");
      this.syncData();
    },
    handleInActive() {
      Modal.error({
        title: "리뷰 불가",
        content: "입장완료한 줄서기 내역에만 리뷰를 추가할 수 있습니다.",
      });
    },
  },
  computed: {
    ...mapGetters({
      userWaitingHistories: "getUserWaitingHistories",
      hasRemainData: "getHasRemainWaitingHistories",
    }),
  },
  async created() {
    this.reSyncData();
  },
  watch: {
    isBottom(value) {
      console.log(value, this.hasRemainData);
      if (value && this.hasRemainData) {
        const lastId = this.datas[this.datas.length - 1].id;
        this.syncData(lastId);
      }
    },
  },
  data() {
    return {
      datas: [],
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
